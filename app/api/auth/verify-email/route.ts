import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json();

    if (token) {
      // Verify email with token
      const verificationToken = await prisma.emailVerificationToken.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!verificationToken) {
        return NextResponse.json(
          { error: '유효하지 않은 인증 토큰입니다.' },
          { status: 400 }
        );
      }

      if (verificationToken.expires < new Date()) {
        return NextResponse.json(
          { error: '인증 토큰이 만료되었습니다.' },
          { status: 400 }
        );
      }

      // Update user's email verification status
      await prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      });

      // Delete the used token
      await prisma.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      });

      return NextResponse.json({ message: '이메일이 성공적으로 인증되었습니다.' });
    }

    if (email) {
      // Send verification email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: '해당 이메일로 등록된 사용자가 없습니다.' },
          { status: 404 }
        );
      }

      if (user.emailVerified) {
        return NextResponse.json(
          { error: '이미 인증된 이메일입니다.' },
          { status: 400 }
        );
      }

      // Generate verification token
      const token = randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Save token
      await prisma.emailVerificationToken.create({
        data: {
          token,
          userId: user.id,
          expires,
        },
      });

      // Send verification email
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: '이메일 인증',
        html: `
          <h1>이메일 인증</h1>
          <p>아래 링크를 클릭하여 이메일을 인증해주세요:</p>
          <a href="${verificationUrl}">이메일 인증하기</a>
          <p>이 링크는 24시간 동안 유효합니다.</p>
        `,
      });

      return NextResponse.json({
        message: '인증 이메일이 발송되었습니다.',
      });
    }

    return NextResponse.json(
      { error: '이메일 또는 토큰이 필요합니다.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: '이메일 인증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 