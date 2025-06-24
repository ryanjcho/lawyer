import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'
import { uploadToS3 } from '@/lib/s3'
import { VirusScanService } from '@/lib/virusScan'
import { envConfig } from '@/config/env.config'

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { planId, planName, amount, files } = await request.json()

    if (!planId || !planName || !amount || !files) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Mock analysis and quote calculation
    const mockRiskScore = Math.floor(Math.random() * 10) + 1;
    const mockRiskLevel = mockRiskScore >= 7 ? 'HIGH' : mockRiskScore >= 4 ? 'MEDIUM' : 'LOW';
    const mockQuote = 250000 + mockRiskScore * 25000; // e.g., 275,000 ~ 500,000
    const mockAnalysis = {
      riskScore: mockRiskScore,
      riskLevel: mockRiskLevel,
      quote: mockQuote,
      summary: 'This contract has been analyzed. Detailed issues and recommendations will be available after payment.'
    };

    // Create contract record
    const contract = await prisma.contract.create({
      data: {
        userId: session.user.id,
        fileName: files.map((f: any) => f.name).join(', '),
        fileUrl: '', // Will be updated when files are actually uploaded
        status: 'UPLOADED',
        analysisResult: mockAnalysis,
        quote: mockQuote,
        riskLevel: mockRiskLevel
      }
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: mockQuote,
        status: 'PENDING'
      }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: 'CONTRACT_UPLOADED',
        title: '계약서 업로드 완료',
        message: `견적이 산출되었습니다. 결제를 진행해 주세요.`,
        actionUrl: `/dashboard/contracts/${contract.id}`
      }
    });

    return NextResponse.json({
      success: true,
      contractId: contract.id,
      analysis: mockAnalysis,
      quote: mockQuote,
      paymentId: payment.id
    });

  } catch (error) {
    console.error('Contract upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 