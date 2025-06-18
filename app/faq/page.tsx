'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // 서비스 관련
  {
    question: "LawScan은 어떤 서비스를 제공하나요?",
    answer: "LawScan은 강남 최고급 로펌이 개발한 독자 AI 시스템과 전문 변호사의 이중 검증을 통해 계약 리스크를 분석하고 관리하는 서비스입니다. 계약서 업로드 후 AI가 1차 분석을 수행하고, 전문 변호사가 2차 검증을 거쳐 완벽한 계약 리스크 관리 솔루션을 제공합니다.",
    category: "서비스"
  },
  {
    question: "어떤 종류의 계약서를 분석할 수 있나요?",
    answer: "M&A 계약, 투자 계약, 공급망 계약, 고용 계약, 부동산 계약, 대출 계약, 보험 계약 등 모든 종류의 계약서를 분석할 수 있습니다. 우리의 AI 시스템은 수천 건의 검증된 계약서와 판례를 학습하여 다양한 계약 유형에 대응합니다.",
    category: "서비스"
  },
  {
    question: "분석 결과는 얼마나 정확한가요?",
    answer: "우리의 독자 개발 AI 시스템은 98% 이상의 정확도를 달성합니다. 강남 최고급 로펌의 엘리트 변호사들이 직접 훈련하고 검증한 AI로, 전문 변호사의 이중 검증을 거쳐 엔터프라이즈급 품질을 보장합니다.",
    category: "서비스"
  },
  {
    question: "분석에 얼마나 시간이 걸리나요?",
    answer: "AI 1차 분석은 수 분 내에 완료되며, 전문 변호사의 2차 검증은 계약의 복잡도에 따라 24-48시간 내에 완료됩니다. 긴급한 경우 우선 처리 서비스도 제공합니다.",
    category: "서비스"
  },

  // 기술 및 보안
  {
    question: "업로드한 계약서는 안전한가요?",
    answer: "네, 완전히 안전합니다. 모든 데이터는 AES-256 암호화를 통해 보호되며, SOC 2 Type II 인증을 받은 클라우드 인프라에서 관리됩니다. 업로드된 문서는 분석 완료 후 자동으로 삭제되며, 고객의 명시적 동의 없이는 제3자와 공유되지 않습니다.",
    category: "보안"
  },
  {
    question: "AI 시스템은 어떻게 작동하나요?",
    answer: "우리의 독자 개발 AI는 수천 건의 검증된 계약서와 판례를 학습하여 계약의 잠재적 리스크를 식별합니다. 자연어 처리 기술을 통해 계약 조항을 분석하고, 법적 구속력, 손해배상, 해지 조건 등을 자동으로 검토합니다.",
    category: "기술"
  },
  {
    question: "개인정보는 어떻게 보호되나요?",
    answer: "GDPR 및 개인정보보호법을 완전히 준수합니다. 모든 개인정보는 암호화되어 저장되며, 고객의 동의 없이는 수집, 사용, 공유되지 않습니다. 데이터 처리 과정은 투명하게 공개되며, 고객은 언제든지 개인정보 삭제를 요청할 수 있습니다.",
    category: "보안"
  },

  // 요금제 및 결제
  {
    question: "요금제는 어떻게 구성되어 있나요?",
    answer: "스타터, 프로페셔널, 엔터프라이즈 세 가지 요금제를 제공합니다. 스타터는 월 5건, 프로페셔널은 월 20건, 엔터프라이즈는 무제한 계약 분석을 포함합니다. 연간 결제 시 20% 할인 혜택을 제공합니다.",
    category: "요금제"
  },
  {
    question: "무료 체험은 어떻게 하나요?",
    answer: "회원가입 후 즉시 2건의 계약 분석을 무료로 체험할 수 있습니다. 신용카드 정보 없이도 체험이 가능하며, 만족하지 않으시면 언제든지 해지할 수 있습니다.",
    category: "요금제"
  },
  {
    question: "결제는 언제 이루어지나요?",
    answer: "무료 체험 기간(14일) 후 자동으로 유료 요금제로 전환됩니다. 월간 요금제는 매월 1일에, 연간 요금제는 매년 1월 1일에 결제됩니다. 언제든지 요금제 변경이나 해지가 가능합니다.",
    category: "요금제"
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "서비스 시작 후 30일 이내에는 100% 환불을 보장합니다. 단, 이미 분석이 완료된 계약 건수에 대해서는 환불이 제한될 수 있습니다. 자세한 환불 정책은 고객센터를 통해 문의해 주세요.",
    category: "요금제"
  },

  // 고객 지원
  {
    question: "고객 지원은 어떻게 받을 수 있나요?",
    answer: "24/7 고객 지원을 제공합니다. 실시간 채팅, 이메일, 전화를 통해 언제든지 문의하실 수 있습니다. 또한 전담 고객 성공 매니저가 배정되어 개별 맞춤 지원을 제공합니다.",
    category: "지원"
  },
  {
    question: "기업 고객을 위한 특별 서비스가 있나요?",
    answer: "네, 엔터프라이즈 고객을 위한 전담 법무팀 배정, 맞춤형 API 연동, 전용 온보딩 프로그램, 우선 지원 등 특별 서비스를 제공합니다. 기업 규모와 요구사항에 맞는 맞춤형 솔루션을 제안드립니다.",
    category: "지원"
  },
  {
    question: "팀 협업 기능이 있나요?",
    answer: "프로페셔널 이상 요금제에서는 팀 협업 기능을 제공합니다. 여러 사용자가 동시에 계약을 검토하고, 댓글과 수정 사항을 공유할 수 있으며, 승인 워크플로우도 설정할 수 있습니다.",
    category: "지원"
  },

  // 법적 관련
  {
    question: "분석 결과에 대한 법적 책임은 어떻게 되나요?",
    answer: "우리의 분석 결과는 참고 자료이며, 최종 법적 판단은 전문 변호사와 상담하시기 바랍니다. 다만, 우리의 전문 변호사가 검증한 결과이므로 높은 신뢰성을 보장합니다. 보험 가입을 통해 추가 보호도 제공합니다.",
    category: "법적"
  },
  {
    question: "분석 결과를 법정에서 증거로 사용할 수 있나요?",
    answer: "분석 결과는 법정 증거로 직접 사용할 수는 없지만, 계약 검토 과정의 전문적 의견서로 활용할 수 있습니다. 필요시 전문 변호사의 법정 증언도 지원합니다.",
    category: "법적"
  },
  {
    question: "국제 계약도 분석 가능한가요?",
    answer: "네, 영어 계약서와 주요 국가의 계약서도 분석 가능합니다. 다만, 특정 국가의 법률 해석이 필요한 경우 해당 국가의 전문 변호사와 협력하여 분석을 제공합니다.",
    category: "법적"
  }
];

const categories = ["서비스", "보안", "기술", "요금제", "지원", "법적"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = selectedCategory === "전체" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">자주 묻는</span>
              <span className="block text-indigo-200">질문</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              LawScan 서비스에 대한 궁금한 점들을<br/>
              <span className="font-semibold">한눈에 확인하세요</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 mb-4">
              궁금한 점을 찾아보세요
            </h2>
            <p className="text-xl text-gray-600">
              고객들이 가장 많이 묻는 질문들을 카테고리별로 정리했습니다
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory("전체")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "전체"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
                  aria-expanded={openItems.includes(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              위의 FAQ에서 답을 찾지 못하셨다면, 언제든지 문의해 주세요.<br/>
              전문 팀이 빠르고 정확한 답변을 드리겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                문의하기
              </Link>
              <Link
                href="/trial"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                무료 체험 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 