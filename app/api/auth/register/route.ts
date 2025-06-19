import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/email';

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ message: 'Auth register API placeholder' })
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '이름, 이메일, 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 등록된 이메일입니다.' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate verification token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save verification token
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
        <p>안녕하세요, ${user.name}님!</p>
        <p>아래 링크를 클릭하여 이메일을 인증해주세요:</p>
        <a href="${verificationUrl}">이메일 인증하기</a>
        <p>이 링크는 24시간 동안 유효합니다.</p>
      `,
    });

    return NextResponse.json({
      message: '회원가입이 완료되었습니다. 이메일을 확인하여 인증을 완료해주세요.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 