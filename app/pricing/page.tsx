'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '../components/Navbar'

export default function Pricing() {
  const [selectedTab, setSelectedTab] = useState<'one-time' | 'subscription'>('one-time')

  const plans = {
    'one-time': [
      {
        id: 'basic-onetime',
        name: 'Basic',
        price: '300,000',
        type: 'one-time',
        features: [
          '계약서 1건 검토',
          '24시간 이내 검토 완료',
          '기본 리스크 분석',
          '개선 제안서 제공',
          '이메일 상담 지원'
        ]
      },
      {
        id: 'professional-onetime',
        name: 'Professional',
        price: '500,000',
        type: 'one-time',
        features: [
          '계약서 1건 검토',
          '12시간 이내 검토 완료',
          '상세 리스크 분석',
          '개선 제안서 제공',
          '전문가 상담 1회',
          '긴급 검토 가능'
        ]
      },
      {
        id: 'enterprise-onetime',
        name: 'Enterprise',
        price: '1,000,000',
        type: 'one-time',
        features: [
          '계약서 1건 검토',
          '3시간 이내 검토 완료',
          '심층 리스크 분석',
          '개선 제안서 제공',
          '전문가 상담 3회',
          '긴급 검토 가능',
          '계약 협상 지원'
        ]
      }
    ],
    'subscription': [
      {
        id: 'basic-subscription',
        name: 'Basic',
        price: '200,000',
        type: 'subscription',
        features: [
          '월 3건 계약서 검토',
          '24시간 이내 검토 완료',
          '기본 리스크 분석',
          '개선 제안서 제공',
          '이메일 상담 지원'
        ]
      },
      {
        id: 'professional-subscription',
        name: 'Professional',
        price: '400,000',
        type: 'subscription',
        features: [
          '월 5건 계약서 검토',
          '12시간 이내 검토 완료',
          '상세 리스크 분석',
          '개선 제안서 제공',
          '전문가 상담 2회',
          '긴급 검토 가능'
        ]
      },
      {
        id: 'enterprise-subscription',
        name: 'Enterprise',
        price: '800,000',
        type: 'subscription',
        features: [
          '월 10건 계약서 검토',
          '3시간 이내 검토 완료',
          '심층 리스크 분석',
          '개선 제안서 제공',
          '전문가 상담 5회',
          '긴급 검토 가능',
          '계약 협상 지원'
        ]
      }
    ]
  }

  const handlePlanSelect = (planId: string) => {
    // Store the selected plan in localStorage
    localStorage.setItem('selectedPlan', planId)
    // Navigate to the payment page
    window.location.href = '/payment'
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-blue-800 text-white pt-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              요금제
            </h1>
            <p className="mt-6 text-xl text-blue-100">
              기업 규모와 필요에 맞는 최적의 요금제를 선택하세요
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedTab('one-time')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedTab === 'one-time'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              일회성 검토
            </button>
            <button
              onClick={() => setSelectedTab('subscription')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedTab === 'subscription'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              구독형 검토
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans[selectedTab].map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}원
                    </span>
                    {plan.type === 'subscription' && (
                      <span className="text-gray-600">/월</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    선택하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              추가 안내사항
            </h2>
            <p className="text-xl text-gray-600">
              서비스 이용에 대한 상세 안내
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">서비스 이용 안내</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">기본 검토: 24시간 이내 완료</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">긴급 검토: 3시간 이내 완료</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">문서 형식: PDF, Word, 한글 (최대 10MB)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">결제 및 환불 정책</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">결제 방법: 신용카드, 계좌이체</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">환불: 검토 시작 전 100%, 시작 후 50%</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">세금계산서: 결제 완료 후 3일 이내 발행</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 