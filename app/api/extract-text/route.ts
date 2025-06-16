import { NextRequest, NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다.' },
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'PDF 파일만 지원됩니다.' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const data = await pdfParse(buffer)
    
    return NextResponse.json({ text: data.text })
  } catch (error) {
    console.error('PDF 처리 중 오류 발생:', error)
    return NextResponse.json(
      { error: 'PDF 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 