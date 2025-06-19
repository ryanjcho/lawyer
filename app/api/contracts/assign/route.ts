import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'

export async function GET() {
  return NextResponse.json({ message: 'Contracts assign API placeholder' })
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { contractId, lawyerId } = await request.json()

    if (!contractId || !lawyerId) {
      return NextResponse.json({ error: 'Contract ID and Lawyer ID are required' }, { status: 400 })
    }

    // Verify contract exists
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { user: true }
    })

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    // Verify lawyer exists
    const lawyer = await prisma.user.findUnique({
      where: { id: lawyerId }
    })

    if (!lawyer) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 })
    }

    // Update contract with assignment and change status to REVIEW
    const updatedContract = await prisma.contract.update({
      where: { id: contractId },
      data: {
        assignedLawyerId: lawyerId,
        status: 'REVIEW',
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        assignedLawyer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Audit log: contract assignment
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'ASSIGN_CONTRACT',
        details: `Contract ${contractId} assigned to lawyer ${lawyerId} by admin ${session.user.email}`
      }
    })

    return NextResponse.json({
      success: true,
      contract: {
        id: updatedContract.id,
        fileName: updatedContract.fileName,
        status: updatedContract.status,
        assignedLawyer: updatedContract.assignedLawyer?.name,
        user: updatedContract.user.name
      }
    })
  } catch (error) {
    console.error('Error assigning contract:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 