'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // 서비스 관련
  {
    question: "LawKit은 어떤 서비스를 제공하나요?",
    answer: "LawKit은 수천 건의 검증된 계약서와 판례 데이터베이스를 활용한 자동화된 1차 검토와 전문 변호사의 2차 검증을 통해 계약 검토 서비스를 제공합니다. 계약서 업로드 후 우리의 전용 시스템이 1차 분석을 수행하고, 법무법인 오킴스의 전문 변호사가 2차 검증을 거쳐 완벽한 계약 리스크 관리 솔루션을 제공합니다.",
    category: "서비스"
  },
  {
    question: "어떤 종류의 계약서를 검토할 수 있나요?",
    answer: "M&A 계약, 투자 계약, 공급망 계약, 고용 계약, 부동산 계약, 대출 계약, 보험 계약, 기술 라이센싱 계약 등 모든 종류의 계약서를 검토할 수 있습니다. 우리의 전문 변호사들은 수천 건의 검증된 계약서와 판례를 바탕으로 다양한 계약 유형에 대응합니다.",
    category: "서비스"
  },
  {
    question: "검토 결과는 얼마나 정확한가요?",
    answer: "수천 건의 검증된 데이터베이스 기반 1차 분석과 전문 변호사의 2차 검증을 통해 높은 정확도를 보장합니다. 법무법인 오킴스의 파트너 변호사들이 직접 검토하여 엔터프라이즈급 품질을 제공합니다.",
    category: "서비스"
  },
  {
    question: "검토에 얼마나 시간이 걸리나요?",
    answer: "자동화된 1차 분석은 수 분 내에 완료되며, 전문 변호사의 2차 검증은 계약의 복잡도에 따라 24-48시간 내에 완료됩니다. 긴급한 경우 우선 처리 서비스도 제공합니다.",
    category: "서비스"
  },
  {
    question: "LawKit의 검토 결과는 얼마나 빨리 받을 수 있나요?",
    answer: "계약서 업로드 즉시 자동화된 예비 분석 결과를 수 분 내에 제공합니다. 빠른 피드백으로 신속한 의사결정이 가능하며, 전문 변호사의 상세 검토는 별도로 안내됩니다.",
    category: "서비스"
  },
  {
    question: "LawKit을 이용하면 어떤 비용/시간 절감 효과가 있나요?",
    answer: "자동화된 시스템과 전문가의 효율적인 협업으로 기존 대비 최대 70% 시간과 60% 비용을 절감할 수 있습니다. 특히 대량의 계약서 처리나 반복적인 검토 작업에서 큰 효과를 볼 수 있습니다.",
    category: "서비스"
  },
  {
    question: "검토 리포트는 이해하기 쉬운가요?",
    answer: "복잡한 법률 용어도 쉽게 풀어 설명하여, 누구나 이해할 수 있도록 지원합니다. 리스크 수준별 색상 구분과 구체적인 개선 방안을 제시합니다.",
    category: "서비스"
  },

  // 기술 및 보안
  {
    question: "업로드한 계약서는 안전한가요?",
    answer: "네, 완전히 안전합니다. 모든 데이터는 AES-256 암호화를 통해 보호되며, SOC 2 Type II 인증을 받은 클라우드 인프라에서 관리됩니다. 업로드된 문서는 검토 완료 후 자동으로 삭제되며, 고객의 명시적 동의 없이는 제3자와 공유되지 않습니다.",
    category: "보안"
  },
  {
    question: "자동화 시스템은 어떻게 작동하나요?",
    answer: "우리의 자동화 시스템은 수천 건의 검증된 계약서와 판례 데이터베이스를 바탕으로 계약의 잠재적 리스크를 식별합니다. 고도화된 텍스트 분석 기술을 통해 계약 조항을 분석하고, 법적 구속력, 손해배상, 해지 조건 등을 검토합니다.",
    category: "기술"
  },
  {
    question: "개인정보는 어떻게 보호되나요?",
    answer: "GDPR 및 개인정보보호법을 완전히 준수합니다. 모든 개인정보는 암호화되어 저장되며, 고객의 동의 없이는 수집, 사용, 공유되지 않습니다. 데이터 처리 과정은 투명하게 공개되며, 고객은 언제든지 개인정보 삭제를 요청할 수 있습니다.",
    category: "보안"
  },
  {
    question: "대용량 파일도 업로드할 수 있나요?",
    answer: "현재 최대 50MB까지 업로드 가능하며, 100페이지까지 검토할 수 있습니다. 더 큰 파일이 필요한 경우 고객 지원팀에 문의해 주세요.",
    category: "기술"
  },

  // 요금제 및 결제
  {
    question: "요금제는 어떻게 구성되어 있나요?",
    answer: "LawKit은 구독형 요금제가 아닌 맞춤형 견적 시스템을 운영합니다. 계약서의 복잡도, 서비스 유형(작성/검토), 업종별 특수성, 긴급성 등을 종합적으로 고려하여 투명하고 합리적인 견적을 제공합니다. 평균 견적은 약 45만원이며, 12,000건 이상의 검토 경험을 바탕으로 정확한 견적을 산출합니다.",
    category: "요금제"
  },
  {
    question: "견적은 어떻게 산출되나요?",
    answer: "견적 산출은 4단계 과정을 거칩니다: 1) 견적/의뢰 요청, 2) 상세 정보 확인 및 상담, 3) 맞춤 견적 산출, 4) 견적서 전달 및 확정. 계약서 페이지 수, 조항 수, 업종별 특수성, 긴급성, 추가 상담 요구사항 등을 반영하여 정확한 견적을 제공합니다.",
    category: "요금제"
  },
  {
    question: "무료 체험은 어떻게 하나요?",
    answer: "회원가입 후 즉시 1건의 계약 검토를 무료로 체험할 수 있습니다. 신용카드 정보 없이도 체험이 가능하며, 만족하지 않으시면 언제든지 서비스를 중단할 수 있습니다.",
    category: "요금제"
  },
  {
    question: "결제는 언제 이루어지나요?",
    answer: "견적 확인 후 서비스 시작 전에 결제가 진행됩니다. 결제는 견적서 전달 후 고객님의 확인을 받은 후 이루어지며, 서비스 완료 후 추가 비용이 발생하는 경우에만 별도 청구됩니다.",
    category: "요금제"
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "서비스 시작 전에는 100% 환불을 보장합니다. 서비스 진행 중인 경우 진행 상황에 따라 부분 환불이 가능하며, 검토가 완료된 경우에는 환불이 제한될 수 있습니다. 자세한 환불 정책은 고객센터를 통해 문의해 주세요.",
    category: "요금제"
  },
  {
    question: "긴급 서비스는 어떻게 요청하나요?",
    answer: "당일 또는 익일 납기가 필요한 긴급 서비스의 경우, 견적 산출 시 긴급성을 반영하여 20-30%의 가산 요금이 적용됩니다. 긴급 서비스는 전화나 이메일을 통해 직접 요청하실 수 있습니다.",
    category: "요금제"
  },

  // 고객 지원
  {
    question: "고객 지원은 어떻게 받을 수 있나요?",
    answer: "평일 9:00-18:00 고객 지원을 제공합니다. 실시간 채팅, 이메일, 전화를 통해 문의하실 수 있습니다. 또한 엔터프라이즈 고객을 위한 전담 고객 성공 매니저가 배정됩니다.",
    category: "지원"
  },
  {
    question: "기업 고객을 위한 특별 서비스가 있나요?",
    answer: "네, 기업 고객을 위한 전담 변호사 배정, 맞춤형 API 연동, 전용 온보딩 프로그램, 우선 지원, 전용 협업 공간 등 특별 서비스를 제공합니다. 기업 규모와 요구사항에 맞는 맞춤형 솔루션을 제안드립니다.",
    category: "지원"
  },
  {
    question: "팀 협업 기능이 있나요?",
    answer: "네, 팀 협업 기능을 제공합니다. 여러 사용자가 동시에 계약을 검토하고, 댓글과 수정 사항을 공유할 수 있으며, 승인 워크플로우도 설정할 수 있습니다. 기업 고객의 경우 전용 협업 공간을 제공합니다.",
    category: "지원"
  },
  {
    question: "LawKit의 변호사는 업계별로 특화되어 있나요?",
    answer: "네, 법무법인 오킴스의 파트너 변호사들이 각각의 전문 분야(기업법무, M&A, 위기관리, 의료법 등)에 특화되어 맞춤형 리스크 진단과 개선 의견을 제공합니다.",
    category: "지원"
  },
  {
    question: "검토 결과를 팀원들과 공유할 수 있나요?",
    answer: "네, 검토 결과는 PDF 형태로 다운로드하여 팀원들과 공유할 수 있습니다. 또한 대시보드에서 직접 링크를 통해 공유할 수도 있습니다.",
    category: "지원"
  },

  // 법적 관련
  {
    question: "검토 결과에 대한 법적 책임은 어떻게 되나요?",
    answer: "우리의 검토 결과는 참고 자료이며, 최종 법적 판단은 전문 변호사와 상담하시기 바랍니다. 다만, 법무법인 오킴스의 전문 변호사가 검증한 결과이므로 높은 신뢰성을 보장합니다.",
    category: "법적"
  },
  {
    question: "검토 결과를 법정에서 증거로 사용할 수 있나요?",
    answer: "검토 결과는 법정 증거로 직접 사용할 수는 없지만, 계약 검토 과정의 전문적 의견서로 활용할 수 있습니다. 필요시 전문 변호사의 법정 증언도 지원합니다.",
    category: "법적"
  },
  {
    question: "국제 계약도 검토 가능한가요?",
    answer: "네, 영어 계약서와 주요 국가의 계약서도 검토 가능합니다. 다만, 특정 국가의 법률 해석이 필요한 경우 해당 국가의 전문 변호사와 협력하여 검토를 제공합니다.",
    category: "법적"
  },
  {
    question: "자동화 검토와 전문 변호사 검토의 차이점은 무엇인가요?",
    answer: "자동화 검토는 수천 건의 데이터베이스를 활용한 빠른 1차 분석으로 기본적인 리스크를 식별하고, 전문 변호사 검토는 세부적인 법적 해석과 실무적 조언을 제공합니다. 두 검토를 모두 거쳐야 완전한 계약 리스크 관리가 가능합니다.",
    category: "서비스"
  },
  {
    question: "법무법인 오킴스는 어떤 법무법인인가요?",
    answer: "법무법인 오킴스는 강남 최고급 로펌으로, 기업법무, M&A, 위기관리, 의료법 등 다양한 분야의 전문 변호사들이 근무하고 있습니다. 20년 이상의 경력을 가진 파트너 변호사들이 직접 검토를 담당합니다.",
    category: "서비스"
  }
];

const categories = ["서비스", "보안", "기술", "요금제", "지원", "법적"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "전체" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    alert('문의가 성공적으로 전송되었습니다. 24시간 내에 답변드리겠습니다.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">FAQ & 지원</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">자주 묻는 질문과 고객 지원 정보를 확인하세요.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Search */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="질문을 검색해보세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                  <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 id="faq-heading" className="text-2xl font-bold text-gray-900">
                    자주 묻는 질문
                  </h2>
                  <p className="text-gray-600 mt-2">
                    고객들이 가장 많이 묻는 질문들을 카테고리별로 정리했습니다
                  </p>
                </div>
                <div className="p-6">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <button
                      onClick={() => setSelectedCategory("전체")}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === "전체"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      전체 ({faqData.length})
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
                        {category} ({faqData.filter(faq => faq.category === category).length})
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

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">검색 결과가 없습니다</h3>
                      <p className="mt-1 text-sm text-gray-500">다른 키워드로 검색하거나 직접 문의해 주세요.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 연락</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">전화 문의</p>
                      <p className="text-sm text-gray-600">02-538-5886</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">이메일</p>
                      <p className="text-sm text-gray-600">support@lawkit.kr</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">응답 시간</p>
                      <p className="text-sm text-gray-600">24시간 이내</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">문의하기</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      제목 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      우선순위
                    </label>
                    <select
                      id="priority"
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                    >
                      <option value="low">낮음</option>
                      <option value="medium">보통</option>
                      <option value="high">높음</option>
                      <option value="urgent">긴급</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      메시지 *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="문의사항을 자세히 작성해 주세요..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    문의 보내기
                  </button>
                </form>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">실시간 채팅</h3>
                <p className="text-sm text-gray-600 mb-4">
                  즉시 답변이 필요한 경우 실시간 채팅을 이용해 주세요.
                </p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  채팅 시작하기
                </button>
              </div>

              {/* Additional Resources */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">추가 리소스</h3>
                <div className="space-y-3">
                  <Link href="/blog" className="block text-sm text-indigo-600 hover:text-indigo-700">
                    📚 블로그 - 법률 인사이트
                  </Link>
                  <Link href="/services" className="block text-sm text-indigo-600 hover:text-indigo-700">
                    🛠️ 서비스 소개
                  </Link>
                  <Link href="/about" className="block text-sm text-indigo-600 hover:text-indigo-700">
                    👥 팀 소개
                  </Link>
                  <Link href="/security" className="block text-sm text-indigo-600 hover:text-indigo-700">
                    🔒 보안 정책
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 