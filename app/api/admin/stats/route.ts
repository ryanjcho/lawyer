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

    // Get current date and first day of current month
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Fetch real statistics from database
    const [
      totalUsers,
      activeUsers,
      totalContracts,
      contractsThisMonth,
      completedContracts
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Active users (logged in within last 30 days)
      prisma.user.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Total contracts
      prisma.contract.count(),
      
      // Contracts this month
      prisma.contract.count({
        where: {
          uploadedAt: {
            gte: firstDayOfMonth
          }
        }
      }),
      
      // Completed contracts for processing time calculation
      prisma.contract.count({
        where: {
          status: 'COMPLETED',
          completedAt: {
            not: null
          }
        }
      })
    ])

    // Mock average processing time (would calculate from actual completedAt - uploadedAt in real app)
    const averageProcessingTime = completedContracts > 0 ? 2.3 : 0

    // Mock customer satisfaction (would come from ratings/reviews in a real app)
    const customerSatisfaction = 4.8

    const stats = {
      totalUsers,
      activeUsers,
      totalContracts,
      contractsThisMonth,
      averageProcessingTime,
      customerSatisfaction
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 