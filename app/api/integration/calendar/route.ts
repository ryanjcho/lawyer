import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('contractId');

    if (!contractId) {
      return NextResponse.json({ error: 'Contract ID is required' }, { status: 400 });
    }

    // Check if user has access to this contract
    const contract = await prisma.contract.findFirst({
      where: {
        id: contractId,
        OR: [
          { userId: session.user.id },
          { assignedLawyerId: session.user.id }
        ]
      }
    });

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found or access denied' }, { status: 404 });
    }

    // Get calendar events for this contract
    const events = await prisma.calendarEvent.findMany({
      where: {
        contractId: contractId
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }
      },
      orderBy: {
        startDate: 'asc'
      }
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      contractId, 
      title, 
      description, 
      startDate, 
      endDate, 
      type, 
      participants,
      calendarProvider 
    } = body;

    if (!contractId || !title || !startDate || !endDate) {
      return NextResponse.json({ 
        error: 'Contract ID, title, start date, and end date are required' 
      }, { status: 400 });
    }

    // Check if user has access to this contract
    const contract = await prisma.contract.findFirst({
      where: {
        id: contractId,
        OR: [
          { userId: session.user.id },
          { assignedLawyerId: session.user.id }
        ]
      }
    });

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found or access denied' }, { status: 404 });
    }

    // Create calendar event
    const event = await prisma.calendarEvent.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type: type || 'meeting',
        contractId,
        calendarProvider: calendarProvider || 'google',
        createdBy: session.user.id
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }
      }
    });

    // Add participants if provided
    if (participants && participants.length > 0) {
      const participantData = participants.map((participantId: string) => ({
        eventId: event.id,
        userId: participantId
      }));

      await prisma.eventParticipant.createMany({
        data: participantData
      });
    }

    // Sync with external calendar if provider is configured
    if (calendarProvider) {
      try {
        await syncWithExternalCalendar(event, calendarProvider);
      } catch (syncError) {
        // Continue without failing the request
      }
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      eventId, 
      title, 
      description, 
      startDate, 
      endDate, 
      type,
      participants 
    } = body;

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    // Check if user has access to this event
    const existingEvent = await prisma.calendarEvent.findFirst({
      where: {
        id: eventId,
        contract: {
          OR: [
            { userId: session.user.id },
            { assignedLawyerId: session.user.id }
          ]
        }
      }
    });

    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found or access denied' }, { status: 404 });
    }

    // Update event
    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (type) updateData.type = type;

    const event = await prisma.calendarEvent.update({
      where: { id: eventId },
      data: updateData,
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }
      }
    });

    // Update participants if provided
    if (participants) {
      // Remove existing participants
      await prisma.eventParticipant.deleteMany({
        where: { eventId }
      });

      // Add new participants
      if (participants.length > 0) {
        const participantData = participants.map((participantId: string) => ({
          eventId: event.id,
          userId: participantId
        }));

        await prisma.eventParticipant.createMany({
          data: participantData
        });
      }
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error updating calendar event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    // Check if user has access to this event
    const existingEvent = await prisma.calendarEvent.findFirst({
      where: {
        id: eventId,
        contract: {
          OR: [
            { userId: session.user.id },
            { assignedLawyerId: session.user.id }
          ]
        }
      }
    });

    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found or access denied' }, { status: 404 });
    }

    // Delete event and its participants
    await prisma.eventParticipant.deleteMany({
      where: { eventId }
    });

    await prisma.calendarEvent.delete({
      where: { id: eventId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to sync with external calendar providers
async function syncWithExternalCalendar(event: any, provider: string) {
  // This would integrate with actual calendar APIs
  // For now, we'll just log the sync attempt
  return Promise.resolve();
} 