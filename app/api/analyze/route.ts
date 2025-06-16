import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: '계약서 내용이 제공되지 않았습니다.' },
        { status: 400 }
      )
    }

    const prompt = `
다음 계약서를 분석하여 법률 용어와 검토 의견을 제공해주세요.
계약서 내용:
${text}

다음 형식으로 JSON 응답을 제공해주세요:
{
  "terms": [
    {
      "term": "법률 용어",
      "explanation": "용어 설명"
    }
  ],
  "suggestions": [
    "검토 의견 1",
    "검토 의견 2"
  ]
}

법률 용어는 계약서에서 발견된 중요한 법률 용어를 찾아 설명해주세요.
검토 의견은 계약서의 잠재적인 문제점이나 개선이 필요한 부분에 대한 의견을 제공해주세요.
`

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '당신은 법률 전문가입니다. 계약서를 분석하고 법률 용어를 설명하며, 개선이 필요한 부분에 대한 의견을 제공합니다.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' }
    })

    const response = JSON.parse(completion.choices[0].message.content || '{}')

    return NextResponse.json(response)
  } catch (error) {
    console.error('계약서 분석 중 오류 발생:', error)
    return NextResponse.json(
      { error: '계약서 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 