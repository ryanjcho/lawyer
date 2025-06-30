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

    // Get comments for this contract
    const comments = await prisma.comment.findMany({
      where: {
        contractId: contractId,
        OR: [
          { isPrivate: false },
          { userId: session.user.id },
          { contract: { assignedLawyerId: session.user.id } }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        replies: {
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
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
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
    const { contractId, content, clauseReference, isPrivate, parentId } = body;

    if (!contractId || !content) {
      return NextResponse.json({ error: 'Contract ID and content are required' }, { status: 400 });
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

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        clauseReference,
        isPrivate: isPrivate || false,
        contractId,
        userId: session.user.id,
        parentId: parentId || null
      },
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
    });

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error creating comment:', error);
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
    const { commentId, content } = body;

    if (!commentId || !content) {
      return NextResponse.json({ error: 'Comment ID and content are required' }, { status: 400 });
    }

    // Check if user owns this comment
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        userId: session.user.id
      }
    });

    if (!existingComment) {
      return NextResponse.json({ error: 'Comment not found or access denied' }, { status: 404 });
    }

    // Update comment
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
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
    });

    return NextResponse.json({ comment });
  } catch (error) {
    console.error('Error updating comment:', error);
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
    const commentId = searchParams.get('commentId');

    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }

    // Check if user owns this comment or is admin
    const existingComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
        OR: [
          { userId: session.user.id },
          { user: { role: 'ADMIN' } }
        ]
      }
    });

    if (!existingComment) {
      return NextResponse.json({ error: 'Comment not found or access denied' }, { status: 404 });
    }

    // Delete comment and its replies
    await prisma.comment.deleteMany({
      where: {
        OR: [
          { id: commentId },
          { parentId: commentId }
        ]
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 