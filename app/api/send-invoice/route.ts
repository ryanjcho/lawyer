import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get('email') as string;
    const pdfFile = formData.get('pdf') as File;
    if (!email || !pdfFile) {
      return NextResponse.json({ error: '이메일과 PDF가 필요합니다.' }, { status: 400 });
    }
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    await sendEmail({
      to: email,
      subject: '계약서 검토 견적서',
      html: `<p>첨부된 파일에서 계약서 검토 견적서를 확인하실 수 있습니다.</p>`,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '이메일 전송에 실패했습니다.' }, { status: 500 });
  }
} 