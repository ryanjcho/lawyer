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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden flex items-center justify-center min-h-[320px]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">서비스 소개</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">로킷은 빠르고, 전문적이며, 온라인으로 간편하게 계약 검토를 제공합니다.</p>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section (moved down, more detailed, interactive) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4 items-center border border-indigo-100 ring-1 ring-indigo-50 min-h-[220px] w-full">
            <h3 className="text-2xl font-extrabold text-indigo-800 mb-4 tracking-tight group-hover:text-indigo-900 transition-colors">간편한 접수</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-2 text-center max-w-xl">복잡한 절차 없이 온라인에서 간단히 서비스 신청이 가능합니다. 회원가입 없이도 바로 시작할 수 있으며, 모든 과정은 직관적으로 설계되어 누구나 쉽게 이용하실 수 있습니다. 업로드된 자료는 최신 보안 시스템으로 안전하게 보호됩니다.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4 items-center border border-blue-100 ring-1 ring-blue-50 min-h-[220px] w-full">
            <h3 className="text-2xl font-extrabold text-blue-800 mb-4 tracking-tight group-hover:text-blue-900 transition-colors">신속한 회신</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-2 text-center max-w-xl">서비스 신청 후 평균 12시간 이내에 검토 결과를 받아보실 수 있습니다. 긴급 요청 시 우선적으로 처리되며, 진행 상황은 실시간으로 안내됩니다. 신속하면서도 정확한 회신을 약속드립니다.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4 items-center border border-blue-100 ring-1 ring-blue-50 min-h-[220px] w-full">
            <h3 className="text-2xl font-extrabold text-blue-800 mb-4 tracking-tight group-hover:text-blue-900 transition-colors">전문적이고 표준화된 검토결과</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-2 text-center max-w-xl">10년 이상 경력의 변호사가 직접 검토하여, 업계별·유형별로 최적화된 리포트를 제공합니다. 표준화된 양식과 상세한 분석을 통해 신뢰할 수 있는 결과를 보장합니다. 모든 검토 결과는 명확한 근거와 함께 제공됩니다.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4 items-center border border-indigo-100 ring-1 ring-indigo-50 min-h-[220px] w-full">
            <h3 className="text-2xl font-extrabold text-indigo-800 mb-4 tracking-tight group-hover:text-indigo-900 transition-colors">놀라운 편의성</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-2 text-center max-w-xl">모든 과정은 온라인으로 진행되어 시간과 장소에 구애받지 않습니다. 진행 상황 확인, 결과 열람, 변호사와의 소통까지 한 곳에서 간편하게 이용하실 수 있습니다. 모바일과 PC 모두 완벽하게 지원합니다.</p>
          </div>
        </div>
      </section>

      {/* 이용방법 Section with horizontal stepper */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-900 mb-10 text-center">이용방법</h2>
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

      {/* 검토결과 Section (expanded, interactive) */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-indigo-900 mb-10 text-center">검토결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/review-tracking.png" alt="수정사항 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">수정사항을 정확하게 확인</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>추적기능 적용된 이미지 제공</li>
                <li>변경 내역 하이라이트</li>
                <li>비교표로 한눈에 확인</li>
              </ul>
              <button className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors text-sm">샘플 보기</button>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/required-clauses.png" alt="필수조항 추가 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">누락된 필수 조항 추가</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>필수조항 자동 탐지 및 추가</li>
                <li>업종별/유형별 필수조항 반영</li>
                <li>계약 완성도 향상</li>
              </ul>
              <button className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors text-sm">샘플 보기</button>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/recommend-clauses.png" alt="추천조항 추가 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">추천 조항 추가</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>전문가 추천 조항 제안</li>
                <li>계약 목적/상황별 맞춤</li>
                <li>법적 리스크 최소화</li>
              </ul>
              <button className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors text-sm">샘플 보기</button>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow p-6 flex flex-col gap-2 items-center group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
              <Image src="/images/memo.png" alt="메모 첨부 이미지" width={128} height={128} className="w-32 h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
              <h3 className="text-lg font-bold text-indigo-800 mb-1 group-hover:text-indigo-900 transition-colors">주요 수정사항 사유 확인</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2">
                <li>주요 변경사항별 사유 메모 첨부</li>
                <li>의뢰인 이해도 향상</li>
                <li>투명한 소통</li>
              </ul>
              <button className="mt-2 px-4 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors text-sm">샘플 보기</button>
            </div>
          </div>
        </div>
      </section>

      {/* 차별점 Section (merged, enhanced, detailed) */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-white border-t-2 border-indigo-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-12 text-center tracking-tight">로킷서비스가 특별한 이유</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-12 gap-x-16 items-stretch">
            {/* 1. 산업별·유형별 맞춤 솔루션 */}
            <div className="flex flex-col items-center bg-white rounded-2xl p-10 w-full max-w-[600px] mx-auto border border-indigo-200 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <svg className="w-10 h-10 text-indigo-600 mb-3 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m4 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10m16 0a2 2 0 01-2 2H5a2 2 0 01-2-2" /></svg>
              <div className="font-semibold text-indigo-700 text-sm mb-2 text-center">업종과 계약 유형에 최적화된 맞춤형 분석과 가이드</div>
              <h3 className="text-lg font-bold text-indigo-800 mb-2 group-hover:text-indigo-900 transition-colors">산업별·유형별 맞춤 솔루션</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2 text-left">
                <li>업종별·계약서 유형별로 특화된 리스크 진단 및 분석 제공</li>
                <li>최신 산업 트렌드와 법률·규제 변화까지 반영</li>
                <li>실전 협상 가이드, 체크리스트, 업계별 주요 쟁점 안내</li>
                <li>복잡한 계약도 체계적으로 분류하여 맞춤 솔루션 제시</li>
              </ul>
            </div>
            {/* 2. 전문 변호사 1:1 맞춤 검토 */}
            <div className="flex flex-col items-center bg-white rounded-2xl p-10 w-full max-w-[600px] mx-auto border border-indigo-200 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <svg className="w-10 h-10 text-green-600 mb-3 group-hover:text-green-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div className="font-semibold text-green-700 text-sm mb-2 text-center">10년 이상 경력 변호사의 실무 중심 1:1 맞춤 검토</div>
              <h3 className="text-lg font-bold text-green-800 mb-2 group-hover:text-green-900 transition-colors">전문 변호사 1:1 맞춤 검토</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2 text-left">
                <li>10년 이상 경력의 변호사가 직접 검토 및 작성</li>
                <li>실무 중심의 리스크 진단과 구체적 개선 제안</li>
                <li>1:1 전문가 상담으로 궁금증 해소 및 협상 전략 제공</li>
                <li>업계별·상황별로 최적화된 피드백과 대안 제시</li>
              </ul>
            </div>
            {/* 3. 신속하고 투명한 서비스 */}
            <div className="flex flex-col items-center bg-white rounded-2xl p-10 w-full max-w-[600px] mx-auto border border-indigo-200 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <svg className="w-10 h-10 text-blue-600 mb-3 group-hover:text-blue-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <div className="font-semibold text-blue-700 text-sm mb-2 text-center">신속하고 투명한 온라인 서비스 경험</div>
              <h3 className="text-lg font-bold text-blue-800 mb-2 group-hover:text-blue-900 transition-colors">신속하고 투명한 서비스</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2 text-left">
                <li>평균 12시간 이내 신속한 결과 제공 (긴급 요청 시 우선 처리)</li>
                <li>견적 요청부터 결과 전달까지 실시간 진행 상황 안내</li>
                <li>모든 과정이 온라인·모바일로 간편하게 진행</li>
                <li>진행 내역과 결과 리포트의 투명한 공개</li>
              </ul>
            </div>
            {/* 4. 맞춤형 견적 및 서비스 */}
            <div className="flex flex-col items-center bg-white rounded-2xl p-10 w-full max-w-[600px] mx-auto border border-indigo-200 shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <svg className="w-10 h-10 text-yellow-500 mb-3 group-hover:text-yellow-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6a2 2 0 012-2h12a2 2 0 012 2v8c0 2.21-3.582 4-8 4z" /></svg>
              <div className="font-semibold text-yellow-700 text-sm mb-2 text-center">계약 복잡도·업종·요구사항별로 합리적이고 투명한 견적</div>
              <h3 className="text-lg font-bold text-yellow-700 mb-2 group-hover:text-yellow-800 transition-colors">맞춤형 견적 및 서비스</h3>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-2 text-left">
                <li>계약 복잡도, 업종, 서비스 유형(작성/검토)에 따라 맞춤 견적 제공</li>
                <li>불필요한 비용 없이 합리적이고 투명한 가격 정책</li>
                <li>고객 요구사항을 반영한 최적화된 서비스 설계</li>
                <li>견적, 진행, 결과까지 전 과정에서 고객 중심의 맞춤 서비스</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Link href="/register" className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all text-lg">차별화된 서비스 체험하기</Link>
          </div>
        </div>
      </section>
    </div>
  );
} 