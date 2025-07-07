import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'
import { sendEmail } from '@/lib/email'
import { randomBytes } from 'crypto'
import { envConfig } from '@/config/env.config'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, token, password } = body

    // If token is provided, verify and reset password
    if (token) {
      const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true },
      })

      if (!resetToken || resetToken.expires < new Date()) {
        return NextResponse.json(
          { error: '유효하지 않거나 만료된 토큰입니다' },
          { status: 400 }
        )
      }

      const hashedPassword = await hash(password, 10)

      await prisma.$transaction([
        prisma.user.update({
          where: { id: resetToken.userId },
          data: { password: hashedPassword },
        }),
        prisma.passwordResetToken.delete({
          where: { id: resetToken.id },
        }),
      ])

      return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다' })
    }

    // If email is provided, send reset link
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        // Return success even if user doesn't exist to prevent email enumeration
        return NextResponse.json({
          message: '비밀번호 재설정 링크가 이메일로 전송되었습니다',
        })
      }

      // Generate reset token
      const token = randomBytes(32).toString('hex')
      const expires = new Date(Date.now() + 3600000) // 1 hour

      await prisma.passwordResetToken.create({
        data: {
          token,
          expires,
          userId: user.id,
        },
      })

      // Send reset email
      const resetUrl = `${envConfig.app.url}/reset-password?token=${token}`
      await sendEmail({
        to: user.email,
        subject: '비밀번호 재설정',
        html: `
          <p>안녕하세요,</p>
          <p>비밀번호 재설정을 요청하셨습니다. 아래 링크를 클릭하여 새 비밀번호를 설정하세요:</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>이 링크는 1시간 동안 유효합니다.</p>
          <p>비밀번호 재설정을 요청하지 않으셨다면 이 이메일을 무시하셔도 됩니다.</p>
        `,
      })

      return NextResponse.json({
        message: '비밀번호 재설정 링크가 이메일로 전송되었습니다',
      })
    }

    return NextResponse.json(
      { error: '이메일 또는 토큰이 필요합니다' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: '비밀번호 재설정 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
} 