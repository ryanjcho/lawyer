'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AnalysisResults from '../components/AnalysisResults'
import jsPDF from 'jspdf'
import { GeistMono } from "geist/font/mono"

interface Issue {
  id: string
  category: 'legal' | 'financial' | 'operational' | 'compliance' | 'risk'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  location: string
  recommendation: string
  impact: string
}

interface Recommendation {
  id: string
  priority: 'low' | 'medium' | 'high'
  title: string
  description: string
  action: string
  estimatedTime: string
  cost: string
}

interface AnalysisResult {
  contractId: string
  contractName: string
  analysisDate: string
  overallRiskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  totalIssues: number
  totalRecommendations: number
  processingTime: number
  issues: Issue[]
  recommendations: Recommendation[]
  summary: string
  legalReviewer?: string
  reviewDate?: string
}

function ReviewContent() {
  const searchParams = useSearchParams()
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const contractId = searchParams.get('id')
    
    if (contractId) {
      setStep(0)
      setTimeout(() => {
        const mockResult: AnalysisResult = {
          contractId: contractId,
          contractName: '서비스 제공 계약서.pdf',
          analysisDate: new Date().toISOString(),
          overallRiskScore: 65,
          riskLevel: 'medium',
          totalIssues: 3,
          totalRecommendations: 5,
          processingTime: 2.5,
          issues: [
            {
              id: '1',
              category: 'legal',
              severity: 'high',
              title: '손해배상 조항의 불균형',
              description: '계약 제8조의 손해배상 조항에서 상대방에게 과도한 책임을 지우는 내용이 포함되어 있습니다.',
              location: '제8조 손해배상',
              recommendation: '손해배상 조항을 상호 균형있게 수정하여 양측의 책임을 공정하게 분배하는 것을 권장합니다.',
              impact: '계약 불이행 시 과도한 손해배상 책임을 질 수 있습니다.'
            },
            {
              id: '2',
              category: 'financial',
              severity: 'medium',
              title: '지급 조건의 모호함',
              description: '계약 제5조의 대금 지급 조건이 명확하지 않아 향후 분쟁의 소지가 있습니다.',
              location: '제5조 대금 지급',
              recommendation: '지급 시기, 방법, 조건을 구체적으로 명시하여 분쟁을 예방하는 것이 좋습니다.',
              impact: '대금 지급 시점과 방법에 대한 분쟁이 발생할 수 있습니다.'
            },
            {
              id: '3',
              category: 'compliance',
              severity: 'low',
              title: '개인정보 처리 조항 부재',
              description: '개인정보를 처리하는 내용이 포함되어 있으나 개인정보 처리에 대한 조항이 없습니다.',
              location: '전체 계약서',
              recommendation: '개인정보보호법에 따른 개인정보 처리 조항을 추가하는 것을 권장합니다.',
              impact: '개인정보보호법 위반으로 인한 제재를 받을 수 있습니다.'
            }
          ],
          recommendations: [
            {
              id: '1',
              priority: 'high',
              title: '손해배상 조항 개정',
              description: '상호 균형있는 손해배상 조항으로 수정하여 양측의 책임을 공정하게 분배합니다.',
              action: '계약 제8조를 상호 균형있는 내용으로 수정하고, 손해배상 한도를 명시합니다.',
              estimatedTime: '1-2일',
              cost: '변호사 상담비 30만원'
            },
            {
              id: '2',
              priority: 'medium',
              title: '지급 조건 구체화',
              description: '대금 지급 조건을 구체적으로 명시하여 향후 분쟁을 예방합니다.',
              action: '계약 제5조에 지급 시기, 방법, 조건을 구체적으로 명시합니다.',
              estimatedTime: '1일',
              cost: '변호사 상담비 20만원'
            },
            {
              id: '3',
              priority: 'low',
              title: '개인정보 처리 조항 추가',
              description: '개인정보보호법에 따른 개인정보 처리 조항을 추가합니다.',
              action: '개인정보 수집·이용 목적, 보유기간, 파기방법 등을 명시한 조항을 추가합니다.',
              estimatedTime: '1일',
              cost: '변호사 상담비 15만원'
            }
          ],
          summary: '전반적으로 계약서의 기본 구조는 양호하나, 손해배상 조항의 불균형과 지급 조건의 모호함이 주요 개선점으로 지적됩니다. 개인정보 처리 조항 추가도 권장됩니다.',
          legalReviewer: '김민수 변호사',
          reviewDate: new Date().toISOString()
        }
        setAnalysisResult(mockResult)
        setIsLoading(false)
        setStep(1)
      }, 2000)
    } else {
      setError('계약서 ID가 제공되지 않았습니다.')
      setIsLoading(false)
    }
  }, [searchParams])

  // Add handlers for PDF export and share
  const handleExportPDF = () => {
    if (!analysisResult) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('LawScan 계약서 분석 결과', 20, 20);
    doc.setFontSize(12);
    doc.text(`파일명: ${analysisResult.contractName}`, 20, 35);
    doc.text(`분석 일시: ${new Date(analysisResult.analysisDate).toLocaleString()}`, 20, 45);
    doc.text(`리스크 점수: ${analysisResult.overallRiskScore} (${analysisResult.riskLevel})`, 20, 55);
    doc.text(`이슈 개수: ${analysisResult.totalIssues}`, 20, 65);
    doc.text(`주요 요약:`, 20, 75);
    doc.text(analysisResult.summary, 20, 85, { maxWidth: 170 });
    doc.text('주요 이슈:', 20, 105);
    analysisResult.issues.forEach((issue, idx) => {
      doc.text(`${idx + 1}. [${issue.severity}] ${issue.title}`, 20, 115 + idx * 10, { maxWidth: 170 });
    });
    doc.save('lawscan-analysis.pdf');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LawScan 계약서 분석 결과',
          url,
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('링크가 복사되었습니다!');
      } catch (e) {
        alert('링크 복사에 실패했습니다.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">분석 결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">오류</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/trial"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            새 계약서 분석하기
          </Link>
        </div>
      </div>
    )
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">분석 결과를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">
            요청하신 계약서의 분석 결과를 찾을 수 없습니다.
          </p>
          <Link
            href="/trial"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            새 계약서 분석하기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">계약서 분석 결과</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleExportPDF} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF 다운로드
              </button>
              <button onClick={handleShare} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                공유하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator - 3-stepper */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Debug: show step state */}
          <div className="text-xs text-gray-400 mb-2">step: {step}</div>
          {(() => {
            // Step logic: 0 = 업로드 완료(Upload Complete), 1 = 미리보기(Preview), 2 = 결제 및 완료(Payment)
            const steps = [
              { label: '업로드 완료', complete: step > 0, current: step === 0 },
              { label: '미리보기', complete: step >= 1, current: false }, // never current
              { label: '결제 및 완료', complete: step > 2, current: step === 2 },
            ];
            console.log('Stepper state:', steps);
            let progress = '0%';
            if (step === 2) progress = '100%';
            else if (step === 1) progress = '50%';
            return (
              <>
                <div className="flex items-center justify-between">
                  {steps.map((stepObj, idx) => {
                    // Only one branch can be true at a time
                    let icon, bgColor, labelColor;
                    if (stepObj.complete) {
                      icon = (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
                        </svg>
                      );
                      bgColor = 'bg-green-600';
                      labelColor = 'text-green-600';
                    } else if (stepObj.current) {
                      icon = idx + 1;
                      bgColor = 'bg-indigo-600';
                      labelColor = 'text-indigo-700';
                    } else {
                      icon = idx + 1;
                      bgColor = 'bg-indigo-300';
                      labelColor = 'text-gray-400';
                    }
                    return (
                      <div key={stepObj.label} className="flex-1 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${bgColor}`}>{icon}</div>
                        <div className={`mt-2 text-xs font-semibold ${labelColor}`}>{stepObj.label}</div>
                      </div>
                    );
                  })}
                </div>
                {/* Progress bar below the 3-stepper */}
                <div className="relative h-2 mt-4 w-full">
                  <div className="absolute left-0 top-1/2 w-full h-1 bg-indigo-200 rounded" style={{ transform: 'translateY(-50%)' }} />
                  <div
                    className="absolute left-0 top-1/2 h-1 bg-green-200 rounded transition-all duration-500"
                    style={{
                      width: progress,
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>
                {/* Simulate payment completion for demo */}
                {step === 1 && (
                  <div className="flex justify-end mt-2">
                    <button
                      className="px-4 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold hover:bg-indigo-200"
                      onClick={() => setStep(2)}
                    >
                      결제 완료로 이동 (테스트)
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>

      {/* Analysis Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalysisResults result={analysisResult} />
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              새 계약서 분석하기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              전문가 상담받기
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              요금제 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    }>
      <ReviewContent />
    </Suspense>
  )
} 