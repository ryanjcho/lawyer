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
  {
    question: "LawScan의 AI 분석 결과는 얼마나 빨리 받을 수 있나요?",
    answer: "계약서 업로드 즉시 AI가 예비 분석 결과를 수 분 내에 제공합니다. 빠른 피드백으로 신속한 의사결정이 가능합니다.",
    category: "서비스"
  },
  {
    question: "LawScan을 이용하면 어떤 비용/시간 절감 효과가 있나요?",
    answer: "AI 자동화와 전문 변호사의 효율적 검토로 기존 대비 최대 70% 시간과 60% 비용을 절감할 수 있습니다.",
    category: "서비스"
  },
  {
    question: "분석 리포트는 이해하기 쉬운가요?",
    answer: "복잡한 법률 용어도 쉽게 풀어 설명하여, 누구나 이해할 수 있도록 지원합니다.",
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
  {
    question: "대용량 파일도 업로드할 수 있나요?",
    answer: "현재 최대 50MB까지 업로드 가능하며, 100페이지까지 분석할 수 있습니다. 더 큰 파일이 필요한 경우 고객 지원팀에 문의해 주세요.",
    category: "기술"
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
  {
    question: "구독을 취소하려면 어떻게 해야 하나요?",
    answer: "대시보드의 설정 탭에서 언제든지 구독을 취소할 수 있습니다. 취소 시 현재 결제 기간이 끝날 때까지 서비스를 계속 이용할 수 있으며, 환불 정책에 따라 부분 환불이 가능합니다.",
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
  {
    question: "LawScan의 변호사는 업계별로 특화되어 있나요?",
    answer: "네, 업계/계약 유형별로 특화된 변호사가 맞춤형 리스크 진단과 개선 의견을 제공합니다.",
    category: "지원"
  },
  {
    question: "분석 결과를 팀원들과 공유할 수 있나요?",
    answer: "네, 분석 결과는 PDF 형태로 다운로드하여 팀원들과 공유할 수 있습니다. 또한 대시보드에서 직접 링크를 통해 공유할 수도 있습니다.",
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
    console.log('Contact form submitted:', contactForm);
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
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="block">고객 지원 &</span>
              <span className="block text-indigo-200">자주 묻는 질문</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto">
              LawScan 서비스에 대한 궁금한 점들을<br/>
              <span className="font-semibold">한눈에 확인하고 전문가와 상담하세요</span>
            </p>
          </div>
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
                      <p className="text-sm text-gray-600">02-1234-5678</p>
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
                      <p className="text-sm text-gray-600">support@lawscan.kr</p>
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

              {/* Resources */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">추가 자료</h3>
                <div className="space-y-3">
                  <Link href="/services" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">서비스 프로세스</span>
                  </Link>
                  <Link href="/pricing" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-sm">요금제 안내</span>
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