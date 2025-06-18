'use client'

import { useState } from 'react'
import Link from 'next/link'
import FileUpload from '../components/FileUpload'

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

export default function TrialPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files)
    // Start analysis after files are uploaded
    if (files.length > 0) {
      setIsAnalyzing(true)
      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              무료 체험으로 시작하세요
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              AI 기반 계약서 분석의 강력함을 직접 경험해보세요. 
              첫 번째 계약서는 완전 무료로 분석해드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Trial Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                무료 체험 혜택
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">첫 번째 계약서 무료 분석</h3>
                    <p className="text-gray-600">PDF 또는 DOCX 파일을 업로드하면 AI가 즉시 분석을 시작합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">상세한 리스크 리포트</h3>
                    <p className="text-gray-600">계약서의 잠재적 위험 요소와 개선 방안을 상세히 제시합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">전문가 검토 의견</h3>
                    <p className="text-gray-600">법률 전문가의 추가 검토 및 개선 제안을 받을 수 있습니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">신용카드 정보 불필요</h3>
                    <p className="text-gray-600">무료 체험을 위해 신용카드 정보를 입력할 필요가 없습니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">지원 파일 형식</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">PDF 파일</div>
                    <div className="text-sm text-gray-600">최대 10MB</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">DOCX 파일</div>
                    <div className="text-sm text-gray-600">최대 10MB</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <strong>보안 보장:</strong> 업로드된 파일은 분석 완료 후 자동으로 삭제되며, 
                    모든 데이터는 SSL/TLS 암호화로 보호됩니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              계약서 업로드
            </h2>
            <p className="text-lg text-gray-600">
              분석하고 싶은 계약서를 업로드하세요. AI가 즉시 분석을 시작합니다.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <FileUpload 
              onFilesUploaded={handleFilesUploaded}
              maxFiles={1}
              maxFileSize={10 * 1024 * 1024} // 10MB
              acceptedTypes={['.pdf', '.docx', '.doc']}
            />
          </div>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI 분석 중...</h3>
                <p className="text-gray-600">
                  계약서를 분석하고 있습니다. 잠시만 기다려 주세요.
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Complete */}
          {analysisComplete && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">분석 완료!</h3>
                <p className="text-gray-600 mb-6">
                  계약서 분석이 완료되었습니다. 상세한 결과를 확인해보세요.
                </p>
                <div className="space-y-4">
                  <Link
                    href="/review?id=trial-123"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                  >
                    분석 결과 보기
                  </Link>
                  <div className="text-sm text-gray-500">
                    또는 <Link href="/register" className="text-indigo-600 hover:text-indigo-800">회원가입</Link>하여 
                    더 많은 계약서를 분석해보세요.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              LawScan의 강력한 기능
            </h2>
            <p className="text-lg text-gray-600">
              AI와 법률 전문가가 함께하는 완벽한 계약서 분석
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI 기반 분석</h3>
              <p className="text-gray-600">
                최첨단 AI 기술로 계약서의 모든 위험 요소를 빠르고 정확하게 식별합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">전문가 검토</h3>
              <p className="text-gray-600">
                강남 최고급 로펌의 전문 변호사가 AI 분석 결과를 검토하고 추가 의견을 제공합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">실용적 제안</h3>
              <p className="text-gray-600">
                단순한 문제 지적을 넘어서 구체적이고 실용적인 개선 방안을 제시합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            무료 체험으로 LawScan의 강력함을 경험해보세요.
          </p>
          <div className="space-x-4">
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors"
            >
              무료 회원가입
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 