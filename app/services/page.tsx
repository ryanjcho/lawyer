'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DemoStep {
  id: number;
  title: string;
  description: string;
  features: string[];
  duration: string;
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "계약서 업로드",
    description: "PDF, Word, 이미지 등 다양한 형식의 계약서를 안전하게 업로드합니다.",
    features: [
      "다양한 파일 형식 지원 (PDF, DOC, DOCX, JPG, PNG)",
      "드래그 앤 드롭으로 간편 업로드",
      "AES-256 암호화로 안전한 전송",
      "최대 50MB 파일 크기 지원",
      "실시간 업로드 진행률 표시"
    ],
    duration: "30초"
  },
  {
    id: 2,
    title: "전문가 1차 분석",
    description: "경험 많은 법률 전문가가 계약서를 신속하게 분석하여 잠재적 리스크를 식별합니다.",
    features: [
      "정확한 리스크 분석",
      "계약 유형 분류",
      "핵심 조항 추출",
      "리스크 점수 산정",
      "실시간 분석 진행 상황 표시"
    ],
    duration: "2-3분"
  },
  {
    id: 3,
    title: "전문 변호사 검증",
    description: "강남 최고급 로펌의 전문 변호사가 1차 분석 결과를 검증하고 심층 분석을 수행합니다.",
    features: [
      "엘리트 변호사의 이중 검증",
      "실무적 관점의 리스크 평가",
      "개선 제안 및 대안 조항 제시",
      "계약 협상 전략 가이드",
      "24-48시간 내 완료"
    ],
    duration: "24-48시간"
  },
  {
    id: 4,
    title: "종합 분석 리포트",
    description: "전문가의 분석 결과를 종합한 상세한 리포트를 제공합니다.",
    features: [
      "리스크 등급별 분류 (높음/중간/낮음)",
      "구체적인 개선 제안사항",
      "협상 포인트 및 전략",
      "유사 판례 및 법적 근거",
      "다운로드 및 공유 기능"
    ],
    duration: "즉시"
  }
];

export default function Services() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              쉽고 신뢰할 수 있는 계약 검토 서비스
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              업계별 특화 변호사와 전문가가 제공하는, 쉽고 빠른 100% 온라인 계약 검토 서비스
            </p>
          </div>
        </div>
      </section>

      {/* AI Model Capabilities Section */}
      <section className="py-20 bg-white" aria-labelledby="capabilities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="capabilities-heading" className="text-3xl font-bold text-gray-900 mb-4">
              전문가 중심의 새로운 계약 검토 경험
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-4">모든 계약 검토는 강남 최고급 로펌의 엘리트 변호사가 직접 감독 및 검증하여, 업계 최고의 전문성과 신뢰를 보장합니다.</p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              <span className="font-semibold text-indigo-600">즉시 피드백</span>과 <span className="font-semibold text-indigo-600">업계별 특화 변호사</span>의 신뢰성 있는 검토,<br/>
              <span className="font-semibold text-indigo-600">100% 온라인/비대면</span>의 간편함, <span className="font-semibold text-indigo-600">누구나 이해할 수 있는 쉬운 리포트</span>.<br/>
              시간과 비용을 절감하며, 계약 검토의 새로운 표준을 경험하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">정밀한 리스크 식별</h3>
              <p className="text-gray-600 mb-4">
                수천 건의 검증된 계약서와 판례를 바탕으로 전문가가 계약의 모든 잠재적 리스크를 정밀하게 식별합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  법적 구속력 및 효력 문제
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  손해배상 및 책임 범위
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  해지 및 위반 조항 분석
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">전문가의 시너지</h3>
              <p className="text-gray-600 mb-4">
                전문가들의 협업을 통해 최고의 결과를 보장합니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                ✓ 신뢰할 수 있는 결과 제공
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 hover:shadow-xl hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">엔터프라이즈급 정확도</h3>
              <p className="text-gray-600 mb-4">
                엘리트 변호사들이 직접 훈련하고 검증한 AI로 최고 수준의 법률 전문성을 구현합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  전문가 분석의 신뢰성
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  전문 변호사 이중 검증
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  수천 건의 검증된 데이터 기반 분석
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Process Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="process-heading" className="text-3xl font-bold text-gray-900 mb-4">
              4단계 완벽 프로세스
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              계약서 업로드부터 최종 리포트까지<br/>
              <span className="font-semibold">LawScan의 완벽한 분석 프로세스를 확인하세요</span>
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {demoSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeStep === step.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 ${
                    activeStep === step.id ? "bg-white bg-opacity-20" : "bg-indigo-100 text-indigo-600"
                  }`}>
                    {step.id}
                  </span>
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Step Content */}
          {demoSteps.map((step) => (
            <div
              key={step.id}
              className={`transition-all duration-500 ${
                activeStep === step.id ? "block" : "hidden"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-indigo-600">{step.id}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      <p className="text-indigo-600 font-medium">소요시간: {step.duration}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      실제 프로세스 체험
                    </h4>
                    <p className="text-gray-600 mb-4">
                      각 단계별 실제 화면을 통해 LawScan의 분석 과정을 확인해보세요
                    </p>
                    <Link
                      href="/demo"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      데모 보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why LawScan? Section */}
      <section className="py-20 bg-white" aria-labelledby="why-lawscan-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="why-lawscan-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Why LawScan?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              강남 로펌의 실전 경험과 전문가의 시너지를 통해 완벽한 계약 리스크 관리를 보장합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">강남 로펌의 실전 경험</h3>
              <p className="text-gray-600 mb-4">
                강남 최고급 로펌의 실전 경험을 통해 최고의 전문성과 신뢰를 보장합니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                ✓ 15년+ 실무 경험
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">전문가의 시너지</h3>
              <p className="text-gray-600 mb-4">
                전문가들의 협업을 통해 최고의 결과를 보장합니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                ✓ 신뢰할 수 있는 결과 제공
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">업계별 맞춤 리포트</h3>
              <p className="text-gray-600 mb-4">
                업계별로 맞춤화된 리포트를 제공하여 계약 검토의 효율성을 높입니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                ✓ 6개 업계 특화
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">투명한 가격과 빠른 결과</h3>
              <p className="text-gray-600 mb-4">
                합리적인 가격으로 빠른 결과를 제공하며, 고객의 만족도를 높입니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                ✓ 24-48시간 내 완료
              </div>
            </div>
          </div>

          {/* Detailed Advantages Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                LawScan만의 독특한 장점
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                전통적인 법무 서비스와 최신 AI 기술의 완벽한 조화를 통해<br/>
                <span className="font-semibold text-indigo-600">업계 최고의 계약 리스크 관리 솔루션</span>을 제공합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">신속한 처리</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    AI 1차 분석: 2-3분 내 완료
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    전문 변호사 검증: 24-48시간
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    긴급 요청 시 당일 처리 가능
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">최고의 정확도</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    AI 분석 정확도: 98% 이상
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    전문 변호사 이중 검증
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    수천 건의 검증된 데이터 학습
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">비용 효율성</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    전통 로펌 대비 70% 비용 절감
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    투명한 요금제 (건당 요금)
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>무료 체험 및 상담 제공</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">전문성 보장</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>강남 최고급 로펌 출신 변호사</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>업계별 전문 변호사 배정</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>지속적인 법령 업데이트</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">보안 및 신뢰</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>SOC 2 Type II 인증</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>AES-256 암호화</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>자동 문서 삭제 정책</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">실용적 리포트</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>리스크 등급별 분류</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>구체적 개선 제안</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>협상 전략 가이드</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Comparison Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                LawScan vs 전통적인 법무 서비스
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AI와 전문 변호사의 조합이 어떻게 혁신적인 변화를 가져오는지 확인하세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">전통적인 법무 서비스</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>처리 시간: 1-2주 소요</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>비용: 건당 수백만원</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>대면 상담 필요</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>복잡한 법률 용어</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>업무 시간 제한</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">LawScan</h4>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>처리 시간: 24-48시간</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>비용: 건당 수십만원</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>100% 온라인 처리</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>쉬운 이해 가능한 리포트</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>24/7 서비스 이용 가능</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            완벽한 계약 리스크 관리 시작하기
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            한국 최초의 독자 개발 법률 AI와 전문 변호사의 이중 검증을 통해<br/>
            <span className="font-semibold">엔터프라이즈급 계약 리스크 관리 솔루션</span>을 경험하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              무료 체험 시작하기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              기업 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 