'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FileUpload from '../components/FileUpload'
import { CheckCircleIcon, ExclamationTriangleIcon, DocumentTextIcon, LockClosedIcon, ArrowPathIcon, ServerStackIcon, ShieldCheckIcon, EyeIcon, TagIcon, UserIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function UploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [uploaded, setUploaded] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [quote, setQuote] = useState<number | null>(null)
  const [contractType, setContractType] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(0) // 0: Upload, 1: Analysis, 2: Preview
  const [progress, setProgress] = useState({
    pagesProcessed: 0,
    totalPages: 12,
    sectionsAnalyzed: 0,
    confidence: 0
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || status === 'loading') return
    if (!session?.user) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('redirectAfterLogin', '/upload')
      }
    }
  }, [session, status, mounted])

  // Simple contract type detection (optional, can be removed)
  const detectContractType = (fileName: string): string => {
    const name = fileName.toLowerCase()
    if (name.includes('근로') || name.includes('employment') || name.includes('노동')) return '근로계약서'
    if (name.includes('매매') || name.includes('sale') || name.includes('purchase')) return '매매계약서'
    if (name.includes('임대') || name.includes('lease') || name.includes('rental')) return '임대차계약서'
    if (name.includes('용역') || name.includes('service') || name.includes('위탁')) return '용역계약서'
    if (name.includes('파트너') || name.includes('partnership') || name.includes('협력')) return '파트너십계약서'
    if (name.includes('투자') || name.includes('investment') || name.includes('자본')) return '투자계약서'
    if (name.includes('라이센스') || name.includes('license') || name.includes('특허')) return '라이센스계약서'
    return '일반계약서'
  }

  const handleFilesUploaded = (files: any[]) => {
    setUploadedFiles(files)
    setUploaded(true)
    setError(null)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('uploadedFiles', JSON.stringify(files))
    }
    const detectedType = detectContractType(files[0]?.name || '')
    setContractType(detectedType)
    setStep(1) // Show the analyze button step
  }

  // Only start analysis when this is called
  const handleStartAnalysis = () => {
    setProgress({ pagesProcessed: 0, totalPages: 12, sectionsAnalyzed: 0, confidence: 0 })
    setStep(1.5) // Custom step to show analysis progress
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 200
      setProgress(prev => {
        const percent = Math.min(elapsed / 3000, 1)
        return {
          pagesProcessed: Math.floor(12 * percent),
          totalPages: 12,
          sectionsAnalyzed: Math.floor(8 * percent),
          confidence: Math.floor(100 * percent)
        }
      })
      if (elapsed >= 3000) {
        clearInterval(interval)
        setQuote(300000 + Math.floor(Math.random() * 200000))
        if (typeof window !== 'undefined') {
          const mockAnalysis = {
            riskLevel: 'LOW',
            riskScore: 2,
          }
          sessionStorage.setItem('analysis', JSON.stringify(mockAnalysis))
          sessionStorage.setItem('analysisComplete', 'true')
        }
        setStep(2)
      }
    }, 200)
  }

  const handleProceedToPayment = () => {
    if (quote) {
      sessionStorage.setItem('quote', quote.toString())
      sessionStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles))
      // Ensure analysis and analysisComplete are set (redundant, but safe)
      if (typeof window !== 'undefined') {
        if (!sessionStorage.getItem('analysis')) {
          const mockAnalysis = {
            riskLevel: 'LOW',
            riskScore: 2,
          }
          sessionStorage.setItem('analysis', JSON.stringify(mockAnalysis))
        }
        if (!sessionStorage.getItem('analysisComplete')) {
          sessionStorage.setItem('analysisComplete', 'true')
        }
      }
      router.push('/payment')
    }
  }

  // Stepper UI
  const stepLabels = ['업로드', '미리보기', '견적']
  // Stepper progress bar percentage
  const stepProgress = [0, 33, 66, 100][step]

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <LockClosedIcon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">계약서 분석 서비스를 이용하려면 로그인해 주세요.</p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center"
              >
                로그인
              </Link>
              <Link
                href="/register"
                className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-center"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">계약서 분석 시작하기</h1>
          <p className="text-indigo-100 text-lg md:text-xl mb-6">
            업로드만 하면, 신속하고 정확하게 계약서를 분석해 드립니다.<br />
            모든 파일은 안전하게 암호화되어 처리되며, 개인정보는 철저히 보호됩니다.
          </p>
        </div>
      </section>
      {/* Stepper icons and labels */}
      <div className="max-w-4xl mx-auto w-full mt-8 px-4">
        <div className="flex items-center justify-between mb-0 relative z-10">
          {stepLabels.map((label, idx) => {
            const isCompleted = step > idx;
            const isCurrent = step === idx;
            return (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-200 shadow-sm
                  ${isCompleted
                    ? 'bg-green-500 text-white border-2 border-green-500'
                    : isCurrent
                    ? 'bg-indigo-600 text-white border-2 border-indigo-600'
                    : 'bg-indigo-300 text-white border-2 border-indigo-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className={`mt-2 text-xs font-semibold transition-colors duration-200
                  ${isCompleted
                    ? 'text-green-600'
                    : isCurrent
                    ? 'text-indigo-700'
                    : 'text-gray-400'
                  }`}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
        {/* Progress Bar - below stepper, match generation page */}
        <div className="relative h-2 mt-4 mb-10 w-full">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-indigo-200 rounded" style={{ transform: 'translateY(-50%)' }} />
          <div
            className="absolute left-0 top-1/2 h-1 bg-green-200 rounded transition-all duration-500"
            style={{
              width: `${step / (stepLabels.length - 1) * 100}%`,
              transform: 'translateY(-50%)',
            }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4 flex-1 flex flex-col justify-start">
        {/* Security reassurance line */}
        <div className="text-center text-xs text-gray-500 mb-4 mt-2">
          <LockClosedIcon className="inline w-4 h-4 mr-1 text-indigo-400 align-text-bottom" />
          업로드된 파일은 암호화되어 안전하게 처리되며, 외부에 절대 공유되지 않습니다.
        </div>
        {/* Step 0: Upload */}
        {step === 0 && !uploaded && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">계약서 파일 업로드</h2>
            <p className="text-gray-600 mb-6 text-center">분석할 계약서 파일을 업로드해 주세요. PDF, DOC, DOCX 형식을 지원합니다.</p>
            <FileUpload onFilesUploaded={handleFilesUploaded} />
          </div>
        )}
        {/* Step 1: Show Analyze Button after upload */}
        {step === 1 && uploaded && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">계약서 업로드 완료</h2>
            <p className="text-gray-600 mb-6 text-center">이제 계약서 분석을 시작할 수 있습니다.</p>
            <button
              onClick={handleStartAnalysis}
              className="inline-flex items-center px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all text-xl whitespace-nowrap"
            >
              계약서 분석 시작하기
            </button>
          </div>
        )}
        {/* Step 1.5: Database Analysis (only after button click) */}
        {step === 1.5 && (
          <div className="bg-gradient-to-br from-indigo-100 via-white to-purple-100 rounded-2xl shadow-xl p-8 mb-8 text-center border border-indigo-100">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center mb-4 shadow-md animate-spin-slow">
                <ServerStackIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">계약서 데이터베이스 분석 중...</h3>
              <p className="text-gray-600 mb-4">계약서를 데이터베이스에서 분석하고 있습니다. 잠시만 기다려 주세요.</p>
            </div>
            {/* Progress Bars */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>페이지 처리</span>
                  <span>{progress.pagesProcessed} / {progress.totalPages}</span>
                </div>
                <div className="w-full bg-indigo-100 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full transition-all duration-300 shadow-sm" style={{ width: `${(progress.pagesProcessed / progress.totalPages) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>조항 분석</span>
                  <span>{progress.sectionsAnalyzed} / 8</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full transition-all duration-300 shadow-sm" style={{ width: `${(progress.sectionsAnalyzed / 8) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>신뢰도</span>
                  <span>{progress.confidence}%</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full transition-all duration-300 shadow-sm" style={{ width: `${progress.confidence}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Preview/Quote */}
        {step === 2 && uploaded && quote && (
          <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-2xl p-14 mb-8 border border-indigo-200 max-w-5xl mx-auto">
            {/* Top summary badge */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
                <span className="text-green-700 font-bold text-xl">안전 분석 완료</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold shadow-sm border border-indigo-200">AI+DB 분석</span>
            </div>
            {/* File & Analysis Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/90 rounded-xl p-8 mb-8 border border-indigo-100">
              {/* File Info */}
              <div className="flex flex-col gap-2 justify-between h-full">
                <div>
                  <h4 className="font-bold text-lg text-indigo-700 mb-4 flex items-center gap-2">
                    <DocumentTextIcon className="w-6 h-6 text-indigo-400" /> 파일 정보
                  </h4>
                  <ul className="text-gray-800 text-base space-y-2">
                    <li className="flex items-center gap-2"><b>계약서명:</b>
                      <span
                        className="truncate max-w-[400px] md:max-w-[600px] inline-block align-middle overflow-hidden whitespace-nowrap text-ellipsis"
                        title={uploadedFiles[0]?.name}
                      >
                        {uploadedFiles[0]?.name}
                      </span>
                    </li>
                    <li className="flex items-center gap-2"><b>계약 종류:</b> <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-100 text-indigo-700 ml-1">{contractType}</span></li>
                    <li className="flex items-center gap-2"><b>파일 형식:</b>
                      <span
                        className="truncate max-w-[120px] md:max-w-[200px] inline-block align-middle overflow-hidden whitespace-nowrap text-ellipsis"
                        title={uploadedFiles[0]?.type}
                      >
                        {uploadedFiles[0]?.name?.split('.').pop()?.toUpperCase() || (uploadedFiles[0]?.type ? uploadedFiles[0].type.split('/').pop()?.toUpperCase() : '')}
                      </span>
                    </li>
                    <li className="flex items-center gap-2 break-all"><b>이메일:</b> <span className="truncate max-w-[400px] md:max-w-[600px] inline-block align-middle">{session?.user?.email}</span></li>
                    <li className="flex items-center gap-2"><b>업로드 일시:</b> {uploadedFiles[0]?.lastModified ? new Date(uploadedFiles[0].lastModified).toLocaleString() : '-'}</li>
                    <li className="flex items-center gap-2"><b>파일 크기:</b> {uploadedFiles[0] ? (uploadedFiles[0].size / 1024).toFixed(1) + ' KB' : '-'}</li>
                    <li className="flex items-center gap-2"><b>페이지 수:</b> {progress.totalPages}</li>
                  </ul>
                </div>
                <div className="border-t border-indigo-100 my-4"></div>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li><b>분석 ID:</b> {uploadedFiles[0]?.name?.slice(0,6) ?? 'DOC'}-{uploadedFiles[0]?.lastModified?.toString().slice(-4) ?? '0000'}</li>
                  <li><b>분석 소요 시간:</b> 약 3초</li>
                  <li><b>분석 담당 변호사:</b> 홍길동 변호사</li>
                </ul>
              </div>
              {/* Analysis Info */}
              <div className="md:border-l border-indigo-100 pl-0 md:pl-8 flex flex-col justify-between h-full">
                <div>
                  <h4 className="font-bold text-lg text-green-700 mb-4 flex items-center gap-2">
                    <ShieldCheckIcon className="w-6 h-6 text-green-500" /> 분석 결과
                  </h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${progress.confidence >= 80 ? 'bg-green-100 text-green-700' : progress.confidence >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      <ShieldCheckIcon className="w-4 h-4 mr-1" /> 위험도: {progress.confidence >= 80 ? '낮음' : progress.confidence >= 50 ? '보통' : '높음'}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold shadow-sm">
                      <ChartBarIcon className="w-4 h-4 mr-1" /> 신뢰도: {progress.confidence}%
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm mb-4">주요 리스크 없음. 결제 후 전체 리포트와 전문가 의견을 확인하실 수 있습니다.</div>
                  <div className="border-t border-indigo-100 my-4"></div>
                  <ul className="mt-4 text-left space-y-3 w-full">
                    <li className="flex items-center gap-3 text-base text-gray-900 font-semibold bg-green-50 rounded-lg px-3 py-2 shadow-sm"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 상세 리스크 분석 리포트</li>
                    <li className="flex items-center gap-3 text-base text-gray-900 font-semibold bg-blue-50 rounded-lg px-3 py-2 shadow-sm"><CheckCircleIcon className="w-5 h-5 text-blue-500" /> 변호사 1:1 Q&A 및 상담</li>
                    <li className="flex items-center gap-3 text-base text-gray-900 font-semibold bg-purple-50 rounded-lg px-3 py-2 shadow-sm"><CheckCircleIcon className="w-5 h-5 text-purple-500" /> 계약서 개선 제안</li>
                  </ul>
                </div>
                <div className="border-t border-indigo-100 my-4"></div>
                <ul className="text-gray-500 text-sm space-y-1">
                  <li><b>분석 방식:</b> AI+DB 자동 분석</li>
                </ul>
              </div>
            </div>
            {/* Estimate Section */}
            <div className="mb-8 flex flex-col items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold shadow-sm mb-2 border border-green-200">결제 후 전체 리포트 제공</span>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">견적 금액</h4>
              <div className="text-4xl font-extrabold text-indigo-700 mb-2">₩{quote.toLocaleString()}</div>
              <p className="text-gray-600 text-base">VAT 포함, 1회 결제로 모든 서비스 제공</p>
            </div>
            <div className="flex justify-center w-full mb-4">
              <button
                onClick={handleProceedToPayment}
                className="inline-flex items-center px-12 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all text-2xl whitespace-nowrap"
              >
                결제하기
              </button>
            </div>
            <div className="text-sm text-gray-400 mt-2 flex items-center justify-center gap-1">
              <LockClosedIcon className="w-5 h-5 mr-1" /> 모든 파일은 암호화되어 안전하게 처리되며, 외부에 절대 공유되지 않습니다.
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-4 text-center">
            <ExclamationTriangleIcon className="w-6 h-6 inline-block mr-2" />
            {error}
          </div>
        )}
      </div>
    </div>
  )
} 