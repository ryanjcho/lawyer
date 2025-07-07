'use client';

import Link from 'next/link';

export default function ManufacturingIndustry() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              제조 기업을 위한 스마트 계약 검토
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              법률 전문가가 제조 기업의 계약 리스크를 최소화합니다
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
              >
                무료 상담 신청
              </Link>
              <Link
                href="#case-studies"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700"
              >
                사례 살펴보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              제조 기업의 계약 검토 과제
            </h2>
            <p className="text-xl text-gray-600">
              제조업의 복잡한 계약 요구사항을 해결합니다
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">품질 관리</h3>
              <p className="text-gray-600">
                제품 품질 및 안전성 관련 계약 요구사항 관리
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">공급망 관리</h3>
              <p className="text-gray-600">
                글로벌 공급망의 계약 및 리스크 관리
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">지식재산권</h3>
              <p className="text-gray-600">
                특허, 상표 등 지식재산권 보호 및 관리
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Contract Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              주요 계약 유형
            </h2>
            <p className="text-xl text-gray-600">
              제조 기업을 위한 맞춤형 계약 검토 서비스
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">구매 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 원자재 및 부품 구매<br />
                    - 품질 요구사항<br />
                    - 납기 조건
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">제조 위탁 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 생산 조건 및 품질<br />
                    - 비용 및 지불 조건<br />
                    - 지식재산권
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">유통 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 판매 조건 및 가격<br />
                    - 물류 및 배송<br />
                    - 보증 및 A/S
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">기술 라이선스</h3>
                  <p className="mt-2 text-gray-600">
                    - 기술 사용 권한<br />
                    - 로열티 조건<br />
                    - 비밀유지 협약
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              검증된 성과
            </h2>
            <p className="text-xl text-gray-600">
              제조 기업 고객들의 실제 성과 지표
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">97%</div>
              <p className="text-gray-600">계약 리스크 감소</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">70%</div>
              <p className="text-gray-600">계약 검토 시간 단축</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <p className="text-gray-600">고객 만족도</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">48h</div>
              <p className="text-gray-600">평균 검토 완료 시간</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              성공 사례
            </h2>
            <p className="text-xl text-gray-600">
              실제 제조 기업들의 성공적인 계약 검토 사례
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                글로벌 공급망 계약
              </h3>
              <p className="text-gray-600 mb-4">
                매뉴팩처링은 글로벌 공급망 계약을 검토하여 공급 안정성을 85% 향상시키고, 원자재 비용을 20% 절감했습니다.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>공급망</span>
                <span className="mx-2">•</span>
                <span>글로벌 거래</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                기술 라이선스 계약
              </h3>
              <p className="text-gray-600 mb-4">
                테크팩토리는 기술 라이선스 계약을 검토하여 지식재산권 보호를 강화하고, 라이선스 수익을 35% 증가시켰습니다.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>기술 라이선스</span>
                <span className="mx-2">•</span>
                <span>지식재산권</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-xl text-gray-600">
              제조 기업 고객들이 자주 문의하는 질문들
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                글로벌 공급망 계약도 처리 가능한가요?
              </h3>
              <p className="text-gray-600">
                네, 글로벌 공급망 계약도 처리 가능합니다. 다국어 계약 검토와 국제 무역 규정 준수를 보장합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                지식재산권은 어떻게 보호하나요?
              </h3>
              <p className="text-gray-600">
                특허, 상표, 영업비밀 등 지식재산권 보호 조항을 계약에 반영하고, 라이선스 조건을 명확히 하여 보호합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            제조 기업을 위한 맞춤형 계약 검토
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            첫 계약 검토는 무료로 제공됩니다
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
} 