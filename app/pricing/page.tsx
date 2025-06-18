'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const [selectedTab, setSelectedTab] = useState<'one-time' | 'subscription'>('one-time')
  const [monthlyContracts, setMonthlyContracts] = useState(5)
  const [contractValue, setContractValue] = useState(100000000)

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
          '이메일 상담 지원',
          '표준 계약서 템플릿 제공',
          '기본 법적 검토 보고서'
        ],
        limitations: [
          '복잡한 계약서는 추가 비용',
          '긴급 검토 불가',
          '전문가 상담 미포함'
        ]
      },
      {
        id: 'professional-onetime',
        name: 'Professional',
        price: '500,000',
        type: 'one-time',
        popular: true,
        features: [
          '계약서 1건 검토',
          '12시간 이내 검토 완료',
          '상세 리스크 분석',
          '개선 제안서 제공',
          '전문가 상담 1회',
          '긴급 검토 가능',
          '계약 협상 지원',
          '상세 법적 검토 보고서',
          '리스크 점수 제공',
          '대안 조항 제시'
        ],
        limitations: [
          '복잡한 계약서는 추가 비용',
          '추가 상담은 별도 요금'
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
          '계약 협상 지원',
          '종합 법적 검토 보고서',
          '리스크 점수 및 등급',
          '대안 조항 및 협상 전략',
          '계약서 템플릿 라이브러리',
          '우선 지원'
        ],
        limitations: [
          '모든 계약서 유형 지원',
          '무제한 상담 (3회 이후)'
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
          '이메일 상담 지원',
          '표준 계약서 템플릿',
          '기본 법적 검토 보고서',
          '월간 사용 현황 리포트'
        ],
        limitations: [
          '월 할당량 초과 시 추가 비용',
          '긴급 검토 불가',
          '전문가 상담 미포함'
        ]
      },
      {
        id: 'professional-subscription',
        name: 'Professional',
        price: '400,000',
        type: 'subscription',
        popular: true,
        features: [
          '월 5건 계약서 검토',
          '12시간 이내 검토 완료',
          '상세 리스크 분석',
          '개선 제안서 제공',
          '전문가 상담 2회',
          '긴급 검토 가능',
          '계약 협상 지원',
          '상세 법적 검토 보고서',
          '리스크 점수 제공',
          '대안 조항 제시',
          '월간 사용 현황 리포트',
          '계약서 템플릿 라이브러리'
        ],
        limitations: [
          '월 할당량 초과 시 추가 비용',
          '추가 상담은 별도 요금'
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
          '계약 협상 지원',
          '종합 법적 검토 보고서',
          '리스크 점수 및 등급',
          '대안 조항 및 협상 전략',
          '계약서 템플릿 라이브러리',
          '우선 지원',
          '월간 사용 현황 리포트',
          '전담 계정 매니저',
          '맞춤형 워크플로우 설정'
        ],
        limitations: [
          '월 할당량 초과 시 추가 비용',
          '무제한 상담 (5회 이후)'
        ]
      }
    ]
  }

  const testimonials = [
    {
      name: '김민수',
      title: '법무팀장',
      company: '삼성전자',
      content: 'LawScan의 AI 검토 시스템으로 계약 검토 시간을 70% 단축했습니다. 특히 글로벌 계약서에서 놓치기 쉬운 조항들을 정확히 포착해주어 큰 도움이 되었습니다.',
      rating: 5,
      savings: '연간 2억원 절약'
    },
    {
      name: '박지영',
      title: '법무이사',
      company: 'SK하이닉스',
      content: '반도체 업계의 복잡한 기술 라이선스 계약을 검토할 때 LawScan의 전문성이 빛났습니다. 리스크 분석이 매우 정확하고 실용적인 개선안을 제시해주었습니다.',
      rating: 5,
      savings: '계약 리스크 80% 감소'
    },
    {
      name: '이준호',
      title: 'CEO',
      company: '네이버',
      content: '스타트업에서 대기업으로 성장하면서 계약 관리가 복잡해졌는데, LawScan의 구독 서비스로 체계적인 계약 관리가 가능해졌습니다. 투자 대비 효과가 매우 뛰어납니다.',
      rating: 5,
      savings: '법무 비용 60% 절약'
    },
    {
      name: '최수진',
      title: '법무총괄',
      company: '현대자동차',
      content: '글로벌 공급망 계약의 복잡성을 고려할 때 LawScan의 다국어 지원과 국제법 준수 검토 기능이 매우 유용했습니다. 특히 긴급 검토 서비스가 비즈니스 진행에 큰 도움이 되었습니다.',
      rating: 5,
      savings: '계약 체결 시간 50% 단축'
    },
    {
      name: '정현우',
      title: '법무팀장',
      company: 'LG화학',
      content: '화학 업계의 특수한 규제 요건을 반영한 계약 검토가 필요한데, LawScan이 업계별 맞춤 검토를 제공해주어 매우 만족스럽습니다. 특히 환경 규제 관련 조항 검토가 정확합니다.',
      rating: 5,
      savings: '규제 위반 리스크 90% 감소'
    },
    {
      name: '한소영',
      title: '법무이사',
      company: '카카오',
      content: 'IT 업계의 빠른 변화에 맞춰 계약 조건을 검토해야 하는데, LawScan의 실시간 업데이트와 최신 법령 반영이 인상적입니다. 특히 데이터 보호 관련 조항 검토가 탁월합니다.',
      rating: 5,
      savings: '법적 분쟁 75% 감소'
    }
  ]

  const calculateROI = () => {
    const monthlyCost = selectedTab === 'subscription' ? 400000 : 500000
    const contractsPerMonth = selectedTab === 'subscription' ? 5 : 1
    const avgContractValue = contractValue
    const riskReduction = 0.8 // 80% 리스크 감소
    const timeSavings = 0.7 // 70% 시간 절약
    
    const annualSavings = (avgContractValue * contractsPerMonth * 12 * riskReduction * 0.1) + 
                         (monthlyCost * 12 * timeSavings)
    const annualCost = monthlyCost * 12
    const roi = ((annualSavings - annualCost) / annualCost) * 100
    
    return {
      annualSavings: Math.round(annualSavings),
      annualCost: annualCost,
      roi: Math.round(roi)
    }
  }

  const roi = calculateROI()

  const handlePlanSelect = (planId: string) => {
    localStorage.setItem('selectedPlan', planId)
    window.location.href = '/payment'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl text-white">
              투명하고 합리적인 요금제
            </h1>
            <p className="mt-6 text-xl text-indigo-100">
              기업 규모와 필요에 맞는 최적의 요금제를 선택하세요
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <p className="text-white font-semibold">평균 ROI</p>
                <p className="text-2xl font-bold text-white">320%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <p className="text-white font-semibold">검토 시간 단축</p>
                <p className="text-2xl font-bold text-white">70%</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <p className="text-white font-semibold">고객 만족도</p>
                <p className="text-2xl font-bold text-white">98%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ROI 계산기
            </h2>
            <p className="text-xl text-gray-600">
              LawScan 도입으로 얻을 수 있는 비용 절약 효과를 계산해보세요
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  월 계약서 수량
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={monthlyContracts}
                  onChange={(e) => setMonthlyContracts(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>1건</span>
                  <span className="font-semibold">{monthlyContracts}건</span>
                  <span>20건</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평균 계약 금액
                </label>
                <input
                  type="range"
                  min="10000000"
                  max="1000000000"
                  step="10000000"
                  value={contractValue}
                  onChange={(e) => setContractValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>1천만원</span>
                  <span className="font-semibold">{(contractValue / 100000000).toFixed(1)}억원</span>
                  <span>10억원</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600">연간 비용 절약</p>
                  <p className="text-2xl font-bold text-green-600">
                    {roi.annualSavings.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">연간 서비스 비용</p>
                  <p className="text-2xl font-bold text-red-600">
                    {roi.annualCost.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">투자 수익률</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {roi.roi}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="py-12 bg-gray-50">
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
              <div key={plan.id} className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${plan.popular ? 'ring-2 ring-indigo-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}
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
                    {plan.type === 'subscription' && (
                      <p className="text-sm text-gray-500 mt-1">연간 결제 시 20% 할인</p>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">포함 기능</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-3">제한사항</h4>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.popular ? '추천 선택' : '선택하기'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              고객 후기
            </h2>
            <p className="text-xl text-gray-600">
              LawScan을 선택한 기업들의 생생한 후기를 확인하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">{testimonial.savings}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Pricing Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              상세 요금 안내
            </h2>
            <p className="text-xl text-gray-600">
              추가 서비스 및 요금에 대한 상세 안내
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">추가 서비스 요금</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">긴급 검토 (3시간 이내)</span>
                  <span className="font-semibold">+50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">복잡한 계약서 (50페이지 이상)</span>
                  <span className="font-semibold">+30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">다국어 계약서</span>
                  <span className="font-semibold">+40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">전문가 상담 (추가)</span>
                  <span className="font-semibold">10만원/시간</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">계약 협상 지원</span>
                  <span className="font-semibold">20만원/건</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">결제 및 환불 정책</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">결제 방법: 신용카드, 계좌이체, 간편결제</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">환불: 검토 시작 전 100%, 시작 후 50%</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">세금계산서: 결제 완료 후 3일 이내 발행</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">연간 결제 시 20% 할인</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">기업 고객 전용 할인 혜택</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">서비스 이용 안내</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">기본 검토: 24시간 이내 완료</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">긴급 검토: 3시간 이내 완료</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">문서 형식: PDF, Word, 한글 (최대 50MB)</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">지원 언어: 한국어, 영어, 중국어, 일본어</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">24/7 고객 지원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            무료 체험으로 LawScan의 강력한 AI 계약 검토 기능을 경험해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              무료 체험 시작하기
            </Link>
            <Link
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              상담 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 