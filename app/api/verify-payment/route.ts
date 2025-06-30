import { NextResponse } from 'next/server'
import axios from 'axios'
import { envConfig } from '@/config/env.config'
import { prisma, handleDatabaseError } from '@/lib/db'

interface PaymentVerificationRequest {
  impUid: string
  merchantUid: string
  userId: string
  amount: number
}

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // Accept both camelCase and snake_case keys
    const body = await request.json();
    const impUid = body.impUid || body.imp_uid;
    const merchantUid = body.merchantUid || body.merchant_uid;
    const userId = body.userId;
    const expectedAmount = body.amount;
    
    if (!impUid || !merchantUid || !userId || !expectedAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    console.log(`[${new Date().toISOString()}] Payment verification attempt: userId=${userId}, amount=${expectedAmount}, impUid=${impUid}, merchantUid=${merchantUid}`);

    // Get access token from I'mport
    const accessTokenResponse = await axios.post(
      envConfig.payment.imp.accessTokenUrl,
      {
        imp_key: envConfig.payment.imp.key,
        imp_secret: envConfig.payment.imp.secret,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const accessToken = accessTokenResponse.data.response.access_token

    // Verify payment with I'mport
    const paymentResponse = await axios.get(
      `${envConfig.payment.imp.paymentVerifyUrl}/${impUid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const paymentData = paymentResponse.data.response

    // Verify payment amount and status
    if (paymentData.status !== 'paid') {
      console.log(`[${new Date().toISOString()}] Payment verification failed: userId=${userId}, impUid=${impUid}, status=${paymentData.status}`);
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Verify payment amount matches expected amount
    if (paymentData.amount !== expectedAmount) {
      console.log(`[${new Date().toISOString()}] Payment verification failed: userId=${userId}, impUid=${impUid} - amount mismatch (expected: ${expectedAmount}, actual: ${paymentData.amount})`);
      return NextResponse.json(
        { error: 'Payment amount mismatch' },
        { status: 400 }
      )
    }

    // Find the pending payment record for this user and amount
    const pendingPayment = await prisma.payment.findFirst({
      where: {
        userId,
        amount: expectedAmount,
        status: 'PENDING'
      }
    })

    if (!pendingPayment) {
      console.log(`[${new Date().toISOString()}] Payment verification failed: userId=${userId}, amount=${expectedAmount} - no pending payment found`);
      return NextResponse.json(
        { error: 'No pending payment found' },
        { status: 400 }
      )
    }

    // Update payment status to completed
    const result = await prisma.$transaction(async (tx: any) => {
      // Update payment record
      const payment = await tx.payment.update({
        where: { id: pendingPayment.id },
        data: {
          status: 'completed',
        },
      })

      // Update contract status to completed
      const contract = await tx.contract.findFirst({
        where: {
          userId,
          status: 'UPLOADED'
        }
      })

      if (contract) {
        await tx.contract.update({
          where: { id: contract.id },
          data: {
            status: 'COMPLETED',
            completedAt: new Date()
          }
        })
      }

      console.log(`[${new Date().toISOString()}] Payment verification success: userId=${userId}, amount=${expectedAmount}, impUid=${impUid}`);
      return { payment, contract }
    })

    // Notify user of payment success and link to contract analysis
    if (result.contract) {
      await prisma.notification.create({
        data: {
          userId: userId,
          type: 'success',
          title: '결제가 완료되었습니다',
          message: '계약서 분석 결과를 확인해보세요.',
          actionUrl: `/dashboard/contracts/${result.contract.id}`,
          actionText: '분석 결과 보기'
        }
      });
    }

    return NextResponse.json({
      success: true,
      payment: result.payment,
      contract: result.contract,
    })
  } catch (error) {
    try {
      const body = await request.json();
      const userId = body?.userId || 'unknown';
      const amount = body?.amount || 'unknown';
      const impUid = body?.impUid || 'unknown';
      console.log(`[${new Date().toISOString()}] Payment verification error: userId=${userId}, amount=${amount}, impUid=${impUid} - ${error}`);
    } catch {}
    console.error('Payment verification error:', error)
    handleDatabaseError(error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
} 