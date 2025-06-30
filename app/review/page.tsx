'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AnalysisResults from '../components/AnalysisResults'
import { GeistMono } from "geist/font/mono"
import axios from 'axios'

declare global {
  interface Window {
    NanumMyeongjoRegular: string;
  }
}

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

const CONTRACT_TYPES = [
  '근로계약서',
  '용역계약서',
  '매매계약서',
  '합작계약서',
  '임대차계약서',
  '비밀유지계약서 (NDA)',
  '컨설팅계약서',
  '소프트웨어 라이선스 계약서',
  '유통계약서',
  '기타'
];
const INDUSTRIES = [
  'IT/기술',
  '의료/제약',
  '금융/보험',
  '부동산',
  '제조',
  '유통/소매',
  '서비스',
  '기타'
];
const URGENCY_OPTIONS = [
  { value: 1, label: '일반 검토 (5일)', price: 1 },
  { value: 2, label: '우선 검토 (3일)', price: 1.5 },
  { value: 3, label: '긴급 검토 (24시간)', price: 2 },
];

function ReviewContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'review'
  
  const [step, setStep] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(3)
  const [formatting, setFormatting] = useState<boolean>(false)
  const [addClauses, setAddClauses] = useState<boolean>(false)
  const [revisions, setRevisions] = useState<number>(2)
  const [urgency, setUrgency] = useState<number>(1)
  const [email, setEmail] = useState<string>('')
  const [contractType, setContractType] = useState<string>('')
  const [industry, setIndustry] = useState<string>('')
  const [contractAmount, setContractAmount] = useState<string>('')
  const [caseNumber, setCaseNumber] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending')

  function calculateTotal() {
    let total = 500000 // Base price for first 3 pages
    
    // Additional pages
    if (pageCount > 3) {
      total += (pageCount - 3) * 50000
    }
    
    // Format cleanup
    if (formatting) {
      total += 100000
    }
    
    // Missing clauses
    if (addClauses) {
      total += 300000
    }
    
    // Additional revisions
    if (revisions > 2) {
      total += (revisions - 2) * 50000
    }
    
    // Apply urgency multiplier
    const urgencyOption = URGENCY_OPTIONS.find(opt => opt.value === urgency);
    total = Math.round(total * (urgencyOption?.price || 1))
    
    return total
  }

  // Function to generate a unique case number
  function generateCaseNumber() {
    const timestamp = Date.now().toString()
    const random = Math.random().toString(36).substring(2, 7).toUpperCase()
    return `OKL-${timestamp.slice(-6)}-${random}`
  }

  // Function to handle payment
  async function handlePayment() {
    setPaymentStatus('processing')
    
    try {
      // Here you would integrate with your payment provider
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate and set case number
      const newCaseNumber = generateCaseNumber()
      setCaseNumber(newCaseNumber)
      setPaymentStatus('completed')
      
      // Here you would typically:
      // 1. Create a contract record in your database
      // 2. Associate it with the user's dashboard
      // 3. Send confirmation email
      // 4. Redirect to dashboard
      
    } catch (error) {
      console.error('Payment failed:', error)
      setPaymentStatus('pending')
    }
  }

  async function handleDownloadInvoice() {
    if (typeof window === 'undefined') return;

    try {
      // Create a simple text version of the invoice
      const invoiceText = `견적서\n\n` +
        `서비스: ${type === 'draft' ? '계약서 작성 (기본)' : '계약서 검토 (기본)'}\n` +
        `기본 금액: ₩500,000\n` +
        (pageCount > 3 ? `추가 페이지 (${pageCount - 3}): ₩${((pageCount - 3) * 50000).toLocaleString()}\n` : '') +
        (formatting ? `서식 정리: ₩100,000\n` : '') +
        (addClauses ? `누락 조항 추가: ₩300,000\n` : '') +
        (revisions > 2 ? `추가 수정 (${revisions - 2}회): ₩${((revisions - 2) * 50000).toLocaleString()}\n` : '') +
        `\n긴급도: x${URGENCY_OPTIONS.find(opt => opt.value === urgency)?.price}\n` +
        `\n총 금액: ₩${calculateTotal().toLocaleString()}`;

      // Create a Blob with the text content
      const blob = new Blob([invoiceText], { type: 'text/plain' });
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = '견적서.txt';
      
      // Trigger the download
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  }

  async function handleSendInvoiceEmail() {
    // Implementation for sending email
  }

  // Final step content (quote and payment)
  const renderFinalStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">견적서</h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">서비스 내역</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between">
                <span>{type === 'draft' ? '계약서 작성 (기본)' : '계약서 검토 (기본)'}</span>
                <span>₩500,000</span>
              </li>
              {pageCount > 3 && (
                <li className="flex justify-between">
                  <span>추가 페이지 ({pageCount - 3})</span>
                  <span>₩{((pageCount - 3) * 50000).toLocaleString()}</span>
                </li>
              )}
              {formatting && (
                <li className="flex justify-between">
                  <span>서식 정리</span>
                  <span>₩100,000</span>
                </li>
              )}
              {addClauses && (
                <li className="flex justify-between">
                  <span>누락 조항 추가</span>
                  <span>₩300,000</span>
                </li>
              )}
              {revisions > 2 && (
                <li className="flex justify-between">
                  <span>추가 수정 ({revisions - 2}회)</span>
                  <span>₩{((revisions - 2) * 50000).toLocaleString()}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">긴급도</h3>
            <div className="flex justify-between text-gray-700">
              <span>{URGENCY_OPTIONS.find(opt => opt.value === urgency)?.label}</span>
              <span>x{URGENCY_OPTIONS.find(opt => opt.value === urgency)?.price}</span>
            </div>
          </div>

          <div className="pt-4">
            <div className="flex justify-between items-center text-xl font-bold text-indigo-800">
              <span>총 금액</span>
              <span>₩{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Email and Payment Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">연락처 정보</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-800">
              이메일 주소
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Payment Status Display */}
          {paymentStatus === 'completed' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-green-600 mb-2">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-indigo-800 mb-2">결제 완료</h4>
              <p className="text-gray-700 mb-4">귀하의 사건번호:</p>
              <p className="text-2xl font-mono font-bold text-indigo-600 mb-4">{caseNumber}</p>
              <Link
                href={`/dashboard/contracts/${caseNumber}`}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                대시보드로 이동
              </Link>
            </div>
          ) : (
            <button
              onClick={handlePayment}
              disabled={!email || paymentStatus === 'processing'}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  결제 처리중...
                </>
              ) : (
                '결제하기'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Download Invoice Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownloadInvoice}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-indigo-800 bg-white hover:bg-gray-50"
        >
          <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          견적서 다운로드
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[
              { label: '기본 정보', step: 1 },
              { label: '추가 요청', step: 2 },
              { label: '견적 및 결제', step: 3 }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= item.step ? 'bg-yellow-500 text-indigo-900' : 'bg-white text-gray-300 border border-gray-200'
                }`}>
                  {step > item.step ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    item.step
                  )}
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${
                    step >= item.step ? 'text-indigo-800' : 'text-gray-400'
                  }`}>
                    {item.label}
                  </p>
                </div>
                {index < 2 && (
                  <div className={`w-full h-0.5 mx-4 ${
                    step > item.step ? 'bg-yellow-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <form onSubmit={e => {e.preventDefault(); setStep(2);}} className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100">
            <div>
              <label htmlFor="contractType" className="block text-sm font-medium text-indigo-800 mb-1">
                계약서 종류
              </label>
              <select
                id="contractType"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                required
              >
                <option value="">계약서 종류를 선택하세요</option>
                {CONTRACT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-indigo-800 mb-1">
                업종
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                required
              >
                <option value="">업종을 선택하세요</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contractAmount" className="block text-sm font-medium text-indigo-800 mb-1">
                계약금액 (선택사항)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₩</span>
                </div>
                <input
                  type="text"
                  name="contractAmount"
                  id="contractAmount"
                  value={contractAmount}
                  onChange={(e) => setContractAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">원</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="pageCount" className="block text-sm font-medium text-indigo-800 mb-1">
                페이지 수
              </label>
              <input
                type="number"
                id="pageCount"
                min="1"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-indigo-800 mb-1">
                긴급도
              </label>
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                required
              >
                {URGENCY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              다음 단계
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={e => {e.preventDefault(); setStep(3);}} className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formatting}
                  onChange={(e) => setFormatting(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-900">서식 정리 (+₩100,000)</span>
              </label>
              <p className="mt-1 text-sm text-gray-500 ml-7">
                전문적인 서식 및 레이아웃 개선
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={addClauses}
                  onChange={(e) => setAddClauses(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-900">누락 조항 추가 (+₩300,000)</span>
              </label>
              <p className="mt-1 text-sm text-gray-500 ml-7">
                필수적인 보호 조항 추가
              </p>
            </div>

            <div>
              <label htmlFor="revisions" className="block text-sm font-medium text-gray-700 mb-1">
                수정 횟수 (2회 포함)
              </label>
              <input
                type="number"
                id="revisions"
                min="0"
                value={revisions}
                onChange={(e) => setRevisions(parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                required
              />
              {revisions > 2 && (
                <p className="mt-1 text-sm text-gray-500">
                  추가 수정 비용: ₩{((revisions - 2) * 50000).toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                이전
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                다음
              </button>
            </div>
          </form>
        )}
        {step === 3 && renderFinalStep()}
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