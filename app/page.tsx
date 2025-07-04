'use client';
import Link from 'next/link';
import Image from 'next/image';
import { BriefcaseIcon, BuildingOffice2Icon, ChartBarIcon, BanknotesIcon, UserGroupIcon, ShieldCheckIcon, TrophyIcon, ClockIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, LockClosedIcon, CurrencyDollarIcon, InboxIcon, StarIcon, AcademicCapIcon, GlobeAltIcon, CogIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
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
  { 
    icon: DocumentTextIcon, 
    title: '계약서 업로드', 
    desc: '간편하게 파일 업로드',
    details: 'PDF, Word, 이미지 등 다양한 형식의 계약서를 안전하게 업로드합니다. 드래그 앤 드롭으로 간편하게 파일을 올려보세요.'
  },
  { 
    icon: UserGroupIcon, 
    title: '전문 변호사 배정', 
    desc: '분야별 최적 변호사 매칭',
    details: '계약서 유형과 업종에 맞는 전문 변호사를 자동으로 배정합니다. 각 분야의 최고 전문가가 검토를 담당합니다.'
  },
  { 
    icon: ChatBubbleLeftRightIcon, 
    title: '맞춤 분석 & 견적', 
    desc: '상황별 맞춤 전략 제안',
    details: '계약서의 모든 조항을 세밀하게 분석하여 잠재적 리스크를 식별하고 개선 방안을 제시합니다.'
  },
  { 
    icon: CheckCircleIcon, 
    title: '결과 전달', 
    desc: '신속한 결과 안내',
    details: '분석이 완료되면 즉시 상세한 리포트를 제공합니다. 이해하기 쉬운 형태로 정리된 결과를 확인하세요.'
  },
];

const SERVICE_CATEGORIES = [
  { 
    icon: BriefcaseIcon, 
    title: '계약서 검토', 
    desc: '기업/개인 계약서, 각종 문서 검토',
    features: ['매매계약서', '임대차계약서', '고용계약서', '서비스계약서', '라이선스계약서'],
    color: 'from-blue-500 to-blue-600'
  },
  { 
    icon: BuildingOffice2Icon, 
    title: '기업 자문', 
    desc: 'M&A, 투자, 지분, 경영권 등',
    features: ['M&A 자문', '투자 계약', '지분 협상', '경영권 분쟁', '기업 구조 개편'],
    color: 'from-purple-500 to-purple-600'
  },
  { 
    icon: ChartBarIcon, 
    title: '지적재산권', 
    desc: '특허, 상표, 저작권, 라이선스',
    features: ['특허 출원', '상표 등록', '저작권 보호', '라이선스 계약', 'IP 분쟁 해결'],
    color: 'from-green-500 to-green-600'
  },
  { 
    icon: UserGroupIcon, 
    title: '노무/인사', 
    desc: '근로계약, 분쟁, 인사관리',
    features: ['근로계약서', '인사 규정', '노동 분쟁', '퇴직금 계산', '산재 보상'],
    color: 'from-orange-500 to-orange-600'
  },
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
    education: '서울대학교 법학과',
    certifications: ['대한변호사협회 인증', 'M&A 전문가 자격']
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
    education: '하버드 로스쿨',
    certifications: ['미국 변호사 자격', '특허 변호사 자격']
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
    education: '고려대학교 법학과',
    certifications: ['노동법 박사', '노동 분쟁 전문가']
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

const INDUSTRIES = [
  { name: '제조업', icon: CogIcon, cases: '3,200+', desc: '공급계약, OEM계약, 기술이전계약' },
  { name: 'IT/소프트웨어', icon: GlobeAltIcon, cases: '2,800+', desc: '개발계약, 라이선스계약, 서비스계약' },
  { name: '금융/보험', icon: BanknotesIcon, cases: '1,900+', desc: '투자계약, 보험계약, 금융상품계약' },
  { name: '바이오/헬스케어', icon: AcademicCapIcon, cases: '1,500+', desc: '임상시험계약, 라이선스계약, 연구개발계약' },
  { name: '유통/서비스', icon: BuildingOffice2Icon, cases: '2,100+', desc: '프랜차이즈계약, 대리점계약, 서비스계약' },
  { name: '부동산/건설', icon: ChartBarIcon, cases: '1,600+', desc: '건설계약, 임대차계약, 개발계약' },
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl tracking-tight">
                계약서 더 쉽고 안전하게
              </h1>
              <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
                기업 전문 변호사가 제공하는 스마트한 계약서 작성·검토 서비스
              </p>
              <div className="mt-8 mb-2">
                <p className="text-lg text-indigo-100 font-semibold max-w-2xl mx-auto">
                  책임 없는 AI에게, 당신의 계약을 맡기지 마세요.<br />
                  변호사가 직접 읽고 검토합니다.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link 
                href="/contract"
                className="inline-flex items-center px-12 py-6 border border-transparent text-xl font-extrabold rounded-2xl 
                         text-indigo-600 bg-white hover:bg-gray-100 transition-colors duration-150 
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
              >
                시작하기
                <svg className="ml-2 -mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Combined Trust Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 저희를 신뢰하시나요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              20년간 쌓아온 전문성과 수천 건의 성공 사례로 고객의 법률 문제를 해결합니다<br/>
              <span className="block text-indigo-700 font-semibold mt-2">수천 건의 성공 사례와 높은 고객 만족도로 입증된 전문성</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl border border-gray-100 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">안전한 기밀 보장</h3>
              <p className="text-gray-600 text-sm">엔터프라이즈급 보안으로 문서를 안전하게 보호합니다.</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl border border-gray-100 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">신속한 처리</h3>
              <p className="text-gray-600 text-sm">24-48시간 내에 계약서 검토 및 작성을 완료합니다.</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl border border-gray-100 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전문가 검토</h3>
              <p className="text-gray-600 text-sm">모든 계약서는 자격을 갖춘 전문 변호사가 검토합니다.</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl border border-gray-100 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">합리적인 비용</h3>
              <p className="text-gray-600 text-sm">전통적인 법무 서비스 대비 70% 비용 절감을 제공합니다.</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold text-indigo-800 mb-2">
                <AnimatedCounter value="12,000+" />
              </div>
              <div className="text-indigo-600">검토 완료 계약</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-indigo-800 mb-2">
                <AnimatedCounter value="98.7%" />
              </div>
              <div className="text-indigo-600">고객 만족도</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-indigo-800 mb-2">
                <AnimatedCounter value="1,200+" />
              </div>
              <div className="text-indigo-600">기업 고객</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-indigo-800 mb-2">
                <AnimatedCounter value="17년" />
              </div>
              <div className="text-indigo-600">평균 경력</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Section - moved up and with updated background */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              투자 대비 효과
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              전문적인 계약 검토로 얻을 수 있는 구체적인 효과
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <ChartBarIcon className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">27%</h3>
                  <p className="text-green-600 font-medium">평균 ROI 증가</p>
                </div>
              </div>
              <ul className="space-y-3">
                {ROI_POINTS.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleSolidIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <BanknotesIcon className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">₩87억+</h3>
                  <p className="text-red-600 font-medium">누적 절감 비용</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">전통적 법무 서비스</span>
                  <span className="text-red-600 font-semibold">수백만원</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">저희 서비스</span>
                  <span className="text-green-600 font-semibold">수십만원</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">비용 절감</span>
                    <span className="text-green-600 font-bold">70%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Lawyers */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              전문 변호사 소개
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              각 분야의 최고 전문가들이 고객의 법률 문제를 해결합니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LAWYERS.map((lawyer, index) => (
              <motion.div
                key={lawyer.name}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">{lawyer.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
                    <p className="text-sm text-indigo-600">{lawyer.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{lawyer.desc}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 italic">&ldquo;{lawyer.quote}&rdquo;</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <AcademicCapIcon className="h-4 w-4 mr-2" />
                    {lawyer.education}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrophyIcon className="h-4 w-4 mr-2" />
                    {lawyer.years}년 경력
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {lawyer.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Experience */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              다양한 업계 경험
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              30개 이상의 업계에서 쌓은 풍부한 경험과 전문성
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((industry, index) => (
              <motion.div
                key={industry.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <industry.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{industry.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{industry.cases} 건 처리</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{industry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 