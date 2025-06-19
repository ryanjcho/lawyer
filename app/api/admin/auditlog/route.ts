import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/admin/auditlog - fetch latest 100 audit logs (admin only)
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { user: { select: { email: true, name: true } } },
  });
  return NextResponse.json({ logs });
}

// POST /api/admin/auditlog - create a new audit log entry
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { action, details } = await request.json();
  const log = await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action,
      details,
    },
  });
  return NextResponse.json({ log });
} 