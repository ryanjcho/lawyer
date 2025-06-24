import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { contractId, status, analysisResult, riskLevel } = await request.json()

    if (!contractId || !status) {
      return NextResponse.json({ error: 'Contract ID and status are required' }, { status: 400 })
    }

    // Verify contract exists and user has permission
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { 
        user: true,
        assignedLawyer: true
      }
    })

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }

    // Check if user is the assigned lawyer or admin
    const isAssignedLawyer = contract.assignedLawyerId === session.user.id
    const isAdmin = session.user.role === 'ADMIN'
    const isContractOwner = contract.userId === session.user.id

    if (!isAssignedLawyer && !isAdmin && !isContractOwner) {
      return NextResponse.json({ error: 'Unauthorized to update this contract' }, { status: 403 })
    }

    // Prepare update data
    const updateData: any = {
      status: status.toUpperCase(),
      updatedAt: new Date()
    }

    // Add completion time if status is COMPLETED
    if (status.toUpperCase() === 'COMPLETED') {
      updateData.completedAt = new Date()
    }

    // Add analysis result if provided
    if (analysisResult) {
      updateData.analysisResult = analysisResult
    }

    // Add risk level if provided
    if (riskLevel) {
      updateData.riskLevel = riskLevel.toUpperCase()
    }

    // Update contract
    const updatedContract = await prisma.contract.update({
      where: { id: contractId },
      data: updateData,
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

    // Notify user of contract status change
    await prisma.notification.create({
      data: {
        userId: updatedContract.userId,
        type: 'info',
        title: '계약서 상태 변경',
        message: `계약서 상태가 '${updatedContract.status}'(으)로 변경되었습니다.`,
        actionUrl: `/dashboard/contracts/${updatedContract.id}`,
        actionText: '상태 확인'
      }
    });

    return NextResponse.json({
      success: true,
      contract: {
        id: updatedContract.id,
        fileName: updatedContract.fileName,
        status: updatedContract.status,
        riskLevel: updatedContract.riskLevel,
        completedAt: updatedContract.completedAt,
        assignedLawyer: updatedContract.assignedLawyer?.name,
        user: updatedContract.user.name
      }
    })
  } catch (error) {
    console.error('Error updating contract status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 