'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">법률 기술의</span>
              <span className="block text-indigo-200">미래를 선도합니다</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              강남 최고급 로펌의 전문성과 최첨단 AI 기술을 결합하여<br/>
              <span className="font-semibold">한국 최초의 독자 개발 법률 AI 플랫폼</span>을 만들어갑니다
            </p>
          </div>
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
                법률 서비스의 민주화를 통해 모든 기업과 개인이 최고 수준의 법률 보호를 받을 수 있도록 하는 것입니다.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                강남 최고급 로펌의 전문성을 AI 기술로 확장하여, 복잡하고 비용이 많이 드는 법률 서비스를 
                누구나 쉽게 접근할 수 있는 형태로 제공합니다. 우리는 기술과 인간의 조화를 통해 
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
                    <p className="text-gray-600">최첨단 AI 기술로 법률 서비스의 새로운 패러다임을 창조합니다.</p>
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
                    <p className="text-gray-600">엘리트 변호사들의 검증을 통해 최고 품질의 서비스를 보장합니다.</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="story-heading" className="text-3xl font-bold text-gray-900 mb-4">
              LawScan의 이야기
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              강남 최고급 로펌의 변호사들이 모여 만든 한국 최초의 독자 개발 법률 AI 플랫폼
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">2020</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">시작</h3>
              <p className="text-gray-600">
                강남 최고급 로펌의 변호사들이 모여 법률 서비스의 혁신을 위한 아이디어를 구상했습니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">2022</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">개발</h3>
              <p className="text-gray-600">
                수천 건의 검증된 계약서와 판례를 기반으로 독자 AI 시스템 개발을 시작했습니다.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">2024</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">출시</h3>
              <p className="text-gray-600">
                한국 최초의 독자 개발 법률 AI 플랫폼을 출시하여 500개 이상의 기업에 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="team-heading" className="text-3xl font-bold text-gray-900 mb-4">
              리더십 팀
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              강남 최고급 로펌 출신의 엘리트 변호사들과 AI 전문가들이 모여<br/>
              법률 기술의 미래를 만들어갑니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CEO */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">김민수</h3>
              <p className="text-indigo-600 font-medium mb-3">CEO & 공동창립자</p>
              <p className="text-gray-600 text-sm mb-4">
                전 삼성전자 법무팀 수석으로 15년간 M&A 및 기업법무 전문 변호사로 활동했습니다.
                법률 서비스의 혁신을 위해 AI 기술을 도입하여 LawScan을 창립했습니다.
              </p>
              <div className="text-xs text-gray-500">
                서울대학교 법학과 졸업<br/>
                하버드 로스쿨 LL.M
              </div>
            </div>

            {/* CTO */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">박지원</h3>
              <p className="text-indigo-600 font-medium mb-3">CTO & 공동창립자</p>
              <p className="text-gray-600 text-sm mb-4">
                전 구글 AI 연구원으로 10년간 자연어 처리 전문가로 활동했습니다.
                법률 AI 시스템의 핵심 기술을 개발하고 플랫폼 아키텍처를 설계합니다.
              </p>
              <div className="text-xs text-gray-500">
                KAIST 컴퓨터공학과 졸업<br/>
                스탠포드 대학원 박사
              </div>
            </div>

            {/* Chief Legal Officer */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200 text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">이수진</h3>
              <p className="text-indigo-600 font-medium mb-3">Chief Legal Officer</p>
              <p className="text-gray-600 text-sm mb-4">
                전 대법원 판사로 20년간 법률 경험을 쌓았습니다. 강남 최고급 로펌에서 계약법 및 기업법무 전문 변호사로 12년간 활동했습니다.
                AI 시스템의 법률 정확성을 검증하고 품질을 보장합니다.
              </p>
              <div className="text-xs text-gray-500">
                연세대학교 법학과 졸업<br/>
                서울대학교 로스쿨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI & Technology Team */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI & 기술 팀
            </h2>
            <p className="text-xl text-gray-600">
              최첨단 AI 기술로 계약 검토의 혁신을 이끕니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI 연구팀</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 자연어 처리 전문가 10명</li>
                <li>• 머신러닝 엔지니어 8명</li>
                <li>• 데이터 사이언티스트 5명</li>
                <li>• 평균 8년 이상의 AI 개발 경험</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">기술 인프라팀</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 클라우드 아키텍트 5명</li>
                <li>• 보안 전문가 4명</li>
                <li>• DevOps 엔지니어 6명</li>
                <li>• 시스템 안정성 99.99% 유지</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              법률 전문가 팀
            </h2>
            <p className="text-xl text-gray-600">
              각 산업별 전문성을 갖춘 법률 전문가들이 검토합니다
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-8 text-center border border-indigo-200">
              <div className="text-4xl font-bold text-indigo-600 mb-2">15+</div>
              <p className="text-gray-600">기술/IT 전문 변호사</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-8 text-center border border-indigo-200">
              <div className="text-4xl font-bold text-indigo-600 mb-2">12+</div>
              <p className="text-gray-600">금융 전문 변호사</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-8 text-center border border-indigo-200">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10+</div>
              <p className="text-gray-600">의료/제약 전문 변호사</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg p-8 text-center border border-indigo-200">
              <div className="text-4xl font-bold text-indigo-600 mb-2">8+</div>
              <p className="text-gray-600">부동산 전문 변호사</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증 및 수상
            </h2>
            <p className="text-xl text-gray-600">
              전문성과 혁신을 인정받은 수상 경력
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">인증</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• ISO 27001 정보보안 인증</li>
                <li>• ISO 9001 품질경영 인증</li>
                <li>• AWS Advanced Consulting Partner</li>
                <li>• Microsoft Gold Partner</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">수상</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 2023 대한민국 ICT 대상</li>
                <li>• 2022 법률테크 혁신상</li>
                <li>• 2021 스타트업 어워드</li>
                <li>• 2020 AI 혁신 기업상</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">파트너십</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 삼성 SDS</li>
                <li>• LG CNS</li>
                <li>• SK C&C</li>
                <li>• 네이버 클라우드</li>
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