'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { jsPDF } from 'jspdf'

export default function ReviewPage() {
  const searchParams = useSearchParams()
  const [contractText, setContractText] = useState('')
  const [analysis, setAnalysis] = useState<{
    terms: { term: string; explanation: string }[]
    suggestions: string[]
  } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const text = searchParams.get('text')
    if (text) {
      setContractText(decodeURIComponent(text))
    }
  }, [searchParams])

  const handleAnalyze = async () => {
    if (!contractText.trim()) {
      alert('계약서 내용을 입력해주세요.')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: contractText }),
      })

      if (!response.ok) {
        throw new Error('계약서 분석 중 오류가 발생했습니다.')
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDownloadPDF = () => {
    if (!analysis) return

    const doc = new jsPDF()
    const margin = 20
    let y = margin

    // 제목
    doc.setFontSize(20)
    doc.text('계약서 검토 결과', margin, y)
    y += 20

    // 법률 용어 설명
    doc.setFontSize(16)
    doc.text('법률 용어 설명', margin, y)
    y += 10

    doc.setFontSize(12)
    analysis.terms.forEach((term) => {
      if (y > 270) {
        doc.addPage()
        y = margin
      }
      doc.setFont('helvetica', 'bold')
      doc.text(term.term, margin, y)
      y += 7
      doc.setFont('helvetica', 'normal')
      const lines = doc.splitTextToSize(term.explanation, 170)
      doc.text(lines, margin, y)
      y += lines.length * 7 + 5
    })

    // 검토 의견
    if (y > 250) {
      doc.addPage()
      y = margin
    }
    doc.setFontSize(16)
    doc.text('검토 의견', margin, y)
    y += 10

    doc.setFontSize(12)
    analysis.suggestions.forEach((suggestion) => {
      if (y > 270) {
        doc.addPage()
        y = margin
      }
      doc.text(`• ${suggestion}`, margin, y)
      y += 10
    })

    doc.save('계약서_검토_결과.pdf')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">계약서 검토</h1>
          <div className="space-x-4">
            {analysis && (
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                PDF 다운로드
              </button>
            )}
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              홈으로
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">계약서 내용</h2>
            <textarea
              className="w-full h-[500px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="계약서 내용을 입력하거나 붙여넣기 하세요..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAnalyzing ? '분석 중...' : '분석하기'}
            </button>
            {error && (
              <p className="mt-4 text-red-600">{error}</p>
            )}
          </div>

          <div className="space-y-6">
            {analysis && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">법률 용어 설명</h2>
                  <div className="space-y-4">
                    {analysis.terms.map((term, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <h3 className="font-medium text-gray-800">{term.term}</h3>
                        <p className="text-gray-600 mt-1">{term.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">검토 의견</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-gray-600">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 