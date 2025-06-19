import { NextResponse } from 'next/server'
import axios from 'axios'
import { env } from '@/lib/env'
import { prisma, handleDatabaseError } from '@/lib/db'

// I'mport API configuration
const IMP_KEY = process.env.IMP_KEY
const IMP_SECRET = process.env.IMP_SECRET
const IMP_ACCESS_TOKEN_URL = 'https://api.iamport.kr/users/getToken'
const IMP_PAYMENT_VERIFY_URL = 'https://api.iamport.kr/payments/'

interface PaymentVerificationRequest {
  impUid: string
  merchantUid: string
  userId: string
  planId: string
}

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // Accept both camelCase and snake_case keys
    const body = await request.json();
    const impUid = body.impUid || body.imp_uid;
    const merchantUid = body.merchantUid || body.merchant_uid;
    const userId = body.userId;
    const planId = body.planId;
    if (!impUid || !merchantUid || !userId || !planId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    console.log(`[${new Date().toISOString()}] Payment verification attempt: userId=${userId}, planId=${planId}, impUid=${impUid}, merchantUid=${merchantUid}`);

    // Get access token from I'mport
    const accessTokenResponse = await axios.post(
      env.IMP_ACCESS_TOKEN_URL,
      {
        imp_key: env.IMP_KEY,
        imp_secret: env.IMP_SECRET,
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
      `${env.IMP_PAYMENT_VERIFY_URL}/${impUid}`,
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

    // Get plan details
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      console.log(`[${new Date().toISOString()}] Payment verification failed: userId=${userId}, planId=${planId} - invalid plan`);
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    if (paymentData.amount !== plan.price) {
      console.log(`[${new Date().toISOString()}] Payment verification failed: userId=${userId}, impUid=${impUid} - amount mismatch`);
      return NextResponse.json(
        { error: 'Payment amount mismatch' },
        { status: 400 }
      )
    }

    // Create payment record and update subscription
    const result = await prisma.$transaction(async (tx: any) => {
      // Create payment record
      const payment = await tx.payment.create({
        data: {
          userId,
          planId,
          amount: paymentData.amount,
          status: 'completed',
        },
      })

      // Calculate subscription dates
      const startDate = new Date()
      const endDate = new Date()
      if (plan.type === 'BASIC') {
        endDate.setMonth(endDate.getMonth() + 1)
      } else if (plan.type === 'PROFESSIONAL') {
        endDate.setFullYear(endDate.getFullYear() + 1)
      } else if (plan.type === 'ENTERPRISE') {
        endDate.setFullYear(endDate.getFullYear() + 2)
      }

      // Update or create subscription
      const subscription = await tx.subscription.upsert({
        where: {
          userId_planId: {
            userId,
            planId,
          },
        },
        create: {
          userId,
          planId,
          status: 'ACTIVE',
          startDate,
          endDate,
        },
        update: {
          status: 'ACTIVE',
          startDate,
          endDate,
        },
      })

      console.log(`[${new Date().toISOString()}] Payment verification success: userId=${userId}, planId=${planId}, impUid=${impUid}`);
      return { payment, subscription }
    })

    return NextResponse.json({
      success: true,
      payment: result.payment,
      subscription: result.subscription,
    })
  } catch (error) {
    try {
      const body = await request.json();
      const userId = body?.userId || 'unknown';
      const planId = body?.planId || 'unknown';
      const impUid = body?.impUid || 'unknown';
      console.log(`[${new Date().toISOString()}] Payment verification error: userId=${userId}, planId=${planId}, impUid=${impUid} - ${error}`);
    } catch {}
    console.error('Payment verification error:', error)
    handleDatabaseError(error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
} 