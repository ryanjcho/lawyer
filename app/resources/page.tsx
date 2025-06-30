'use client';

import Link from 'next/link';

export default function Resources() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">법무 리소스</span>
              <span className="block text-indigo-200">센터</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              계약 검토와 관련된 최신 정보, 가이드,<br/>
              <span className="font-semibold">전문 자료를 확인하세요</span>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              추천 아티클
            </h2>
            <p className="text-xl text-gray-600">
              계약 검토와 관련된 최신 트렌드와 인사이트
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2 font-medium">2024.03.15</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  계약 검토 혁신의 실제 사례
                </h3>
                <p className="text-gray-600 mb-4">
                  강남 최고급 로펌이 제공하는 혁신적인 계약 검토 프로세스를 알아봅니다.
                </p>
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  자세히 보기 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2 font-medium">2024.03.10</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  계약 리스크 관리 가이드
                </h3>
                <p className="text-gray-600 mb-4">
                  LawScan의 AI와 전문 변호사가 제공하는 효과적인 계약 리스크 관리 방법과 전략을 소개합니다.
                </p>
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  자세히 보기 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2 font-medium">2024.03.05</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  디지털 전환과 계약 관리
                </h3>
                <p className="text-gray-600 mb-4">
                  디지털 전환 시대의 계약 관리 트렌드와 LawScan의 대응 방안을 살펴봅니다.
                </p>
                <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides & Templates Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              가이드 & 템플릿
            </h2>
            <p className="text-xl text-gray-600">
              LawScan이 제공하는 계약 검토와 관리를 위한 실용적인 자료
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">계약 검토 체크리스트</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  계약 검토 기본 가이드
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  AI 리스크 평가 체크리스트
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  법적 검토 포인트
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  협상 전략 가이드
                </li>
              </ul>
              <Link href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                다운로드 →
              </Link>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">계약 템플릿</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  기술 라이선스 계약
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  서비스 제공 계약
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  NDA 템플릿
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  MOU 템플릿
                </li>
              </ul>
              <Link href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                다운로드 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars & Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              웨비나 & 이벤트
            </h2>
            <p className="text-xl text-gray-600">
              LawScan과 함께하는 AI 계약 검토 온라인 세미나
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-lg p-2 mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-indigo-600 font-medium">2024.04.15 14:00</div>
                  <h3 className="text-xl font-bold text-gray-900">
                    AI 기반 계약 검토 시스템 도입 가이드
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                강남 최고급 로펌의 AI 기반 계약 검토 시스템 도입 시 고려사항과 성공 사례를 공유합니다.
              </p>
              <Link href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                등록하기 →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 rounded-lg p-2 mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-indigo-600 font-medium">2024.04.20 15:00</div>
                  <h3 className="text-xl font-bold text-gray-900">
                    계약 리스크 관리 워크숍
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                LawScan의 AI와 전문 변호사가 함께하는 실전 계약 리스크 관리 방법과 사례를 살펴봅니다.
              </p>
              <Link href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                등록하기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Updates Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              법규 업데이트
            </h2>
            <p className="text-xl text-gray-600">
              계약과 관련된 최신 법규 및 규제 동향
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">개인정보보호법</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2024년 개정사항
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  계약서 작성 가이드
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  개인정보 처리방침
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">전자상거래법</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  최신 개정사항
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  전자계약 가이드
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  소비자보호 규정
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-indigo-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">국제 규제</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  GDPR 대응 가이드
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  국제 계약 규정
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  크로스보더 거래
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            더 많은 법무 리소스를 확인하세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            LawScan이 정기적으로 업데이트하는 AI 계약 검토 관련 콘텐츠를<br/>
            뉴스레터로 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              뉴스레터 구독하기
            </Link>
            <Link
              href="/trial"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              무료 체험 시작하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 