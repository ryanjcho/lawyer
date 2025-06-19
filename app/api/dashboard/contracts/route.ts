import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contracts = await prisma.contract.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        assignedLawyer: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        uploadedAt: 'desc'
      }
    })

    const formattedContracts = contracts.map(contract => {
      // Mock analysis result for now (would come from AI analysis in real app)
      const analysisResult = contract.analysisResult ? contract.analysisResult as any : {
        riskScore: contract.riskLevel === 'LOW' ? 25 : contract.riskLevel === 'MEDIUM' ? 65 : 85,
        issuesFound: contract.riskLevel === 'LOW' ? 1 : contract.riskLevel === 'MEDIUM' ? 3 : 7,
        recommendations: contract.riskLevel === 'LOW' ? 2 : contract.riskLevel === 'MEDIUM' ? 5 : 8
      }

      return {
        id: contract.id,
        name: contract.fileName,
        uploadedAt: contract.uploadedAt.toISOString(),
        status: contract.status.toLowerCase(),
        riskLevel: contract.riskLevel?.toLowerCase() || 'unknown',
        fileSize: 1024000, // Mock file size
        analysisResult,
        assignedLawyer: contract.assignedLawyer?.name || 'Unassigned'
      }
    })

    return NextResponse.json(formattedContracts)
  } catch (error) {
    console.error('Error fetching user contracts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 