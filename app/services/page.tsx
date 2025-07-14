'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface DemoStep {
  id: number;
  title: string;
  description: string;
  features: string[];
  duration: string;
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "계약서 업로드",
    description: "PDF, Word, 이미지 등 다양한 형식의 계약서를 안전하게 업로드합니다.",
    features: [
      "다양한 파일 형식 지원 (PDF, DOC, DOCX, JPG, PNG)",
      "드래그 앤 드롭으로 간편 업로드",
      "AES-256 암호화로 안전한 전송",
      "최대 50MB 파일 크기 지원",
      "실시간 업로드 진행률 표시"
    ],
    duration: "30초"
  },
  {
    id: 2,
    title: "전문가 1차 분석",
    description: "경험 많은 법률 전문가가 계약서를 신속하게 분석하여 잠재적 리스크를 식별합니다.",
    features: [
      "정확한 리스크 분석",
      "계약 유형 분류",
      "핵심 조항 추출",
      "리스크 점수 산정",
      "실시간 분석 진행 상황 표시"
    ],
    duration: "2-3분"
  },
  {
    id: 3,
    title: "전문 변호사 검증",
    description: "강남 최고급 로펌의 전문 변호사가 1차 분석 결과를 검증하고 심층 분석을 수행합니다.",
    features: [
      "엘리트 변호사의 이중 검증",
      "실무적 관점의 리스크 평가",
      "개선 제안 및 대안 조항 제시",
      "계약 협상 전략 가이드",
      "24-48시간 내 완료"
    ],
    duration: "24-48시간"
  },
  {
    id: 4,
    title: "종합 분석 리포트",
    description: "전문가의 분석 결과를 종합한 상세한 리포트를 제공합니다.",
    features: [
      "리스크 등급별 분류 (높음/중간/낮음)",
      "구체적인 개선 제안사항",
      "협상 포인트 및 전략",
      "유사 판례 및 법적 근거",
      "다운로드 및 공유 기능"
    ],
    duration: "즉시"
  }
];

const TESTIMONIALS = [
  {
    name: '이준호',
    company: '스타트업 대표',
    content: '대형 로펌 수준의 계약서 작성과 검토를 합리적인 가격에 받을 수 있어 매우 만족합니다. 변호사님이 직접 상담해주셔서 신뢰가 갔어요.'
  },
  {
    name: '최수진',
    company: '중견기업 법무팀장',
    content: '계약서 초안부터 리스크 진단, 개선안 제안까지 모두 꼼꼼하게 챙겨주셔서 분쟁 걱정이 사라졌습니다.'
  },
  {
    name: '박현우',
    company: '개인사업자',
    content: '처음 계약서를 작성해야 해서 막막했는데, 변호사님이 1:1로 도와주셔서 안심하고 사업을 시작할 수 있었습니다.'
  },
];

// Trust badges and value proposition for Hero
const TRUST_BADGES = [
  { icon: '🏆', label: '98% 고객 만족' },
  { icon: '👨‍⚖️', label: '10년 이상 경력 변호사' },
  { icon: '🏢', label: '1000+ 기업 이용' },
  { icon: '🔒', label: 'AES-256 암호화' },
];

const WHY_ROKIT_ICONS = [
  { icon: '⚡', label: '신속한 회신' },
  { icon: '🔍', label: '정확한 리스크 진단' },
  { icon: '💬', label: '변호사 직접 소통' },
  { icon: '📱', label: '모바일 완벽 지원' },
];

const CLIENT_LOGOS = [
  '/images/client1.png',
  '/images/client2.png',
  '/images/client3.png',
  '/images/client4.png',
];

const COMPARISON_TABLE = [
  { label: '업계별 맞춤 자문', rokit: 'O', competitor: '△' },
  { label: '10년 이상 경력 변호사 직접 검토', rokit: 'O', competitor: '△' },
  { label: '평균 12시간 이내 회신', rokit: 'O', competitor: 'X' },
  { label: '견적·진행상황 실시간 안내', rokit: 'O', competitor: 'X' },
  { label: 'AES-256 암호화/ISO 인증', rokit: 'O', competitor: '△' },
  { label: '모바일/PC 완벽 지원', rokit: 'O', competitor: '△' },
  { label: '투명한 가격/결과 공개', rokit: 'O', competitor: '△' },
  { label: 'AI+전문가 결합 분석', rokit: 'O', competitor: 'X' },
  { label: '고객 만족도', rokit: '98%', competitor: '80~90%' },
];

export default function Services() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    {
      label: '서비스신청',
      icon: '📝',
      desc: '로킷 홈페이지에서 간단한 정보 입력만으로 서비스 신청이 시작됩니다. 서비스 유형과 필요 사항을 선택하면, 담당 매니저가 신속하게 안내를 드립니다.'
    },
    {
      label: '견적확인',
      icon: '💰',
      desc: '서비스 신청이 접수되면, 입력하신 정보와 요청사항을 바탕으로 상세 견적을 안내해 드립니다. 예상 비용, 소요 시간, 서비스 범위가 투명하게 제공되며, 추가 문의도 바로 가능합니다. 견적은 이메일 또는 문자로 신속하게 전달됩니다.'
    },
    {
      label: '계약서/자료 업로드',
      icon: '📤',
      desc: '견적에 동의하시면, 계약서 및 관련 자료를 안전하게 업로드하실 수 있습니다. PDF, Word, 이미지 등 다양한 파일 형식을 지원하며, 업로드된 자료는 최신 보안 시스템으로 보호됩니다. 추가 자료가 필요한 경우에도 별도의 안내를 드립니다.'
    },
    {
      label: '전문 변호사 배정',
      icon: '👨‍⚖️',
      desc: '자료 확인 후, 업종별·유형별로 최적화된 10년 이상 경력의 전문 변호사가 배정됩니다. 배정된 변호사는 의뢰인의 상황과 요구를 충분히 파악한 후, 맞춤형 검토를 시작합니다. 진행 과정은 실시간으로 확인할 수 있습니다.'
    },
    {
      label: '검토결과 확인',
      icon: '🔍',
      desc: '검토가 완료되면 온라인에서 결과 리포트와 수정본을 확인하실 수 있습니다. 주요 변경사항, 필수·추천 조항, 상세 설명까지 한눈에 볼 수 있으며, 이해를 돕기 위한 비교표와 하이라이트 기능도 제공됩니다.'
    },
    {
      label: '의뢰인 피드백 반영',
      icon: '💬',
      desc: '검토 결과에 대해 추가 요청이나 궁금한 점이 있으시면 언제든 피드백을 남기실 수 있습니다. 변호사가 직접 답변 및 최종본을 제공하여, 완벽한 결과물을 보장합니다. 모든 소통은 온라인으로 간편하게 이루어집니다.'
    },
  ];

  return (
    <div>
      {/* 1. Hero Section (Simplified) */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden flex items-center justify-center min-h-[320px]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">대한민국 1위 업계별 계약 검토 플랫폼</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">신속한 검토, 변호사 직접 소통, 업계별 맞춤 솔루션을 온라인으로 간편하게 경험하세요.</p>
            <Link href="/register" className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all text-lg">계약서 검토 시작하기</Link>
          </motion.div>
        </div>
      </section>

      {/* 2. 차별점 Section (Moved Up) */}
      <section className="py-14 bg-gradient-to-br from-indigo-50 to-white border-t-2 border-indigo-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-8 text-center tracking-tight">로킷 서비스의 차별점</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">항목</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-indigo-700">로킷</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-gray-500">타사</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-3 px-6 text-gray-700 font-medium">{row.label}</td>
                    <td className="py-3 px-6 text-center text-indigo-700 font-bold">{row.rokit}</td>
                    <td className="py-3 px-6 text-center text-gray-500">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center text-gray-700 text-sm mb-6">
            <p>로킷은 업계별 맞춤 자문, 변호사 직접 검토, 신속한 회신, 강력한 보안 등 모든 면에서 경쟁사 대비 월등한 서비스를 제공합니다. 실제 고객 만족도와 반복 이용률이 이를 증명합니다.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all text-lg">상담 신청하기</Link>
          </div>
        </div>
      </section>

      {/* 3. Feature Cards Section (Cleaned Formatting) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center border border-indigo-100 min-h-[220px] w-full transition-all">
            <h3 className="text-xl font-bold text-indigo-800 mb-3">간편한 접수</h3>
            <p className="text-gray-700 text-base text-center mb-4">회원가입 없이 바로 시작, 직관적 UI, 업로드 자료 암호화 저장</p>
            <span className="text-xs text-indigo-500 font-semibold mt-auto">평균 접수 2분</span>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center border border-blue-100 min-h-[220px] w-full transition-all">
            <h3 className="text-xl font-bold text-blue-800 mb-3">신속한 회신</h3>
            <p className="text-gray-700 text-base text-center mb-4">평균 12시간 이내 결과 제공, 실시간 진행 안내, 긴급 요청 우선 처리</p>
            <span className="text-xs text-blue-500 font-semibold mt-auto">최단 3시간 내 회신</span>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center border border-blue-100 min-h-[220px] w-full transition-all">
            <h3 className="text-xl font-bold text-blue-800 mb-3">전문적이고 표준화된 검토결과</h3>
            <p className="text-gray-700 text-base text-center mb-4">10년 이상 경력 변호사 직접 검토, 업계별 표준 리포트, 명확한 개선안 제공</p>
            <span className="text-xs text-blue-500 font-semibold mt-auto">고객 만족도 98%</span>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center border border-indigo-100 min-h-[220px] w-full transition-all">
            <h3 className="text-xl font-bold text-indigo-800 mb-3">놀라운 편의성</h3>
            <p className="text-gray-700 text-base text-center mb-4">모바일/PC 완벽 지원, 온라인 소통, 진행상황 실시간 확인</p>
            <span className="text-xs text-indigo-500 font-semibold mt-auto">24/7 온라인 지원</span>
          </div>
          {/* Card 5 */}
          <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center border border-blue-100 min-h-[220px] w-full transition-all">
            <h3 className="text-xl font-bold text-blue-800 mb-3">강력한 보안과 개인정보 보호</h3>
            <p className="text-gray-700 text-base text-center mb-4">AES-256 암호화, ISO 인증, 모든 자료 안전 저장, 개인정보 완전 보호</p>
            <span className="text-xs text-blue-500 font-semibold mt-auto">100% 암호화 저장</span>
          </div>
        </div>
      </section>

      {/* 4. 이용방법 Section (Expanded) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-900 mb-10 text-center">이용방법</h2>
          <p className="text-base text-gray-600 text-center mb-8">로킷의 서비스는 누구나 쉽게, 투명하게 이용할 수 있도록 설계되어 있습니다. 아래 단계를 따라 진행하시면, 전문 변호사의 검토 결과를 빠르게 받아보실 수 있습니다.</p>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white via-indigo-50 to-indigo-100 rounded-2xl shadow-lg border border-indigo-100 p-8 text-center transition-all duration-200 flex flex-col items-center relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-2xl font-bold shadow-lg border-4 border-white">{activeStep}</div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-4xl mx-auto mb-4 mt-6 shadow">{steps[activeStep - 1].icon}</div>
              <h3 className="text-xl font-bold text-indigo-800 mb-3">{steps[activeStep - 1].label}</h3>
              <div className="w-full h-3 bg-indigo-200 rounded-full mb-6 mt-2">
                <div
                  className="h-3 bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${(activeStep / steps.length) * 100}%` }}
                />
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-4 whitespace-pre-line text-center max-w-3xl mx-auto">{steps[activeStep - 1].desc}</p>
              {/* FAQ/tip for each step */}
              <div className="text-xs text-indigo-500 mb-2">TIP: {steps[activeStep - 1].label} 단계에서 궁금한 점은 언제든 1:1 문의 가능합니다.</div>
              <button
                className="mt-2 px-8 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-full font-semibold shadow hover:from-indigo-600 hover:to-indigo-800 transition-all text-base"
                onClick={() => setActiveStep(activeStep === steps.length ? 1 : activeStep + 1)}
              >
                {activeStep === steps.length ? '처음부터 다시 보기' : '다음 단계 보기'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 검토결과 Section (Expanded) */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center">검토결과</h2>
          <p className="text-base text-gray-600 text-center mb-8">로킷의 검토 결과는 한눈에, 명확하게, 그리고 실질적으로 전달됩니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: 수정사항 추적 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/review-tracking.png" alt="수정사항 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">수정사항 추적</h3>
              <p className="text-gray-600 text-sm text-center mb-1">모든 변경 내역을 추적하여, 어떤 부분이 어떻게 바뀌었는지 한눈에 확인할 수 있습니다. 투명한 변경 기록으로 신뢰를 더합니다.</p>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>변경 내역을 한눈에 확인</li>
                <li>추적기능 적용 이미지 제공</li>
              </ul>
              <div className="text-xs text-indigo-500 mb-2">고객 피드백: "변경사항이 명확해서 이해가 쉬웠어요."</div>
              <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">샘플 리포트 다운로드</button>
            </div>
            {/* Card 2: 필수조항 자동 추가 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/required-clauses.png" alt="필수조항 추가 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">필수조항 자동 추가</h3>
              <p className="text-gray-600 text-sm text-center mb-1">누락된 필수조항을 자동으로 탐지하고 추가하여, 계약의 완성도와 법적 안전성을 높입니다.</p>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>누락된 필수조항 자동 탐지 및 추가</li>
                <li>계약 완성도 향상</li>
              </ul>
              <div className="text-xs text-indigo-500 mb-2">고객 피드백: "필수조항이 빠짐없이 들어가서 안심됐어요."</div>
              <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">샘플 리포트 다운로드</button>
            </div>
            {/* Card 3: 추천조항 제안 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/recommend-clauses.png" alt="추천조항 추가 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">추천조항 제안</h3>
              <p className="text-gray-600 text-sm text-center mb-1">전문가가 상황에 맞는 추천 조항을 제안하여, 계약의 전문성과 실효성을 높여드립니다.</p>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>전문가 추천 조항 제안</li>
                <li>법적 리스크 최소화</li>
              </ul>
              <div className="text-xs text-indigo-500 mb-2">고객 피드백: "추천조항 덕분에 계약이 더 완벽해졌어요."</div>
              <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">샘플 리포트 다운로드</button>
            </div>
            {/* Card 4: 주요 수정사항 메모 */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/memo.png" alt="메모 첨부 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">주요 수정사항 메모</h3>
              <p className="text-gray-600 text-sm text-center mb-1">주요 변경사항별로 변호사의 설명 메모가 첨부되어, 의뢰인이 쉽게 이해하고 소통할 수 있습니다.</p>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>주요 변경사항별 사유 메모 첨부</li>
                <li>투명한 소통</li>
              </ul>
              <div className="text-xs text-indigo-500 mb-2">고객 피드백: "변호사님의 설명이 큰 도움이 됐어요."</div>
              <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">샘플 리포트 다운로드</button>
            </div>
          </div>
          {/* Before/after comparison slider placeholder */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-indigo-50 rounded-xl p-6 text-center border border-indigo-100 mb-4">
              <span className="text-indigo-700 font-bold">Before/After 계약서 비교 (예시)</span>
              <div className="h-32 flex items-center justify-center text-gray-400">[비교 슬라이더 자리]</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 