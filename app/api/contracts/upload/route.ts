import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'
import { uploadToS3 } from '@/lib/s3'
import { VirusScanService } from '@/lib/virusScan'
import { envConfig } from '@/config/env.config'
import { RiskLevel } from '@prisma/client'

export const dynamic = "force-dynamic";

// Map riskLevel to enum value
function toRiskLevelEnum(val: any): RiskLevel {
  if (!val) return RiskLevel.MEDIUM;
  if (typeof val !== 'string') return RiskLevel.MEDIUM;
  const map: Record<string, RiskLevel> = {
    '낮음': RiskLevel.LOW,
    'low': RiskLevel.LOW,
    '보통': RiskLevel.MEDIUM,
    'medium': RiskLevel.MEDIUM,
    '중간': RiskLevel.MEDIUM,
    '높음': RiskLevel.HIGH,
    'high': RiskLevel.HIGH,
    '위험': RiskLevel.CRITICAL,
    'critical': RiskLevel.CRITICAL,
  };
  return map[val.toLowerCase()] || RiskLevel.MEDIUM;
}

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

    const { amount, files, analysis } = await request.json()

    if (!amount || !files) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create contract record with the analysis from upload page
    const contract = await prisma.contract.create({
      data: {
        userId: session.user.id,
        fileName: files.map((f: any) => f.name).join(', '),
        fileUrl: '', // Will be updated when files are actually uploaded
        status: 'UPLOADED',
        analysisResult: analysis || {},
        riskLevel: toRiskLevelEnum(analysis?.riskLevel)
      }
    });

    // Create payment record directly with the quoted amount
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: amount,
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
        actionUrl: `/dashboard/contracts/${contract.id}`,
        actionText: '계약서 보기'
      }
    });

    // Create audit log for contract upload
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'UPLOAD_CONTRACT',
        details: `Uploaded contract(s): ${files.map((f: any) => f.name).join(', ')}`
      }
    });

    // Create audit log for payment creation
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'CREATE_PAYMENT',
        details: `Created payment (ID: ${payment.id}) for contract (ID: ${contract.id}), amount: ${amount}`
      }
    });

    return NextResponse.json({
      success: true,
      contractId: contract.id,
      paymentId: payment.id
    });

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
} 