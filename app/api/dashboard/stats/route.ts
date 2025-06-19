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

    // Get current date and first day of current month
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // Fetch user's contracts and calculate stats
    const [
      totalContracts,
      contractsThisMonth,
      completedContracts,
      contractsWithRiskLevel
    ] = await Promise.all([
      // Total contracts
      prisma.contract.count({
        where: {
          userId: session.user.id
        }
      }),
      
      // Contracts this month
      prisma.contract.count({
        where: {
          userId: session.user.id,
          uploadedAt: {
            gte: firstDayOfMonth
          }
        }
      }),
      
      // Completed contracts for processing time calculation
      prisma.contract.findMany({
        where: {
          userId: session.user.id,
          status: 'COMPLETED',
          completedAt: {
            not: null
          }
        },
        select: {
          uploadedAt: true,
          completedAt: true
        }
      }),
      
      // Contracts with risk levels for average calculation
      prisma.contract.findMany({
        where: {
          userId: session.user.id,
          riskLevel: {
            not: null
          }
        },
        select: {
          riskLevel: true,
          analysisResult: true
        }
      })
    ])

    // Calculate average processing time
    let averageProcessingTime = 0
    if (completedContracts.length > 0) {
      const totalTime = completedContracts.reduce((sum, contract) => {
        const uploadTime = new Date(contract.uploadedAt).getTime()
        const completeTime = new Date(contract.completedAt!).getTime()
        return sum + (completeTime - uploadTime)
      }, 0)
      averageProcessingTime = totalTime / completedContracts.length / (1000 * 60 * 60) // Convert to hours
    }

    // Calculate average risk score and total issues
    let averageRiskScore = 0
    let totalIssuesFound = 0

    if (contractsWithRiskLevel.length > 0) {
      const riskScores = contractsWithRiskLevel.map(contract => {
        if (contract.analysisResult) {
          const analysis = contract.analysisResult as any
          totalIssuesFound += analysis.issuesFound || 0
          return analysis.riskScore || 0
        }
        // Fallback based on risk level
        switch (contract.riskLevel) {
          case 'LOW': return 25
          case 'MEDIUM': return 65
          case 'HIGH': return 85
          case 'CRITICAL': return 95
          default: return 50
        }
      })
      averageRiskScore = riskScores.reduce((sum, score) => sum + score, 0) / riskScores.length
    }

    const stats = {
      totalContracts,
      contractsThisMonth,
      averageRiskScore: Math.round(averageRiskScore),
      totalIssuesFound,
      processingTime: Math.round(averageProcessingTime * 10) / 10 // Round to 1 decimal place
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 