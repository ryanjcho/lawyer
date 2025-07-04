'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: '',
    subCategory: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">상담 신청</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">법무법인 오킴스의 전문 변호사와 상담하세요.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">연락처 정보</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">주소</h3>
                    <p className="mt-1 text-gray-600">
                      서울특별시 서초구 서초대로78길 5, 3층<br />
                      (서초동, 대각빌딩)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">대표번호</h3>
                    <p className="mt-1 text-gray-600">
                      02-538-5886
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">이메일</h3>
                    <p className="mt-1 text-gray-600">
                      info@ohkimslaw.com<br />
                      counsel@ohkimslaw.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">상담 시간</h3>
                    <p className="mt-1 text-gray-600">
                      평일: 09:00 - 18:00<br />
                      토요일: 09:00 - 13:00<br />
                      일요일 및 공휴일: 휴무
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">사업자등록번호</h3>
                    <p className="mt-1 text-gray-600">
                      349-81-01238
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">개인정보관리 책임자</h3>
                    <p className="mt-1 text-gray-600">
                      오성헌, 김용범
                    </p>
                  </div>
                </div>
              </div>

              {/* Law Firm Introduction */}
              <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">법무법인 오킴스</h3>
                <p className="text-gray-700 mb-4">
                  법무법인 오킴스는 기업법무, M&A, 위기관리, 의료법 등 다양한 분야의 전문 변호사들이 근무하는 강남 최고급 로펌입니다.
                </p>
                <p className="text-gray-700">
                  20년 이상의 경력을 가진 파트너 변호사들이 직접 검토를 담당하여 엔터프라이즈급 품질의 법률 서비스를 제공합니다.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">상담 신청하기</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    상담 분야 선택 *
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                    required
                  >
                    <option value="">선택해주세요</option>
                    <option value="기업">기업</option>
                    <option value="의료">의료</option>
                    <option value="B2C">B2C(개인 자산가)</option>
                    <option value="개인소송">개인소송</option>
                  </select>
                </div>

                {formData.category === "기업" && (
                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                      기업 상담 분야
                    </label>
                    <select
                      name="subCategory"
                      id="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                    >
                      <option value="">선택해주세요</option>
                      <option value="조세">조세</option>
                      <option value="기업재무협상">기업재무협상</option>
                      <option value="기업형사">기업형사</option>
                      <option value="스타트업">스타트업/혁신형 기업</option>
                    </select>
                  </div>
                )}

                {formData.category === "의료" && (
                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                      의료 상담 분야
                    </label>
                    <select
                      name="subCategory"
                      id="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                    >
                      <option value="">선택해주세요</option>
                      <option value="병원자문">병원자문</option>
                      <option value="치과자문">치과자문</option>
                      <option value="의료소송">의료소송</option>
                    </select>
                  </div>
                )}

                {formData.category === "B2C" && (
                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                      개인 자산가 상담 분야
                    </label>
                    <select
                      name="subCategory"
                      id="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                    >
                      <option value="">선택해주세요</option>
                      <option value="상속">상속</option>
                      <option value="부동산">부동산</option>
                    </select>
                  </div>
                )}

                {formData.category === "개인소송" && (
                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                      개인소송 상담 분야
                    </label>
                    <select
                      name="subCategory"
                      id="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                    >
                      <option value="">선택해주세요</option>
                      <option value="민사">민사</option>
                      <option value="형사">형사</option>
                      <option value="인사">인사/노무</option>
                      <option value="상속">상속</option>
                      <option value="자산">자산</option>
                      <option value="부동산">부동산</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    문의 내용 *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    placeholder="상담하고 싶은 내용을 자세히 적어주세요."
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    상담 신청하기
                  </button>
                </div>
              </form>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>안내:</strong> 상담 신청 후 24시간 이내에 담당 변호사가 연락드립니다. 
                  긴급한 경우 대표번호(02-538-5886)로 직접 연락주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 