'use client';

import Link from 'next/link';

export default function Security() {
  const complianceStandards = [
    {
      name: 'ISO 27001:2013',
      description: '정보보안 관리체계',
      details: '정보 자산의 기밀성, 무결성, 가용성을 보장하는 국제 표준',
      status: '인증 완료',
      validUntil: '2025년 12월'
    },
    {
      name: 'ISO 27701:2019',
      description: '개인정보 관리체계',
      details: 'GDPR 및 개인정보보호법 준수를 위한 확장 표준',
      status: '인증 완료',
      validUntil: '2025년 12월'
    },
    {
      name: 'SOC 2 Type II',
      description: '서비스 조직 제어',
      details: 'AICPA의 신뢰 서비스 기준에 따른 보안, 가용성, 처리 무결성',
      status: '인증 완료',
      validUntil: '2025년 6월'
    },
    {
      name: 'ISMS 인증',
      description: '정보보호 관리체계',
      details: '한국정보통신기술협회의 정보보호 관리체계 인증',
      status: '인증 완료',
      validUntil: '2025년 12월'
    },
    {
      name: 'GDPR 준수',
      description: 'EU 개인정보보호규정',
      details: '유럽연합 개인정보보호규정 완전 준수',
      status: '준수 확인',
      validUntil: '지속적'
    },
    {
      name: 'CCPA 준수',
      description: '캘리포니아 개인정보보호법',
      details: '캘리포니아 소비자 개인정보보호법 준수',
      status: '준수 확인',
      validUntil: '지속적'
    }
  ];

  const securityMeasures = [
    {
      category: '데이터 암호화',
      measures: [
        { name: 'AES-256-GCM', description: '저장 데이터 암호화' },
        { name: 'TLS 1.3', description: '전송 데이터 암호화' },
        { name: 'RSA-4096', description: '키 교환 암호화' },
        { name: 'HMAC-SHA256', description: '데이터 무결성 검증' }
      ]
    },
    {
      category: '접근 제어',
      measures: [
        { name: '다중 인증 (MFA)', description: 'SMS, 앱, 하드웨어 토큰' },
        { name: '역할 기반 접근 제어', description: 'RBAC 시스템' },
        { name: '세션 관리', description: '자동 세션 만료' },
        { name: 'IP 화이트리스트', description: '허용된 IP만 접근' }
      ]
    },
    {
      category: '네트워크 보안',
      measures: [
        { name: 'DDoS 방어', description: 'Cloudflare Enterprise' },
        { name: 'WAF', description: '웹 애플리케이션 방화벽' },
        { name: 'IDS/IPS', description: '침입 탐지/방지 시스템' },
        { name: 'VPN', description: '사용자 접근 제어' }
      ]
    },
    {
      category: '물리적 보안',
      measures: [
        { name: '24/7 보안 감시', description: 'CCTV 및 보안요원' },
        { name: '생체 인증', description: '지문, 얼굴 인식' },
        { name: '방화 시스템', description: '자동 소화 시스템' },
        { name: '환경 모니터링', description: '온도, 습도, 전력' }
      ]
    }
  ];

  const industryCompliance = [
    {
      industry: '금융업',
      regulations: ['금융위원회 가이드라인', '전자금융거래법', '개인정보보호법'],
      features: ['금융 데이터 특별 보호', '감사 로그 보관', '실시간 모니터링']
    },
    {
      industry: '의료업',
      regulations: ['의료법', '개인정보보호법', 'HIPAA 준수'],
      features: ['환자 정보 암호화', '접근 권한 엄격 관리', '의료 데이터 특별 처리']
    },
    {
      industry: '제조업',
      regulations: ['산업표준', 'ISO 27001', '개인정보보호법'],
      features: ['지적재산권 보호', '공급망 보안', '기술 정보 암호화']
    },
    {
      industry: 'IT/소프트웨어',
      regulations: ['정보통신망법', '개인정보보호법', 'GDPR'],
      features: ['소스코드 보호', 'API 보안', '클라우드 보안']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">엔터프라이즈급 보안</span>
              <span className="block text-indigo-200">국제 표준 준수</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              최고 수준의 보안 기술과 국제 표준 인증으로 고객의 데이터를 안전하게 보호합니다
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <p className="text-white font-semibold">보안 인증</p>
                <p className="text-2xl font-bold text-white">6개</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <p className="text-white font-semibold">암호화 수준</p>
                <p className="text-2xl font-bold text-white">AES-256</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <p className="text-white font-semibold">가동률</p>
                <p className="text-2xl font-bold text-white">99.99%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              국제 보안 인증 및 규제 준수
            </h2>
            <p className="text-xl text-gray-600">
              국내외 주요 보안 표준과 규제를 완전히 준수합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{standard.name}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {standard.status}
                  </span>
                </div>
                <p className="text-lg font-semibold text-indigo-600 mb-2">{standard.description}</p>
                <p className="text-gray-600 text-sm mb-4">{standard.details}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  유효기간: {standard.validUntil}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              다층 보안 체계
            </h2>
            <p className="text-xl text-gray-600">
              최신 보안 기술을 활용한 다층 방어 체계로 데이터를 보호합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {securityMeasures.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.measures.map((measure, measureIndex) => (
                    <div key={measureIndex} className="flex items-start">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{measure.name}</p>
                        <p className="text-sm text-gray-600">{measure.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Compliance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              업계별 규제 준수
            </h2>
            <p className="text-xl text-gray-600">
              각 업계의 특수한 규제 요건을 반영한 맞춤형 보안 솔루션
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industryCompliance.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{industry.industry}</h3>
                <div className="mb-6">
                  <h4 className="font-semibold text-indigo-600 mb-2">준수 규제</h4>
                  <ul className="space-y-1">
                    {industry.regulations.map((regulation, regIndex) => (
                      <li key={regIndex} className="text-sm text-gray-600 flex items-start">
                        <svg className="w-3 h-3 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {regulation}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-600 mb-2">특별 보안 기능</h4>
                  <ul className="space-y-1">
                    {industry.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-start">
                        <svg className="w-3 h-3 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              데이터 보호 정책
            </h2>
            <p className="text-xl text-gray-600">
              데이터의 안전한 수집, 저장, 처리를 보장합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">데이터 수집</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>최소 필요 데이터만 수집</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>명시적 동의 요구</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>투명한 수집 정책</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>데이터 주체 권리 보장</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">데이터 저장</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>국내 클라우드 서버</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>물리적 보안</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>정기 백업</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>재해 복구 시스템</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">데이터 처리</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>안전한 처리 프로세스</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>접근 권한 관리</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>처리 기록 보관</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>데이터 삭제 정책</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Infrastructure Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              보안 인프라
            </h2>
            <p className="text-xl text-gray-600">
              최신 보안 기술과 인프라를 구축하여 운영합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">물리적 보안</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24/7 보안 감시</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>생체 인증 시스템</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>CCTV 모니터링</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>방화 시스템</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">네트워크 보안</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>DDoS 방어</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>WAF 운영</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>침입 탐지 시스템</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>VPN 접근</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-xl text-gray-600">
              보안과 관련된 궁금한 점을 확인하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                데이터는 어디에 저장되나요?
              </h3>
              <p className="text-gray-600">
                모든 데이터는 국내 클라우드 서버에 저장되며, AES-256 암호화를 적용하여 보호합니다. 서버는 24/7 보안 감시와 모니터링이 이루어집니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                보안 인증서는 어떤 것들이 있나요?
              </h3>
              <p className="text-gray-600">
                ISO 27001, ISO 27701, ISMS 인증을 보유하고 있으며, 정기적인 보안 감사를 통해 인증을 갱신하고 있습니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                데이터 백업은 어떻게 이루어지나요?
              </h3>
              <p className="text-gray-600">
                실시간 백업과 일일 백업을 통해 데이터를 보호하며, 재해 복구 시스템을 구축하여 데이터 손실을 방지합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                개인정보는 언제 삭제되나요?
              </h3>
              <p className="text-gray-600">
                서비스 이용 종료 후 3년간 보관 후 자동 삭제되며, 고객 요청 시 즉시 삭제할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            안전한 계약 분석 서비스를 시작하세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            엔터프라이즈급 보안으로 보호받는 LawScan의 AI 계약 검토 서비스
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              요금제 보기
            </Link>
            <Link
              href="/contact"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors"
            >
              보안 상담 문의
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 