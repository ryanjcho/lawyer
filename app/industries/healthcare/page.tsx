'use client';

import Link from 'next/link';

export default function HealthcareIndustry() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">의료 기관을 위한</span>
              <span className="block text-indigo-200">AI 계약 분석 솔루션</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              의료 기관의 특성을 고려한 맞춤형 계약 분석으로 법률 리스크를 사전에 예방하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                요금제 보기
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                무료 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              의료 기관의 계약 검토 과제
            </h2>
            <p className="text-xl text-gray-600">
              엄격한 규제 환경에서의 계약 리스크 관리
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">의료 정보 보호</h3>
              <p className="text-gray-600">
                환자 개인정보, 의료기록 등 민감한 정보의 보호를 위한 엄격한 규제 준수와 계약 관리의 복잡성
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">의료법규 준수</h3>
              <p className="text-gray-600">
                의료법, 약사법, 의료기기법 등 복잡한 의료 관련 법규와 지속적인 규제 변경에 따른 계약 관리의 어려움
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">의료진 관리</h3>
              <p className="text-gray-600">
                의료진의 전문성과 독립성을 보장하면서도 의료기관의 책임과 의무를 명확히 하는 계약 조건 설정의 복잡성
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Contract Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              주요 계약 유형
            </h2>
            <p className="text-xl text-gray-600">
              의료 기관이 자주 다루는 계약 유형별 맞춤 분석
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">의료 서비스</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 서비스 제공 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료진 고용 및 위촉 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 협력 및 제휴 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>진료과별 전문의 계약</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">의료 장비 및 소모품</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료기기 구매 및 임대 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>장비 유지보수 및 수리 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 소모품 공급 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의약품 공급 및 관리 계약</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">연구 및 임상시험</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>임상시험 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 연구 협력 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 데이터 활용 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 특허 라이선스 계약</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">시설 및 운영</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>병원 시설 임대 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 서비스 외주 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 정보 시스템 계약</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>의료 보험 및 청구 계약</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              성과 지표
            </h2>
            <p className="text-xl text-gray-600">
              의료 기관 고객들의 실제 성과 결과
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">99%</div>
              <div className="text-gray-600">규제 준수율</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
              <div className="text-gray-600">계약 검토 시간 단축</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">97%</div>
              <div className="text-gray-600">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">48h</div>
              <div className="text-gray-600">평균 검토 완료 시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              성공 사례
            </h2>
            <p className="text-xl text-gray-600">
              의료 기관들의 실제 계약 검토 성공 사례
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">대형 종합병원 A</h3>
                  <p className="text-sm text-gray-600">의료기기 임대 계약</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                고가의 의료기기 임대 계약에서 유지보수 책임과 보험 조항을 명확히 하여 연간 2억원의 비용을 절약했습니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                결과: 연간 2억원 비용 절약
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">전문의료기관 B</h3>
                  <p className="text-sm text-gray-600">의료진 고용 계약</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                전문의 고용 계약에서 의료진의 독립성과 의료기관의 책임 범위를 명확히 하여 법적 분쟁을 사전에 방지했습니다.
              </p>
              <div className="text-sm text-indigo-600 font-medium">
                결과: 법적 분쟁 위험 제거
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-xl text-gray-600">
              의료 기관 고객들이 자주 묻는 질문들
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                의료 정보 보호는 어떻게 보장하나요?
              </h3>
              <p className="text-gray-600">
                개인정보보호법과 의료법을 준수하는 계약 조항을 검토하고, 데이터 처리 및 보관에 대한 엄격한 보안 요구사항을 포함합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                의료법규 변경에 어떻게 대응하나요?
              </h3>
              <p className="text-gray-600">
                의료 관련 법규 변경사항을 실시간으로 모니터링하고, 해당 규제에 영향을 받는 계약들을 자동으로 식별하여 업데이트를 제안합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                임상시험 계약도 검토 가능한가요?
              </h3>
              <p className="text-gray-600">
                임상시험계획서, 연구자 계약, 참가자 동의서 등 임상시험 관련 모든 계약을 검토하며, 생명윤리법과 임상시험관리기준을 준수합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                의료진의 독립성은 어떻게 보장하나요?
              </h3>
              <p className="text-gray-600">
                의료진의 전문적 판단과 치료의 독립성을 보장하는 계약 조항을 포함하며, 의료기관의 관리권과 의료진의 자율성을 조화롭게 설정합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            의료 기관을 위한 맞춤형 계약 분석을 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            첫 번째 계약 검토는 무료로 제공됩니다
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
} 