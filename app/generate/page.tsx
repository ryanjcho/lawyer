'use client'

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react'
import ContractGenerationPreview from '../components/ContractGenerationPreview'

// Externalized strings for future i18n
const STRINGS = {
  steps: [
    '기본 정보',
    '계약 정보',
    '당사자 정보',
    '주요 조건',
    '요약 및 제출',
  ],
  contractTypes: [
    '근로계약',
    'NDA(비밀유지계약)',
    '서비스계약',
    '공급계약',
    '임대차계약',
    '기타',
  ],
  required: '필수 입력 항목입니다.',
  invalidEmail: '유효한 이메일 주소를 입력하세요.',
  invalidPhone: '유효한 전화번호를 입력하세요.',
  next: '다음',
  prev: '이전',
  submit: '계약서 초안 생성 요청하기',
  loading: '계약서 생성 중...'
}

// Validation helpers
const validateEmail = (email: string) => /.+@.+\..+/.test(email)
const validatePhone = (phone: string) => /^\d{2,4}-?\d{3,4}-?\d{4}$/.test(phone.replace(/\s/g, ''))

// Step 1: 기본 정보
function StepBasicInfo({ form, onChange, errors, inputRef, showErrors }: any) {
  useEffect(() => { inputRef.current?.focus() }, [inputRef])
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-gray-900">1. {STRINGS.steps[0]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">이름 *</label>
          <input ref={inputRef} type="text" name="clientName" value={form.clientName} onChange={onChange} required aria-invalid={!!errors.clientName} aria-describedby="error-clientName" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
          {showErrors && errors.clientName && <div id="error-clientName" className="text-red-700 text-xs mt-1">{errors.clientName}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">이메일 *</label>
          <input type="email" name="clientEmail" value={form.clientEmail} onChange={onChange} required aria-invalid={!!errors.clientEmail} aria-describedby="error-clientEmail" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
          {showErrors && errors.clientEmail && <div id="error-clientEmail" className="text-red-700 text-xs mt-1">{errors.clientEmail}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">연락처 *</label>
          <input type="tel" name="clientPhone" value={form.clientPhone} onChange={onChange} required aria-invalid={!!errors.clientPhone} aria-describedby="error-clientPhone" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
          {showErrors && errors.clientPhone && <div id="error-clientPhone" className="text-red-700 text-xs mt-1">{errors.clientPhone}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">회사명 (선택)</label>
          <input type="text" name="clientCompany" value={form.clientCompany} onChange={onChange} className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
        </div>
      </div>
    </>
  )
}

// Step 2: 계약 정보
function StepContractInfo({ form, onChange, errors, inputRef, showErrors }: any) {
  useEffect(() => { inputRef.current?.focus() }, [inputRef])
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-gray-900">2. {STRINGS.steps[1]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">계약 종류 *</label>
          <select ref={inputRef} name="contractType" value={form.contractType} onChange={onChange} required aria-invalid={!!errors.contractType} aria-describedby="error-contractType" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700">
            <option value="">선택하세요</option>
            {STRINGS.contractTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {showErrors && errors.contractType && <div id="error-contractType" className="text-red-700 text-xs mt-1">{errors.contractType}</div>}
        </div>
        {form.contractType === '기타' && (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900">기타 계약 종류</label>
            <input type="text" name="otherContractType" value={form.otherContractType} onChange={onChange} ref={form.contractType === '기타' ? inputRef : undefined} className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
            {showErrors && errors.otherContractType && <div className="text-red-700 text-xs mt-1">{errors.otherContractType}</div>}
          </div>
        )}
      </div>
    </>
  )
}

// Step 3: 당사자 정보
function StepPartyInfo({ form, onChange, errors, inputRef, showErrors }: any) {
  useEffect(() => { inputRef.current?.focus() }, [inputRef])
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-gray-900">3. {STRINGS.steps[2]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">상대방 이름/회사 *</label>
          <input ref={inputRef} type="text" name="counterparty" value={form.counterparty} onChange={onChange} required aria-invalid={!!errors.counterparty} aria-describedby="error-counterparty" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
          {showErrors && errors.counterparty && <div id="error-counterparty" className="text-red-700 text-xs mt-1">{errors.counterparty}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">역할 (예: 갑/을) *</label>
          <select name="counterpartyRole" value={form.counterpartyRole} onChange={onChange} required aria-invalid={!!errors.counterpartyRole} aria-describedby="error-counterpartyRole" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700">
            <option value="">선택하세요</option>
            <option value="갑">갑</option>
            <option value="을">을</option>
          </select>
          {showErrors && errors.counterpartyRole && <div id="error-counterpartyRole" className="text-red-700 text-xs mt-1">{errors.counterpartyRole}</div>}
        </div>
      </div>
    </>
  )
}

// Step 4: 주요 조건
function StepKeyTerms({ form, onChange, errors, inputRef, showErrors }: any) {
  useEffect(() => { inputRef.current?.focus() }, [inputRef])
  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-gray-900">4. {STRINGS.steps[3]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">계약 시작일 *</label>
          <input ref={inputRef} type="date" name="startDate" value={form.startDate} onChange={onChange} required aria-invalid={!!errors.startDate} aria-describedby="error-startDate" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
          {showErrors && errors.startDate && <div id="error-startDate" className="text-red-700 text-xs mt-1">{errors.startDate}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">계약 종료일 *</label>
          <input type="date" name="endDate" value={form.endDate} onChange={onChange} required aria-invalid={!!errors.endDate} aria-describedby="error-endDate" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" />
          {showErrors && errors.endDate && <div id="error-endDate" className="text-red-700 text-xs mt-1">{errors.endDate}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">금액 (선택)</label>
          <input type="text" name="amount" value={form.amount} onChange={onChange} className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" placeholder="예: 1,000,000원" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-900">계약 목적/내용 *</label>
          <input type="text" name="purpose" value={form.purpose} onChange={onChange} required aria-invalid={!!errors.purpose} aria-describedby="error-purpose" className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" placeholder="예: 소프트웨어 개발  용역" />
          {showErrors && errors.purpose && <div id="error-purpose" className="text-red-700 text-xs mt-1">{errors.purpose}</div>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-900">특약/주요 조건 (선택)</label>
          <textarea name="specialTerms" value={form.specialTerms} onChange={onChange} className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" rows={2} placeholder="예: 위약금, 지연손해금 등" />
        </div>
      </div>
    </>
  )
}

// Step 5: 요약 및 제출
function StepSummary({ form, onChange, inputRef }: any) {
  useEffect(() => { inputRef.current?.focus() }, [inputRef])
  return (
    <>
      <h2 className="text-indigo-700 text-xl font-bold mb-4 text-gray-900">5. {STRINGS.steps[4]}</h2>
      <div className="bg-indigo-50 rounded-lg p-6 mb-6">
        <div className="mb-2 font-semibold text-indigo-700">입력하신 정보 요약</div>
        <ul className="text-gray-900 text-sm space-y-1">
          <li><b>이름:</b> {form.clientName}</li>
          <li><b>이메일:</b> {form.clientEmail}</li>
          <li><b>연락처:</b> {form.clientPhone}</li>
          {form.clientCompany && <li><b>회사명:</b> {form.clientCompany}</li>}
          <li><b>계약 종류:</b> {form.contractType === '기타' ? form.otherContractType : form.contractType}</li>
          <li><b>상대방:</b> {form.counterparty} ({form.counterpartyRole})</li>
          <li><b>계약 기간:</b> {form.startDate} ~ {form.endDate}</li>
          {form.amount && <li><b>금액:</b> {form.amount}</li>}
          <li><b>목적/내용:</b> {form.purpose}</li>
          {form.specialTerms && <li><b>특약/주요 조건:</b> {form.specialTerms}</li>}
          {form.specialRequests && <li><b>추가 요청사항:</b> {form.specialRequests}</li>}
        </ul>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-900">추가 요청사항 (선택)</label>
        <textarea ref={inputRef} name="specialRequests" value={form.specialRequests} onChange={onChange} className="w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-700" rows={2} placeholder="예: 특정 조항 추가, 맞춤문구 등" />
      </div>
    </>
  )
}

export default function GenerateContractPage() {
  const [step, setStep] = useState<number>(0)
  const [form, setForm] = useState({
    clientName: '', clientEmail: '', clientPhone: '', clientCompany: '',
    contractType: '', otherContractType: '', counterparty: '', counterpartyRole: '',
    startDate: '', endDate: '', amount: '', purpose: '', specialTerms: '', specialRequests: ''
  })
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(null)
  // Track which steps have been attempted to move past
  const [touchedSteps, setTouchedSteps] = useState<number[]>([])
  // Show contract preview after submit
  const [showPreview, setShowPreview] = useState(false)
  // Show loading screen after submit
  const [isGenerating, setIsGenerating] = useState(false)

  // Validation per step
  const validateStep = (customStep?: number, customForm?: typeof form) => {
    const e: any = {}
    const s = typeof customStep === 'number' ? customStep : step
    const f = customForm || form;
    if (s === 0) {
      if (!f.clientName) e.clientName = STRINGS.required
      if (!f.clientEmail) e.clientEmail = STRINGS.required
      else if (!validateEmail(f.clientEmail)) e.clientEmail = STRINGS.invalidEmail
      if (!f.clientPhone) e.clientPhone = STRINGS.required
      else if (!validatePhone(f.clientPhone)) e.clientPhone = STRINGS.invalidPhone
    }
    if (s === 1) {
      if (!f.contractType) e.contractType = STRINGS.required
      if (f.contractType === '기타' && !f.otherContractType) e.otherContractType = STRINGS.required
    }
    if (s === 2) {
      if (!f.counterparty) e.counterparty = STRINGS.required
      if (!f.counterpartyRole) e.counterpartyRole = STRINGS.required
    }
    if (s === 3) {
      if (!f.startDate) e.startDate = STRINGS.required
      if (!f.endDate) e.endDate = STRINGS.required
      if (!f.purpose) e.purpose = STRINGS.required
    }
    return e
  }

  // On every input change, validate and update errors
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      setErrors(validateStep(undefined, updated))
      return updated
    })
  }

  // Validate for the current step and update errors
  useEffect(() => {
    setErrors(validateStep())
    // eslint-disable-next-line
  }, [step])

  // Next button enabled if no errors for current step
  const isStepValid = Object.keys(errors).length === 0

  const nextStep = () => {
    // Mark this step as touched
    if (!touchedSteps.includes(step)) setTouchedSteps((prev) => [...prev, step])
    const stepErrors = validateStep()
    setErrors(stepErrors)
    if (Object.keys(stepErrors).length === 0) setStep((s) => Math.min(s + 1, STRINGS.steps.length - 1))
  }
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!validateStep()) return
    setIsGenerating(true)
    // Simulate contract generation
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 1500)
  }

  // Auto-focus first input of each step
  useEffect(() => { inputRef.current?.focus() }, [step])

  // Backend validation note
  // NOTE: 모든 입력값은 백엔드에서 반드시 재검증 및 sanitize 되어야 합니다.

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">계약서 초안 자동 생성</h1>
          <p className="text-indigo-100 text-lg md:text-xl text-black mb-6">
            다양한 계약 유형에 대해, 실제 변호사가 설계한 맞춤형 계약서 초안을 빠르게 받아보세요.<br />
            기본 정보만 입력하면, 복잡한 법률 문서도 손쉽게 시작할 수 있습니다.
          </p>
        </div>
      </section>
      {/* Stepper icons and labels */}
      <div className="max-w-2xl mx-auto w-full mt-8 px-4">
        <div className="flex items-center justify-between mb-0 relative z-10">
          {STRINGS.steps.map((label, idx) => {
            const isCompleted = showPreview
              ? true
              : isGenerating
              ? idx < 4 || idx === 4
              : idx < step;
            const isCurrent = !showPreview && !isGenerating && idx === step;
            return (
              <div key={label} className="flex-1 flex flex-col items-center relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-200 shadow-sm ${
                  isCompleted
                    ? 'bg-green-500 text-white border-2 border-green-500'
                    : isCurrent
                    ? 'bg-indigo-600 text-white border-2 border-indigo-600'
                    : 'bg-indigo-300 text-white border-2 border-indigo-300'
                }`}>
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className={`mt-2 text-xs font-semibold transition-colors duration-200 ${
                  isCompleted
                    ? 'text-green-600'
                    : isCurrent
                    ? 'text-indigo-700'
                    : 'text-gray-400'
                }`}>
                  {label}
                </div>
              </div>
            )
          })}
        </div>
        {/* Progress Bar - between stepper and form, match upload page */}
        <div className="relative h-2 mt-4 mb-10 w-full">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-indigo-200 rounded" style={{ transform: 'translateY(-50%)' }} />
          <div
            className="absolute left-0 top-1/2 h-1 bg-green-200 rounded transition-all duration-500"
            style={{
              width: showPreview || isGenerating
                ? `100%`
                : `${(step) / (STRINGS.steps.length - 1) * 100}%`,
              transform: 'translateY(-50%)',
            }}
          />
        </div>
        {/* Form Card or Loading or Preview */}
        {showPreview ? (
          <ContractGenerationPreview contractData={form} />
        ) : step < 4 ? (
          <form 
            className="bg-white rounded-xl shadow-2xl p-10 max-w-3xl mx-auto space-y-8" 
            onSubmit={handleSubmit}
            onKeyDown={e => {
              if (
                e.key === 'Enter' &&
                step === 4 &&
                document.activeElement
              ) {
                const el = document.activeElement as HTMLElement;
                if (
                  el.tagName !== 'BUTTON' ||
                  ((el as HTMLButtonElement).type && (el as HTMLButtonElement).type !== 'submit')
                ) {
                  e.preventDefault();
                }
              }
            }}
          >
            {step === 0 && <StepBasicInfo form={form} onChange={handleChange} errors={errors} inputRef={inputRef} showErrors={touchedSteps.includes(0)} />}
            {step === 1 && <StepContractInfo form={form} onChange={handleChange} errors={errors} inputRef={inputRef} showErrors={touchedSteps.includes(1)} />}
            {step === 2 && <StepPartyInfo form={form} onChange={handleChange} errors={errors} inputRef={inputRef} showErrors={touchedSteps.includes(2)} />}
            {step === 3 && <StepKeyTerms form={form} onChange={handleChange} errors={errors} inputRef={inputRef} showErrors={touchedSteps.includes(3)} />}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button type="button" onClick={prevStep} disabled={step === 0 || loading} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50">{STRINGS.prev}</button>
              <button type="button" onClick={nextStep} disabled={loading || !isStepValid} className="px-8 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50">{STRINGS.next}</button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl p-10 max-w-3xl mx-auto space-y-8">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-8"></div>
                <div className="text-2xl font-bold text-gray-800">계약서가 생성되고 있습니다...</div>
              </div>
            ) : (
              <>
                <StepSummary form={form} onChange={handleChange} inputRef={inputRef} />
                <div className="flex justify-between mt-8">
                  <button type="button" onClick={prevStep} disabled={loading || isGenerating} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50">{STRINGS.prev}</button>
                  <button type="button" onClick={handleSubmit} disabled={loading || isGenerating} className="px-8 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50">{isGenerating ? STRINGS.loading : STRINGS.submit}</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
