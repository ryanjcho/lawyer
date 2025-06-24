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

    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('id');

    if (contractId) {
      // Fetch a single contract by ID
      const contract = await prisma.contract.findFirst({
        where: {
          id: contractId,
          userId: session.user.id
        },
        include: {
          assignedLawyer: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      if (!contract) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      const analysisResult = contract.analysisResult ? contract.analysisResult as any : {};
      const planName = analysisResult.planName || 'Unknown';
      const planId = analysisResult.planId || 'unknown';
      let planType = 'BASIC';
      if (planId.includes('professional')) {
        planType = 'PROFESSIONAL';
      } else if (planId.includes('enterprise')) {
        planType = 'ENTERPRISE';
      }
      const amount = analysisResult.amount || 300000;
      const mockAnalysisResult = {
        riskScore: contract.riskLevel === 'LOW' ? 25 : contract.riskLevel === 'MEDIUM' ? 65 : 85,
        issuesFound: contract.riskLevel === 'LOW' ? 1 : contract.riskLevel === 'MEDIUM' ? 3 : 7,
        recommendations: contract.riskLevel === 'LOW' ? 2 : contract.riskLevel === 'MEDIUM' ? 5 : 8,
        ...analysisResult
      };
      const formatted = {
        id: contract.id,
        title: contract.fileName || `${planName} 계약서 검토`,
        status: contract.status.toUpperCase(),
        planType: planType,
        amount: amount,
        createdAt: contract.uploadedAt.toISOString(),
        updatedAt: contract.updatedAt.toISOString(),
        riskLevel: contract.riskLevel?.toLowerCase() || 'unknown',
        fileSize: 1024000, // Mock file size
        analysisResult: mockAnalysisResult,
        assignedLawyer: contract.assignedLawyer?.name || 'Unassigned',
        fileUrl: contract.fileUrl || ''
      };
      return NextResponse.json({ contract: formatted });
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
      // Extract plan information from analysisResult
      const analysisResult = contract.analysisResult ? contract.analysisResult as any : {}
      const planName = analysisResult.planName || 'Unknown'
      const planId = analysisResult.planId || 'unknown'
      
      // Determine plan type from planId
      let planType = 'BASIC'
      if (planId.includes('professional')) {
        planType = 'PROFESSIONAL'
      } else if (planId.includes('enterprise')) {
        planType = 'ENTERPRISE'
      }

      // Get amount from analysisResult or use default
      const amount = analysisResult.amount || 300000

      // Mock analysis result for now (would come from AI analysis in real app)
      const mockAnalysisResult = {
        riskScore: contract.riskLevel === 'LOW' ? 25 : contract.riskLevel === 'MEDIUM' ? 65 : 85,
        issuesFound: contract.riskLevel === 'LOW' ? 1 : contract.riskLevel === 'MEDIUM' ? 3 : 7,
        recommendations: contract.riskLevel === 'LOW' ? 2 : contract.riskLevel === 'MEDIUM' ? 5 : 8,
        ...analysisResult
      }

      return {
        id: contract.id,
        title: contract.fileName || `${planName} 계약서 검토`,
        status: contract.status.toUpperCase(),
        planType: planType,
        amount: amount,
        createdAt: contract.uploadedAt.toISOString(),
        updatedAt: contract.updatedAt.toISOString(),
        riskLevel: contract.riskLevel?.toLowerCase() || 'unknown',
        fileSize: 1024000, // Mock file size
        analysisResult: mockAnalysisResult,
        assignedLawyer: contract.assignedLawyer?.name || 'Unassigned'
      }
    })

    return NextResponse.json({ contracts: formattedContracts })
  } catch (error) {
    console.error('Error fetching user contracts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 