'use client';

import Link from 'next/link';
import { motion } from 'framer-motion'

interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  result: string;
  details: string[];
  company: string;
  industry: string;
}

const cases: Case[] = [
  {
    id: '1',
    title: '강남 테크허브 임대차 계약 검토',
    description: '테크 스타트업 \'테크스퀘어\'의 강남 테크허브 입주를 위한 상업용 부동산 임대차 계약 검토',
    category: '부동산',
    result: '연간 임대료 인상률 5%로 조정 및 보증금 반환 조건 개선으로 3년간 약 1억 2천만원의 비용 절감',
    details: [
      '임대료 인상률을 연 8%에서 5%로 조정하여 장기 임대 시 비용 부담 감소',
      '보증금 2억원의 반환 조건을 명확히 하여 분쟁 가능성 제거',
      '공용 시설 사용료 및 관리비 산정 기준을 투명하게 명시',
      '리모델링 및 시설 개선 시 비용 부담 주체를 명확히 구분',
      '계약 해지 시 위약금을 3개월에서 2개월로 조정하여 유연성 확보'
    ],
    company: '테크스퀘어',
    industry: '테크 스타트업'
  },
  {
    id: '2',
    title: 'AI 개발자 채용 계약 검토',
    description: '인공지능 솔루션 기업 \'AI퓨처\'의 핵심 개발자 채용 계약 검토',
    category: '고용',
    result: '지식재산권 보호 조항 강화 및 성과급 체계 개선으로 핵심 인재 유지율 40% 향상',
    details: [
      '스톡옵션 부여 조건 및 행사 기간을 명확히 하여 인센티브 체계 개선',
      '개발한 AI 모델의 지식재산권 귀속 관계를 명확히 규정',
      '업무 성과에 따른 보너스 체계를 구체적으로 수립',
      '경업금지 조항의 범위와 기간을 합리적으로 조정',
      '원격근무 및 유연근무제 관련 조항 추가'
    ],
    company: 'AI퓨처',
    industry: 'AI 솔루션'
  },
  {
    id: '3',
    title: '클라우드 서비스 개발 계약 검토',
    description: '금융기관 \'글로벌뱅크\'의 클라우드 기반 핀테크 서비스 개발 계약 검토',
    category: '서비스',
    result: '데이터 보안 조항 강화 및 서비스 수준 협약(SLA) 구체화로 프로젝트 리스크 60% 감소',
    details: [
      '데이터 암호화 및 보안 인증 기준을 금융위원회 가이드라인에 맞춰 구체화',
      '서비스 가용성 99.9% 이상 보장하는 SLA 조항 추가',
      '장애 발생 시 복구 시간 및 절차를 명확히 규정',
      '개발 단계별 검수 기준 및 승인 절차 구체화',
      '지식재산권 공동 소유 조항 추가 및 라이선스 범위 명확화'
    ],
    company: '글로벌뱅크',
    industry: '금융'
  },
  {
    id: '4',
    title: '헬스케어 스타트업 인수 계약 검토',
    description: '제약회사 \'메디케어\'의 디지털 헬스케어 스타트업 \'헬스AI\' 인수 계약 검토',
    category: 'M&A',
    result: '인수 후 통합 계획 구체화 및 잠재적 위험 요소 식별로 인수 가격 15% 조정',
    details: [
      '기존 임상시험 데이터의 유효성 검증 절차 추가',
      '핵심 개발팀 유지 계약 및 인센티브 체계 구체화',
      '기존 라이선스 계약의 승계 조건 명확화',
      '인수 후 3년간의 성과 지표 및 평가 기준 설정',
      '잠재적 소송 리스크에 대한 보호 조항 추가'
    ],
    company: '메디케어',
    industry: '제약/헬스케어'
  },
  {
    id: '5',
    title: '반도체 특허 라이선스 계약 검토',
    description: '반도체 설계 기업 \'칩테크\'의 핵심 특허 기술 라이선스 계약 검토',
    category: '지적재산권',
    result: '라이선스 범위 확장 및 로열티 체계 개선으로 연간 수익 30% 증가',
    details: [
      '특허 기술의 적용 범위를 모바일/자동차/IoT 분야로 확장',
      '로열티 계산 방식을 매출액 기준에서 이윤 기준으로 변경',
      '2차 라이선스 허용 조건 및 수익 분배 비율 구체화',
      '특허 침해 시 손해배상액 계산 기준 명확화',
      '기술 개선 시 지식재산권 귀속 관계 규정'
    ],
    company: '칩테크',
    industry: '반도체'
  },
  {
    id: '6',
    title: '전기차 배터리 공급 계약 검토',
    description: '전기차 제조사 \'이코모빌\'의 배터리 공급업체 \'그린배터리\'와의 공급 계약 검토',
    category: '공급',
    result: '품질 기준 강화 및 공급 안정성 확보로 생산 중단 위험 제거',
    details: [
      '배터리 성능 및 안전성 검증 기준을 국제 표준에 맞춰 구체화',
      '월간 최소 공급량 보장 및 부족분에 대한 위약금 조항 추가',
      '원자재 가격 변동에 따른 가격 조정 공식 도입',
      '긴급 상황 시 대체 공급망 확보 의무화',
      '품질 문제 발생 시 교체 및 보상 절차 구체화'
    ],
    company: '이코모빌',
    industry: '자동차'
  },
  {
    id: '7',
    title: '블록체인 스타트업 투자 계약 검토',
    description: '벤처캐피탈 \'테크파트너스\'의 블록체인 결제 솔루션 스타트업 \'체인페이\' 투자 계약 검토',
    category: '투자',
    result: '투자자 보호 조항 강화 및 회사 가치 보호로 시리즈 A 투자 유치 성공',
    details: [
      '투자금 사용 계획 및 감사 권한 구체화',
      '주주총회 의결권 및 이사 선임권 범위 명확화',
      '회사 가치 평가 방식 및 추가 투자 시 전환가격 조정 공식 도입',
      '핵심 기술 이전 제한 및 지식재산권 보호 조항 추가',
      '투자자 정보 공개 의무 및 범위 설정'
    ],
    company: '체인페이',
    industry: '핀테크'
  },
  {
    id: '8',
    title: '커피 프랜차이즈 계약 검토',
    description: '프리미엄 커피 체인 \'아로마커피\'의 가맹점 운영 계약 검토',
    category: '프랜차이즈',
    result: '가맹점 운영 기준 구체화 및 수익성 개선으로 가맹점 이탈률 50% 감소',
    details: [
      '월간 최소 매출액 기준 및 로열티 계산 방식 투명화',
      '원두 및 부자재 공급 가격 책정 기준 명확화',
      '지역 독점권 반경 및 경쟁 제한 조건 합리화',
      '가맹점 교육 및 지원 프로그램 의무화',
      '계약 해지 시 재고 매입 및 시설 철수 조건 구체화'
    ],
    company: '아로마커피',
    industry: 'F&B'
  },
  {
    id: '9',
    title: '게임 엔진 라이선스 계약 검토',
    description: '게임 개발사 \'픽셀스튜디오\'의 차세대 게임 엔진 라이선스 계약 검토',
    category: '소프트웨어',
    result: '라이선스 범위 확장 및 기술 지원 조건 개선으로 개발 기간 30% 단축',
    details: [
      '멀티플랫폼(PC, 모바일, 콘솔) 지원 범위 명확화',
      '엔진 소스코드 접근 권한 및 수정 제한 조건 구체화',
      '기술 지원 응답 시간 및 해결 기한 명시',
      '게임 출시 후 로열티 계산 방식 및 보고 체계 수립',
      '향후 엔진 업데이트 적용 의무 및 비용 부담 주체 명확화'
    ],
    company: '픽셀스튜디오',
    industry: '게임'
  }
];

const industries = [
  {
    id: 'technology',
    name: '기술 산업',
    description: '소프트웨어 라이선스, SaaS, 개발 협력 등 기술 기업을 위한 맞춤형 계약 검토',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    contractTypes: [
      '소프트웨어 라이선스',
      '지식재산권 계약',
      '개발자 계약',
      'API 사용 계약'
    ],
    cases: cases.filter(c => ['AI 솔루션', '게임'].includes(c.industry)),
    metrics: {
      riskReduction: '98%',
      timeSaving: '80%',
      satisfaction: '95%',
      avgTime: '24h'
    }
  },
  {
    id: 'finance',
    name: '금융 산업',
    description: '금융 규제 준수, 투자 계약, 금융 서비스 계약 등 금융 산업 특화 검토',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    contractTypes: [
      '투자 계약',
      '대출 계약',
      '보험 계약',
      '금융 서비스 계약'
    ],
    cases: cases.filter(c => ['금융', '핀테크'].includes(c.industry)),
    metrics: {
      riskReduction: '99%',
      timeSaving: '85%',
      satisfaction: '97%',
      avgTime: '48h'
    }
  },
  {
    id: 'healthcare',
    name: '의료 산업',
    description: '의료기기, 임상시험, 의료 서비스 등 의료 산업 특화 계약 검토',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    contractTypes: [
      '의료 서비스 계약',
      '연구 협약',
      '의료기기 공급 계약',
      '임상시험 계약'
    ],
    cases: cases.filter(c => ['제약/헬스케어'].includes(c.industry)),
    metrics: {
      riskReduction: '99%',
      timeSaving: '85%',
      satisfaction: '97%',
      avgTime: '48h'
    }
  },
  {
    id: 'real-estate',
    name: '부동산 산업',
    description: '임대차, 매매, 개발 등 부동산 관련 계약의 전문적인 검토',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    contractTypes: [
      '임대차 계약',
      '매매 계약',
      '개발 계약',
      '관리 계약'
    ],
    cases: cases.filter(c => ['테크 스타트업'].includes(c.industry)),
    metrics: {
      riskReduction: '98%',
      timeSaving: '75%',
      satisfaction: '96%',
      avgTime: '24h'
    }
  },
  {
    id: 'manufacturing',
    name: '제조 산업',
    description: '공급계약, 제조위탁, 품질보증 등 제조업 특화 계약 검토',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    contractTypes: [
      '공급 계약',
      '제조 계약',
      '품질 보증 계약',
      '기술 이전 계약'
    ],
    cases: cases.filter(c => ['자동차', '반도체'].includes(c.industry)),
    metrics: {
      riskReduction: '97%',
      timeSaving: '70%',
      satisfaction: '95%',
      avgTime: '48h'
    }
  },
  {
    id: 'retail',
    name: '유통 산업',
    description: '유통계약, 프랜차이즈, 공급망 등 유통 산업 특화 계약 검토',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    contractTypes: [
      '유통 계약',
      '프랜차이즈 계약',
      '공급업체 계약',
      '판매 대리 계약'
    ],
    cases: cases.filter(c => ['F&B'].includes(c.industry)),
    metrics: {
      riskReduction: '96%',
      timeSaving: '75%',
      satisfaction: '94%',
      avgTime: '36h'
    }
  }
];

export default function Industries() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">산업별 맞춤형</span>
              <span className="block text-indigo-200">계약 검토 솔루션</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              각 산업의 특성과 규제를 고려한 전문적인 계약 검토 서비스와 실제 성공 사례
            </p>
          </div>
        </div>
      </section>

      {/* Combined Industry Cards and Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              산업별 전문 솔루션 및 성공 사례
            </h2>
            <p className="text-xl text-gray-600">
              각 산업의 특성에 맞춘 맞춤형 계약 검토 서비스와 실제 사례를 함께 확인하세요.
            </p>
          </div>

          <div className="space-y-16">
            {industries.map((industry) => (
              <div key={industry.id} className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                      {industry.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{industry.name}</h3>
                      <p className="text-gray-600 mb-2">{industry.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {industry.contractTypes.slice(0, 3).map((type, index) => (
                          <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                            {type}
                          </span>
                        ))}
                        {industry.contractTypes.length > 3 && (
                          <span className="text-xs text-gray-500">+{industry.contractTypes.length - 3}개 더</span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-indigo-600">{industry.metrics.riskReduction}</div>
                          <div className="text-gray-600">리스크 감소</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-indigo-600">{industry.metrics.timeSaving}</div>
                          <div className="text-gray-600">시간 단축</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <span className="text-sm text-gray-500">
                      {industry.cases.length}개의 성공 사례
                    </span>
                  </div>
                </div>
                {/* Industry-specific reviews/case studies */}
                {industry.cases.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industry.cases.map((caseItem) => (
                      <div key={caseItem.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                            {caseItem.category}
                          </span>
                          <span className="text-xs text-gray-500">{caseItem.industry}</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">{caseItem.title}</h4>
                        <p className="text-gray-600 text-xs mb-2">{caseItem.description}</p>
                        <div className="mb-2">
                          <h5 className="text-xs font-semibold text-gray-900 mb-1">주요 개선사항</h5>
                          <ul className="space-y-1">
                            {caseItem.details.slice(0, 2).map((detail, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start">
                                <svg className="w-3 h-3 text-indigo-600 mt-0.5 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="text-xs font-semibold text-indigo-600 mb-0.5">결과</div>
                          <div className="text-xs text-gray-600">{caseItem.result}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              종합 성과 지표
            </h2>
            <p className="text-xl text-gray-600">
              모든 산업 분야에서의 평균 성과
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">평균 계약 리스크 감소율</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">80%</div>
              <div className="text-gray-600">평균 검토 시간 단축</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">96%</div>
              <div className="text-gray-600">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">36h</div>
              <div className="text-gray-600">평균 검토 완료 시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            산업별 맞춤형 계약 검토 서비스를 시작하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            첫 번째 계약 검토는 무료로 제공됩니다
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
} 