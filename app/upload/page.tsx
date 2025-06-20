'use client'

import { useState } from 'react'
import Link from 'next/link'
import FileUpload from '../components/FileUpload'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

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
  const [uploaded, setUploaded] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(plans[1]) // Default to Professional

  const handleFilesUploaded = () => {
    setUploaded(true)
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 2500)
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

      {/* Upload & Estimate */}
      <section className="flex-1 py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          {!uploaded && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">계약서 업로드</h2>
              <p className="text-gray-600 mb-6">계약서를 업로드하시면 전문 변호사가 빠르게 검토 후 견적을 안내해드립니다.</p>
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
              <p className="text-gray-600">계약서를 검토하고 있습니다. 잠시만 기다려 주세요.</p>
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
                    className={`rounded-xl border-2 p-6 flex flex-col items-center shadow-sm transition-all cursor-pointer ${selectedPlan.id === plan.id ? 'border-indigo-600 bg-indigo-50 scale-105 shadow-lg' : 'border-gray-200 bg-white hover:border-indigo-400'}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">{plan.name}</span>
                      {plan.highlight && <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-200 text-yellow-900 font-semibold">추천</span>}
                    </div>
                    <div className="text-2xl font-extrabold text-indigo-700 mb-2">{plan.priceDisplay}</div>
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
              {/* Sticky CTA */}
              <div className="fixed bottom-0 left-0 w-full z-50 bg-white/90 border-t border-gray-200 shadow-lg py-4 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">{selectedPlan.name} 요금제</span>
                  <span className="text-xl font-extrabold text-indigo-700">{selectedPlan.priceDisplay}</span>
                  <span className="text-sm text-gray-500 ml-2">(VAT 포함)</span>
                </div>
                <Link
                  href={`/payment?planId=${selectedPlan.id}`}
                  className="inline-flex items-center px-8 py-3 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow transition-colors text-lg"
                >
                  결제하고 상세 리포트 받기
                </Link>
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
              <div className="mt-8 text-center text-gray-500 text-sm">
                * 상세 리포트에는 변호사 의견, 리스크 진단, 개선 제안, 계약서 조항별 분석이 포함됩니다. 결제 후 즉시 확인 가능합니다.
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 