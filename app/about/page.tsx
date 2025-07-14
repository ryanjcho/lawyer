'use client';

import Link from 'next/link';
import { motion } from 'framer-motion'
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">회사소개</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">로킷의 미션과 비전, 그리고 팀을 소개합니다.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 id="mission-heading" className="text-3xl font-bold text-gray-900 mb-6">
                우리의 미션
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                법률 서비스의 접근성을 높여 모든 기업과 개인이 최고 수준의 법률 보호를 받을 수 있도록 하는 것이 우리의 미션입니다.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                업계 최고 수준의 로펌 전문성을 혁신적인 서비스로 확장하여, 복잡하고 비용이 많이 드는 법률 서비스를 
                누구나 쉽게 접근할 수 있는 형태로 제공합니다. 우리는 전문성과 인간 중심의 접근을 통해 
                법률 리스크를 사전에 방지하고, 고객의 비즈니스 성공을 보장하는 완벽한 파트너가 되겠습니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">핵심 가치</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">혁신</h4>
                    <p className="text-gray-600">최첨단 데이터 처리 기술로 법률 서비스의 새로운 패러다임을 창조합니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">신뢰</h4>
                    <p className="text-gray-600">검증된 변호사들의 심사를 거쳐 최고 품질의 서비스를 보장합니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">고객 중심</h4>
                    <p className="text-gray-600">고객의 성공을 위해 기대를 뛰어넘는 서비스를 제공합니다.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50" aria-labelledby="story-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="story-heading" className="text-3xl font-bold text-gray-900 mb-4">
              법무법인 오킴스의 이야기
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              업계 최고 수준의 로펌 변호사들이 모여 만든 한국 최초의 독자 개발 법률 플랫폼 <span className="font-bold text-indigo-600">로킷</span>
            </p>
          </div>

          {/* Vertical Timeline */}
          <ol className="relative border-l-4 border-indigo-200 ml-4 max-w-3xl w-full">
            <li className="mb-12 ml-8">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-40 text-left text-2xl font-extrabold text-indigo-700">2016년 11월</span>
                <span className="text-xl font-semibold text-gray-900" id="timeline-title-2016">시작</span>
              </div>
              <div className="ml-40 pl-4 text-gray-700 text-base">법률 서비스 혁신을 위한 첫 발걸음</div>
            </li>
            <li className="mb-12 ml-8">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-40 text-left text-2xl font-extrabold text-indigo-700">2018년 2월</span>
                <span className="text-xl font-semibold text-gray-900" id="timeline-title-2018">법무법인 전환</span>
              </div>
              <div className="ml-40 pl-4 text-gray-700 text-base">조직의 전문성과 신뢰성 강화를 위해 법무법인으로 전환</div>
            </li>
            <li className="mb-12 ml-8">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-40 text-left text-2xl font-extrabold text-indigo-700">2022년 1월</span>
                <span className="text-xl font-semibold text-gray-900" id="timeline-title-2022">강남역 이전</span>
              </div>
              <div className="ml-40 pl-4 text-gray-700 text-base">고객 접근성과 서비스 품질 향상을 위해 강남역으로 사무실 확장 이전</div>
            </li>
            <li className="mb-12 ml-8">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-40 text-left text-2xl font-extrabold text-indigo-700">2024년 12월</span>
                <span className="text-xl font-semibold text-gray-900" id="timeline-title-2024">초거대법률데이터 라벨링 구축사업</span>
              </div>
              <div className="ml-40 pl-4 text-gray-700 text-base">기관 단체이름 삽입 — 국내 최대 규모 법률 데이터 라벨링 사업 수행</div>
            </li>
            <li className="mb-12 ml-8">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-40 text-left text-2xl font-extrabold text-indigo-700">2025년 5월</span>
                <span className="text-xl font-semibold text-gray-900" id="timeline-title-2025-5">법률 표준 데이터 작업</span>
              </div>
              <div className="ml-40 pl-4 text-gray-700 text-base">국내 법률 표준 데이터 구축 및 품질 고도화</div>
            </li>
            <li className="ml-8">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-40 text-left text-2xl font-extrabold text-indigo-700">2025년 7월</span>
                <span className="text-xl font-semibold text-gray-900" id="timeline-title-2025-7">계약서 검토 서비스 &#39;로킷&#39; 오픈</span>
              </div>
              <div className="ml-40 pl-4 text-gray-700 text-base">AI 기반 계약서 검토 서비스 로킷 공식 출시</div>
            </li>
          </ol>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-white" aria-labelledby="team-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="team-heading" className="text-3xl font-bold text-gray-900 mb-4">
              리더십 팀
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              법무법인 오킴스의 파트너 변호사들을 소개합니다
            </p>
          </div>

          {/* Partner Sectionals */}
          <div className="space-y-10">
            {/* 오성헌 */}
            <div className="bg-white border border-indigo-100 rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 w-full md:w-56 mb-4 md:mb-0 flex flex-col items-center">
                <Image src="https://via.placeholder.com/120" alt="오성헌 사진" width={120} height={120} className="w-28 h-28 rounded-full border-2 border-indigo-200 mb-3 object-cover" />
                <div className="text-2xl font-bold text-indigo-800 mb-1">오성헌</div>
                <div className="text-indigo-600 font-semibold">파트너변호사</div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">업무분야</div>
                  <div className="text-gray-700 text-sm leading-relaxed">위기관리, 중재, 일반 민·형사, 인사노무, 기업자문, 헌법소송 등</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">경력사항</div>
                  <div className="text-gray-700 text-sm leading-relaxed">법무법인 세창(2017), 신&박 법률사무소(2014), 대한상사법학회 총무간사(2011), 서울대학교 BK21 연구원(2004), 서울대학교 법학연구소 조교(2001)</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">연락처</div>
                  <div className="text-gray-700 text-sm leading-relaxed">Tel: 02-538-5886<br/>Fax: 02-538-5887<br/>E-mail: shoh@ohkimslaw.com</div>
                </div>
              </div>
            </div>
            {/* 김용범 */}
            <div className="bg-white border border-indigo-100 rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 w-full md:w-56 mb-4 md:mb-0 flex flex-col items-center">
                <Image src="https://via.placeholder.com/120" alt="김용범 사진" width={120} height={120} className="w-28 h-28 rounded-full border-2 border-indigo-200 mb-3 object-cover" />
                <div className="text-2xl font-bold text-indigo-800 mb-1">김용범</div>
                <div className="text-indigo-600 font-semibold">파트너변호사/경영총괄</div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">업무분야</div>
                  <div className="text-gray-700 text-sm leading-relaxed">기업법무 및 기업금융, 기업지배구조, 기업인수합병(M&A), 스타트업, 제약∙바이오 기술 라이센싱 계약, 의료분쟁, 의약품 및 의료기기 제조물책임 소송, 국민건강보험법</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">경력사항</div>
                  <div className="text-gray-700 text-sm leading-relaxed">지엘팜텍 주식회사 사외이사(2020~), ㈜메가젠임플란트 사외이사(2018~), Gerson Lehmann Group Industrial Experts(2017~), ㈜ 서울리거 감사(2020), ㈜메가젠임플란트 전략기획실(2017), 한국보건산업진흥원 공공의료사업지원단(2008), 보건복지부 구강보건과(2007)</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">연락처</div>
                  <div className="text-gray-700 text-sm leading-relaxed">Tel: 02-538-5886<br/>Fax: 02-538-5887<br/>E-mail: ybkim@ohkimslaw.com</div>
                </div>
              </div>
            </div>
            {/* 엄태섭 */}
            <div className="bg-white border border-indigo-100 rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 w-full md:w-56 mb-4 md:mb-0 flex flex-col items-center">
                <Image src="https://via.placeholder.com/120" alt="엄태섭 사진" width={120} height={120} className="w-28 h-28 rounded-full border-2 border-indigo-200 mb-3 object-cover" />
                <div className="text-2xl font-bold text-indigo-800 mb-1">엄태섭</div>
                <div className="text-indigo-600 font-semibold">파트너변호사</div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">업무분야</div>
                  <div className="text-gray-700 text-sm leading-relaxed">기업위기관리(Risk Management), 규제산업(방위산업, 헬스케어)분야 자문 및 소송, 소비자집단분쟁, 사이버(명예훼손)범죄, 언론중재, 기업법무 등</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">경력사항</div>
                  <div className="text-gray-700 text-sm leading-relaxed">국회 정책보좌관(2016), ㈜동아ST 준법지원인(2015), ㈜동아쏘시오홀딩스 법무팀(2013), 서울중앙지방법원 형사27부 심화실무(2013), 육군사관학교 61기(2003)</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">연락처</div>
                  <div className="text-gray-700 text-sm leading-relaxed">Tel: 02-538-5886<br/>Fax: 02-538-5887<br/>E-mail: tsum@ohkimslaw.com</div>
                </div>
              </div>
            </div>
            {/* 조진석 */}
            <div className="bg-white border border-indigo-100 rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 w-full md:w-56 mb-4 md:mb-0 flex flex-col items-center">
                <Image src="https://via.placeholder.com/120" alt="조진석 사진" width={120} height={120} className="w-28 h-28 rounded-full border-2 border-indigo-200 mb-3 object-cover" />
                <div className="text-2xl font-bold text-indigo-800 mb-1">조진석</div>
                <div className="text-indigo-600 font-semibold">파트너변호사</div>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">업무분야</div>
                  <div className="text-gray-700 text-sm leading-relaxed">의료민사, 의료행정, 의료형사, 의료기관(의사단체)자문</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">경력사항</div>
                  <div className="text-gray-700 text-sm leading-relaxed">법무법인 오킴스(2023), 법무법인 세승(2017), 서울아산병원 법무팀 (2017), 법무법인 세승(2013)</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">연락처</div>
                  <div className="text-gray-700 text-sm leading-relaxed">Tel: 02-538-5886<br/>Fax: 02-538-5887<br/>E-mail: jscho@ohkimslaw.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Data & Technology Team */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              법률데이터 & 기술 팀
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              법률데이터 & 기술 팀은 국내 최고 수준의 데이터 처리 및 IT 전문성을 바탕으로, 신뢰할 수 있는 법률 서비스를 제공하기 위해 끊임없이 연구하고 혁신합니다. 다양한 분야의 전문가들이 모여, 고객의 법률 리스크를 최소화하고, 효율적이고 안전한 솔루션을 제공합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 법률데이터 분석팀 */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">법률데이터 분석팀</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                법률 문서의 패턴 분석과 데이터 마이닝을 통해 정확하고 일관된 검토 결과를 제공합니다. AI 모델 학습을 위한 고품질 데이터셋을 구축하고 관리합니다.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm flex-1">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>계약서 패턴 분석 및 분류 시스템</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>법률 텍스트 데이터 전처리 및 정제</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>업종별 계약서 템플릿 데이터베이스</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>판례 및 법령 데이터 연동 시스템</span>
                </li>
              </ul>
            </div>

            {/* AI 개발팀 */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI 개발팀</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                최신 인공지능 기술을 활용하여 법률 문서의 자동 분석 및 검토 시스템을 개발합니다. 자연어 처리와 지능형 문서 분석을 통해 효율적인 법률 서비스를 제공합니다.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm flex-1">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>자연어 처리(NLP) 시스템 개발</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>계약서 위험도 평가 시스템</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>지능형 문서 분석 및 분류</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>AI 기반 검토 결과 생성</span>
                </li>
              </ul>
            </div>

            {/* 기술 인프라팀 */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">기술 인프라팀</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                클라우드, 보안, DevOps 등 IT 인프라 전반에 걸친 풍부한 경험을 바탕으로, 고객 데이터의 안전성과 시스템의 안정성을 최우선으로 합니다.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm flex-1">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>클라우드 아키텍처 설계 및 운영</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>정보보안 및 개인정보보호 인증</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>DevOps 및 자동화 파이프라인</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>시스템 가용성 99.99% 유지</span>
                </li>
              </ul>
            </div>

            {/* 품질관리팀 */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">품질관리팀</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                모든 법률 서비스의 품질을 검증하고 표준화합니다. 변호사 검토 결과의 정확성과 일관성을 보장하며, 지속적인 품질 개선을 추진합니다.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm flex-1">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>검토 결과 품질 검증 및 감사</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>서비스 표준화 및 프로세스 관리</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>고객 피드백 분석 및 개선</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>품질 지표 모니터링 및 리포트</span>
                </li>
              </ul>
            </div>

            {/* 연구개발팀 */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">연구개발팀</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                법률 기술의 최신 트렌드와 혁신적인 솔루션을 연구합니다. 새로운 서비스 모델과 기술적 접근법을 개발하여 로킷의 경쟁력을 지속적으로 향상시킵니다.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm flex-1">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>법률 기술 트렌드 분석</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>신규 서비스 모델 개발</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>업계 파트너십 및 협력 연구</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>특허 및 지적재산권 관리</span>
                </li>
              </ul>
            </div>

            {/* 고객지원팀 */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">고객지원팀</h3>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                고객의 서비스 이용을 지원하고 기술적 문제를 해결합니다. 24/7 고객 지원 시스템을 통해 신속하고 정확한 답변을 제공합니다.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm flex-1">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>24/7 기술 지원 및 문의 응대</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>서비스 이용 가이드 및 교육</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>시스템 장애 대응 및 복구</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>고객 요구사항 분석 및 개선</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            전문가와 함께 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            첫 계약 검토는 무료로 제공됩니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              상담 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 