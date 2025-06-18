'use client';

import Link from 'next/link';

export default function FinanceIndustry() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              금융 기업을 위한 스마트 계약 검토
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              AI와 법률 전문가가 금융 기업의 계약 리스크를 최소화합니다
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
              금융 기업의 계약 검토 과제
            </h2>
            <p className="text-xl text-gray-600">
              엄격한 규제와 복잡한 금융 거래의 도전 과제를 해결합니다
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">규제 준수</h3>
              <p className="text-gray-600">
                금융위원회, 금융감독원 등 규제 기관의 요구사항 준수
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">리스크 관리</h3>
              <p className="text-gray-600">
                신용, 시장, 운영 리스크를 포함한 종합적인 리스크 관리
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">글로벌 거래</h3>
              <p className="text-gray-600">
                국제 금융 거래와 관련된 복잡한 법적 요구사항 대응
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
              금융 기업을 위한 맞춤형 계약 검토 서비스
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
                  <h3 className="text-lg font-medium text-gray-900">투자 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 투자 조건 및 수익 배분<br />
                    - 투자자 보호 조항<br />
                    - 투자 철회 및 청산 조건
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
                  <h3 className="text-lg font-medium text-gray-900">금융 서비스 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 서비스 범위 및 수수료<br />
                    - 규제 준수 조항<br />
                    - 책임 한계 및 면책 조항
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
                  <h3 className="text-lg font-medium text-gray-900">M&A 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 인수 조건 및 가격<br />
                    - 실사 및 보증<br />
                    - 인수 후 통합 계획
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
                  <h3 className="text-lg font-medium text-gray-900">파생상품 계약</h3>
                  <p className="mt-2 text-gray-600">
                    - 거래 조건 및 정산<br />
                    - 담보 및 증거금<br />
                    - 리스크 관리 조항
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
              금융 기업 고객들의 실제 성과 지표
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-600">규제 준수율 향상</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
              <p className="text-gray-600">계약 검토 시간 단축</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
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
              실제 금융 기업들의 성공적인 계약 검토 사례
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                핀테크 투자 계약 검토
              </h3>
              <p className="text-gray-600 mb-4">
                금융투자사는 핀테크 스타트업 투자 계약을 검토하며, 투자자 보호 조항을 강화하고 리스크를 40% 감소시켰습니다.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>핀테크</span>
                <span className="mx-2">•</span>
                <span>투자 계약</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                글로벌 금융 서비스 계약
              </h3>
              <p className="text-gray-600 mb-4">
                국제은행은 글로벌 금융 서비스 계약을 검토하여 규제 준수율을 95%로 향상시키고, 서비스 범위를 확장했습니다.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>글로벌 금융</span>
                <span className="mx-2">•</span>
                <span>서비스 계약</span>
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
              금융 기업 고객들이 자주 문의하는 질문들
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                금융 규제 변경에 어떻게 대응하나요?
              </h3>
              <p className="text-gray-600">
                LawScan은 금융 규제 변경사항을 실시간으로 모니터링하고, 계약 검토 시 최신 규제 요구사항을 반영합니다. 전문가 검토를 통해 규제 준수를 보장합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                글로벌 금융 거래는 어떻게 처리하나요?
              </h3>
              <p className="text-gray-600">
                각국의 금융 규제와 법률을 고려한 종합적인 계약 검토를 제공합니다. 국제 금융 거래의 특수성을 반영한 맞춤형 검토 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            금융 기업을 위한 맞춤형 계약 검토
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