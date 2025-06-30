'use client';
import Link from 'next/link';
import Image from 'next/image';
import { BriefcaseIcon, BuildingOffice2Icon, ChartBarIcon, BanknotesIcon, UserGroupIcon, ShieldCheckIcon, TrophyIcon, ClockIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, LockClosedIcon, CurrencyDollarIcon, InboxIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { GeistMono } from 'geist/font/mono';
import { motion } from 'framer-motion';
import Testimonials from './components/Testimonials';

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

const LAWYERS = [
  {
    name: '김지훈 변호사',
    title: '대표 변호사 / M&A, 기업법 전문',
    image: 'https://placehold.co/200x200?text=Lawyer+1',
    desc: '서울대 법대, 前 대형로펌 파트너, 20년 경력. 5000건 이상의 기업 자문 및 M&A 수행.',
    quote: '"고객의 신뢰와 성공이 저의 최우선 가치입니다."',
    specialties: ['M&A', '기업법', '계약서 검토'],
    keyExperience: '5000건 이상 기업 자문 및 대형 M&A 수행',
    years: 20,
  },
  {
    name: '이수진 변호사',
    title: '계약/지적재산권 전문',
    image: 'https://placehold.co/200x200?text=Lawyer+2',
    desc: '하버드 로스쿨, 국내외 대기업 자문, 15년 경력. IT/제조/바이오 등 다양한 산업 경험.',
    quote: '"복잡한 문제일수록 맞춤형 전략이 필요합니다."',
    specialties: ['계약', '지적재산권', 'IT/제조'],
    keyExperience: '국내외 대기업 자문, 1000건 이상 계약/특허 검토',
    years: 15,
  },
  {
    name: '박민석 변호사',
    title: '노무/인사/분쟁 전문',
    image: 'https://placehold.co/200x200?text=Lawyer+3',
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

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl tracking-tight">
            법률 계약서,
            <span className="block text-yellow-400">더 쉽고 안전하게</span>
          </h1>
          <p className="mt-6 text-xl text-indigo-200 max-w-3xl mx-auto">
            전문 변호사와 AI 기술이 만나 제공하는 스마트한 계약서 작성 및 검토 서비스
          </p>
          <div className="mt-10">
            <Link 
              href="/contract"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl 
                       text-indigo-900 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-150 
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
            >
              시작하기
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-white/20">
            <div className="text-yellow-400 mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">안전한 기밀 보장</h3>
            <p className="mt-2 text-indigo-200">엔터프라이즈급 보안으로 문서를 안전하게 보호합니다.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-white/20">
            <div className="text-yellow-400 mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">신속한 처리</h3>
            <p className="mt-2 text-indigo-200">수 시간 내에 계약서 검토 및 작성을 완료합니다.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-white/20">
            <div className="text-yellow-400 mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">전문가 검토</h3>
            <p className="mt-2 text-indigo-200">모든 계약서는 자격을 갖춘 전문 변호사가 검토합니다.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            신뢰할 수 있는 법률 서비스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                <AnimatedCounter value="12,000+" />
              </div>
              <div className="text-indigo-200">검토 완료 계약</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                <AnimatedCounter value="98.7%" />
              </div>
              <div className="text-indigo-200">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                <AnimatedCounter value="1,200+" />
              </div>
              <div className="text-indigo-200">기업 고객</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                <AnimatedCounter value="17년" />
              </div>
              <div className="text-indigo-200">평균 경력</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto">
            AI와 전문 변호사의 만남으로 탄생한 최적의 법률 서비스를 경험해보세요
          </p>
          <Link
            href="/contract"
            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl 
                     text-indigo-900 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-150 
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
          >
            무료로 시작하기
            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
} 