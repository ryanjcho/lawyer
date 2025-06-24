'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, DocumentTextIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Pricing() {
  const testimonials = [
    {
      name: '김민수',
      title: '법무팀장',
      company: '삼성전자',
      content: 'LegalCare의 계약서 분석 서비스로 계약 검토 시간을 70% 단축했습니다. 특히 글로벌 계약서에서 놓치기 쉬운 조항들을 정확히 포착해주어 큰 도움이 되었습니다.',
      rating: 5,
      savings: '연간 2억원 절약'
    },
    {
      name: '박지영',
      title: '법무이사',
      company: 'SK하이닉스',
      content: '반도체 업계의 복잡한 기술 라이선스 계약을 검토할 때 LegalCare의 전문성이 빛났습니다. 리스크 분석이 매우 정확하고 실용적인 개선안을 제시해주었습니다.',
      rating: 5,
      savings: '계약 리스크 80% 감소'
    },
    {
      name: '이준호',
      title: 'CEO',
      company: '네이버',
      content: '스타트업에서 대기업으로 성장하면서 계약 관리가 복잡해졌는데, LegalCare의 맞춤형 분석 서비스로 체계적인 계약 관리가 가능해졌습니다. 투자 대비 효과가 매우 뛰어납니다.',
      rating: 5,
      savings: '법무 비용 60% 절약'
    },
    {
      name: '최수진',
      title: '법무총괄',
      company: '현대자동차',
      content: '글로벌 공급망 계약의 복잡성을 고려할 때 LegalCare의 다국어 지원과 국제법 준수 검토 기능이 매우 유용했습니다. 특히 긴급 검토 서비스가 비즈니스 진행에 큰 도움이 되었습니다.',
      rating: 5,
      savings: '계약 체결 시간 50% 단축'
    },
    {
      name: '정현우',
      title: '법무팀장',
      company: 'LG화학',
      content: '화학 업계의 특수한 규제 요건을 반영한 계약 검토가 필요한데, LegalCare가 업계별 맞춤 검토를 제공해주어 매우 만족스럽습니다. 특히 환경 규제 관련 조항 검토가 정확합니다.',
      rating: 5,
      savings: '규제 위반 리스크 90% 감소'
    },
    {
      name: '한소영',
      title: '법무팀장',
      company: '포스코',
      content: '철강 업계의 장기 계약과 복잡한 조건들을 검토할 때 LegalCare의 전문성이 돋보였습니다. 특히 가격 조정 조항과 포스코 마켓 조항 검토가 정확했습니다.',
      rating: 5,
      savings: '계약 분쟁 75% 감소'
    }
  ]

  const features = [
    {
      icon: DocumentTextIcon,
      title: '전문 변호사 검토',
      description: '강남 최고 로펌 출신 변호사들이 직접 검토하여 정확하고 신뢰할 수 있는 분석을 제공합니다.'
    },
    {
      icon: ChartBarIcon,
      title: '리스크 진단',
      description: '수천 건의 계약서 데이터베이스를 기반으로 한 정확한 리스크 분석과 점수화를 제공합니다.'
    },
    {
      icon: ShieldCheckIcon,
      title: '개선 제안',
      description: '계약서의 문제점을 파악하고 구체적인 개선 방안과 대안 조항을 제시합니다.'
    },
    {
      icon: UserGroupIcon,
      title: '1:1 상담',
      description: '분석 결과에 대한 전문가 상담을 통해 궁금한 점을 해결하고 협상 전략을 수립합니다.'
    },
    {
      icon: ClockIcon,
      title: '빠른 분석',
      description: 'AI 기반 빠른 분석 후 전문 변호사 검토를 통해 신속하고 정확한 결과를 제공합니다.'
    },
    {
      icon: StarIcon,
      title: '맞춤형 서비스',
      description: '계약서의 복잡도와 업종에 따라 맞춤형 분석과 견적을 제공합니다.'
    }
  ]

  const serviceProcess = [
    {
      step: 1,
      title: '계약서 업로드',
      description: '분석할 계약서를 업로드하면 AI가 자동으로 계약서 유형과 복잡도를 분석합니다.'
    },
    {
      step: 2,
      title: '견적 산출',
      description: '계약서의 복잡도, 페이지 수, 업종 등을 종합하여 정확한 견적을 제공합니다.'
    },
    {
      step: 3,
      title: '전문가 분석',
      description: '전문 변호사가 직접 검토하여 리스크 진단, 개선안, 협상 포인트를 제시합니다.'
    },
    {
      step: 4,
      title: '상세 리포트',
      description: '분석 결과를 상세한 PDF 리포트로 제공하며, 필요시 추가 상담도 가능합니다.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            맞춤형 계약서 분석 서비스
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8">
            계약서의 복잡도에 따라 <span className="font-bold text-yellow-300">정확한 견적</span>을 제공하는<br/>
            전문 변호사 맞춤 분석 서비스
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
            <div className="bg-white/10 rounded-lg px-6 py-4 flex flex-col md:flex-row items-center gap-3">
              <span className="font-semibold text-yellow-200">평균 견적</span>
              <span className="font-bold text-white text-xl">₩300,000 ~ ₩1,000,000</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-4 flex flex-col md:flex-row items-center gap-3">
              <span className="font-semibold text-yellow-200">고객 만족도</span>
              <span className="font-bold text-white text-xl">97%</span>
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-4 flex flex-col md:flex-row items-center gap-3">
              <span className="font-semibold text-yellow-200">누적 분석</span>
              <span className="font-bold text-white text-xl">10,000+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 LegalCare를 선택해야 할까요?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              강남 최고 로펌 출신 변호사들이 제공하는 전문적이고 정확한 계약서 분석 서비스
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              서비스 이용 과정
            </h2>
            <p className="text-lg text-gray-600">
              간단한 4단계로 전문적인 계약서 분석을 받아보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{process.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              투명한 견적 시스템
            </h2>
            <p className="text-lg text-gray-600">
              계약서의 복잡도에 따라 정확하고 공정한 견적을 제공합니다
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">견적 산출 기준</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">계약서 페이지 수 (5-50페이지)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">계약서 복잡도 및 조항 수</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">업종별 특수성 및 규제 요건</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">긴급성 및 납기 요구사항</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">추가 상담 및 협상 지원 필요성</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">견적 범위</h3>
                <div className="space-y-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">기본 분석</span>
                      <span className="text-indigo-700 font-bold">₩300,000 ~ ₩500,000</span>
                    </div>
                    <p className="text-sm text-gray-600">단순한 계약서, 기본 리스크 분석</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">표준 분석</span>
                      <span className="text-green-700 font-bold">₩500,000 ~ ₩800,000</span>
                    </div>
                    <p className="text-sm text-gray-600">일반적인 복잡도의 계약서, 상세 분석</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">고급 분석</span>
                      <span className="text-purple-700 font-bold">₩800,000 ~ ₩1,500,000</span>
                    </div>
                    <p className="text-sm text-gray-600">복잡한 계약서, 심층 분석 및 협상 지원</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>참고:</strong> 정확한 견적은 계약서 업로드 후 AI 분석을 통해 제공됩니다.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                href="/upload"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                지금 견적 받기 <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              고객 후기
            </h2>
            <p className="text-lg text-gray-600">
              실제 고객들이 경험한 LegalCare의 서비스
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</div>
                  <div className="text-sm text-indigo-600 font-semibold mt-1">{testimonial.savings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            계약서를 업로드하고 정확한 견적을 받아보세요
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            무료 견적 받기 <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
          <p className="text-sm text-indigo-200 mt-4">
            * 견적은 무료이며, 결제는 견적 확인 후 진행됩니다
          </p>
        </div>
      </section>
    </div>
  )
} 