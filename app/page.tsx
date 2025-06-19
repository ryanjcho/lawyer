'use client';

import Link from 'next/link';
import Image from 'next/image';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">AI와 변호사의 하이브리드</span>
              <span className="block text-indigo-200">계약 검토의 새로운 표준</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-4 max-w-4xl mx-auto font-semibold">강남 최고급 로펌의 엘리트 변호사가 직접 참여하는 계약 검토 서비스</p>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              업로드 즉시 AI가 빠르게 분석하고, 업계별 특화 변호사가 신뢰성 있는 결과를 제공합니다.<br/>
              <span className="font-semibold">100% 온라인, 누구나 이해할 수 있는 쉬운 리포트</span>로<br/>
              시간과 비용을 절감하며, 계약 검토의 새로운 경험을 만나보세요.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">AI + 변호사 하이브리드</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">즉시 AI 피드백</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">업계별 특화 변호사</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">100% 온라인/비대면</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">강남 변호사 직접 참여</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trial"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-label="무료 체험 시작하기"
              >
                무료 체험 시작하기
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="기업 상담 신청"
              >
                기업 상담 신청
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="요금제 보기"
              >
                요금제 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-white" aria-labelledby="value-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="value-heading" className="text-3xl font-bold text-gray-900 mb-4">
              AI와 변호사의 하이브리드, 새로운 계약 검토 경험
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-4">모든 계약 검토는 강남 최고급 로펌의 엘리트 변호사가 직접 감독 및 검증하여, 업계 최고의 전문성과 신뢰를 보장합니다.</p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              <span className="font-semibold text-indigo-600">즉시 AI 피드백</span>과 <span className="font-semibold text-indigo-600">업계별 특화 변호사</span>의 신뢰성 있는 검토,<br/>
              <span className="font-semibold text-indigo-600">100% 온라인/비대면</span>의 간편함, <span className="font-semibold text-indigo-600">누구나 이해할 수 있는 쉬운 리포트</span>.<br/>
              시간과 비용을 절감하며, 계약 검토의 새로운 표준을 경험하세요.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">즉시 AI 피드백</h3>
              <p className="text-gray-600 mb-4">
                업로드 즉시 AI가 계약서를 빠르게 분석하여, 신속한 의사결정을 지원합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  실시간 분석 및 결과 제공
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  반복적이고 표준화된 검토 자동화
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">업계별 특화 변호사</h3>
              <p className="text-gray-600 mb-4">
                각 업계와 계약 유형에 특화된 변호사가 맞춤형 검토와 실질적인 조언을 제공합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  업계별 맞춤 리포트 제공
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  실무 중심의 구체적 개선안
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Protection & Safety Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50" aria-labelledby="protection-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="protection-heading" className="text-3xl font-bold text-gray-900 mb-4">
              완벽한 보호, 안전한 손길
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              여러분의 비즈니스는 우리가 책임집니다.<br/>
              <span className="font-semibold text-green-600">기대를 뛰어넘는 서비스</span>로 여러분을 완벽하게 보호합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">법률 보험 서비스</h3>
              <p className="text-gray-600 mb-4">
                계약 관련 모든 법적 리스크를 사전에 방지하여 여러분의 비즈니스를 완벽하게 보호합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  사전 리스크 방지 시스템
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  법적 분쟁 사전 예방
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  완벽한 계약 보장
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">전담 보호팀</h3>
              <p className="text-gray-600 mb-4">
                여러분의 계약을 책임지는 전담 보호팀이 24시간 대기하여 언제든지 도움을 드립니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  24/7 전문가 상담
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  긴급 상황 즉시 대응
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  개인 맞춤 보호 서비스
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">기대 초과 서비스</h3>
              <p className="text-gray-600 mb-4">
                단순한 계약 검토를 넘어서 여러분의 비즈니스 성공을 위한 모든 법적 지원을 제공합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  추가 무료 검토 서비스
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  협상 전략 가이드 제공
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  지속적인 모니터링
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-blue-50" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="benefits-heading" className="text-3xl font-bold text-gray-900 mb-4">
              비즈니스 효율성 극대화
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              복잡한 계약 리스크 관리를 <span className="font-semibold text-indigo-600">체계적이고 효율적인 프로세스</span>로<br/>
              비즈니스 성과 향상과 리스크 최소화를 동시에 달성하세요.<br/>
              <span className="text-lg text-gray-500 mt-2 block">여러분의 성공을 위한 완벽한 파트너</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 가용성</h3>
              <p className="text-gray-600">
                긴급한 계약 검토가 필요한 상황에서도 즉시 대응 가능합니다. AI의 신속한 분석과 전문 변호사의 효율적인 검토로 비즈니스 진행을 가속화합니다.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">포괄적 리스크 관리</h3>
              <p className="text-gray-600">
                AI의 정밀한 분석과 전문 변호사의 체계적 검토를 통해 계약의 모든 잠재적 리스크를 사전에 식별하고 방지하여 법적 분쟁을 사전에 예방합니다.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">비용 효율성</h3>
              <p className="text-gray-600">
                최고급 로펌의 전문성을 훨씬 합리적인 비용으로 경험하세요. 기술과 전문성의 조화를 통해 최고의 가치를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-white" aria-labelledby="trust-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="trust-heading" className="text-3xl font-bold text-gray-900 mb-4">
              신뢰받는 엔터프라이즈 솔루션
            </h2>
            <p className="text-xl text-gray-600">
              국내 주요 기업들이 선택한 LawScan의 독자 개발 법률 AI 플랫폼<br/>
              <span className="text-lg text-gray-500 mt-2 block">여러분의 비즈니스는 안전한 손에 맡겨주세요</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">기업 고객</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">10,000+</div>
              <div className="text-gray-600">검토 완료 계약</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">70%</div>
              <div className="text-gray-600">평균 시간 단축</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-16" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">
              엔터프라이즈급 계약 리스크 관리 시작하기
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              한국 최초의 독자 개발 법률 AI와 전문 변호사의 이중 검증을 통해<br/>
              <span className="font-semibold">최고 품질의 계약 리스크 관리 솔루션</span>을 경험하세요.<br/>
              <span className="text-lg text-indigo-200 mt-2 block">여러분의 비즈니스를 완벽하게 보호하는 법률 보험</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trial"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                aria-label="무료 체험 시작하기"
              >
                무료 체험 시작하기
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="기업 상담 신청"
              >
                기업 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 