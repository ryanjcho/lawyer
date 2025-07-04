'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FileUpload from '../components/FileUpload'
import { CheckCircleIcon, ExclamationTriangleIcon, DocumentTextIcon, LockClosedIcon, ArrowPathIcon, ServerStackIcon, ShieldCheckIcon, EyeIcon, TagIcon, UserIcon, CalendarIcon, ChartBarIcon, BuildingOffice2Icon, GlobeAltIcon, LanguageIcon, UsersIcon, CalendarDaysIcon, ClockIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
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
  const [step, setStep] = useState(0) // 0: Upload, 1: Initial, 2: Options, 3: Final, 4: Confirmation
  const [progress, setProgress] = useState({
    pagesProcessed: 0,
    totalPages: 12,
    sectionsAnalyzed: 0,
    confidence: 0
  })
  const [mockExtractedDetails, setMockExtractedDetails] = useState<any | null>(null)
  const [quoteRange, setQuoteRange] = useState<[number, number] | null>(null)
  const [selectedUrgency, setSelectedUrgency] = useState('일반 (48시간)')
  const [formatting, setFormatting] = useState(false)
  const [clauseCombination, setClauseCombination] = useState(false)
  const [formalClauses, setFormalClauses] = useState(false)
  const [extraRevisions, setExtraRevisions] = useState(0)

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

  const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const getRandomSubset = (arr) => arr.filter(() => Math.random() > 0.5)

  const contractTypes = ['근로계약서', '매매계약서', 'NDA', '파트너십계약서', '임대차계약서', '용역계약서', '투자계약서', '라이센스계약서', '비밀유지계약서', '공급계약서', '프랜차이즈계약서']
  const industries = ['기술/IT', '제조', '바이오', '금융', '부동산', '유통', '헬스케어', '에너지', '교육', '엔터테인먼트']
  const languages = ['한글', '영문', '한글/영문', '중문']
  const urgencies = ['일반 (48시간)', '익스프레스 (24시간)', '슈퍼 익스프레스 (6시간)']
  const additionalServicesList = ['레드라인(수정표시)', '전화상담', '번역', '수정안 초안', '화상 미팅', '오프라인 미팅']
  const jurisdictions = ['대한민국', '미국', '중국', '일본', 'EU', '영국', '싱가포르']
  const governingLaws = ['대한민국', '미국', '영국', '싱가포르', 'EU', '일본']

  const handleFilesUploaded = (files: any[]) => {
    setUploadedFiles(files)
    setUploaded(true)
    setError(null)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('uploadedFiles', JSON.stringify(files))
    }
    // Generate randomized mock extracted details
    const file = files[0]
    const ext = file?.name?.split('.').pop()?.toUpperCase() || 'PDF'
    const contractType = getRandomFromArray(contractTypes)
    const industry = getRandomFromArray(industries)
    const language = getRandomFromArray(languages)
    const parties = getRandomInt(2, 6)
    const international = Math.random() > 0.5
    const annexes = getRandomInt(0, 4)
    const urgency = getRandomFromArray(urgencies)
    const additionalServices = getRandomSubset(additionalServicesList)
    const scanned = Math.random() > 0.8
    const bulk = Math.random() > 0.85
    const translation = language !== '한글'
    const wordCount = getRandomInt(1500, 10000)
    const pageCount = getRandomInt(2, 30)
    const jurisdiction = getRandomFromArray(jurisdictions)
    const governingLaw = getRandomFromArray(governingLaws)
    const hasSignatureFields = Math.random() > 0.3
    const hasTableOfContents = Math.random() > 0.5
    const hasHandwrittenNotes = Math.random() > 0.85
    const isTemplate = Math.random() > 0.7
    const confidentialityClause = Math.random() > 0.4
    // Delivery date based on urgency
    let deliveryDays = 2
    if (urgency.includes('24')) deliveryDays = 1
    if (urgency.includes('6')) deliveryDays = 0
    const deliveryDate = new Date(Date.now() + deliveryDays * 24 * 60 * 60 * 1000).toLocaleDateString()
    setContractType(contractType)
    setMockExtractedDetails({
      contractType,
      industry,
      language,
      parties,
      international,
      annexes,
      urgency,
      additionalServices,
      deliveryDate,
      fileFormat: ext,
      scanned,
      bulk,
      translation,
      wordCount,
      pageCount,
      jurisdiction,
      governingLaw,
      hasSignatureFields,
      hasTableOfContents,
      hasHandwrittenNotes,
      isTemplate,
      confidentialityClause,
    })
    setStep(1) // Show the analyze button step
  }

  // Only start analysis when this is called
  const handleStartAnalysis = () => {
    setProgress({ pagesProcessed: 0, totalPages: 12, sectionsAnalyzed: 0, confidence: 0 })
    setStep(1.5) // Custom step to show analysis progress
    let elapsed = 0
    const totalWait = 5000 // 5 seconds
    const interval = setInterval(() => {
      elapsed += 200
      setProgress(prev => {
        const percent = Math.min(elapsed / totalWait, 1)
        return {
          pagesProcessed: Math.floor(12 * percent),
          totalPages: 12,
          sectionsAnalyzed: Math.floor(8 * percent),
          confidence: Math.floor(100 * percent)
        }
      })
      if (elapsed >= totalWait) {
        clearInterval(interval)
        // Generate a random estimate range
        const min = 200000 + Math.floor(Math.random() * 200000)
        const max = min + 100000 + Math.floor(Math.random() * 200000)
        setQuoteRange([min, max])
        setQuote(min)
        if (typeof window !== 'undefined') {
          const mockAnalysis = {
            riskLevel: '낮음',
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
            riskLevel: '낮음',
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

  // Stepper steps
  const stepperSteps = [
    { label: '파일 업로드' },
    { label: '기본 견적 확인' },
    { label: '옵션 선택' },
    { label: '최종 견적 및 결제' },
    { label: '완료' },
  ]

  // Estimate calculation logic
  const baseFee = 500000
  const extraPageFee = mockExtractedDetails ? Math.max(0, (mockExtractedDetails.pageCount || 0) - 3) * 100000 : 0
  const formattingFee = formatting ? 100000 : 0
  const clauseCombinationFee = clauseCombination ? 300000 : 0
  const formalClausesFee = formalClauses ? 200000 : 0
  const extraRevisionFee = Math.max(0, extraRevisions) * 50000
  let urgencyMultiplier = 1
  if (selectedUrgency.includes('24')) urgencyMultiplier = 1.3
  if (selectedUrgency.includes('6')) urgencyMultiplier = 1.5
  const subtotal = baseFee + extraPageFee + formattingFee + clauseCombinationFee + formalClausesFee + extraRevisionFee
  const totalEstimate = Math.round(subtotal * urgencyMultiplier)

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
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">계약서 분석 견적 요청</h1>
          <p className="text-indigo-100 text-base md:text-lg mb-2">
            계약서 파일을 업로드하고, 맞춤 견적을 받아보세요.<br />
            모든 파일은 안전하게 암호화되어 처리됩니다.
          </p>
        </div>
      </section>
      {/* Stepper */}
      <div className="max-w-3xl mx-auto w-full mt-6 px-4">
        <div className="flex items-center justify-between mb-0 relative z-10">
          {stepperSteps.map((stepObj, idx) => {
            const isCompleted = step > idx;
            const isCurrent = step === idx;
            return (
              <div key={stepObj.label} className="flex-1 flex flex-col items-center relative">
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
                  {stepObj.label}
                </div>
              </div>
            );
          })}
        </div>
        {/* Progress Bar */}
        <div className="relative h-2 mt-4 mb-8 w-full">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-indigo-200 rounded" style={{ transform: 'translateY(-50%)' }} />
          <div
            className="absolute left-0 top-1/2 h-1 bg-green-200 rounded transition-all duration-500"
            style={{
              width: `${step / (stepperSteps.length - 1) * 100}%`,
              transform: 'translateY(-50%)',
            }}
          />
        </div>
      </div>
      {/* Step Content */}
      <div className="max-w-3xl mx-auto px-4 py-4 flex-1 flex flex-col justify-start">
        {/* Step 0: Upload */}
        {step === 0 && !uploaded && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 flex flex-col items-center max-w-xl mx-auto border border-indigo-100">
            <h2 className="text-2xl font-extrabold text-indigo-900 mb-2 text-center flex items-center gap-2">
              <DocumentTextIcon className="w-7 h-7 text-indigo-500" /> 계약서 파일 업로드
            </h2>
            <p className="text-gray-700 mb-6 text-center text-base">분석할 계약서 파일을 업로드해 주세요.<br />PDF, DOC, DOCX 형식을 지원합니다.</p>
            <FileUpload onFilesUploaded={handleFilesUploaded} />
          </div>
        )}
        {/* Step 1: Initial Estimate */}
        {step === 1 && uploaded && mockExtractedDetails && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 max-w-2xl mx-auto border border-indigo-100">
            <h2 className="text-xl font-extrabold text-indigo-800 mb-6 text-left flex items-center gap-2">
              <TagIcon className="w-7 h-7 text-indigo-500" /> 기본 견적 확인
            </h2>
            <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-baseline mb-6">
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">페이지 수:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{mockExtractedDetails.pageCount}</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">기본요금 (3페이지까지):</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">₩500,000</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">초과 페이지 요금:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{extraPageFee > 0 ? `₩${extraPageFee.toLocaleString()}` : '없음'}</div>
                </div>
                <div className="text-center text-2xl font-extrabold text-indigo-700 mb-2">예상 기본 견적: ₩{(baseFee + extraPageFee).toLocaleString()}</div>
                <div className="text-sm text-gray-500 text-center mb-4">* 실제 결제 금액은 옵션 선택 및 변호사 검토 후 달라질 수 있습니다.</div>
              </div>
              <div className="flex-1 bg-indigo-50 rounded-2xl p-6 border border-indigo-100 min-w-[260px]">
                <div className="font-extrabold text-indigo-700 text-lg mb-3 flex items-center gap-2"><ShieldCheckIcon className="w-6 h-6 text-indigo-400" />포함 서비스</div>
                <ul className="text-base text-black space-y-2">
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 요청 포인트 반영</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 내용/문구 추가</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 형식/실질 검토</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 위험성 탐지</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 메모 작성</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 표준 분량 설정</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-10">
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center px-8 py-3 rounded-2xl font-extrabold text-indigo-700 border-2 border-indigo-300 bg-white hover:bg-indigo-50 shadow transition-all text-lg whitespace-nowrap"
              >
                이전
              </button>
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center px-10 py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all text-lg whitespace-nowrap"
              >
                다음 (옵션 선택)
              </button>
            </div>
          </div>
        )}
        {/* Step 2: Options Selection */}
        {step === 2 && uploaded && mockExtractedDetails && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 max-w-2xl mx-auto border border-indigo-100">
            <h2 className="text-xl font-extrabold text-indigo-900 mb-2 text-center flex items-center gap-2">
              <TagIcon className="w-6 h-6 text-indigo-500" /> 옵션 선택
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-semibold mb-2 text-black">긴급도</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 text-black bg-white"
                  value={selectedUrgency}
                  onChange={e => setSelectedUrgency(e.target.value)}
                >
                  <option>일반 (48시간)</option>
                  <option>익스프레스 (24시간)</option>
                  <option>슈퍼 익스프레스 (6시간)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-black">서식 클리닝</label>
                <input type="checkbox" className="mr-2" checked={formatting} onChange={e => setFormatting(e.target.checked)} />
                <span className="text-black">서식 형식/수정 작업 (+₩100,000)</span>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-black">누락조항 추가</label>
                <input type="checkbox" className="mr-2" checked={clauseCombination} onChange={e => setClauseCombination(e.target.checked)} />
                <span className="text-black">필수 조항 추가 (+₩300,000)</span>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-black">추천조항 추가</label>
                <input type="checkbox" className="mr-2" checked={formalClauses} onChange={e => setFormalClauses(e.target.checked)} />
                <span className="text-black">Formal/추천조항 추가 (+₩200,000)</span>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-black">추가 수정 요청 횟수</label>
                <input
                  type="number"
                  min={0}
                  value={extraRevisions}
                  onChange={e => setExtraRevisions(Number(e.target.value))}
                  className="w-20 border rounded-lg px-2 py-1 mr-2 text-black bg-white"
                />
                <span className="text-black">회 (2회 무료, 초과 1회당 +₩50,000)</span>
              </div>
            </div>
            <div className="text-center text-lg font-bold text-indigo-700 mb-2">옵션 적용 예상 견적: ₩{subtotal.toLocaleString()}</div>
            <div className="text-xs text-gray-500 text-center mb-4">* 실제 결제 금액은 변호사 검토 후 달라질 수 있습니다.</div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center px-6 py-2 rounded-xl font-bold text-indigo-700 border border-indigo-300 bg-white hover:bg-indigo-50 shadow transition-all text-base whitespace-nowrap"
              >
                이전
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all text-xl whitespace-nowrap"
              >
                다음 (최종 견적 확인)
              </button>
            </div>
          </div>
        )}
        {/* Step 3: Final Estimate & Payment */}
        {step === 3 && uploaded && mockExtractedDetails && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 max-w-2xl mx-auto border border-indigo-100">
            <h2 className="text-xl font-extrabold text-indigo-800 mb-6 text-left flex items-center gap-2">
              <TagIcon className="w-7 h-7 text-indigo-500" /> 최종 견적 및 결제
            </h2>
            <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 items-baseline mb-6">
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">기본요금:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">₩500,000</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">초과 페이지 요금:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{extraPageFee > 0 ? `₩${extraPageFee.toLocaleString()}` : '없음'}</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">서식 클리닝:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{formatting ? '+₩100,000' : '미포함'}</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">누락조항 추가:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{clauseCombination ? '+₩300,000' : '미포함'}</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">추천조항 추가:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{formalClauses ? '+₩200,000' : '미포함'}</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">추가 수정 요청:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{extraRevisions > 0 ? `${extraRevisions}회 (+₩${extraRevisionFee.toLocaleString()})` : '없음 (2회 무료)'}</div>
                  <div className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">긴급도:</div>
                  <div className="text-black font-bold text-lg whitespace-nowrap">{selectedUrgency} {urgencyMultiplier > 1 ? `(x${urgencyMultiplier})` : ''}</div>
                </div>
                <div className="text-center text-2xl font-extrabold text-indigo-700 mb-2">최종 예상 견적: ₩{totalEstimate.toLocaleString()}</div>
                <div className="text-sm text-gray-500 text-center mb-4 font-normal">* 실제 결제 금액은 변호사 검토 및 추가 요청에 따라 달라질 수 있습니다.</div>
                <div className="flex justify-center gap-6 mt-10">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-8 py-3 rounded-2xl font-extrabold text-indigo-700 border-2 border-indigo-300 bg-white hover:bg-indigo-50 shadow transition-all text-lg whitespace-nowrap"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="inline-flex items-center px-10 py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all text-lg whitespace-nowrap"
                  >
                    결제하기
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-indigo-50 rounded-2xl p-6 border border-indigo-100 min-w-[260px] mt-8 md:mt-0">
                <div className="font-extrabold text-indigo-700 text-lg mb-3 flex items-center gap-2"><ShieldCheckIcon className="w-6 h-6 text-indigo-400" />포함 서비스</div>
                <ul className="text-base text-black space-y-2">
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 요청 포인트 반영</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 내용/문구 추가</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 형식/실질 검토</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 위험성 탐지</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 메모 작성</li>
                  <li className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5 text-green-500" /> 표준 분량 설정</li>
                </ul>
                <div className="mt-6">
                  <div className="font-bold text-indigo-700 mb-2 text-base">선택한 옵션 요약</div>
                  <ul className="text-sm text-black space-y-1">
                    <li>긴급도: {selectedUrgency}</li>
                    <li>서식 클리닝: {formatting ? '포함' : '미포함'}</li>
                    <li>누락조항 추가: {clauseCombination ? '포함' : '미포함'}</li>
                    <li>추천조항 추가: {formalClauses ? '포함' : '미포함'}</li>
                    <li>추가 수정 요청: {extraRevisions > 0 ? `${extraRevisions}회` : '없음 (2회 무료)'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">견적 요청 완료</h2>
            <p className="text-black mb-4">견적 요청이 정상적으로 접수되었습니다.<br />
              담당 변호사가 곧 검토 후 연락드릴 예정입니다.<br />
              추가 요청이나 문의사항이 있으시면 언제든 연락해 주세요.</p>
            <Link href="/dashboard" className="inline-block mt-4 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl transition-all text-xl">내 대시보드로 이동</Link>
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