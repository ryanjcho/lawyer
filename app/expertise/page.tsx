"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheckIcon, ChartBarIcon, BriefcaseIcon, UserGroupIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Unique differentiators for LawKit
const DIFFERENTIATORS = [
  {
    icon: <ChartBarIcon className="text-indigo-600" />,
    title: "데이터 기반 계약 벤치마킹",
    desc: "업계 수천 건의 계약 데이터를 분석하여 내 계약의 리스크와 조건을 업계 평균과 비교합니다."
  },
  {
    icon: <DocumentTextIcon className="text-blue-600" />,
    title: "계약 리스크 모니터링 & 알림",
    desc: "계약 체결 후에도 법률/규제 변화에 따라 리스크 발생 시 실시간 알림을 제공합니다."
  },
  {
    icon: <UserGroupIcon className="text-emerald-600" />,
    title: "고객사별 맞춤 계약 가이드북",
    desc: "반복 거래가 많은 기업 고객을 위해 전용 계약 협상 매뉴얼과 플레이북을 제공합니다."
  },
  {
    icon: <ChatBubbleLeftRightIcon className="text-pink-600" />,
    title: "플랫폼 내 실시간 협업",
    desc: "변호사와의 실시간 Q&A, 피드백, 버전 관리 등 협업 기능을 한 곳에서 제공합니다."
  },
  {
    icon: <ShieldCheckIcon className="text-yellow-600" />,
    title: "규제 변화 실시간 추적",
    desc: "업계별 법률/규제 변화가 발생하면, 관련 계약에 미치는 영향까지 분석해 안내합니다."
  }
];

// Example industries and case studies
const INDUSTRIES = [
  {
    icon: <ChartBarIcon className="w-6 h-6 text-indigo-600" />,
    name: "기술 산업",
    desc: "소프트웨어, SaaS, 개발 협력 등 기술 기업을 위한 맞춤형 계약 검토 및 자문",
    metrics: { risk: "98%", time: "80%" },
    cases: [
      { title: "AI 개발자 채용 계약 검토", result: "지식재산권 보호 조항 강화 및 성과급 체계 개선으로 핵심 인재 유지율 40% 향상" },
      { title: "SaaS 서비스 이용계약 검토", result: "서비스 장애 시 보상 기준 명확화, 고객 이탈률 20% 감소" }
    ]
  },
  {
    icon: <BriefcaseIcon className="w-6 h-6 text-blue-600" />,
    name: "금융 산업",
    desc: "금융 규제 준수, 투자 계약, 금융 서비스 계약 등 금융 산업 특화 검토",
    metrics: { risk: "99%", time: "85%" },
    cases: [
      { title: "핀테크 투자 계약 검토", result: "투자자 보호 조항 강화 및 리스크 40% 감소" },
      { title: "벤처투자 계약서 표준화", result: "투자자 분쟁 0건, 후속 투자 유치 성공률 30% 증가" }
    ]
  },
  {
    icon: <UserGroupIcon className="w-6 h-6 text-emerald-600" />,
    name: "헬스케어/바이오",
    desc: "임상시험, 라이선스, 연구개발 등 바이오/헬스케어 산업 맞춤 자문",
    metrics: { risk: "99%", time: "85%" },
    cases: [
      { title: "의료기기 수출 계약 검토", result: "국제 규제 준수율 100% 확보, 수출 승인 지연 0건" },
      { title: "헬스케어 스타트업 인수 계약 검토", result: "인수 후 통합 계획 구체화 및 인수 가격 15% 조정" }
    ]
  }
];

// Example contract guides
const CONTRACT_GUIDES = [
  {
    icon: <DocumentTextIcon className="text-indigo-500" />,
    type: "기술 라이선스 계약",
    desc: "기술 이전 및 사용에 관한 주요 쟁점과 협상 포인트 안내",
    tips: "기술의 핵심성과 사업 연계성을 고려해 권리 귀속과 사용 범위를 꼼꼼히 검토해야 합니다."
  },
  {
    icon: <BriefcaseIcon className="text-blue-500" />,
    type: "서비스 제공 계약",
    desc: "서비스 범위, 책임, 대금 지급 등 핵심 조항 가이드",
    tips: "서비스의 품질 기준과 분쟁 발생 시 책임 소재를 명확히 하는 것이 중요합니다."
  },
  {
    icon: <ShieldCheckIcon className="text-emerald-500" />,
    type: "NDA(비밀유지계약)",
    desc: "비밀정보 정의, 예외, 위반 시 책임 등 실무 가이드",
    tips: "비밀정보의 범위와 예외를 구체적으로 정의하고, 위반 시 실효성 있는 제재 조항을 두어야 합니다."
  }
];

// Detailed differentiators for stepper
const DETAILED_DIFFERENTIATORS = [
  {
    title: "데이터 기반 벤치마킹 & 기술 라이선스 전략",
    icon: <ChartBarIcon className="text-indigo-600" />,
    details: [
      "업계 수천 건의 계약 데이터를 분석하여 내 계약의 리스크와 조건을 업계 평균과 비교.",
      "주요 조항, 리스크, 조건을 업계 표준과 비교해 강점/취약점 시각화.",
      "실제 수치와 그래프로 한눈에 확인.",
      "벤치마킹 리포트 예시 제공.",
      "기술 라이선스 계약의 독점/비독점, 지역, 기간, 2차 라이선스 허용 등 권리 범위 명확화.",
      "로열티, 기술 개선 시 권리 귀속, 계약 해지 및 위약금 등 실무상 분쟁이 잦은 부분 안내.",
      "기술의 사업적 가치와 경쟁력, 향후 활용 가능성까지 고려해 협상.",
      "계약서의 세부 조항이 실제 사업에 미치는 영향 강조."
    ],
    callout: "내 계약은 업계 평균 대비 안전한가?를 한눈에!\n기술의 핵심성과 사업 연계성을 고려해 권리 귀속과 사용 범위를 꼼꼼히 검토해야 합니다."
  },
  {
    title: "계약 리스크 모니터링 & 알림",
    icon: <DocumentTextIcon className="text-blue-600" />,
    details: [
      "계약 만료, 갱신, 주요 일정 자동 알림.",
      "법률/규제 변화에 따른 리스크 사전 경고.",
      "중요 리스크 발생 시 담당 변호사와 즉시 연결.",
      "계약 체결 후에도 안심!"
    ],
    callout: "계약 체결 후에도 리스크를 놓치지 않습니다."
  },
  {
    title: "고객사별 맞춤 계약 가이드북",
    icon: <UserGroupIcon className="text-emerald-600" />,
    details: [
      "고객사별 표준 계약서 및 협상 전략 정리.",
      "자주 발생하는 쟁점/리스크에 대한 맞춤 대응 가이드.",
      "계약 체결 프로세스의 효율화 및 일관성 확보.",
      "반복 거래가 많은 기업에 최적화."
    ],
    callout: "우리 회사만의 계약 노하우, LawKit이 관리합니다."
  },
  {
    title: "플랫폼 내 실시간 협업",
    icon: <ChatBubbleLeftRightIcon className="text-pink-600" />,
    details: [
      "플랫폼 내 댓글, 첨삭, 버전 히스토리 제공.",
      "실시간 알림 및 피드백.",
      "이메일 없이, 플랫폼에서 바로 소통.",
      "변호사와의 실시간 Q&A, 피드백, 버전 관리."
    ],
    callout: "이메일 없이, 플랫폼에서 바로 소통!"
  },
  {
    title: "규제 변화 실시간 추적",
    icon: <ShieldCheckIcon className="text-yellow-600" />,
    details: [
      "주요 법률/규제 변화 실시간 모니터링.",
      "내 계약에 미치는 영향 자동 분석.",
      "필요 시 계약서 업데이트/변경 제안.",
      "업계별 법률/규제 변화가 발생하면, 관련 계약에 미치는 영향까지 분석해 안내."
    ],
    callout: "규제 변화도 LawKit이 먼저 알려드립니다."
  }
];

// Detailed industries (match industries page)
const DETAILED_INDUSTRIES = [
  {
    icon: <ChartBarIcon className="w-6 h-6 text-indigo-600" />,
    name: "기술 산업",
    description: "소프트웨어, SaaS, 개발 협력 등 기술 기업을 위한 맞춤형 계약 검토",
    contractTypes: ["소프트웨어 라이선스", "지식재산권 계약", "개발자 계약", "API 사용 계약"],
    metrics: { riskReduction: "98%", timeSaving: "80%", satisfaction: "95%", avgTime: "24h" },
    cases: [
      {
        title: "AI 개발자 채용 계약 검토",
        description: "인공지능 솔루션 기업 'AI퓨처'의 핵심 개발자 채용 계약 검토",
        category: "고용",
        result: "지식재산권 보호 조항 강화 및 성과급 체계 개선으로 핵심 인재 유지율 40% 향상",
        details: [
          "스톡옵션 부여 조건 및 행사 기간 명확화",
          "AI 모델의 지식재산권 귀속 관계 규정",
          "업무 성과에 따른 보너스 체계 수립",
          "경업금지 조항의 범위와 기간 합리적 조정",
          "원격근무 및 유연근무제 관련 조항 추가"
        ]
      },
      {
        title: "SaaS 서비스 이용계약 검토",
        description: "IT 스타트업 '클라우드웨이'의 SaaS 서비스 이용계약서 검토 및 SLA 개선",
        category: "서비스",
        result: "서비스 장애 시 보상 기준 명확화, 고객 이탈률 20% 감소",
        details: [
          "서비스 가용성 99.9% 보장 SLA 조항 추가",
          "데이터 백업 및 복구 절차 명확화",
          "개인정보 보호 및 보안 인증 기준 반영",
          "계약 해지 및 데이터 이전 조건 구체화",
          "서비스 요금 인상 시 사전 통지 의무 명시"
        ]
      }
    ]
  },
  {
    icon: <BriefcaseIcon className="w-6 h-6 text-blue-600" />,
    name: "금융 산업",
    description: "금융 규제 준수, 투자 계약, 금융 서비스 계약 등 금융 산업 특화 검토",
    contractTypes: ["투자 계약", "대출 계약", "보험 계약", "금융 서비스 계약"],
    metrics: { riskReduction: "99%", timeSaving: "85%", satisfaction: "97%", avgTime: "48h" },
    cases: [
      {
        title: "핀테크 투자 계약 검토",
        description: "금융투자사의 핀테크 스타트업 투자 계약 검토",
        category: "투자",
        result: "투자자 보호 조항 강화 및 리스크 40% 감소",
        details: [
          "투자금 사용 계획 및 감사 권한 구체화",
          "주주총회 의결권 및 이사 선임권 범위 명확화",
          "회사 가치 평가 방식 및 추가 투자 시 전환가격 조정 공식 도입",
          "핵심 기술 이전 제한 및 지식재산권 보호 조항 추가",
          "투자자 정보 공개 의무 및 범위 설정"
        ]
      },
      {
        title: "벤처투자 계약서 표준화",
        description: "핀테크 기업 '인베스트플랜'의 벤처투자 계약서 표준화 및 투자자 보호 조항 강화",
        category: "투자",
        result: "투자자 분쟁 0건, 후속 투자 유치 성공률 30% 증가",
        details: [
          "우선주 및 전환사채 조건 명확화",
          "투자금 사용 계획 및 감사 권한 구체화",
          "지분 희석 방지 조항 추가",
          "경영권 보호 및 이사회 구성 조건 명시",
          "분쟁 발생 시 중재 조항 신설"
        ]
      }
    ]
  },
  {
    icon: <UserGroupIcon className="w-6 h-6 text-emerald-600" />,
    name: "헬스케어/바이오",
    description: "임상시험, 라이선스, 연구개발 등 바이오/헬스케어 산업 맞춤 자문",
    contractTypes: ["임상시험 계약", "라이선스 계약", "연구개발 계약"],
    metrics: { riskReduction: "99%", timeSaving: "85%", satisfaction: "97%", avgTime: "48h" },
    cases: [
      {
        title: "의료기기 수출 계약 검토",
        description: "의료기기 제조사 '메디텍'의 해외 수출 계약서 검토 및 국제 규제 준수 자문",
        category: "수출",
        result: "국제 규제 준수율 100% 확보, 수출 승인 지연 0건",
        details: [
          "수출 대상국별 인증 및 규제 요건 반영",
          "지식재산권 보호 조항 강화",
          "제품 하자 발생 시 책임 범위 명확화",
          "수출 대금 지급 조건 및 환불 절차 구체화",
          "국제 분쟁 발생 시 중재 조항 추가"
        ]
      },
      {
        title: "헬스케어 스타트업 인수 계약 검토",
        description: "제약회사 '메디케어'의 디지털 헬스케어 스타트업 인수 계약 검토",
        category: "M&A",
        result: "인수 후 통합 계획 구체화 및 인수 가격 15% 조정",
        details: [
          "기존 임상시험 데이터의 유효성 검증 절차 추가",
          "핵심 개발팀 유지 계약 및 인센티브 체계 구체화",
          "기존 라이선스 계약의 승계 조건 명확화",
          "인수 후 3년간의 성과 지표 및 평가 기준 설정",
          "잠재적 소송 리스크에 대한 보호 조항 추가"
        ]
      }
    ]
  }
];

// Detailed contract guides
const DETAILED_GUIDES = [
  {
    icon: <DocumentTextIcon className="text-indigo-500" />,
    type: "기술 라이선스 계약",
    desc: "기술 이전 및 사용에 관한 주요 쟁점과 협상 포인트 안내",
    tips: "기술의 핵심성과 사업 연계성을 고려해 권리 귀속과 사용 범위를 꼼꼼히 검토해야 합니다.",
    details: [
      "기술의 핵심성과 사업 연계성을 고려해 권리 귀속과 사용 범위를 꼼꼼히 검토해야 합니다."
    ]
  },
  {
    icon: <BriefcaseIcon className="text-blue-500" />,
    type: "서비스 제공 계약",
    desc: "서비스 범위, 책임, 대금 지급 등 핵심 조항 가이드",
    tips: "서비스의 품질 기준과 분쟁 발생 시 책임 소재를 명확히 하는 것이 중요합니다.",
    details: [
      "서비스의 품질 기준과 분쟁 발생 시 책임 소재를 명확히 하는 것이 중요합니다."
    ]
  },
  {
    icon: <ShieldCheckIcon className="text-emerald-500" />,
    type: "NDA(비밀유지계약)",
    desc: "비밀정보 정의, 예외, 위반 시 책임 등 실무 가이드",
    tips: "비밀정보의 범위와 예외를 구체적으로 정의하고, 위반 시 실효성 있는 제재 조항을 두어야 합니다.",
    details: [
      "비밀정보의 범위와 예외를 구체적으로 정의하고, 위반 시 실효성 있는 제재 조항을 두어야 합니다."
    ]
  }
];

// Restore the contract guides section as a single large card with a stepper/tab interface
const DETAILED_GUIDES_STEPPER = [
  {
    icon: <BriefcaseIcon className="w-12 h-12 text-blue-500" />,
    type: "서비스 제공 계약",
    desc: `서비스 제공 계약은 IT, 컨설팅, 마케팅, 유지보수 등 다양한 분야에서 외부 업체가 서비스를 제공할 때 체결합니다.\n\n서비스 범위, 성과 기준(SLA), 대금 지급, 지연/불이행 시 손해배상, 계약 해지 및 분쟁 해결 절차가 주요 쟁점입니다.\n\n특히 서비스 품질 기준과 책임 소재, 데이터 보안, 개인정보 보호 등도 실무상 매우 중요합니다.`,
    details: [
      "서비스 범위 및 성과 기준(SLA) 명확화",
      "지연/불이행 시 손해배상 및 면책 조항",
      "대금 지급 조건 및 지연 시 이자",
      "계약 해지 및 사전 통지 의무",
      "분쟁 해결 절차 및 관할 법원",
      "데이터 보안 및 개인정보 보호 조항",
      "하도급/재위탁 허용 여부"
    ],
    tips: "서비스의 품질 기준과 분쟁 발생 시 책임 소재를 명확히 하는 것이 중요합니다."
  },
  {
    icon: <ShieldCheckIcon className="w-12 h-12 text-emerald-500" />,
    type: "NDA(비밀유지계약)",
    desc: `NDA는 사업 제휴, 투자, 기술 협력 등 다양한 상황에서 비밀정보의 유출을 방지하기 위해 체결합니다.\n\n비밀정보의 정의, 예외, 비밀유지 기간, 위반 시 손해배상, 정보 반환/파기, 관할 법원 등이 핵심 쟁점입니다.\n\n실무에서는 비밀정보의 범위와 예외, 위반 시 실효성 있는 제재 조항이 중요하며, NDA만으로는 완전한 보호가 어려울 수 있으므로 추가적 보안 조치도 필요합니다.`,
    details: [
      "비밀정보의 범위와 예외사항 명확화",
      "비밀유지 기간 및 목적 외 사용 금지",
      "위반 시 손해배상 및 금지명령 청구권",
      "정보 반환/파기 의무",
      "관할 법원 및 준거법 지정",
      "3자 제공/공개 허용 여부",
      "구두 정보의 보호 범위"
    ],
    tips: "비밀정보의 범위와 예외를 구체적으로 정의하고, 위반 시 실효성 있는 제재 조항을 두어야 합니다."
  },
  {
    icon: <ChartBarIcon className="w-12 h-12 text-indigo-600" />,
    type: "투자계약",
    desc: `투자계약은 벤처캐피탈, 엔젤투자, 전략적 투자 등에서 자금 조달과 지분 구조, 경영권, 투자자 보호 조항을 규정합니다.\n\n투자금 사용 계획, 주주권, 경영권 보호, 지분 희석 방지, 추가 투자 조건, 투자금 회수(Exit) 방식 등이 주요 쟁점입니다.\n\n투자자와 창업자 모두의 이해관계가 첨예하게 대립할 수 있으므로, 각 조항의 실질적 효과와 리스크를 꼼꼼히 따져야 합니다.`,
    details: [
      "투자금 사용 계획 및 감사 권한",
      "주주총회 의결권 및 이사 선임권",
      "지분 희석 방지 조항",
      "경영권 보호 및 이사회 구성",
      "추가 투자/후속 투자 조건",
      "투자금 회수(Exit) 방식",
      "분쟁 발생 시 중재 조항"
    ],
    tips: "투자자 보호 조항과 창업자 권리의 균형을 맞추는 것이 핵심입니다."
  },
  {
    icon: <UserGroupIcon className="w-12 h-12 text-emerald-600" />,
    type: "공급계약",
    desc: `공급계약은 원자재, 부품, 완제품 등 상품의 공급과 관련된 계약으로, 제조업, 유통업 등에서 빈번히 체결됩니다.\n\n공급 품목, 수량, 품질 기준, 납기, 대금 지급, 하자보수, 지연/불이행 시 책임, 계약 해지 등이 주요 쟁점입니다.\n\n특히 공급망 리스크, 가격 변동, 긴급 상황 시 대체 공급망 확보 등도 실무상 중요합니다.`,
    details: [
      "공급 품목, 수량, 품질 기준 명확화",
      "납기 및 지연 시 위약금",
      "대금 지급 조건 및 지급 지연 시 이자",
      "하자보수 및 교환/환불 절차",
      "계약 해지 및 사전 통지 의무",
      "긴급 상황 시 대체 공급망 확보",
      "가격 변동 조정 공식"
    ],
    tips: "공급망 리스크와 품질 기준을 꼼꼼히 점검해야 분쟁을 예방할 수 있습니다."
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-12 h-12 text-pink-600" />,
    type: "MOU(업무협약)",
    desc: `MOU는 정식 계약 전 단계에서 상호 협력 의사와 기본 원칙을 확인하는 문서입니다.\n\n법적 구속력의 유무, 협력 범위, 비밀유지, 독점/비독점, 향후 계약 체결 조건 등이 쟁점입니다.\n\n실무에서는 MOU의 법적 효력, 구속력 있는 조항과 선언적 조항의 구분, 향후 계약 체결 의무 여부를 명확히 해야 합니다.`,
    details: [
      "법적 구속력 유무 명확화",
      "협력 범위 및 역할 분담",
      "비밀유지 및 정보보호 조항",
      "독점/비독점 협력 여부",
      "향후 계약 체결 조건",
      "분쟁 발생 시 해결 절차",
      "MOU 종료/해지 조건"
    ],
    tips: "MOU의 법적 효력과 구속력 있는 조항을 명확히 구분해야 합니다."
  },
  {
    icon: <BriefcaseIcon className="w-12 h-12 text-blue-600" />,
    type: "프랜차이즈 계약",
    desc: `프랜차이즈 계약은 가맹본부와 가맹점 간의 권리·의무, 상표 사용, 교육, 지원, 로열티, 영업지역, 계약 해지 등을 규정합니다.\n\n상표 및 영업권 사용, 로열티, 교육/지원, 영업지역, 계약 해지 및 위약금, 경쟁 제한, 분쟁 해결 등이 주요 쟁점입니다.\n\n가맹사업법 등 관련 법령 준수와 실무상 분쟁 예방을 위한 조항이 중요합니다.`,
    details: [
      "상표 및 영업권 사용 범위",
      "로열티 및 수수료 구조",
      "교육/지원 프로그램 제공",
      "영업지역 및 경쟁 제한",
      "계약 해지 및 위약금",
      "가맹사업법 등 관련 법령 준수",
      "분쟁 해결 절차"
    ],
    tips: "가맹사업법 등 관련 법령을 반드시 확인하고, 영업지역·해지 조항을 꼼꼼히 검토하세요."
  },
  {
    icon: <ShieldCheckIcon className="w-12 h-12 text-emerald-600" />,
    type: "근로계약",
    desc: `근로계약은 근로자와 사용자 간의 근로조건, 임금, 근무시간, 복리후생, 해고, 징계 등을 규정합니다.\n\n임금, 근무시간, 휴가, 해고/징계, 비밀유지, 경업금지, 4대보험 등 법정 필수사항과 실무상 쟁점이 많습니다.\n\n근로기준법 등 관련 법령 준수와, 근로자·사용자 모두의 권익 보호가 중요합니다.`,
    details: [
      "임금 및 지급일, 성과급 구조",
      "근무시간, 휴가, 초과근무 수당",
      "해고/징계 사유 및 절차",
      "비밀유지 및 경업금지 조항",
      "4대보험 등 법정 필수사항",
      "복리후생 및 지원제도",
      "분쟁 발생 시 해결 절차"
    ],
    tips: "근로기준법 등 관련 법령을 반드시 준수하고, 해고/징계·임금 조항을 명확히 하세요."
  },
  {
    icon: <DocumentTextIcon className="w-12 h-12 text-indigo-500" />,
    type: "기타 특수계약",
    desc: `공동개발, 합작투자, 위탁생산, OEM, 유통대리점, 컨소시엄 등 다양한 특수계약이 있습니다.\n\n각 계약의 목적, 권리·의무, 리스크, 분쟁 해결 방식이 매우 다양하므로, 표준계약서가 없는 경우가 많고, 맞춤형 협상과 조항 설계가 필수입니다.`,
    details: [
      "계약 목적 및 범위 명확화",
      "권리·의무 및 책임 분담",
      "지식재산권 귀속 및 사용",
      "대금 지급 및 정산 방식",
      "분쟁 해결 절차",
      "계약 해지 및 종료 조건",
      "관련 법령 및 규제 준수"
    ],
    tips: "특수계약은 표준화된 양식이 없으므로, 목적과 리스크에 맞는 맞춤형 조항 설계가 중요합니다."
  }
];

// Add this data above the main export:
const CLIENT_SECTORS = [
  { name: '제약·의료기기', icon: <ShieldCheckIcon className="text-indigo-600" />, logo: '/logos/sector-pharma.png' },
  { name: '바이오 벤처', icon: <ChartBarIcon className="text-blue-600" />, logo: '/logos/sector-bio.png' },
  { name: '투자회사', icon: <BriefcaseIcon className="text-emerald-600" />, logo: '/logos/sector-invest.png' },
  { name: '디지털헬스케어', icon: <UserGroupIcon className="text-pink-600" />, logo: '/logos/sector-digitalhealth.png' },
  { name: 'IT', icon: <ChartBarIcon className="text-indigo-400" />, logo: '/logos/sector-it.png' },
  { name: '일반기업', icon: <BriefcaseIcon className="text-gray-600" />, logo: '/logos/sector-corp.png' },
  { name: '운송·물류', icon: <UserGroupIcon className="text-yellow-600" />, logo: '/logos/sector-logistics.png' },
  { name: '엔터테인먼트', icon: <ChatBubbleLeftRightIcon className="text-pink-500" />, logo: '/logos/sector-ent.png' },
  { name: '병원', icon: <ShieldCheckIcon className="text-green-600" />, logo: '/logos/sector-hospital.png' },
  { name: '기관', icon: <BriefcaseIcon className="text-indigo-700" />, logo: '/logos/sector-institution.png' },
  { name: '외국기업', icon: <UserGroupIcon className="text-blue-400" />, logo: '/logos/sector-foreign.png' },
];

export default function ExpertisePage() {
  const [diffIndex, setDiffIndex] = useState(0);
  const [guideIndex, setGuideIndex] = useState(0);
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (matches other pages) */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden flex items-center justify-center min-h-[320px] mb-12">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">전문성</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">산업별 솔루션, 계약서 가이드, 그리고 전문가 직접 검토까지.<br />LawKit만의 차별화된 경험을 확인하세요.</p>
          </motion.div>
        </div>
      </section>

      {/* Consolidated Client & Industry Coverage Section with Case Studies */}
      <section className="py-16 bg-gradient-to-br from-white via-indigo-50 to-blue-50 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">산업별 전문 솔루션 & 성공 사례</h2>
            <p className="text-lg text-gray-600">OhKims와 LawKit이 신뢰받는 다양한 산업별 고객사, 맞춤 계약 유형, 그리고 실제 성공 사례를 한눈에 확인하세요.</p>
          </div>
          {/* Client Sectors & Industry Icon Row */}
          <IndustryIconRow sectors={CLIENT_SECTORS} />
          {/* Horizontally scrollable industry solution cards */}
          <div className="flex gap-8 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-200 pb-2">
            {DETAILED_INDUSTRIES.map((industry, idx) => (
              <div key={idx} className="flex-shrink-0 w-[440px] md:w-[520px] lg:w-[600px]">
                <IndustrySolutionCard industry={industry} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-white mb-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">LawKit vs. 다른 계약 검토 서비스</h2>
            <p className="text-lg text-gray-600">전문성, 속도, 비용, 사후관리까지 한눈에 비교하세요.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-2xl shadow border border-gray-100 text-sm md:text-base">
              <thead>
                <tr className="bg-indigo-50 text-indigo-800">
                  <th className="py-3 px-4 font-bold text-left">항목</th>
                  <th className="py-3 px-4 font-bold text-center">LawKit/OhKims</th>
                  <th className="py-3 px-4 font-bold text-center">전통 로펌</th>
                  <th className="py-3 px-4 font-bold text-center">AI-only</th>
                  <th className="py-3 px-4 font-bold text-center">사내 검토</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {[
                  { label: '담당자', values: ['변호사+전문팀', '변호사', 'AI', '직원'] },
                  { label: '리스크 분석 정확도', values: ['매우 높음', '높음', '중간', '낮음~중간'] },
                  { label: '평균 검토 소요 시간', values: ['24~48시간', '3~7일', '1~24시간', '1~7일'] },
                  { label: '비용', values: ['합리적/투명', '높음', '저렴', '인건비'] },
                  { label: '업계 벤치마킹', values: ['✔️', '❌', '△', '❌'] },
                  { label: '계약서 개선 제안', values: ['✔️', '✔️', '△', '❌'] },
                  { label: '사후 관리/알림', values: ['✔️', '❌', '△', '❌'] },
                  { label: '실시간 협업', values: ['✔️', '❌', '✔️', '△'] },
                  { label: '고객 맞춤 가이드', values: ['✔️', '△', '❌', '❌'] },
                  { label: '실제 성공사례', values: ['✔️', '✔️', '❌', '❌'] },
                  { label: '고객 만족도', values: ['98%+', '90%+', '70~80%', '미측정'] },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-3 px-4 font-semibold text-gray-900">{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="py-3 px-4 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 계약 분석, 벤치마킹, 그리고 실무 전략 Section (clean, side-by-side cards) */}
      <section className="py-20 bg-white mb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">계약 분석, 벤치마킹, 그리고 실무 전략</h2>
            <p className="text-lg text-gray-600">LawKit은 데이터 기반 분석과 실무 경험을 바탕으로, 업계 벤치마킹부터 서비스 제공 계약, 기술 라이선스 전략까지 모두 제공합니다.</p>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <ContractGuideStepper />
            <DifferentiatorStepper />
          </div>
        </div>
      </section>

      {/* 법무법인 전문가 직접 검토 Section - Detailed */}
      <section className="py-20 bg-gradient-to-br from-white via-indigo-50 to-blue-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-100 border-2 border-indigo-300 rounded-full px-8 py-6 mb-8 shadow-lg">
            <ShieldCheckIcon className="w-10 h-10 text-indigo-600 mr-4" />
            <span className="text-xl font-extrabold text-indigo-800 flex items-center gap-2">모든 계약서는 법무법인 전문가가 직접 검토합니다 <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold ml-2"><CheckCircleIcon className="w-4 h-4 mr-1" /> Verified</span></span>
          </div>
          <p className="text-xl text-gray-700 mb-4 font-semibold">AI가 아닌, 실제 변호사가 직접 책임집니다.</p>
          <ul className="text-base text-gray-600 mb-8 font-medium list-disc list-inside inline-block text-left mx-auto">
            <li>전문 변호사가 리스크와 쟁점을 꼼꼼히 점검</li>
            <li>2중 검토로 실수 없는 결과 제공</li>
            <li>맞춤형 개선안과 협상 전략 제안</li>
          </ul>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">LawKit의 전문 서비스를 경험해보세요</h2>
          <a href="/contact" className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-extrabold text-lg shadow-lg hover:scale-105 hover:bg-indigo-700 transition-transform duration-200">무료 상담 신청</a>
        </div>
      </section>
    </div>
  );
}

// Add these components above the main export:
function ContractGuideStepper() {
  const [guideIndex, setGuideIndex] = React.useState(0);
  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 rounded-3xl shadow-2xl border border-indigo-200 max-w-6xl w-full flex flex-col md:flex-row items-stretch relative overflow-hidden transition-all duration-300 p-0">
      {/* Stepper icons (vertical, left) */}
      <div className="flex md:flex-col flex-row md:w-40 w-full md:min-w-[144px] bg-indigo-50 border-r border-indigo-100 p-4 md:py-8 md:px-4 pr-2 gap-2 md:gap-3 items-center md:items-start justify-center md:justify-start overflow-hidden">
        {DETAILED_GUIDES_STEPPER.map((g, idx) => (
          <button
            key={g.type}
            onClick={() => setGuideIndex(idx)}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              guideIndex === idx
                ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-100'
            }`}
            aria-current={guideIndex === idx ? 'step' : undefined}
          >
            <span className="mb-0.5 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 shadow-sm mr-2 md:mr-0">
              {React.cloneElement(g.icon, { className: 'w-8 h-8' })}
            </span>
            <span className="w-24 text-xs font-semibold text-center break-words leading-tight">{g.type}</span>
          </button>
        ))}
      </div>
      {/* Main content (right) */}
      <div className="flex-1 flex flex-col justify-center px-16 py-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-800 mb-2 tracking-tight drop-shadow z-10 text-left">{DETAILED_GUIDES_STEPPER[guideIndex].type}</h3>
        <div className="text-gray-700 text-base mb-4 w-full max-w-5xl whitespace-pre-line z-10 text-left font-medium">
          {DETAILED_GUIDES_STEPPER[guideIndex].desc}
        </div>
        <ul className="list-disc list-inside text-gray-700 text-base mb-3 w-full max-w-5xl space-y-1 z-10">
          {DETAILED_GUIDES_STEPPER[guideIndex].details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r px-6 py-2 mt-1 text-indigo-800 text-sm font-semibold shadow-sm w-full max-w-5xl z-10">
          실무 팁: {DETAILED_GUIDES_STEPPER[guideIndex].tips}
        </div>
      </div>
    </div>
  );
}

function DifferentiatorStepper() {
  const [diffIndex, setDiffIndex] = React.useState(0);
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-indigo-200 max-w-6xl w-full flex flex-col md:flex-row items-stretch relative overflow-hidden transition-all duration-300 p-0">
      {/* Stepper icons (vertical, left) */}
      <div className="flex md:flex-col flex-row md:w-40 w-full md:min-w-[144px] bg-indigo-50 border-r border-indigo-100 p-4 md:py-8 md:px-4 pr-2 gap-2 md:gap-3 items-center md:items-start justify-center md:justify-start overflow-hidden">
        {DETAILED_DIFFERENTIATORS.map((d, idx) => (
          <button
            key={d.title}
            onClick={() => setDiffIndex(idx)}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              diffIndex === idx
                ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-100'
            }`}
            aria-current={diffIndex === idx ? 'step' : undefined}
          >
            <span className="mb-0.5 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 shadow-sm mr-2 md:mr-0">
              {React.cloneElement(d.icon, { className: 'w-8 h-8' })}
            </span>
            <span className="w-24 text-xs font-semibold text-center break-words leading-tight">{d.title}</span>
          </button>
        ))}
      </div>
      {/* Main content (right) */}
      <div className="flex-1 flex flex-col justify-center px-16 py-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-indigo-800 mb-2 tracking-tight drop-shadow z-10 text-left">{DETAILED_DIFFERENTIATORS[diffIndex].title}</h3>
        <ul className="list-disc list-inside text-gray-700 text-base mb-3 w-full max-w-5xl space-y-1 z-10">
          {DETAILED_DIFFERENTIATORS[diffIndex].details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r px-6 py-2 mt-1 text-indigo-800 text-sm font-semibold shadow-sm w-full max-w-5xl z-10">
          {DETAILED_DIFFERENTIATORS[diffIndex].callout}
        </div>
      </div>
    </div>
  );
}

// Add this component above the main export:
function IndustryIconRow({ sectors }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 mb-8 border-b border-indigo-100 scrollbar-thin scrollbar-thumb-indigo-200">
      {sectors.map((sector, idx) => (
        <div key={idx} className="flex flex-col items-center min-w-[110px]">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white via-indigo-100 to-blue-200 shadow-md mb-2">
            {React.cloneElement(sector.icon, { className: 'w-14 h-14 text-indigo-700' })}
          </div>
          {sector.logo && (
            <img src={sector.logo} alt={sector.name + ' logo'} className="w-8 h-8 object-contain mb-1" />
          )}
          <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">{sector.name}</span>
        </div>
      ))}
    </div>
  );
}

// Add this component above the main export:
function IndustrySolutionCard({ industry }) {
  const [expanded, setExpanded] = React.useState(false);
  const featuredCase = industry.cases[0];
  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border border-indigo-100 p-8 flex flex-col min-h-[420px] relative overflow-hidden transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        {industry.icon}
        <span className="text-lg font-bold text-gray-900">{industry.name}</span>
      </div>
      <div className="text-gray-600 mb-2 text-sm">{industry.description}</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {industry.contractTypes.map((c, i) => (
          <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full mt-1">{c}</span>
        ))}
      </div>
      <div className="flex gap-4 mb-3 mt-1">
        <div className="text-center min-w-[60px]">
          <div className="text-base font-bold text-indigo-600">{industry.metrics.riskReduction}</div>
          <div className="text-gray-600 text-xs">리스크 감소</div>
        </div>
        <div className="text-center min-w-[60px]">
          <div className="text-base font-bold text-indigo-600">{industry.metrics.timeSaving}</div>
          <div className="text-gray-600 text-xs">시간 단축</div>
        </div>
        <div className="text-center min-w-[60px]">
          <div className="text-base font-bold text-indigo-600">{industry.metrics.satisfaction}</div>
          <div className="text-gray-600 text-xs">만족도</div>
        </div>
        <div className="text-center min-w-[60px]">
          <div className="text-base font-bold text-indigo-600">{industry.metrics.avgTime}</div>
          <div className="text-gray-600 text-xs">평균 검토</div>
        </div>
      </div>
      {featuredCase && (
        <div className="mt-2 bg-indigo-50 rounded-xl p-4 border-l-4 border-indigo-400 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{featuredCase.client || featuredCase.category}</span>
          </div>
          <div className="text-xs text-gray-700 mb-1"><span className="font-semibold text-indigo-700">과제:</span> {featuredCase.challenge || featuredCase.title}</div>
          <div className="text-xs text-gray-700 mb-1"><span className="font-semibold text-indigo-700">솔루션:</span> {featuredCase.solution || featuredCase.description}</div>
          <div className="text-xs text-gray-700 mb-1"><span className="font-semibold text-indigo-700">성과:</span> {featuredCase.outcome || featuredCase.result}</div>
          {featuredCase.details && (
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5 mt-1">
              {featuredCase.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {industry.cases.length > 1 && (
        <>
          <button
            className="text-indigo-700 text-xs font-semibold underline mt-1 mb-2 self-end"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? '간략히 보기' : `더 많은 성공 사례 보기 (${industry.cases.length - 1})`}
          </button>
          {expanded && (
            <div className="space-y-2 mt-2">
              {industry.cases.slice(1).map((c, i) => (
                <div key={i} className="bg-white rounded-lg p-3 border border-indigo-50 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{c.client || c.category}</span>
                  </div>
                  <div className="text-xs text-gray-700 mb-1"><span className="font-semibold text-indigo-700">과제:</span> {c.challenge || c.title}</div>
                  <div className="text-xs text-gray-700 mb-1"><span className="font-semibold text-indigo-700">솔루션:</span> {c.solution || c.description}</div>
                  <div className="text-xs text-gray-700 mb-1"><span className="font-semibold text-indigo-700">성과:</span> {c.outcome || c.result}</div>
                  {c.details && (
                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5 mt-1">
                      {c.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 