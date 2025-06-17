import { NextResponse } from 'next/server'
import axios from 'axios'
import { env } from '@/lib/env'
import { prisma, handleDatabaseError } from '@/lib/db'
import type { Prisma } from '@prisma/client'

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

export async function POST(request: Request) {
  try {
    const { impUid, merchantUid, userId, planId } = await request.json() as PaymentVerificationRequest

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
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

    if (paymentData.amount !== plan.price) {
      return NextResponse.json(
        { error: 'Payment amount mismatch' },
        { status: 400 }
      )
    }

    // Create payment record and update subscription
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create payment record
      const payment = await tx.payment.create({
        data: {
          userId,
          planId,
          amount: paymentData.amount,
          status: 'completed',
          impUid,
          merchantUid,
        },
      })

      // Calculate subscription dates
      const startDate = new Date()
      const endDate = new Date()
      if (plan.type === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1)
      } else if (plan.type === 'yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1)
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
          status: 'active',
          startDate,
          endDate,
        },
        update: {
          status: 'active',
          startDate,
          endDate,
        },
      })

      return { payment, subscription }
    })

    return NextResponse.json({
      success: true,
      payment: result.payment,
      subscription: result.subscription,
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    handleDatabaseError(error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
} 