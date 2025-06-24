'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FileUpload from '../components/FileUpload'
import { CheckCircleIcon, ExclamationTriangleIcon, DocumentTextIcon, ChartBarIcon, ShieldCheckIcon, ArrowRightCircleIcon, LockClosedIcon, UserGroupIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

const plans = [
  {
    id: 'basic-onetime',
    name: 'Basic',
    price: 300000,
    priceDisplay: '₩300,000',
    features: [
      '계약서 1건 검토',
      '24시간 이내 검토 완료',
      '기본 리스크 분석',
      '개선 제안서 제공',
      '이메일 상담 지원',
    ],
    highlight: false,
  },
  {
    id: 'professional-onetime',
    name: 'Professional',
    price: 500000,
    priceDisplay: '₩500,000',
    features: [
      '계약서 1건 검토',
      '12시간 이내 검토 완료',
      '상세 리스크 분석',
      '개선 제안서 제공',
      '전문가 상담 1회',
      '긴급 검토 가능',
    ],
    highlight: true,
  },
  {
    id: 'enterprise-onetime',
    name: 'Enterprise',
    price: 1000000,
    priceDisplay: '₩1,000,000',
    features: [
      '계약서 1건 검토',
      '3시간 이내 검토 완료',
      '심층 리스크 분석',
      '개선 제안서 제공',
      '전문가 상담 3회',
      '긴급 검토 가능',
      '계약 협상 지원',
    ],
    highlight: false,
  },
]

export default function UploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [uploaded, setUploaded] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(plans[1]) // Default to Professional
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [quote, setQuote] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || status === 'loading') return
    if (!session?.user) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('redirectAfterLogin', '/upload')
      }
    }
  }, [session, status, mounted])

  const handleFilesUploaded = (files: any[]) => {
    setUploadedFiles(files)
    setUploaded(true)
    setIsAnalyzing(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('uploadedFiles', JSON.stringify(files))
    }
    // Simulate API call for mock analysis/quote
    setTimeout(() => {
      // Mock analysis/quote
      const mockRiskScore = Math.floor(Math.random() * 10) + 1
      const mockRiskLevel = mockRiskScore >= 7 ? 'HIGH' : mockRiskScore >= 4 ? 'MEDIUM' : 'LOW'
      const mockQuote = 250000 + mockRiskScore * 25000
      setAnalysis({ riskScore: mockRiskScore, riskLevel: mockRiskLevel })
      setQuote(mockQuote)
      setIsAnalyzing(false)
      setShowPreview(true)
    }, 2000)
  }

  const handleProceedToPayment = () => {
    if (!session?.user) {
      router.push('/login?callbackUrl=/upload')
      return
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles))
      sessionStorage.setItem('analysis', JSON.stringify(analysis))
      sessionStorage.setItem('quote', String(quote))
      sessionStorage.setItem('analysisComplete', 'true')
    }
    router.push('/payment')
  }

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            프리미엄 계약서 분석, <span className="text-yellow-300">합리적인 가격</span>에
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-6">
            강남 최고 로펌 출신 변호사들이 직접 검토하는 맞춤형 계약서 분석 서비스를, 기존 로펌 대비 <span className="font-bold text-yellow-200">최대 80% 저렴하게</span> 제공합니다.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <div className="bg-white/10 rounded-lg px-6 py-3 flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
              <span className="font-semibold text-yellow-200">누적 절감 비용</span>
              <span className="font-bold text-white">₩2,500,000,000+</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3 flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
              <span className="font-semibold text-yellow-200">평균 ROI 증가</span>
              <span className="font-bold text-white">+320%</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3 flex flex-col md:flex-row items-center gap-2 text-base md:text-lg">
              <span className="font-semibold text-yellow-200">고객 만족도</span>
              <span className="font-bold text-white">97%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Stepper/Progress Bar above input form */}
      <div className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          {/* Stepper and Progress Bar (moved here) */}
          <div className="w-full mb-10">
            {(() => {
              // Step logic
              let step = 0;
              if (uploaded) step = 1;
              if (showPreview) step = 2;
              if (analysisComplete) step = 3;
              const steps = [
                { label: '계약서 업로드', complete: step > 0, current: step === 0 },
                { label: '미리보기', complete: step > 1, current: step === 1 },
                { label: '결제 및 완료', complete: step > 2, current: step === 2 },
              ];
              let progress = '0%';
              if (step === 3) progress = '100%';
              else if (step === 2) progress = '66.66%';
              else if (step === 1) progress = '33.33%';
              return (
                <>
                  <div className="flex items-center justify-between">
                    {steps.map((stepObj, idx) => {
                      let icon, bgColor, labelColor;
                      if (stepObj.complete) {
                        icon = <CheckCircleIcon className="w-5 h-5" />;
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
                  {/* Progress bar below the stepper */}
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
                </>
              );
            })()}
          </div>

          {/* Upload & Estimate */}
          {!uploaded && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">계약서 업로드</h2>
              <p className="text-gray-600 mb-6">계약서를 업로드하시면 전문 변호사가 빠르게 검토 후 견적을 안내해드립니다.</p>
              
              {!session?.user && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    <span className="font-medium">로그인이 필요합니다</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">계약서 업로드 후 결제를 위해 로그인해주세요.</p>
                  <Link
                    href="/login?callbackUrl=/upload"
                    className="inline-block mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    로그인하기
                  </Link>
                </div>
              )}
              
              <FileUpload 
                onFilesUploaded={handleFilesUploaded}
                maxFiles={1}
                maxFileSize={10 * 1024 * 1024}
                acceptedTypes={['.pdf', '.docx', '.doc']}
              />
            </div>
          )}

          {uploaded && isAnalyzing && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전문 변호사가 계약서를 검토하고 있습니다.</h3>
              <p className="text-gray-600">강남 최고 로펌 출신 변호사가 계약서를 빠르게 검토하고 있습니다. 잠시만 기다려 주세요.</p>
            </div>
          )}

          {showPreview && !analysisComplete && analysis && (
            <div className="bg-gradient-to-br from-white via-indigo-50 to-white rounded-2xl shadow-2xl p-10 text-center relative overflow-hidden">
              {/* Animated checkmark confetti (optional, subtle) */}
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-slow">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">계약서 1차 분석 결과</h3>
              <div className="mb-6">
                <p className="text-indigo-700 font-semibold mb-2">귀하의 계약서는 저희 로펌이 수년간 축적한 방대한 계약서 데이터베이스와 전문 분석 시스템을 통해 신속하게 1차 분석되었습니다.</p>
                <p className="text-gray-700 mb-2">이 분석은 수천 건의 실제 사례와 리스크 데이터를 기반으로 하며, 업계 최고 수준의 정확도를 자랑합니다.</p>
                <p className="text-gray-700 mb-2">하지만, <span className="font-bold text-indigo-700">실제 변호사</span>가 직접 검토하고 상담을 제공하는 서비스는 결제 후에만 제공됩니다.</p>
                <p className="text-gray-500 text-xs mt-2">* 결제 전에는 위험 수준 등 기본 정보만 제공되며, 구체적 리스크와 변호사 의견은 결제 후 확인하실 수 있습니다.</p>
              </div>
              {/* Info blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/80 rounded-2xl p-6 flex flex-col items-center shadow-md border border-indigo-100">
                  <span className="inline-flex items-center gap-1 mb-2"><DocumentTextIcon className="w-6 h-6 text-indigo-400" /> <span className="font-semibold text-indigo-700">예상 계약서 유형</span></span>
                  <span className="text-xl font-bold text-gray-900">근로계약서</span>
                </div>
                <div className="bg-white/80 rounded-2xl p-6 flex flex-col items-center shadow-md border border-yellow-100">
                  <span className="inline-flex items-center gap-1 mb-2"><ChartBarIcon className="w-6 h-6 text-yellow-400" /> <span className="font-semibold text-yellow-700">유사 계약서 평균 위험 점수</span></span>
                  <span className="text-xl font-bold text-gray-900">6.2/10</span>
                </div>
                <div className="bg-white/80 rounded-2xl p-6 flex flex-col items-center shadow-md border border-green-100">
                  <span className="inline-flex items-center gap-1 mb-2"><ShieldCheckIcon className="w-6 h-6 text-green-400" /> <span className="font-semibold text-green-700">데이터베이스 분석 신뢰도</span></span>
                  <span className="inline-block bg-green-200 text-green-800 font-bold px-4 py-1 rounded-full text-sm">높음</span>
                </div>
              </div>
              {/* Risk level, score, quote */}
              <div className="flex flex-col items-center gap-4 mb-10">
                <div className="text-lg font-semibold text-gray-700">예상 위험 수준</div>
                <span className={`inline-block px-6 py-2 rounded-full font-bold text-white text-xl mb-2 shadow-md ${analysis.riskLevel === 'HIGH' ? 'bg-red-500' : analysis.riskLevel === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}>{analysis.riskLevel === 'HIGH' ? '높음' : analysis.riskLevel === 'MEDIUM' ? '보통' : '낮음'}</span>
                <div className="text-lg font-semibold text-gray-700">위험 점수</div>
                <div className="w-full max-w-xs mx-auto mb-2">
                  <div className="relative h-5 bg-gray-200 rounded-full">
                    <div className={`absolute left-0 top-0 h-5 rounded-full transition-all duration-500 ${analysis.riskLevel === 'HIGH' ? 'bg-red-400' : analysis.riskLevel === 'MEDIUM' ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${(analysis.riskScore/10)*100}%` }}></div>
                  </div>
                  <div className="text-3xl font-extrabold text-indigo-700 mt-2">{analysis.riskScore}/10</div>
                </div>
                <div className="text-lg font-semibold text-gray-700 mt-4">예상 견적</div>
                <div className="text-4xl font-black text-indigo-700 underline decoration-wavy decoration-2 mb-2">₩{quote?.toLocaleString()}</div>
              </div>
              {/* Trust bar */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                  <span className="font-bold text-green-700">100% 만족 보장</span>
                </div>
                <div className="flex items-center gap-2">
                  <LockClosedIcon className="w-6 h-6 text-indigo-500" />
                  <span className="font-semibold text-indigo-700">고객 정보 안전 & 기밀 보장</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-6 h-6 text-yellow-500" />
                  <span className="font-semibold text-yellow-700">10,000+ 고객 신뢰</span>
                </div>
              </div>
              {/* Next steps checklist */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto shadow-sm border border-gray-100">
                <div className="font-bold text-gray-800 mb-2 flex items-center gap-2"><ArrowRightCircleIcon className="w-5 h-5 text-indigo-400" /> 다음 단계 안내</div>
                <ul className="text-base text-gray-700 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 결제 완료 시 상세 리포트 즉시 제공</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 변호사 직접 검토 및 1:1 상담 가능</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 리스크 진단, 개선안, 협상 포인트 제공</li>
                </ul>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-extrabold text-xl shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-3 mx-auto mb-2"
              >
                결제하고 상세 분석 받기 <ArrowRightCircleIcon className="w-7 h-7 text-white" />
              </button>
              <div className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
                <InformationCircleIcon className="w-4 h-4 text-indigo-400" />
                <span>숨겨진 비용 없이, 1회 결제로 모든 분석 결과 제공</span>
              </div>
              <p className="text-xs text-gray-400 mt-4">* 상세 분석에는 구체적 리스크, 개선안, 변호사 의견이 포함됩니다.</p>
            </div>
          )}

          {analysisComplete && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">전문 변호사가 1차 검토를 완료했습니다.</h3>
                <p className="text-gray-600 mb-4">전문 변호사가 1차 검토를 완료했습니다. 아래 견적과 요약은 실제 변호사의 1차 검토를 기반으로 제공됩니다.<br/>정확한 리스크 진단과 변호사 의견이 포함된 <span className="font-semibold text-indigo-700">상세 리포트</span>는 아래 요금제 선택 후 결제 시 제공됩니다.</p>
              </div>
              
              {/* Plan Selection */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-xl border-2 p-6 flex flex-col items-center shadow-sm transition-all cursor-pointer relative ${selectedPlan.id === plan.id ? 'border-indigo-600 bg-indigo-50 scale-105 shadow-lg' : 'border-gray-200 bg-white hover:border-indigo-400'}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {/* Urgency Badge */}
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          🔥 인기 요금제
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">{plan.name}</span>
                      {plan.highlight && <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-200 text-yellow-900 font-semibold">추천</span>}
                    </div>
                    <div className="text-2xl font-extrabold text-indigo-700 mb-2">{plan.priceDisplay}</div>
                    
                    {/* Limited Time Offer */}
                    {plan.id === 'professional-onetime' && (
                      <div className="mb-3 p-2 bg-orange-100 rounded-lg text-center">
                        <div className="text-xs text-orange-800 font-semibold">🎯 한정 특가</div>
                        <div className="text-xs text-orange-700">오늘만 20% 할인</div>
                      </div>
                    )}
                    
                    <ul className="text-sm text-gray-700 mb-4 space-y-1">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1"><CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />{f}</li>
                      ))}
                    </ul>
                    <button
                      className={`mt-auto px-4 py-2 rounded-lg font-semibold w-full transition-colors ${selectedPlan.id === plan.id ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                      onClick={() => setSelectedPlan(plan)}
                      type="button"
                    >
                      {selectedPlan.id === plan.id ? '선택됨' : '이 요금제 선택'}
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Urgency Banner */}
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg">⏰</span>
                  <span className="font-bold">오늘 신청 시 특별 혜택</span>
                </div>
                <p className="text-sm opacity-90">
                  오늘 신청하시면 추가 상담 1회 무료 + 계약서 템플릿 3종 제공
                </p>
              </div>
              
              {/* Sticky CTA */}
              <div className="fixed bottom-0 left-0 w-full z-50 bg-white/95 border-t border-gray-200 shadow-lg py-3 px-6 backdrop-blur-sm">
                <div className="max-w-2xl mx-auto flex flex-row items-center justify-between gap-4 whitespace-nowrap">
                  <div className="flex flex-row items-center gap-3 whitespace-nowrap">
                    <span className="text-lg font-semibold text-gray-900">{selectedPlan.name} 요금제</span>
                    <span className="text-2xl font-extrabold text-indigo-700">{selectedPlan.priceDisplay}</span>
                    <span className="text-sm text-gray-400 ml-2">(VAT 포함)</span>
                    {selectedPlan.id === 'professional-onetime' && (
                      <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold ml-3">
                        오늘만 20% 할인
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleProceedToPayment}
                    className="inline-flex items-center px-10 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all text-xl whitespace-nowrap"
                  >
                    지금 결제하고 상세 분석 받기 →
                  </button>
                </div>
              </div>
              
              {/* Value Props & Trust Stats */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-700 mb-2">10,000+</div>
                  <div className="text-gray-700 font-semibold">누적 계약서 분석</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-700 mb-2">97%</div>
                  <div className="text-gray-700 font-semibold">고객 만족도</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-700 mb-2">₩2.5B+</div>
                  <div className="text-gray-700 font-semibold">누적 절감 비용</div>
                </div>
              </div>
              
              {/* Customer Testimonials */}
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">고객 후기</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      "계약서 리스크를 미리 파악해서 큰 손실을 막았습니다. 투자 대비 효과가 정말 좋았어요."
                    </p>
                    <div className="text-xs text-gray-500">- 김대표, 스타트업 CEO</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      "전문 변호사 의견이 정말 도움이 됐어요. 협상할 때 확신을 가지고 임할 수 있었습니다."
                    </p>
                    <div className="text-xs text-gray-500">- 박과장, IT 기업</div>
                  </div>
                </div>
              </div>
              
              {/* Guarantee Section */}
              <div className="mt-6 bg-green-50 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">🛡️</span>
                  <span className="font-bold text-green-800">100% 만족 보장</span>
                </div>
                <p className="text-sm text-green-700">
                  분석 결과에 만족하지 못하시면 7일 이내 전액 환불해드립니다.
                </p>
              </div>
              
              {/* FAQ Section */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">자주 묻는 질문</h4>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-900 mb-2">Q: 분석에 얼마나 시간이 걸리나요?</h5>
                    <p className="text-sm text-gray-700">A: 선택하신 요금제에 따라 3-24시간 내에 완료됩니다. 긴급한 경우 3시간 내 완료 가능합니다.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-900 mb-2">Q: 어떤 형태의 결과를 받을 수 있나요?</h5>
                    <p className="text-sm text-gray-700">A: 상세한 PDF 리포트와 함께 변호사 의견, 리스크 분석, 개선 제안, 협상 포인트를 제공합니다.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-900 mb-2">Q: 계약서가 복잡한데도 분석 가능한가요?</h5>
                    <p className="text-sm text-gray-700">A: 네, 모든 종류의 계약서를 분석 가능합니다. 전문 변호사가 직접 검토하므로 복잡한 조항도 정확히 분석합니다.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-900 mb-2">Q: 분석 후 추가 상담이 가능한가요?</h5>
                    <p className="text-sm text-gray-700">A: Professional 이상 요금제에는 전문가 상담이 포함되어 있습니다. 추가 상담도 별도로 제공 가능합니다.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-900 mb-2">Q: 어떤 변호사가 검토하나요?</h5>
                    <p className="text-sm text-gray-700">A: 강남 최고 로펌 출신 변호사들이 직접 검토합니다. 계약서 분야 전문 변호사가 담당하여 정확하고 신뢰할 수 있는 분석을 제공합니다.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center text-gray-500 text-sm">
                * 상세 리포트에는 변호사 의견, 리스크 진단, 개선 제안, 계약서 조항별 분석이 포함됩니다. 결제 후 즉시 확인 가능합니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 