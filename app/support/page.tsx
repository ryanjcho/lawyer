'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'technical' | 'billing' | 'legal' | 'security'
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'LawScan은 어떤 종류의 계약서를 분석할 수 있나요?',
    answer: 'LawScan은 PDF, DOCX, DOC 형식의 모든 종류의 계약서를 분석할 수 있습니다. 서비스 제공 계약서, 기술 라이선스 계약, NDA, 고용 계약서, 임대 계약서 등 다양한 계약서를 지원합니다.',
    category: 'general'
  },
  {
    id: '2',
    question: '분석 결과는 얼마나 정확한가요?',
    answer: 'LawScan은 한국 최고의 법무법인들과 협력하여 개발된 AI 시스템으로, 95% 이상의 정확도를 보장합니다. 모든 분석 결과는 전문 변호사가 최종 검토하여 신뢰성을 확보합니다.',
    category: 'general'
  },
  {
    id: '3',
    question: '파일 업로드 시 보안은 어떻게 보장되나요?',
    answer: '모든 파일은 SSL/TLS 암호화를 통해 안전하게 전송되며, 업로드된 파일은 임시 저장 후 분석 완료 시 자동으로 삭제됩니다. 또한 모든 데이터는 한국 내 서버에서만 처리되어 데이터 주권을 보장합니다.',
    category: 'security'
  },
  {
    id: '4',
    question: '분석에 소요되는 시간은 얼마나 되나요?',
    answer: '일반적으로 10-30페이지 분량의 계약서는 2-5분 내에 분석이 완료됩니다. 복잡한 계약서의 경우 최대 10분까지 소요될 수 있으며, 실시간으로 진행 상황을 확인할 수 있습니다.',
    category: 'technical'
  },
  {
    id: '5',
    question: '구독을 취소하려면 어떻게 해야 하나요?',
    answer: '대시보드의 설정 탭에서 언제든지 구독을 취소할 수 있습니다. 취소 시 현재 결제 기간이 끝날 때까지 서비스를 계속 이용할 수 있으며, 환불 정책에 따라 부분 환불이 가능합니다.',
    category: 'billing'
  },
  {
    id: '6',
    question: '분석 결과에 대한 법적 책임은 어떻게 되나요?',
    answer: 'LawScan은 분석 결과를 제공하지만, 최종 법적 판단은 고객의 책임입니다. 다만, 우리의 분석은 전문 변호사가 검토한 것이므로 법적 분쟁 시 참고 자료로 활용할 수 있습니다.',
    category: 'legal'
  },
  {
    id: '7',
    question: '대용량 파일도 업로드할 수 있나요?',
    answer: '현재 최대 50MB까지 업로드 가능하며, 100페이지까지 분석할 수 있습니다. 더 큰 파일이 필요한 경우 고객 지원팀에 문의해 주세요.',
    category: 'technical'
  },
  {
    id: '8',
    question: '분석 결과를 팀원들과 공유할 수 있나요?',
    answer: '네, 분석 결과는 PDF 형태로 다운로드하여 팀원들과 공유할 수 있습니다. 또한 대시보드에서 직접 링크를 통해 공유할 수도 있습니다.',
    category: 'general'
  }
]

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  })

  const categories = [
    { id: 'all', label: '전체', count: faqData.length },
    { id: 'general', label: '일반', count: faqData.filter(faq => faq.category === 'general').length },
    { id: 'technical', label: '기술', count: faqData.filter(faq => faq.category === 'technical').length },
    { id: 'billing', label: '결제', count: faqData.filter(faq => faq.category === 'billing').length },
    { id: 'legal', label: '법적', count: faqData.filter(faq => faq.category === 'legal').length },
    { id: 'security', label: '보안', count: faqData.filter(faq => faq.category === 'security').length }
  ]

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm)
    alert('문의가 성공적으로 전송되었습니다. 24시간 내에 답변드리겠습니다.')
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">고객 지원</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              LawScan을 더 잘 활용할 수 있도록 도와드리겠습니다. 
              FAQ를 확인하거나 직접 문의해 주세요.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">자주 묻는 질문</h2>
              </div>
              <div className="p-6">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <details className="group">
                        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                          <h3 className="font-medium text-gray-900">{faq.question}</h3>
                          <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      </details>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                <Link href="/demo" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">제품 데모</span>
                </Link>
                <Link href="/how-it-works" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">사용 가이드</span>
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
    </div>
  )
} 