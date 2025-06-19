import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      include: {
        subscriptions: {
          include: {
            plan: true
          }
        },
        contracts: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) as Array<{
      id: string;
      name: string | null;
      email: string | null;
      subscriptions: Array<{
        status: string;
        plan: { name: string };
      }>;
      contracts: Array<{ id: string }>;
      updatedAt: Date;
    }>;

    const formattedUsers = users.map(user => {
      const activeSubscription = user.subscriptions.find((sub: { status: string }) => sub.status === 'ACTIVE');
      const contractsCount = user.contracts.length;
      
      // Determine user status based on last activity
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const isActive = user.updatedAt > thirtyDaysAgo
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        company: 'N/A', // Would come from user profile in real app
        subscription: activeSubscription?.plan.name || 'No Subscription',
        status: isActive ? 'active' : 'inactive',
        lastLogin: user.updatedAt.toISOString(),
        contractsAnalyzed: contractsCount
      }
    })

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 