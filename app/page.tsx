"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheckIcon, ClockIcon, UserGroupIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, ArrowRightIcon, CurrencyDollarIcon, AcademicCapIcon, BuildingOffice2Icon, BriefcaseIcon, ChartBarIcon, BanknotesIcon, StarIcon } from "@heroicons/react/24/outline";
import ProgressTracker from "./components/ProgressTracker";
import ContractPreview from "./components/ContractPreview";

const TRUST_BADGES = [
  { icon: ShieldCheckIcon, label: "대한변협 인증" },
  { icon: ClockIcon, label: "24시간 신속 처리" },
  { icon: UserGroupIcon, label: "전문 변호사 직접 검토" },
  { icon: StarIcon, label: "98.7% 고객 만족" },
];

const FEATURES = [
  {
    icon: DocumentTextIcon,
    title: "간편한 의뢰 절차",
    desc: "복잡한 절차 없이, 5분 이내로 온라인에서 간편하게 계약서 검토를 의뢰하실 수 있습니다.",
  },
  {
    icon: ClockIcon,
    title: "신속한 전문 대응",
    desc: "긴급한 상황에도 24시간 이내에 전문 변호사가 신속하게 회신 및 검토를 제공합니다.",
  },
  {
    icon: ShieldCheckIcon,
    title: "검증된 표준화 결과",
    desc: "법무법인 기업자문팀의 축적된 경험과 데이터 기반의 체계적이고 신뢰할 수 있는 검토 결과를 제공합니다.",
  },
  {
    icon: UserGroupIcon,
    title: "프리미엄 온라인 서비스",
    desc: "진행상황 실시간 확인, 결과 열람, 변호사와의 안전한 소통까지 모두 온라인으로 편리하게 이용하실 수 있습니다.",
  },
];

const HOW_IT_WORKS = [
  { id: "1", title: "서비스신청", description: "LawKit 홈페이지에서 간단한 정보 입력만으로 서비스 신청이 시작됩니다.", icon: "1", status: "current" as const },
  { id: "2", title: "견적확인", description: "입력하신 정보와 요청사항을 바탕으로 상세 견적을 안내해 드립니다.", icon: "2", status: "upcoming" as const },
  { id: "3", title: "계약서/자료 업로드", description: "견적에 동의하시면, 계약서 및 관련 자료를 안전하게 업로드하실 수 있습니다.", icon: "3", status: "upcoming" as const },
  { id: "4", title: "전문 변호사 배정", description: "업종별·유형별로 최적화된 10년 이상 경력의 전문 변호사가 배정됩니다.", icon: "4", status: "upcoming" as const },
  { id: "5", title: "검토결과 확인", description: "검토가 완료되면 온라인에서 결과 리포트와 수정본을 확인하실 수 있습니다.", icon: "5", status: "upcoming" as const },
  { id: "6", title: "의뢰인 피드백 반영", description: "검토 결과에 대해 추가 요청이나 궁금한 점이 있으시면 언제든 피드백을 남기실 수 있습니다.", icon: "6", status: "upcoming" as const },
];

const REVIEW_RESULTS = [
  {
    title: "수정사항을 정확하게 확인",
    desc: "추적 기능이 적용된 수정사항 이미지를 통해 변경 내역을 한눈에 확인할 수 있습니다.",
    img: "/review-diff-placeholder.png",
  },
  {
    title: "누락된 필수 조항 추가",
    desc: "계약서에 반드시 포함되어야 할 필수 조항이 누락된 경우 자동으로 추가됩니다.",
    img: "/review-required-placeholder.png",
  },
  {
    title: "추천 조항 제안",
    desc: "전문성 있는 계약서를 위해 업계별 추천 조항을 추가할 수 있습니다.",
    img: "/review-recommend-placeholder.png",
  },
  {
    title: "주요 수정사항 사유 안내",
    desc: "주요 수정사항에 대해 변호사의 상세 메모가 첨부됩니다.",
    img: "/review-memo-placeholder.png",
    note: "이 조항은 최근 판례 및 업계 표준에 따라 추가되었습니다.",
  },
];

const COMPARISON = [
  { label: "검토 주체", lawhuman: "전문 변호사", ai: "AI/비전문가" },
  { label: "검토 방식", lawhuman: "직접 읽고 분석", ai: "자동화/샘플 매칭" },
  { label: "산업별 솔루션", lawhuman: "맞춤 제공", ai: "제한적/없음" },
  { label: "책임 보장", lawhuman: "법적 책임 명확", ai: "책임 없음" },
  { label: "소통/피드백", lawhuman: "실시간 변호사 소통", ai: "불가/제한적" },
];

const INDUSTRIES = [
  { name: "제조업", icon: BriefcaseIcon, desc: "공급계약, OEM계약, 기술이전계약 등", cases: "3,200+" },
  { name: "IT/소프트웨어", icon: ChartBarIcon, desc: "개발계약, 라이선스계약, 서비스계약 등", cases: "2,800+" },
  { name: "금융/보험", icon: BanknotesIcon, desc: "투자계약, 보험계약, 금융상품계약 등", cases: "1,900+" },
  { name: "바이오/헬스케어", icon: AcademicCapIcon, desc: "임상시험계약, 라이선스계약, 연구개발계약 등", cases: "1,500+" },
  { name: "유통/서비스", icon: BuildingOffice2Icon, desc: "프랜차이즈계약, 대리점계약, 서비스계약 등", cases: "2,100+" },
  { name: "부동산/건설", icon: CurrencyDollarIcon, desc: "건설계약, 임대차계약, 개발계약 등", cases: "1,600+" },
];

const LAWYERS = [
  {
    name: "오성헌 변호사",
    title: "파트너변호사",
    image: "https://placehold.co/200x200?text=오성헌",
    desc: "위기관리, 중재, 일반 민·형사, 인사노무, 기업자문, 헌법소송 전문. 법무법인 세창, 신&박 법률사무소 등 다년간의 실무 경험.",
    quote: '"고객의 법적 리스크를 최소화하는 것이 저의 사명입니다."',
    specialties: ["위기관리", "중재", "기업자문"],
    years: 20,
    education: "서울대학교 법학과",
    certifications: ["대한변호사협회 인증", "중재인 자격"],
  },
  {
    name: "김용범 변호사",
    title: "파트너변호사/경영총괄",
    image: "https://placehold.co/200x200?text=김용범",
    desc: "기업법무 및 기업금융, M&A, 스타트업, 제약∙바이오 기술 라이센싱 계약 전문. 지엘팜텍, 메가젠임플란트 사외이사 경력.",
    quote: '"기업의 성장과 혁신을 법적으로 뒷받침하겠습니다."',
    specialties: ["M&A", "기업금융", "바이오"],
    years: 18,
    education: "서울대학교 법학과",
    certifications: ["대한변호사협회 인증", "기업법무 전문가"],
  },
  {
    name: "엄태섭 변호사",
    title: "파트너변호사",
    image: "https://placehold.co/200x200?text=엄태섭",
    desc: "기업위기관리, 규제산업(방위산업, 헬스케어)분야 자문 및 소송, 소비자집단분쟁, 사이버범죄 전문.",
    quote: '"위기 상황에서도 고객을 지키는 강력한 방패가 되겠습니다."',
    specialties: ["위기관리", "규제산업", "사이버범죄"],
    years: 15,
    education: "육군사관학교",
    certifications: ["대한변호사협회 인증", "사이버범죄 전문가"],
  },
  {
    name: "조진석 변호사",
    title: "파트너변호사",
    image: "https://placehold.co/200x200?text=조진석",
    desc: "의료민사, 의료행정, 의료형사, 의료기관(의사단체)자문 전문. 서울아산병원 법무팀, 법무법인 세승 등 의료법무 경험.",
    quote: '"의료진과 환자를 모두 보호하는 법적 해결책을 제공하겠습니다."',
    specialties: ["의료민사", "의료행정", "의료형사"],
    years: 12,
    education: "서울대학교 법학과",
    certifications: ["대한변호사협회 인증", "의료법무 전문가"],
  },
];

export default function Home() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0); // For interactive stepper
  // Sticky CTA logic
  // ...
  // (Full implementation of all sections as described, using/adapting existing components and new inline components.)
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl tracking-tight mb-6">계약서 더 쉽고 안전하게</h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto mb-8">기업 전문 변호사가 제공하는 스마트한 계약서 작성·검토 서비스</p>
            <div className="mt-8 mb-4">
              <p className="text-lg text-indigo-100 font-semibold max-w-2xl mx-auto">책임 없는 AI에게, 당신의 계약을 맡기지 마세요.<br />변호사가 직접 읽고 검토합니다.</p>
            </div>
            <Link href="/contract" className="inline-flex items-center px-12 py-6 border border-transparent text-xl font-extrabold rounded-2xl text-indigo-600 bg-white hover:bg-gray-100 transition-colors duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6">시작하기<ArrowRightIcon className="ml-2 w-6 h-6" /></Link>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center bg-white/10 rounded-full px-5 py-2 text-base font-medium text-white gap-2 shadow-sm">
                  <badge.icon className="w-5 h-5 text-indigo-200" />
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURE CARDS */}
      <section className="py-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center flex flex-col items-center hover:shadow-xl transition-shadow">
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-10 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">이용방법</h2>
          <ProgressTracker
            currentStep={(activeStepIndex + 1).toString()}
            steps={HOW_IT_WORKS}
            showTimeEstimate={false}
            activeStepIndex={activeStepIndex}
            onStepClick={setActiveStepIndex}
          />
        </div>
      </section>

      {/* 4. REVIEW RESULTS */}
      <section className="py-10 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">검토결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEW_RESULTS.map((result, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center">
                <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  {/* Placeholder for image/visual */}
                  <span className="text-gray-400">이미지/예시</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{result.desc}</p>
                {result.note && (
                  <div className="mt-2 text-xs text-indigo-600 bg-indigo-50 rounded px-3 py-2">💡 {result.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY LAWKIT */}
      <section className="py-10 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why LawKit?</h2>
          {/* Comparison Table */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white rounded-xl shadow border border-gray-100">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">구분</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-indigo-700">LawKit</th>
                  <th className="py-3 px-6 text-center text-sm font-semibold text-gray-500">AI/일반 서비스</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-3 px-6 text-gray-700 font-medium">{row.label}</td>
                    <td className="py-3 px-6 text-center text-indigo-700 font-bold">{row.lawhuman}</td>
                    <td className="py-3 px-6 text-center text-gray-500">{row.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Industry Cards */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">산업별 솔루션</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {INDUSTRIES.map((industry, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col items-center">
                  <industry.icon className="w-10 h-10 text-indigo-600 mb-3" />
                  <div className="text-lg font-semibold text-gray-900 mb-1">{industry.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{industry.cases}건 처리</div>
                  <div className="text-xs text-gray-600 text-center">{industry.desc}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Guide Preview */}
          <div className="bg-indigo-50 rounded-xl p-6 text-center max-w-2xl mx-auto">
            <h4 className="text-lg font-bold text-indigo-700 mb-2">계약서 종류별 협상가이드 제공</h4>
            <p className="text-gray-700 text-sm mb-2">업계별, 계약서별로 꼭 챙겨야 할 협상 포인트와 체크리스트를 안내합니다.</p>
            <Link href="/expertise" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">가이드 미리보기<ArrowRightIcon className="ml-2 w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      {/* 6. LAWYER PROFILES */}
      <section className="py-10 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">전문 변호사 소개</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LAWYERS.map((lawyer, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center h-full">
                <Image src={lawyer.image} alt={lawyer.name} width={96} height={96} className="rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
                <div className="text-sm text-indigo-600 mb-2">{lawyer.title}</div>
                <p className="text-gray-600 text-sm mb-3">{lawyer.desc}</p>
                <div className="text-xs text-gray-500 italic mb-2">{lawyer.quote}</div>
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  {lawyer.specialties.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">{s}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2 justify-center">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">{lawyer.years}년 경력</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{lawyer.education}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {lawyer.certifications.map((c, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{c}</span>
                  ))}
                </div>
                <div className="mt-auto">
                  <Link href="/contact" className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">상담 예약<ArrowRightIcon className="ml-2 w-4 h-4" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STICKY CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden">
        <div className="bg-white border-t border-gray-200 shadow-lg flex justify-center py-3">
          <Link href="/contract" className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-full shadow hover:bg-indigo-700 transition">시작하기<ArrowRightIcon className="ml-2 w-6 h-6" /></Link>
        </div>
      </div>
    </main>
  );
} 