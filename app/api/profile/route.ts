import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import { prisma } from '@/lib/prisma'

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      phone: true,
      image: true
    }
  })
  return NextResponse.json(user)
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { name, company, phone, image } = await request.json()
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, company, phone, image }
  })
  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
      phone: user.phone,
      image: user.image
    }
  })
} 