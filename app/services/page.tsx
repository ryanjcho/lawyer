'use client'

import Link from 'next/link'

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">엔터프라이즈급 계약 리스크</span>
              <span className="block text-indigo-200">관리 솔루션</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              강남 최고급 로펌이 개발한 독자 AI와 전문 변호사의<br/>
              <span className="font-semibold">이중 검증을 통한 완벽한 계약 리스크 관리</span>
            </p>
          </div>
        </div>
      </section>

      {/* AI Model Capabilities Section */}
      <section className="py-20 bg-white" aria-labelledby="ai-capabilities-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="ai-capabilities-heading" className="text-3xl font-bold text-gray-900 mb-4">
              독자 개발 AI 모델의 우수성
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              강남 최고급 로펌이 수천 건의 검증된 계약서와 판례를 기반으로 직접 개발한<br/>
              <span className="font-semibold text-indigo-600">한국 최초의 독자 법률 AI 시스템</span>의 탁월한 성능을 경험하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">정밀한 리스크 식별</h3>
              <p className="text-gray-600 mb-4">
                수천 건의 검증된 계약서와 판례를 학습한 AI가 계약의 모든 잠재적 리스크를 정밀하게 식별합니다.
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

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">신속한 1차 분석</h3>
              <p className="text-gray-600 mb-4">
                복잡한 계약서도 수 분 내에 정밀 분석하여 초기 리스크 평가 및 개선안을 제시합니다.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  실시간 계약 구조 분석
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  자동 리스크 등급 분류
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  개선 제안서 자동 생성
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
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
                  98% 이상의 정확도 달성
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  최신 법령 및 판례 반영
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  지속적인 성능 개선
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
              완벽한 계약 리스크 관리 프로세스
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              AI의 정밀한 분석과 전문 변호사의 체계적 검증을 통한<br/>
              <span className="font-semibold text-indigo-600">이중 검증 프로세스</span>로 완벽한 계약을 보장합니다.
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1: Contract Upload */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">계약서 업로드 및 초기 분석</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    고객이 계약서를 업로드하면, 우리의 독자 개발 AI 시스템이 즉시 문서를 분석하여 초기 리스크 평가를 수행합니다.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-3">AI 1차 분석 수행</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        계약 구조 및 주요 조항 자동 분석
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        잠재적 법적 리스크 식별 및 등급 분류
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        초기 개선 제안서 자동 생성
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Professional Review */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">전문 변호사 심층 검증</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    AI 분석 결과를 바탕으로 경험 풍부한 전문 변호사가 계약서를 심층적으로 검토하여 추가적인 리스크를 식별하고 구체적인 개선안을 제시합니다.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-3">전문가 2차 검증 수행</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        AI 분석 결과의 정확성 및 완성도 검증
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        추가적인 법적 리스크 및 기회 요소 발굴
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        구체적인 개선 조항 및 협상 전략 제시
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Iterative Refinement */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">반복적 정제 및 최종 검증</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    전문 변호사의 검토 결과를 바탕으로 AI가 개선된 계약서를 재분석하고, 필요시 추가 검증을 거쳐 완벽한 최종 결과물을 제공합니다.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-3">최종 품질 보장 프로세스</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        개선된 계약서에 대한 AI 재분석 수행
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        필요시 전문 변호사 추가 검증
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        완벽한 품질의 최종 분석 보고서 제공
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Final Delivery */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-indigo-600">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">완벽한 최종 결과물 제공</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    AI와 전문 변호사의 이중 검증을 거친 완벽한 계약 리스크 분석 결과를 체계적으로 정리하여 고객에게 제공합니다.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-indigo-900 mb-3">엔터프라이즈급 최종 결과물</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        상세한 리스크 분석 및 등급 분류 보고서
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        구체적인 개선 조항 및 협상 전략 가이드
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        향후 모니터링 및 관리 방안 제시
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-white" aria-labelledby="quality-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="quality-heading" className="text-3xl font-bold text-gray-900 mb-4">
              엔터프라이즈급 품질 보장
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI의 정밀한 분석과 전문 변호사의 체계적 검증을 통해<br/>
              <span className="font-semibold text-indigo-600">완벽한 계약 리스크 관리</span>를 보장합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">이중 검증 시스템</h3>
              <p className="text-gray-600">
                AI의 정밀한 분석과 전문 변호사의 체계적 검증을 통해 모든 잠재적 리스크를 사전에 식별하고 방지합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">신속한 대응</h3>
              <p className="text-gray-600">
                긴급한 계약 검토가 필요한 상황에서도 즉시 대응 가능하며, 비즈니스 진행을 가속화합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">비용 효율성</h3>
              <p className="text-gray-600">
                최고급 로펌의 전문성을 훨씬 합리적인 비용으로 경험하며, 기술과 전문성의 조화를 통해 최고의 가치를 제공합니다.
              </p>
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