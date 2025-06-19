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

    // Get users who are assigned as lawyers (have assigned contracts)
    const lawyers = await prisma.user.findMany({
      where: {
        assignedContracts: {
          some: {}
        }
      },
      include: {
        assignedContracts: {
          select: {
            id: true,
            status: true
          }
        }
      }
    })

    // If no assigned lawyers, create mock data for demonstration
    if (lawyers.length === 0) {
      const mockLawyers = [
        {
          id: '1',
          name: '김변호사',
          specialization: '기업법무',
          contractsReviewed: 156,
          averageRating: 4.9,
          status: 'available'
        },
        {
          id: '2',
          name: '박변호사',
          specialization: '지적재산권',
          contractsReviewed: 89,
          averageRating: 4.7,
          status: 'busy'
        },
        {
          id: '3',
          name: '이변호사',
          specialization: '국제거래',
          contractsReviewed: 234,
          averageRating: 4.8,
          status: 'available'
        }
      ]
      return NextResponse.json(mockLawyers)
    }

    const formattedLawyers = lawyers.map(lawyer => {
      const completedContracts = lawyer.assignedContracts.filter(c => c.status === 'COMPLETED').length
      const totalContracts = lawyer.assignedContracts.length
      
      return {
        id: lawyer.id,
        name: lawyer.name,
        specialization: '기업법무', // Would come from lawyer profile in real app
        contractsReviewed: completedContracts,
        averageRating: 4.8, // Would come from ratings in real app
        status: totalContracts > 0 ? 'busy' : 'available'
      }
    })

    return NextResponse.json(formattedLawyers)
  } catch (error) {
    console.error('Error fetching lawyers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST() {
  return NextResponse.json({ message: 'POST not implemented' })
} 