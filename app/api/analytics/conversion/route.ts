import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    
    const { event, properties, timestamp } = body;
    
    if (!event) {
      return NextResponse.json({ error: 'Event is required' }, { status: 400 });
    }

    // Get user ID from session or anonymous tracking
    const userId = session?.user?.id || null;
    const userEmail = session?.user?.email || null;

    // Track conversion event
    const conversionEvent = await prisma.conversionEvent.create({
      data: {
        event,
        properties: properties || {},
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        userId,
        userEmail,
        userAgent: request.headers.get('user-agent') || '',
        ipAddress: request.headers.get('x-forwarded-for') || request.ip || '',
        referrer: request.headers.get('referer') || '',
        utmSource: properties?.utm_source || null,
        utmMedium: properties?.utm_medium || null,
        utmCampaign: properties?.utm_campaign || null,
      }
    });

    // Update user conversion funnel if user is logged in
    if (userId) {
      await updateUserFunnel(userId, event, properties);
    }

    return NextResponse.json({ success: true, eventId: conversionEvent.id });
  } catch (error) {
    console.error('Conversion tracking error:', error);
    return NextResponse.json({ error: 'Failed to track conversion' }, { status: 500 });
  }
}

async function updateUserFunnel(userId: string, event: string, properties: any) {
  try {
    // Get or create user funnel
    let userFunnel = await prisma.userFunnel.findUnique({
      where: { userId }
    });

    if (!userFunnel) {
      userFunnel = await prisma.userFunnel.create({
        data: { userId }
      });
    }

    // Update funnel based on event
    const updates: any = {};
    
    switch (event) {
      case 'contract_uploaded':
        updates.contractUploadedAt = new Date();
        updates.funnelStage = 'UPLOADED';
        break;
      case 'preview_viewed':
        updates.previewViewedAt = new Date();
        updates.funnelStage = 'PREVIEW_VIEWED';
        break;
      case 'payment_page_visited':
        updates.paymentPageVisitedAt = new Date();
        updates.funnelStage = 'PAYMENT_PAGE';
        break;
      case 'payment_initiated':
        updates.paymentInitiatedAt = new Date();
        updates.funnelStage = 'PAYMENT_INITIATED';
        break;
      case 'payment_completed':
        updates.paymentCompletedAt = new Date();
        updates.funnelStage = 'PAYMENT_COMPLETED';
        updates.isConverted = true;
        break;
      case 'email_opened':
        updates.lastEmailOpenedAt = new Date();
        updates.emailOpenCount = { increment: 1 };
        break;
      case 'email_clicked':
        updates.lastEmailClickedAt = new Date();
        updates.emailClickCount = { increment: 1 };
        break;
    }

    // Update user funnel
    if (Object.keys(updates).length > 0) {
      await prisma.userFunnel.update({
        where: { userId },
        data: updates
      });
    }

    // Track specific event properties
    if (properties) {
      await prisma.eventProperty.create({
        data: {
          userId,
          event,
          properties: properties,
          timestamp: new Date()
        }
      });
    }
  } catch (error) {
    console.error('Error updating user funnel:', error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const event = searchParams.get('event');

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Build query
    const whereClause: any = {
      timestamp: {
        gte: startDate,
        lte: now
      }
    };

    if (event) {
      whereClause.event = event;
    }

    // Get conversion events
    const events = await prisma.conversionEvent.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      take: 1000
    });

    // Get funnel analytics
    const funnelStats = await prisma.userFunnel.groupBy({
      by: ['funnelStage'],
      _count: {
        funnelStage: true
      },
      where: {
        contractUploadedAt: {
          gte: startDate
        }
      }
    });

    // Calculate conversion rates
    const totalUploads = funnelStats.find(s => s.funnelStage === 'UPLOADED')?._count.funnelStage || 0;
    const totalPayments = funnelStats.find(s => s.funnelStage === 'PAYMENT_COMPLETED')?._count.funnelStage || 0;
    
    const conversionRate = totalUploads > 0 ? (totalPayments / totalUploads) * 100 : 0;

    // Get event counts
    const eventCounts = await prisma.conversionEvent.groupBy({
      by: ['event'],
      _count: {
        event: true
      },
      where: whereClause
    });

    return NextResponse.json({
      events,
      funnelStats,
      conversionRate: Math.round(conversionRate * 100) / 100,
      eventCounts,
      period,
      totalEvents: events.length
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
} 