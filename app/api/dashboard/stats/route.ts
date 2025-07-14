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

    // Fetch user's contracts
    const contracts = await prisma.contract.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        uploadedAt: 'desc'
      }
    })

    // Calculate basic stats
    const totalContracts = contracts.length
    const completedContracts = contracts.filter(c => c.status === 'COMPLETED').length
    const pendingContracts = contracts.filter(c => c.status !== 'COMPLETED').length

    // Calculate total spent (mock calculation based on risk levels)
    const totalSpent = contracts.reduce((sum, contract) => {
      const baseAmount = 300000 // Base analysis cost
      const riskLevel = contract.riskLevel?.toLowerCase() || 'low'
      const riskMultiplier = riskLevel === 'low' || riskLevel === '낮음' ? 1 : 
                            riskLevel === 'medium' || riskLevel === '보통' ? 1.5 : 
                            riskLevel === 'high' || riskLevel === '높음' ? 2 : 3
      return sum + (baseAmount * riskMultiplier)
    }, 0)

    // Calculate average processing time (mock)
    const averageProcessingTime = 2.3

    // Calculate risk distribution
    const riskDistribution = {
      low: contracts.filter(c => {
        const risk = c.riskLevel?.toLowerCase()
        return risk === 'low' || risk === '낮음'
      }).length,
      medium: contracts.filter(c => {
        const risk = c.riskLevel?.toLowerCase()
        return risk === 'medium' || risk === '보통'
      }).length,
      high: contracts.filter(c => {
        const risk = c.riskLevel?.toLowerCase()
        return risk === 'high' || risk === '높음'
      }).length,
      critical: contracts.filter(c => {
        const risk = c.riskLevel?.toLowerCase()
        return risk === 'critical' || risk === '위험'
      }).length
    }

    // Generate monthly trends (mock data based on actual contracts)
    const monthlyTrends = [
      { month: 'Jan', contracts: 8, spending: 4200000, avgRisk: 2.1 },
      { month: 'Feb', contracts: 12, spending: 6300000, avgRisk: 1.8 },
      { month: 'Mar', contracts: 15, spending: 7800000, avgRisk: 2.3 },
      { month: 'Apr', contracts: 12, spending: 10170000, avgRisk: 1.9 }
    ]

    // Proprietary database insights (mock data)
    const proprietaryInsights = {
      marketBenchmark: 15, // % above market average
      riskPrediction: 87, // % accuracy
      costSavings: 23, // % savings vs traditional methods
      similarContracts: 1247 // number of similar contracts in database
    }

    const stats = {
      totalContracts,
      completedContracts,
      pendingContracts,
      totalSpent,
      averageProcessingTime,
      riskDistribution,
      monthlyTrends,
      proprietaryInsights
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 