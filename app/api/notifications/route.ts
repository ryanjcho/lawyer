import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/notifications - fetch current user's notifications
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ notifications });
}

// POST /api/notifications - create a notification for current user (for testing/demo)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { type, title, message, actionUrl, actionText } = await request.json();
  const notification = await prisma.notification.create({
    data: {
      userId: session.user.id,
      type,
      title,
      message,
      actionUrl,
      actionText,
    },
  });
  return NextResponse.json({ notification });
}

// PUT /api/notifications - mark a notification as read
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await request.json();
  const notification = await prisma.notification.update({
    where: { id },
    data: { read: true },
  });
  return NextResponse.json({ notification });
} 