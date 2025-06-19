import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  return NextResponse.json({ message: 'Analyze API placeholder' })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'POST not implemented' })
} 