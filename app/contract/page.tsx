'use client'

import Link from 'next/link'

export default function ContractChoice() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4">
          어떤 도움이 필요하신가요?
        </h1>
        <p className="text-xl text-gray-700 text-center mb-16">
          계약서 작성 또는 검토를 시작해보세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Draft New Contract */}
          <Link 
            href="/review?type=draft"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-indigo-200"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="text-yellow-500 mb-6">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">계약서 작성</h2>
            <p className="text-gray-700 mb-6">
              전문 변호사와 함께 새로운 계약서를 작성해보세요. 귀하의 요구사항에 맞는 맞춤형 계약서를 제공해드립니다.
            </p>
            <div className="text-yellow-500 font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
              시작하기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Review Existing Contract */}
          <Link 
            href="/review?type=review"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-indigo-200"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="text-yellow-500 mb-6">
              <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">계약서 검토</h2>
            <p className="text-gray-700 mb-6">
              기존 계약서를 전문가의 눈으로 검토해드립니다. 상세한 분석과 개선사항을 제공해드립니다.
            </p>
            <div className="text-yellow-500 font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
              계약서 업로드
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 