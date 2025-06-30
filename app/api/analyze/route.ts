import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { envConfig } from '@/config/env.config'

export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: envConfig.openai.apiKey,
})

export async function GET() {
  return NextResponse.json({ message: 'Analyze API placeholder' })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'POST not implemented' })
} 