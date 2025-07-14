'use client'

import Link from 'next/link'
import { useState } from 'react';
import AnalysisResults from '../components/AnalysisResults';
import { GeistMono } from "geist/font/mono";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Requires 'jspdf' and 'jspdf-autotable'
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// If not installed: npm install jspdf jspdf-autotable

// --- Interfaces and constants from review/page.tsx ---

interface Issue {
  id: string
  category: 'legal' | 'financial' | 'operational' | 'compliance' | 'risk'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  location: string
  recommendation: string
  impact: string
}

interface Recommendation {
  id: string
  priority: 'low' | 'medium' | 'high'
  title: string
  description: string
  action: string
  estimatedTime: string
  cost: string
}

interface AnalysisResult {
  contractId: string
  contractName: string
  analysisDate: string
  overallRiskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  totalIssues: number
  totalRecommendations: number
  processingTime: number
  issues: Issue[]
  recommendations: Recommendation[]
  summary: string
  legalReviewer?: string
  reviewDate?: string
}

const CONTRACT_TYPES = [
  '근로계약서',
  '용역계약서',
  '매매계약서',
  '합작계약서',
  '임대차계약서',
  '비밀유지계약서 (NDA)',
  '컨설팅계약서',
  '소프트웨어 라이선스 계약서',
  '유통계약서',
  '기타'
];
const INDUSTRIES = [
  'IT/기술',
  '의료/제약',
  '금융/보험',
  '부동산',
  '제조',
  '유통/소매',
  '서비스',
  '기타'
];
const URGENCY_OPTIONS = [
  { value: 1, label: '일반 검토 (5일)', price: 1 },
  { value: 2, label: '우선 검토 (3일)', price: 1.5 },
  { value: 3, label: '긴급 검토 (24시간)', price: 2 },
];

// --- ReviewContent component ---

export default function ContractPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contractTypeChoice, setContractTypeChoice] = useState<'draft' | 'review' | null>(null);
  const [step, setStep] = useState(1);
  const [requestPoints, setRequestPoints] = useState('');
  const [pageCount, setPageCount] = useState(3);
  const [memo, setMemo] = useState('');
  const [riskCheck, setRiskCheck] = useState(false);
  const [formatting, setFormatting] = useState(false);
  const [revisionCount, setRevisionCount] = useState(2);
  const [contractType, setContractType] = useState('');
  const [cleaning, setCleaning] = useState(false);
  const [missingClauses, setMissingClauses] = useState(false);
  const [recommendedClauses, setRecommendedClauses] = useState(false);
  const [urgency, setUrgency] = useState('일반');
  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [caseNumber, setCaseNumber] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const BASE_PRICE = 500000;
  const EXTRA_PAGE_PRICE = 100000;
  const REVISION_PRICE = 50000;
  const CLEANING_PRICE = 100000;
  const MISSING_CLAUSE_PRICE = 300000;
  const RECOMMENDED_CLAUSE_PRICE = 200000;
  const URGENCY_MULTIPLIERS = { '일반': 1, '긴급': 1.3, '초긴급': 1.5 };

  let total = BASE_PRICE;
  if (pageCount > 3) total += (pageCount - 3) * EXTRA_PAGE_PRICE;
  if (revisionCount > 2) total += (revisionCount - 2) * REVISION_PRICE;
  if (cleaning) total += CLEANING_PRICE;
  if (missingClauses) total += MISSING_CLAUSE_PRICE;
  if (recommendedClauses) total += RECOMMENDED_CLAUSE_PRICE;
  total = Math.round(total * URGENCY_MULTIPLIERS[urgency]);

  const steps = ['기본정보', '추가요청', '견적/결제'];

  function handleNext() { if (step < 3) setStep(step + 1); }
  function handleBack() { if (step > 1) setStep(step - 1); }
  async function handleDownloadPDF() {
    if (typeof window === 'undefined') return;
    const pdfMake = (await import('pdfmake/build/pdfmake')).default;
    const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
    pdfMake.vfs = pdfFonts.vfs;

    const docDefinition = {
      content: [
        { text: '견적서', style: 'header' },
        { text: '\n' },
        { text: `서비스 유형: ${contractTypeChoice === 'draft' ? '계약서 작성' : '계약서 검토'}` },
        { text: `계약서 종류: ${contractType}` },
        { text: `페이지 수: ${pageCount}` },
        { text: `수정 횟수: ${revisionCount}` },
        { text: `서식 클리닝: ${cleaning ? '포함' : '미포함'}` },
        { text: `누락조항 추가: ${missingClauses ? '포함' : '미포함'}` },
        { text: `추천조항 추가: ${recommendedClauses ? '포함' : '미포함'}` },
        { text: `긴급도: ${urgency}` },
        { text: `이메일: ${email}` },
        { text: '\n' },
        { text: `총 견적: ₩${total.toLocaleString()}`, style: 'total' },
      ],
      styles: {
        header: { fontSize: 22, bold: true, alignment: 'center' as const, margin: [0, 0, 0, 20] as [number, number, number, number] },
        total: { fontSize: 16, bold: true, color: 'blue', margin: [0, 20, 0, 0] as [number, number, number, number] },
      }
    };
    pdfMake.createPdf(docDefinition).download('견적서.pdf');
  }
  function handleSendEmail() { setEmailSent(true); setTimeout(() => setEmailSent(false), 3000); }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <svg className="w-12 h-12 text-indigo-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0h4m-4 0H8" /></svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">계약서 서비스를 이용하려면 로그인해 주세요.</p>
            <Link
              href="/login?callbackUrl=/contract"
              className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center mb-2"
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
    );
  }

  if (!contractTypeChoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-start items-center pt-12 sm:pt-20">
        <div className="w-full max-w-2xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-3xl shadow-2xl p-14 sm:p-16 flex flex-col items-center border border-indigo-100 hover:ring-4 hover:ring-indigo-200 transition-all duration-300" style={{ minHeight: '420px' }}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 mb-6 text-center drop-shadow-sm tracking-tight">계약서 서비스 선택</h2>
          <p className="text-lg text-gray-700 text-center mb-10">계약서 작성 또는 검토를 선택하세요</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <button
              onClick={() => setContractTypeChoice('draft')}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-10 border border-indigo-100 hover:border-indigo-300 w-full text-left flex flex-col items-center hover:ring-2 hover:ring-indigo-200"
            >
              <div className="text-indigo-500 mb-6 flex items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">계약서 작성</h3>
              <p className="text-gray-700 mb-4 text-center">전문 변호사와 함께 새로운 계약서를 작성해보세요. 귀하의 요구사항에 맞는 맞춤형 계약서를 제공합니다.</p>
              <div className="text-indigo-500 font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                시작하기
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button
              onClick={() => setContractTypeChoice('review')}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-10 border border-indigo-100 hover:border-indigo-300 w-full text-left flex flex-col items-center hover:ring-2 hover:ring-indigo-200"
            >
              <div className="text-indigo-500 mb-6 flex items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">계약서 검토</h3>
              <p className="text-gray-700 mb-4 text-center">기존 계약서를 전문가의 눈으로 꼼꼼하게 검토해드립니다. 상세한 분석과 개선사항을 제공합니다.</p>
              <div className="text-indigo-500 font-medium group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                시작하기
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Restore the stepper and all step logic after the draft/review buttons
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stepper */}
      <div className="max-w-2xl mx-auto pt-10 pb-6">
        <ol className="flex items-center w-full text-sm font-medium text-gray-500">
          {steps.map((label, idx) => (
            <li key={label} className={`flex-1 flex items-center ${step > idx + 1 ? 'text-indigo-600' : step === idx + 1 ? 'text-indigo-800' : ''}`}> 
              <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step > idx + 1 ? 'bg-indigo-600 border-indigo-600 text-white' : step === idx + 1 ? 'border-indigo-800 text-indigo-800' : 'border-gray-300'}`}>{idx + 1}</span>
              <span className="ml-2">{label}</span>
              {idx < steps.length - 1 && <span className="flex-1 h-0.5 bg-gray-200 mx-2" />}
            </li>
          ))}
        </ol>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <div className="h-2 bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${(step - 1) / 2 * 100}%` }} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-3xl shadow-2xl p-10 sm:p-14 border border-indigo-100">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">기본 정보</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-900 font-medium mb-1">계약서 종류</label>
                <select className="w-full border rounded-md px-3 py-2 text-gray-900" value={contractType} onChange={e => setContractType(e.target.value)}>
                  <option value="">선택</option>
                  {CONTRACT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-1">페이지 수</label>
                <input type="number" min={1} className="w-full border rounded-md px-3 py-2 text-gray-900" value={pageCount} onChange={e => setPageCount(Number(e.target.value))} />
                <span className="text-xs text-gray-500">3페이지 초과 시 추가 요금 발생</span>
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-1">수정 횟수</label>
                <input type="number" min={2} className="w-full border rounded-md px-3 py-2 text-gray-900" value={revisionCount} onChange={e => setRevisionCount(Number(e.target.value))} />
                <span className="text-xs text-gray-500">기본 2회 제공, 추가 시 1회당 50,000원 추가 요금</span>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-8 text-gray-800 text-sm leading-relaxed">
              <div className="font-semibold text-indigo-700 mb-2">기본 서비스 안내</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>검토 요청 포인트 반영</li>
                <li>내용 수정과 문구 추가(주석/지시사항 포함)</li>
                <li>형식/서식 모두 검토(전체 구성요소 및 실질적 내용 포함)</li>
                <li>메모 작성(수정/추가 이유)</li>
                <li>계약 위험성 탐지(갑/을/매도인/매수인 등 맞춤 위험성 검토)</li>
                <li>분량 설정(word파일, 10pt, 줄간격 1.5 기준)</li>
                <li>기본 수정 2회 포함</li>
                <li>3페이지 기준, 초과 시 추가 요금</li>
              </ul>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded-md bg-gray-100 text-gray-700 font-semibold" disabled>이전</button>
              <button className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold" onClick={handleNext}>다음</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-8">
              <div className="bg-indigo-100 rounded-xl px-6 py-4 flex items-center justify-between shadow text-indigo-900">
                <span className="text-lg font-semibold">예상 견적</span>
                <span className="text-2xl font-extrabold">₩{total.toLocaleString()}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">추가 요청</h2>
            <div className="space-y-6">
              <label className="flex items-center text-gray-900 font-medium">
                <input type="checkbox" className="mr-2" checked={cleaning} onChange={e => setCleaning(e.target.checked)} />서식 클리닝(형식/서식 정리)
              </label>
              <span className="text-xs text-gray-500">서식 형식/서식 정리 작업</span>
              <label className="flex items-center text-gray-900 font-medium">
                <input type="checkbox" className="mr-2" checked={missingClauses} onChange={e => setMissingClauses(e.target.checked)} />누락조항 추가
              </label>
              <span className="text-xs text-gray-500">관련 계약서에서 반드시 필요한 조항만 추가</span>
              <label className="flex items-center text-gray-900 font-medium">
                <input type="checkbox" className="mr-2" checked={recommendedClauses} onChange={e => setRecommendedClauses(e.target.checked)} />추천조항 추가
              </label>
              <span className="text-xs text-gray-500">필수조항은 아니지만, formal하고 내용이 풍부한 전문적으로 보이는 계약서를 원하는 고객에게 추천드리는 서비스</span>
              <div className="mt-4">
                <span className="block text-gray-900 font-medium mb-2">긴급도</span>
                <div className="flex space-x-6">
                  {['일반', '긴급', '초긴급'].map(opt => (
                    <label key={opt} className="flex items-center text-gray-900 font-medium">
                      <input type="radio" className="mr-2" checked={urgency === opt} onChange={() => setUrgency(opt)} />{opt}
                    </label>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  일반: 3영업일, 긴급: 2영업일(+30%), 초긴급: 1영업일(+50%)
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded-md bg-gray-100 text-gray-700 font-semibold" onClick={handleBack}>이전</button>
              <button className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold" onClick={handleNext}>다음</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">견적 및 결제</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">요약</h3>
                <ul className="text-gray-900 text-base space-y-1 mb-4">
                  <li>서비스 유형: {contractTypeChoice === 'draft' ? '계약서 작성' : '계약서 검토'}</li>
                  <li>계약서 종류: {contractType}</li>
                </ul>
                <div className="flex justify-between items-center text-xl font-bold text-indigo-800 mb-4">
                  <span>총 견적</span>
                  <span>₩{total.toLocaleString()}</span>
                </div>
                <hr className="my-4 border-indigo-100" />
                <h4 className="text-md font-semibold text-indigo-700 mb-2">상세 내역</h4>
                <div className="space-y-2 text-gray-800 text-sm">
                  <div>
                    <span className="font-medium">페이지 수:</span> 기본 3페이지 (500,000원)
                    {pageCount > 3 && (
                      <>
                        <br />
                        <span className="ml-2">추가 {pageCount - 3}페이지 (₩{((pageCount - 3) * 100000).toLocaleString()} / 100,000원/페이지)</span>
                      </>
                    )}
                  </div>
                  <div>
                    <span className="font-medium">수정 횟수:</span> 기본 2회 (포함)
                    {revisionCount > 2 && (
                      <>
                        <br />
                        <span className="ml-2">추가 {revisionCount - 2}회 (₩{((revisionCount - 2) * 50000).toLocaleString()} / 50,000원/회)</span>
                      </>
                    )}
                  </div>
                  {cleaning && (
                    <div><span className="font-medium">서식 클리닝:</span> 100,000원</div>
                  )}
                  {missingClauses && (
                    <div><span className="font-medium">누락조항 추가:</span> 300,000원</div>
                  )}
                  {recommendedClauses && (
                    <div><span className="font-medium">추천조항 추가:</span> 200,000원</div>
                  )}
                  <div>
                    <span className="font-medium">긴급도:</span> {urgency} (
                    {urgency === '일반' && '3영업일, x1'}
                    {urgency === '긴급' && '2영업일, x1.3'}
                    {urgency === '초긴급' && '1영업일, x1.5'}
                    )
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold shadow hover:bg-indigo-50 transition"
                  onClick={handleDownloadPDF}
                >
                  견적서 PDF 다운로드
                </button>
                <button
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-indigo-200 text-indigo-700 font-semibold shadow hover:bg-indigo-50 transition"
                  onClick={handleSendEmail}
                >
                  이메일로 견적서 받기
                </button>
              </div>
              {emailSent && (
                <div className="text-green-600 text-sm mt-2">이메일로 견적서가 발송되었습니다.</div>
              )}
              <div className="space-y-4 mt-8">
                <label className="block text-gray-900 font-medium mb-1">이메일 주소</label>
                <input type="email" className="w-full border rounded-md px-3 py-2 text-gray-900" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
                {paymentStatus === 'completed' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mt-4">
                    <div className="text-green-600 mb-2">
                      <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-indigo-800 mb-2">결제 완료</h4>
                    <p className="text-gray-700 mb-4">귀하의 사건번호:</p>
                    <p className="text-2xl font-mono font-bold text-indigo-600 mb-4">{caseNumber}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4 mt-8">
              {(!email || paymentStatus === 'processing') ? (
                <button
                  className="w-full px-6 py-4 rounded-xl bg-indigo-400 text-white text-lg font-bold shadow-lg cursor-not-allowed opacity-60"
                  disabled
                >
                  결제 페이지로 이동
                </button>
              ) : (
                <Link
                  href={`/payment?contractTypeChoice=${contractTypeChoice}&contractType=${encodeURIComponent(contractType)}&pageCount=${pageCount}&revisionCount=${revisionCount}&cleaning=${cleaning}&missingClauses=${missingClauses}&recommendedClauses=${recommendedClauses}&urgency=${encodeURIComponent(urgency)}&email=${encodeURIComponent(email)}&total=${total}`}
                  className="w-full block px-6 py-4 rounded-xl bg-indigo-600 text-white text-lg font-bold shadow-lg hover:bg-indigo-700 transition text-center"
                >
                  결제 페이지로 이동
                </Link>
              )}
            </div>
            <div className="flex justify-between mt-8">
              <button className="px-6 py-2 rounded-md bg-gray-100 text-gray-700 font-semibold" onClick={handleBack}>이전</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 