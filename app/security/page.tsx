'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon, KeyIcon, UserCircleIcon, CheckCircleIcon, GlobeAltIcon, BoltIcon, ChartBarIcon } from '@heroicons/react/24/solid';

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

  // Example metrics for visual impact
  const METRICS = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-600" />,
      value: '99.99%',
      label: '서비스 가용성',
      desc: '연중무휴 24시간 안정적인 서비스 제공'
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8 text-indigo-600" />,
      value: '100%',
      label: '규제 준수율',
      desc: '국내외 주요 보안/개인정보 규제 완전 준수'
    },
    {
      icon: <BoltIcon className="w-8 h-8 text-indigo-600" />,
      value: '24/7',
      label: '실시간 모니터링',
      desc: '자동화된 위협 탐지 및 대응 시스템 운영'
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-indigo-600" />,
      value: '98%',
      label: '고객 만족도',
      desc: '2024년 기준 고객 설문 결과'
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8 text-indigo-600" />,
      value: '연 2회+',
      label: '모의 해킹(PenTest)',
      desc: '외부 전문기관 정기 침투 테스트 실시'
    },
    {
      icon: <KeyIcon className="w-8 h-8 text-indigo-600" />,
      value: '1시간 이내',
      label: '보안 사고 대응',
      desc: '평균 인시던트 대응 개시 시간'
    },
    {
      icon: <LockClosedIcon className="w-8 h-8 text-indigo-600" />,
      value: '매일',
      label: '데이터 백업',
      desc: '모든 데이터는 매일 자동 백업 및 암호화 저장'
    },
    {
      icon: <UserCircleIcon className="w-8 h-8 text-indigo-600" />,
      value: '0건',
      label: '개인정보 유출',
      desc: '서비스 출시 이후 유출 사고 없음 (2024년 기준)'
    },
  ];

  // Security features for cards
  const FEATURES = [
    {
      icon: <LockClosedIcon className="w-10 h-10 text-indigo-600" />,
      title: '최신 암호화',
      desc: '모든 데이터는 AES-256, TLS 1.3, RSA-4096 등 업계 최고 수준의 암호화로 저장·전송됩니다.'
    },
    {
      icon: <KeyIcon className="w-10 h-10 text-indigo-600" />,
      title: '접근 통제 및 인증',
      desc: '다중 인증(MFA), 역할 기반 접근 제어(RBAC), 세션 만료, IP 화이트리스트 등으로 권한을 엄격히 관리합니다.'
    },
    {
      icon: <ShieldCheckIcon className="w-10 h-10 text-indigo-600" />,
      title: 'DDoS 및 네트워크 보안',
      desc: 'Cloudflare Enterprise, WAF, IDS/IPS, VPN 등으로 외부 공격을 차단합니다.'
    },
    {
      icon: <ChartBarIcon className="w-10 h-10 text-indigo-600" />,
      title: '정기 보안 감사',
      desc: '외부 전문기관의 연 2회 이상 보안 진단 및 모의 해킹 실시, 결과 투명 공개.'
    },
    {
      icon: <UserCircleIcon className="w-10 h-10 text-indigo-600" />,
      title: '개인정보 보호',
      desc: '데이터 최소 수집, 투명한 처리, 고객 요청 시 즉시 삭제, 데이터 주체 권리 보장.'
    },
    {
      icon: <BoltIcon className="w-10 h-10 text-indigo-600" />,
      title: '재해 복구 및 백업',
      desc: '매일 자동 백업, 다중 지역 분산 저장, 재해 복구 시나리오 정기 점검.'
    },
    {
      icon: <CheckCircleIcon className="w-10 h-10 text-indigo-600" />,
      title: '실시간 위협 탐지 및 대응',
      desc: '24/7 모니터링, 자동화된 위협 탐지 및 1시간 이내 대응 체계.'
    },
    {
      icon: <GlobeAltIcon className="w-10 h-10 text-indigo-600" />,
      title: '업계별 규제 준수',
      desc: '금융, 의료, IT 등 각 산업별 특수 규제까지 완전 대응.'
    },
  ];

  // Certifications for grid
  const CERTS = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-700" />,
      name: 'ISO 27001:2013',
      desc: '정보보안 관리체계 (국제표준, 인증기관: KISA, 2023~2026)',
      link: 'https://www.iso.org/isoiec-27001-information-security.html'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-700" />,
      name: 'ISMS',
      desc: '정보보호 관리체계 (한국인터넷진흥원, 2023~2026)',
      link: 'https://isms.kisa.or.kr/'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-700" />,
      name: 'GDPR',
      desc: 'EU 개인정보보호법 준수 (2022~)',
      link: 'https://gdpr-info.eu/'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-700" />,
      name: 'SOC 2 Type II',
      desc: '서비스 조직 제어 (AICPA, 2024~2025)',
      link: 'https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/sorhome.html'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-700" />,
      name: 'ISO 27701:2019',
      desc: '개인정보 관리체계 (확장 표준, 2024~2027)',
      link: 'https://www.iso.org/standard/71670.html'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-700" />,
      name: 'CCPA',
      desc: '캘리포니아 소비자 개인정보보호법 준수 (2023~)',
      link: 'https://oag.ca.gov/privacy/ccpa'
    },
  ];

  // FAQ
  const FAQ = [
    {
      q: '데이터는 어디에 저장되나요?',
      a: '모든 데이터는 국내 클라우드 서버에 저장되며, AES-256 암호화로 보호됩니다.'
    },
    {
      q: '보안 인증서는 어떤 것들이 있나요?',
      a: 'ISO 27001, ISMS, GDPR, SOC 2 등 주요 국제 인증을 보유하고 있습니다.'
    },
    {
      q: '개인정보는 언제 삭제되나요?',
      a: '서비스 이용 종료 후 3년간 보관 후 자동 삭제되며, 고객 요청 시 즉시 삭제됩니다.'
    },
    {
      q: '실시간 위협 대응은 어떻게 이루어지나요?',
      a: '24/7 모니터링과 자동화된 위협 탐지 시스템으로 신속하게 대응합니다.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">보안 및 개인정보 보호</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">고객의 신뢰를 최우선으로, 업계 최고 수준의 보안과 프라이버시를 제공합니다.</p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow p-6 flex flex-col items-center border border-indigo-100">
                <div className="mb-2">{m.icon}</div>
                <div className="text-2xl font-extrabold text-indigo-800 mb-1">{m.value}</div>
                <div className="text-sm text-gray-700 font-semibold mb-1">{m.label}</div>
                <div className="text-xs text-gray-500 text-center">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">국제 인증 및 규제 준수</h2>
            <p className="text-lg text-gray-600">정기적인 외부 감사를 통해 주요 보안 인증을 유지하고 있습니다.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CERTS.map((cert, i) => (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow flex flex-col items-center p-6 border border-indigo-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-2">{cert.icon}</div>
                <div className="text-lg font-bold text-indigo-700 mb-1">{cert.name}</div>
                <div className="text-xs text-gray-600 text-center">{cert.desc}</div>
                <span className="text-xs text-indigo-500 mt-1 underline">자세히 보기</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">주요 보안 정책 및 기술</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 border border-indigo-100 flex items-start gap-4 shadow group hover:shadow-2xl transition-all">
                <div className="flex-shrink-0">{f.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-800 mb-1">{f.title}</h3>
                  <p className="text-gray-700 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy by Design Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy by Design</h2>
          <p className="text-lg text-gray-700 mb-6">
            서비스 설계 단계부터 개인정보 보호를 최우선으로 고려합니다. 데이터 최소 수집, 투명한 처리, 고객 권리 보장 정책을 준수합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64 border border-indigo-100 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-indigo-600 mb-2" />
              <div className="text-base font-semibold text-gray-900 mb-1">데이터 최소 수집</div>
              <div className="text-sm text-gray-600">서비스 제공에 꼭 필요한 정보만 수집합니다.</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64 border border-indigo-100 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-indigo-600 mb-2" />
              <div className="text-base font-semibold text-gray-900 mb-1">투명한 처리</div>
              <div className="text-sm text-gray-600">수집·이용 목적, 보관 기간을 명확히 안내합니다.</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-64 border border-indigo-100 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-indigo-600 mb-2" />
              <div className="text-base font-semibold text-gray-900 mb-1">고객 권리 보장</div>
              <div className="text-sm text-gray-600">언제든 열람·정정·삭제를 요청할 수 있습니다.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-100 shadow">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">{item.q}</h3>
                <p className="text-gray-700 text-sm">{item.a}</p>
              </div>
            ))}
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
            엔터프라이즈급 보안으로 보호받는 LawKit의 AI 계약 검토 서비스
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
  );
} 