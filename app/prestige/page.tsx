'use client';
import Link from 'next/link';
import Image from 'next/image';
import Testimonials from '../components/Testimonials';
import { BriefcaseIcon, BuildingOffice2Icon, ChartBarIcon, BanknotesIcon, UserGroupIcon, ShieldCheckIcon, TrophyIcon, ClockIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, LockClosedIcon, CurrencyDollarIcon, InboxIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

const TRUST_BADGES = [
  { icon: ShieldCheckIcon, label: '대한변협 인증' },
  { icon: TrophyIcon, label: '20년 경력' },
  { icon: UserGroupIcon, label: '수천 건의 성공 사례' },
  { icon: LockClosedIcon, label: '100% 기밀 보장' },
];

const PROCESS_STEPS = [
  { icon: DocumentTextIcon, title: '계약서 업로드', desc: '간편하게 파일 업로드' },
  { icon: UserGroupIcon, title: '전문 변호사 배정', desc: '분야별 최적 변호사 매칭' },
  { icon: ChatBubbleLeftRightIcon, title: '맞춤 분석 & 견적', desc: '상황별 맞춤 전략 제안' },
  { icon: CheckCircleIcon, title: '결과 전달', desc: '신속한 결과 안내' },
];

const SERVICE_CATEGORIES = [
  { icon: BriefcaseIcon, title: '계약서 검토', desc: '기업/개인 계약서, 각종 문서 검토' },
  { icon: BuildingOffice2Icon, title: '기업 자문', desc: 'M&A, 투자, 지분, 경영권 등' },
  { icon: ChartBarIcon, title: '지적재산권', desc: '특허, 상표, 저작권, 라이선스' },
  { icon: UserGroupIcon, title: '노무/인사', desc: '근로계약, 분쟁, 인사관리' },
];

const FAQS = [
  { q: '내 정보와 문서는 안전하게 보호되나요?', a: '모든 자료는 암호화되어 저장되며, 변호사 윤리 기준에 따라 100% 기밀이 보장됩니다.' },
  { q: '비용은 어떻게 산정되나요?', a: '계약서 업로드 후, 맞춤 견적을 안내해 드립니다. 사전 동의 없는 추가 비용은 없습니다.' },
  { q: '오프라인 방문 없이도 충분한 상담이 가능한가요?', a: '네, 모든 절차가 온라인으로 진행되며 필요시 전화/화상 상담도 지원합니다.' },
  { q: '서비스 이용 절차가 궁금해요.', a: '계약서 업로드 → 변호사 배정 → 분석/견적 → 결과 안내 순으로 진행됩니다.' },
];

const LAWYERS = [
  {
    name: '김지훈 변호사',
    title: '대표 변호사 / M&A, 기업법 전문',
    image: '/public/lawyer1.jpg',
    desc: '서울대 법대, 前 대형로펌 파트너, 20년 경력. 5000건 이상의 기업 자문 및 M&A 수행.',
    quote: '"고객의 신뢰와 성공이 저의 최우선 가치입니다."',
    specialties: ['M&A', '기업법', '계약서 검토'],
    keyExperience: '5000건 이상 기업 자문 및 대형 M&A 수행',
    years: 20,
  },
  {
    name: '이수진 변호사',
    title: '계약/지적재산권 전문',
    image: '/public/lawyer2.jpg',
    desc: '하버드 로스쿨, 국내외 대기업 자문, 15년 경력. IT/제조/바이오 등 다양한 산업 경험.',
    quote: '"복잡한 문제일수록 맞춤형 전략이 필요합니다."',
    specialties: ['계약', '지적재산권', 'IT/제조'],
    keyExperience: '국내외 대기업 자문, 1000건 이상 계약/특허 검토',
    years: 15,
  },
  {
    name: '박민석 변호사',
    title: '노무/인사/분쟁 전문',
    image: '/public/lawyer3.jpg',
    desc: '고려대 법대, 노동법 박사, 18년 경력. 1000건 이상의 분쟁 해결 및 자문.',
    quote: '"진심을 담아, 끝까지 책임지는 자문을 약속합니다."',
    specialties: ['노무', '인사', '분쟁'],
    keyExperience: '1000건 이상 분쟁 해결 및 자문',
    years: 18,
  },
];

const STATS = [
  { label: '누적 계약 검토', value: '12,000+', desc: '다양한 업계의 계약서 및 자문', icon: BriefcaseIcon },
  { label: '산업별 자문 경험', value: '30+', desc: '제조, IT, 바이오, 금융, 유통 등', icon: BuildingOffice2Icon },
  { label: '기업 고객 수', value: '1,200+', desc: '국내외 다양한 기업 고객', icon: UserGroupIcon },
  { label: '평균 고객 만족도', value: '98.7%', desc: '고객 설문 및 재이용률 기준', icon: TrophyIcon },
  { label: '평균 ROI 증가', value: '27%', desc: '계약 리스크 절감 및 비용 효율화', icon: ChartBarIcon },
  { label: '누적 절감 비용', value: '₩87억+', desc: '고객이 절감한 법률/분쟁 비용', icon: ShieldCheckIcon },
  { label: '총 거래/자문 금액', value: '₩2.1조+', desc: '누적 거래 및 자문 금액', icon: BanknotesIcon },
  { label: '연평균 경력', value: '17년', desc: '주요 변호사 평균 경력', icon: ClockIcon },
];

const ROI_POINTS = [
  '계약 리스크 사전 차단으로 분쟁 비용 절감',
  '업계별 맞춤 자문으로 사업 기회 극대화',
  '신속한 검토로 비즈니스 의사결정 가속화',
  '투명한 견적과 결과로 예산 계획 최적화',
];

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState<number | string>(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/[^\d]/g, ''));
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    let frame: number;
    const duration = 1200;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        frame = requestAnimationFrame((t) => step(t, startTime));
      } else {
        setCount(value);
      }
    };
    frame = requestAnimationFrame((t) => step(t, t));
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <div ref={ref}>{typeof count === 'number' ? count.toLocaleString() + (value.match(/\D+$/)?.[0] || '') : count}</div>;
}

export default function PrestigeHome() {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 text-white overflow-hidden" aria-labelledby="hero-heading">
        {/* Abstract SVG background shape */}
        <svg className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-30" width="900" height="400" viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="450" cy="200" rx="400" ry="120" fill="#6366f1" fillOpacity="0.25" />
          <ellipse cx="600" cy="100" rx="200" ry="80" fill="#818cf8" fillOpacity="0.18" />
          <ellipse cx="300" cy="300" rx="180" ry="60" fill="#a5b4fc" fillOpacity="0.15" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center justify-center gap-12">
          <div className="text-center flex-1">
            <div className="mb-4 text-lg md:text-xl text-indigo-100 font-semibold tracking-wide">기업도 개인도, 전문가의 법률 감각을 온라인으로</div>
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              계약의 시작과 끝,<br className="hidden md:inline" /> 대한민국 최고 변호사들이 책임집니다.
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto font-semibold">
              계약서 초안, 검토, 위험 분석, 맞춤 자문까지<br />
              한 번의 업로드로 모든 과정을 원스톱으로.<br />
              신뢰, 품격, 그리고 디지털의 편리함을 경험하세요.
            </p>
            <p className="text-lg md:text-xl text-yellow-200 font-bold mb-8 max-w-2xl mx-auto">
              모든 고객의 상황과 목표를 깊이 이해하고,<br />
              업계 최고 변호사가 직접 설계하는<br />
              <span className="text-yellow-300">단 하나뿐인 맞춤형 법률 솔루션</span>을 제공합니다.
            </p>
            <div className="flex justify-center mb-8">
              <Link
                href="/upload"
                className="inline-flex items-center justify-center px-12 py-5 border border-transparent text-lg font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg mx-auto transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
                aria-label="계약서 업로드하고 견적 받기"
              >
                계약서 업로드하고 견적 받기
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">실제 변호사 직접 검토</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">업계 최초, 완전 맞춤형 온라인 서비스</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">신속한 피드백</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">30개+ 산업별 자문 경험</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <p className="text-white font-semibold text-sm">로펌의 신뢰와 품격</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-8 bg-white border-b border-indigo-100">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-2 shadow-sm">
              <badge.icon className="w-6 h-6 text-indigo-600" />
              <span className="text-indigo-900 font-semibold text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gradient-to-br from-white to-indigo-50" aria-labelledby="process-heading">
        <div className="max-w-5xl mx-auto px-4">
          <h2 id="process-heading" className="text-2xl font-bold text-gray-900 mb-10 text-center">이용 절차</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center group relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition mb-4 shadow-lg border-2 border-indigo-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-400">{idx + 1}</span>
                  <step.icon className="w-8 h-8 text-indigo-600 group-hover:text-indigo-800 transition" />
                </div>
                <div className="text-lg font-bold text-indigo-800 mb-1">{step.title}</div>
                <div className="text-sm text-gray-600 text-center">{step.desc}</div>
                {/* Connecting line except for last step */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute right-[-60px] top-8 w-12 h-1 bg-indigo-200 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Snippet */}
      <section className="py-8 bg-white border-b border-indigo-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <blockquote className="text-xl italic text-indigo-800 font-semibold mb-2">"계약서 검토부터 분쟁까지, 온라인으로 이렇게 신속하고 믿을 수 있는 서비스는 처음이었습니다."</blockquote>
          <div className="text-sm text-gray-500">- 실제 고객 후기 중에서</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-white" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 id="stats-heading" className="text-3xl font-bold text-gray-900 mb-4">성과로 증명하는 신뢰</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-4">
              수많은 기업과 개인이 선택한 이유, 바로 경험과 결과입니다.<br />
              우리는 숫자 이상의 가치를 제공합니다—고객 한 분, 한 분의 신뢰와 만족이 우리의 자부심입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={stat.label} className="bg-gradient-to-br from-indigo-100 to-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-indigo-100 hover:shadow-xl transition-shadow fadein-section">
                <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 shadow">
                  <stat.icon className="w-8 h-8 text-indigo-500" aria-hidden="true" />
                </div>
                <div className="text-2xl font-extrabold text-indigo-800 mb-1">
                  {/* Animated count-up */}
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500 text-center">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One Stop Shop Section */}
      <section className="py-16 bg-white" aria-labelledby="onestop-heading">
        <div className="max-w-5xl mx-auto px-4">
          <h2 id="onestop-heading" className="text-3xl font-bold text-indigo-900 mb-6 text-center">계약 관련 모든 니즈, 단 하나의 플랫폼에서</h2>
          <p className="text-xl text-gray-700 mb-8 text-center font-semibold">
            계약서 초안 작성부터 세부 조항 검토, 위험 분석, 맞춤 자문, 분쟁 예방까지.<br />
            기업과 개인 모두를 위한 <span className="text-indigo-700 font-bold">계약의 시작과 끝</span>을 책임집니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-indigo-800 mb-2">계약서 초안/작성</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>상황별 맞춤 계약서 초안 제공</li>
                <li>국내외 표준/특수 계약서 작성</li>
                <li>업종별, 목적별 특화 조항 설계</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-indigo-800 mb-2">계약서 검토/분석</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>리스크 및 불리한 조항 진단</li>
                <li>법적 분쟁 예방을 위한 사전 분석</li>
                <li>상대방 제안서/계약서 신속 검토</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-indigo-800 mb-2">계약 협상/자문</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>협상 전략 및 대응 방안 제시</li>
                <li>상대방과의 커뮤니케이션 지원</li>
                <li>계약 체결 전/후 맞춤 자문</li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-indigo-800 mb-2">사후 관리/분쟁 예방</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>계약 이행 모니터링 및 사후 관리</li>
                <li>분쟁 발생 시 신속한 대응 자문</li>
                <li>계약 관련 모든 법률 리스크 원스톱 관리</li>
              </ul>
            </div>
          </div>
          <p className="mt-10 text-center text-indigo-800 font-bold text-lg">계약의 시작부터 끝까지, <span className="text-indigo-900">모든 단계에서 전문가가 함께합니다.</span></p>
        </div>
      </section>

      {/* Meet Our Lawyers Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white" aria-labelledby="lawyers-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="lawyers-heading" className="text-3xl font-bold text-gray-900 mb-4">브레인, 그 자체. 최고의 전문가들</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              각 분야별로 국내외 최고 수준의 경력과 실적을 자랑하는 변호사들이 직접 참여합니다.<br />
              다양한 산업과 케이스 경험을 가진 변호사들이 여러분의 상황을 진심으로 이해하고, 최적의 전략을 설계합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LAWYERS.map((lawyer) => (
              <div
                key={lawyer.name}
                className="bg-white rounded-xl shadow-lg p-8 border border-indigo-100 text-center flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl relative group fadein-section"
              >
                {/* 대표 변호사 ribbon */}
                {lawyer.name === '김지훈 변호사' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow">대표 변호사</div>
                )}
                <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-100 mb-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <Image src={lawyer.image} alt={lawyer.name} width={96} height={96} className="object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-lg font-bold text-indigo-800">{lawyer.name}</div>
                  {lawyer.years >= 15 && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full">{lawyer.years}년 경력</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">{lawyer.title}</div>
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {lawyer.specialties.map((spec) => (
                    <span key={spec} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">{spec}</span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mb-2">{lawyer.desc}</div>
                <div className="text-xs text-gray-400 mb-2">대표 경력: {lawyer.keyExperience}</div>
                {lawyer.quote && (
                  <div className="italic text-indigo-600 text-sm mt-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{lawyer.quote}</div>
                )}
                <Link href="/contact" className="mt-auto px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">상담 신청</Link>
                <a href="#" className="text-indigo-500 text-xs mt-2 underline hover:text-indigo-700">자세히 보기</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4">
          <h2 id="services-heading" className="text-2xl font-bold text-gray-900 mb-10 text-center">주요 서비스 영역</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.title} className="flex flex-col items-center text-center bg-white rounded-xl shadow p-6 border border-indigo-100">
                <cat.icon className="w-10 h-10 text-indigo-500 mb-3" />
                <div className="text-lg font-bold text-indigo-800 mb-1">{cat.title}</div>
                <div className="text-sm text-gray-600">{cat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-white" aria-labelledby="value-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="value-heading" className="text-3xl font-bold text-gray-900 mb-4">
              단 하나뿐인, 당신만을 위한 법률 솔루션
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-4">
              우리는 모든 고객의 상황과 목표를 깊이 이해하고, 그에 맞는 전략을 제안합니다.<br />
              <span className="font-semibold text-indigo-600">정형화된 답변이 아닌, 오직 당신만을 위한 맞춤형 자문</span>을 온라인으로 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">맞춤형 프리미엄 서비스</h3>
              <p className="text-gray-600 mb-4">고객 한 분, 한 분의 상황에 맞춘<br />
                오직 나만을 위한 법률 솔루션을 제공합니다.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">신속한 피드백, 빠른 대응</h3>
              <p className="text-gray-600 mb-4">계약서 업로드 후, 빠른 시간 내에 전문가의 분석 결과와 견적을 받아보세요.<br />
                궁금한 점은 언제든 문의 가능합니다.</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">로펌의 신뢰와 품격</h3>
              <p className="text-gray-600 mb-4">수많은 기업과 개인을 위한 자문 경험.<br />
                대한민국을 대표하는 변호사들이 직접 참여합니다.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-indigo-100 shadow text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">24시간, 언제 어디서나</h3>
              <p className="text-gray-600 mb-4">시간과 장소의 제약 없이, 온라인으로 간편하게.<br />
                오프라인 방문 없이도 최고의 법률 서비스를 누리세요.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-indigo-100 shadow text-center">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">실제 변호사 직접 검토</h3>
              <p className="text-gray-600 mb-4">실제 변호사가 직접 분석하고<br />
                책임지는 결과와 안내를 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-10 text-center">자주 묻는 질문</h2>
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-indigo-50 rounded-lg p-6">
                <div className="font-semibold text-indigo-800 mb-2">Q. {faq.q}</div>
                <div className="text-gray-700">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 bg-gradient-to-br from-indigo-100 to-white" aria-labelledby="security-heading">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <LockClosedIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 id="security-heading" className="text-2xl font-bold text-gray-900 mb-4">100% 기밀 보장 & 데이터 보안</h2>
          <p className="text-lg text-gray-700 mb-4">모든 자료는 업계 최고 수준의 보안 환경에서 암호화되어 저장되며, 변호사 윤리 기준에 따라 100% 기밀이 보장됩니다.<br />안심하고 맡기세요.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span className="bg-white border border-indigo-200 rounded-full px-4 py-2 text-indigo-800 font-semibold text-sm">ISO 27001 인증</span>
            <span className="bg-white border border-indigo-200 rounded-full px-4 py-2 text-indigo-800 font-semibold text-sm">SSL/TLS 256bit 암호화</span>
            <span className="bg-white border border-indigo-200 rounded-full px-4 py-2 text-indigo-800 font-semibold text-sm">대한변협 등록 법률사무소</span>
            <span className="bg-white border border-indigo-200 rounded-full px-4 py-2 text-indigo-800 font-semibold text-sm">AWS 기반 보안 인프라</span>
            <span className="bg-white border border-indigo-200 rounded-full px-4 py-2 text-indigo-800 font-semibold text-sm">정기적 보안 점검 및 모니터링</span>
          </div>
          <p className="text-sm text-gray-500">고객의 정보와 문서는 오직 담당 변호사만 접근 가능하며, 외부 유출 및 무단 열람이 원천적으로 차단됩니다.</p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-white" aria-labelledby="pricing-heading">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <CurrencyDollarIcon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 id="pricing-heading" className="text-2xl font-bold text-gray-900 mb-4">투명한 가격 안내</h2>
          <p className="text-lg text-gray-700 mb-4">모든 서비스는 <span className='font-bold text-indigo-700'>사전 견적</span>을 통해 투명하게 안내되며, <span className='font-bold'>숨겨진 비용이나 추가 청구</span>가 없습니다.<br />
            계약서 업로드 후, 맞춤 견적을 무료로 받아보세요.</p>
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="bg-indigo-50 rounded-lg px-6 py-3 text-indigo-900 font-semibold text-base w-full max-w-md">계약서 검토: 5만원~ (난이도/분량별 차등)</div>
            <div className="bg-indigo-50 rounded-lg px-6 py-3 text-indigo-900 font-semibold text-base w-full max-w-md">계약서 초안/작성: 15만원~</div>
            <div className="bg-indigo-50 rounded-lg px-6 py-3 text-indigo-900 font-semibold text-base w-full max-w-md">맞춤 자문/협상: 별도 안내</div>
          </div>
          <ul className="text-sm text-gray-600 mb-4 list-disc list-inside text-left max-w-md mx-auto">
            <li>모든 견적은 VAT 포함, 사전 안내 후 확정</li>
            <li>견적 동의 전까지 비용 청구 없음</li>
            <li>결과 미흡 시 100% 환불 보장</li>
            <li>장기/반복 의뢰 시 추가 할인</li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">지금 바로, 전문가의 법률 감각을 온라인으로 경험하세요.</h2>
          <p className="text-xl mb-8">오프라인 방문 없이, 클릭 한 번으로.<br />
            대한민국 최고의 변호사들이 여러분을 기다립니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="계약서 업로드하고 견적 받기"
            >
              계약서 업로드하고 견적 받기
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center sm:hidden animate-pulse">
        <Link href="/upload" className="px-8 py-3 rounded-full bg-indigo-700 text-white font-bold shadow-lg">계약서 업로드하고 견적 받기</Link>
      </div>
    </main>
  );
} 