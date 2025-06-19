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

    const contracts = await prisma.contract.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        assignedLawyer: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        uploadedAt: 'desc'
      }
    })

    const formattedContracts = contracts.map(contract => ({
      id: contract.id,
      fileName: contract.fileName,
      user: `${contract.user.name} (${contract.user.email})`,
      status: contract.status.toLowerCase(),
      riskLevel: contract.riskLevel?.toLowerCase() || 'unknown',
      uploadedAt: contract.uploadedAt.toISOString(),
      completedAt: contract.completedAt?.toISOString(),
      assignedLawyer: contract.assignedLawyer?.name || 'Unassigned'
    }))

    return NextResponse.json(formattedContracts)
  } catch (error) {
    console.error('Error fetching contracts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 