'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    title: "AI 1차 분석",
    description: "독자 개발 AI가 계약서를 자동으로 분석하여 잠재적 리스크를 식별합니다.",
    features: [
      "98% 이상의 정확도로 리스크 분석",
      "계약 유형 자동 분류",
      "핵심 조항 자동 추출",
      "리스크 점수 산정",
      "실시간 분석 진행 상황 표시"
    ],
    duration: "2-3분"
  },
  {
    id: 3,
    title: "전문 변호사 검증",
    description: "강남 최고급 로펌의 전문 변호사가 AI 분석 결과를 검증하고 심층 분석을 수행합니다.",
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
    description: "AI와 전문 변호사의 분석 결과를 종합한 상세한 리포트를 제공합니다.",
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

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: "ai-analysis",
    title: "독자 개발 AI 시스템",
    description: "강남 최고급 로펌이 직접 훈련한 AI로 98% 이상의 정확도를 달성합니다.",
    icon: "🤖",
    benefits: [
      "수천 건의 검증된 계약서 학습",
      "실시간 리스크 분석",
      "다국어 계약서 지원",
      "지속적인 학습 및 개선"
    ]
  },
  {
    id: "expert-verification",
    title: "전문 변호사 이중 검증",
    description: "AI 분석 결과를 엘리트 변호사가 직접 검증하여 완벽한 품질을 보장합니다.",
    icon: "⚖️",
    benefits: [
      "강남 최고급 로펌 출신 변호사",
      "실무 경험 기반 검증",
      "개별 맞춤 조언",
      "법적 책임 보장"
    ]
  },
  {
    id: "security",
    title: "엔터프라이즈급 보안",
    description: "SOC 2 Type II 인증과 AES-256 암호화로 최고 수준의 보안을 제공합니다.",
    icon: "🔒",
    benefits: [
      "AES-256 암호화",
      "SOC 2 Type II 인증",
      "자동 문서 삭제",
      "접근 권한 관리"
    ]
  },
  {
    id: "collaboration",
    title: "팀 협업 기능",
    description: "여러 사용자가 동시에 계약을 검토하고 의견을 공유할 수 있습니다.",
    icon: "👥",
    benefits: [
      "실시간 협업",
      "댓글 및 수정 추적",
      "승인 워크플로우",
      "버전 관리"
    ]
  }
];

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [activeFeature, setActiveFeature] = useState<string>("ai-analysis");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">LawScan</span>
              <span className="block text-indigo-200">제품 데모</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              강남 최고급 로펌의 AI와 전문 변호사가<br/>
              <span className="font-semibold">어떻게 여러분의 계약을 보호하는지 직접 확인하세요</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trial"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                무료 체험 시작하기
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                데모 영상 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Demo Section */}
      <section className="py-20 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="process-heading" className="text-3xl font-bold text-gray-900 mb-4">
              4단계 완벽 프로세스
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              계약서 업로드부터 최종 리포트까지<br/>
              <span className="font-semibold">LawScan의 완벽한 분석 프로세스를 체험해보세요</span>
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
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xs mr-2">
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
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-200">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">📄</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title} 데모
                    </h4>
                    <p className="text-gray-600 mb-4">
                      실제 화면을 통해 {step.title} 과정을 확인해보세요
                    </p>
                    <button className="inline-flex items-center justify-center px-6 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      데모 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
              핵심 기능 소개
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              LawScan만의 독특한 기능들을 통해<br/>
              <span className="font-semibold">완벽한 계약 리스크 관리를 경험하세요</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature Navigation */}
            <div className="space-y-4">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full text-left p-6 rounded-xl transition-all ${
                    activeFeature === feature.id
                      ? "bg-white shadow-lg border-2 border-indigo-200"
                      : "bg-white bg-opacity-50 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{feature.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`transition-all duration-500 ${
                    activeFeature === feature.id ? "block" : "hidden"
                  }`}
                >
                  <div className="text-center mb-8">
                    <span className="text-6xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      주요 혜택
                    </h4>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-white" aria-labelledby="interactive-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="interactive-heading" className="text-3xl font-bold text-gray-900 mb-4">
              실제 계약서로 체험해보기
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              샘플 계약서를 업로드하여 LawScan의 분석 능력을<br/>
              <span className="font-semibold">직접 체험해보세요</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-indigo-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  무료 체험 계약서
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  실제 기업들이 사용하는 계약서 샘플을 제공합니다. 
                  업로드 버튼을 클릭하면 LawScan의 분석 과정을 
                  단계별로 확인할 수 있습니다.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">M&A 계약서 샘플</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">투자 계약서 샘플</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">고용 계약서 샘플</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 bg-white">
                  <svg className="w-16 h-16 text-indigo-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    계약서 업로드
                  </h4>
                  <p className="text-gray-600 mb-4">
                    샘플 계약서를 선택하여 업로드하세요
                  </p>
                  <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    샘플 계약서 업로드
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 LawScan을 체험해보세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            강남 최고급 로펌의 AI와 전문 변호사가 여러분의 계약을 보호합니다.<br/>
            무료 체험으로 LawScan의 놀라운 능력을 직접 확인하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              무료 체험 시작하기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              상담 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 