'use client'
import Link from 'next/link'
import { Navbar } from './components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                대한민국 최초의 AI 기반 계약서 검토 서비스
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI로 더 스마트하게<br />
                계약서를 검토하세요
              </h1>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                LawScan은 대한민국 최초로 도입된 AI 기반 계약서 검토 서비스입니다.<br />
                AI 기술을 활용하여 더 빠르고 정확한 계약서 검토를 제공합니다.
              </p>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/trial"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  무료 체험하기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why AI Contract Review Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI 기반 계약 검토가 필요한 이유
              </h2>
              <p className="text-xl text-gray-600">
                LawScan은 AI 기술을 활용하여 더 빠르고, 더 정확한 검토를 제공합니다
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 검토</h3>
                <p className="text-gray-600">
                  AI 기술을 활용하여 24시간 이내에 계약서 검토를 완료합니다.<br />
                  긴급한 검토가 필요한 경우 3시간 이내에도 가능합니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">정확한 분석</h3>
                <p className="text-gray-600">
                  법률 전문가들이 학습한 AI가 계약서의 잠재적 위험을 정확하게 분석합니다.<br />
                  누락된 조항이나 불리한 조건을 빠짐없이 찾아냅니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">전문가 상담</h3>
                <p className="text-gray-600">
                  AI 검토 결과에 대한 법률 전문가의 검증과 상담을 제공합니다.<br />
                  복잡한 법적 이슈에 대한 전문적인 조언을 받을 수 있습니다.
                </p>
              </div>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">맞춤형 보고서</h3>
                <p className="text-gray-600">
                  계약서의 주요 위험 요소와 개선 사항을 상세히 분석한 보고서를 제공합니다.<br />
                  법률 용어를 쉽게 설명하여 누구나 이해할 수 있습니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">보안 보장</h3>
                <p className="text-gray-600">
                  모든 계약서는 암호화되어 안전하게 보관됩니다.<br />
                  엄격한 보안 시스템으로 기업의 중요한 정보를 보호합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Importance of AI Review Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI 계약 검토의 중요성
              </h2>
              <p className="text-xl text-gray-600">
                디지털 시대의 필수적인 계약 관리 솔루션
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">기업의 위험 관리</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">
                      계약서의 잠재적 위험을 사전에 식별하여 법적 분쟁 예방
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">
                      법률 전문가의 검토 시간 단축으로 비용 절감
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">
                      일관된 검토 기준으로 기업의 법적 리스크 관리 강화
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">디지털 혁신</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">
                      AI 기술을 활용한 계약서 자동화로 업무 효율성 향상
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">
                      실시간 계약 검토로 빠른 의사결정 지원
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-indigo-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">
                      데이터 기반의 계약 분석으로 전략적 의사결정 지원
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">미래 지향적 계약 관리</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">빅데이터 활용</h4>
                  <p className="text-gray-600">
                    수많은 계약서 데이터를 분석하여 최적의 계약 조건 제안
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">지속적 학습</h4>
                  <p className="text-gray-600">
                    새로운 법률과 규제에 맞춰 자동으로 업데이트되는 AI 시스템
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">글로벌 대응</h4>
                  <p className="text-gray-600">
                    다국어 계약서 지원으로 글로벌 비즈니스 확장 지원
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}