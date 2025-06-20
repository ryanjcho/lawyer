'use client'

import { useState } from 'react'

const CONTRACT_TYPES = [
  '근로계약',
  'NDA(비밀유지계약)',
  '서비스계약',
  '공급계약',
  '임대차계약',
  '기타',
]

const STEPS = [
  '기본 정보',
  '계약 정보',
  '당사자 정보',
  '주요 조건',
  '요약 및 제출',
]

export default function GenerateContractPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientCompany: '',
    contractType: '',
    otherContractType: '',
    counterparty: '',
    counterpartyRole: '',
    startDate: '',
    endDate: '',
    amount: '',
    purpose: '',
    specialTerms: '',
    specialRequests: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

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

      {/* Stepper */}
      <div className="max-w-2xl mx-auto w-full mt-8 px-4">
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === idx ? 'bg-indigo-600' : 'bg-indigo-300'}`}>{idx + 1}</div>
              <div className={`mt-2 text-xs font-semibold ${step === idx ? 'text-indigo-700' : 'text-gray-400'}`}>{label}</div>
              {idx < STEPS.length - 1 && <div className="h-1 w-full bg-indigo-200 mt-2" />}
            </div>
          ))}
        </div>

        <form className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {step === 0 && (
            <>
              <h2 className="text-xl font-bold mb-4">1. 기본 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">이름 *</label>
                  <input type="text" name="clientName" value={form.clientName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">이메일 *</label>
                  <input type="email" name="clientEmail" value={form.clientEmail} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">연락처 *</label>
                  <input type="tel" name="clientPhone" value={form.clientPhone} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">회사명 (선택)</label>
                  <input type="text" name="clientCompany" value={form.clientCompany} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h2 className="text-xl font-bold mb-4">2. 계약 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">계약 종류 *</label>
                  <select name="contractType" value={form.contractType} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black">
                    <option value="">선택하세요</option>
                    {CONTRACT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                {form.contractType === '기타' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">기타 계약 종류</label>
                    <input type="text" name="otherContractType" value={form.otherContractType} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                  </div>
                )}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold mb-4">3. 당사자 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">상대방 이름/회사 *</label>
                  <input type="text" name="counterparty" value={form.counterparty} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">역할 (예: 갑/을) *</label>
                  <input type="text" name="counterpartyRole" value={form.counterpartyRole} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold mb-4">4. 주요 조건</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">계약 시작일 *</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">계약 종료일 *</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">금액 (선택)</label>
                  <input type="text" name="amount" value={form.amount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" placeholder="예: 1,000,000원" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">계약 목적/내용 *</label>
                  <input type="text" name="purpose" value={form.purpose} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" placeholder="예: 소프트웨어 개발 용역" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">특약/주요 조건 (선택)</label>
                  <textarea name="specialTerms" value={form.specialTerms} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" rows={2} placeholder="예: 위약금, 지연손해금 등" />
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="text-indigo-700 text-xl font-bold mb-4">5. 요약 및 제출</h2>
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <div className="mb-2 font-semibold text-indigo-700">입력하신 정보 요약</div>
                <ul className="text-gray-700 text-sm space-y-1">
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
                <label className="block text-sm font-medium mb-1">추가 요청사항 (선택)</label>
                <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-black placeholder-black" rows={2} placeholder="예: 특정 조항 추가, 맞춤 문구 등" />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button type="button" onClick={prevStep} disabled={step === 0} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold disabled:opacity-50">이전</button>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={nextStep} className="px-8 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700">다음</button>
            ) : (
              <button type="submit" className="px-8 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700">계약서 초안 생성 요청하기</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
} 