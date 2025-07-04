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
    console.log('Payment creation started')
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      console.log('No session found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Session found for user:', session.user.id)

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      console.log('User not found in database')
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log('User verified in database')

    const { amount, files, analysis } = await request.json()
    console.log('Request data:', { amount, filesCount: files?.length, hasAnalysis: !!analysis })

    if (!amount || !files) {
      console.log('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Creating contract record...')
    // Create contract record with the analysis from upload page
    const contract = await prisma.contract.create({
      data: {
        userId: session.user.id,
        fileName: files.map((f: any) => f.name).join(', '),
        fileUrl: '', // Will be updated when files are actually uploaded
        status: 'UPLOADED',
        analysisResult: analysis || {},
        riskLevel: analysis?.riskLevel || 'MEDIUM'
      }
    });
    console.log('Contract created:', contract.id)

    console.log('Creating payment record...')
    // Create payment record directly with the quoted amount
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: amount,
        status: 'PENDING'
      }
    });
    console.log('Payment created:', payment.id)

    console.log('Creating notification...')
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
    console.log('Notification created')

    console.log('Payment creation completed successfully')
    return NextResponse.json({
      success: true,
      contractId: contract.id,
      paymentId: payment.id
    });

  } catch (error) {
    console.error('Contract upload error:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
} 