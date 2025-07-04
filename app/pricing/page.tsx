'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ArrowRightIcon, DocumentTextIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon, ClockIcon, StarIcon, CalculatorIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Pricing() {
  const quoteSteps = [
    {
      step: 1,
      title: '견적/의뢰 요청',
      description: '간단한 정보 입력만으로 계약서 작성 또는 검토 의뢰를 시작합니다.'
    },
    {
      step: 2,
      title: '상세 정보 확인 및 상담',
      description: '담당 매니저가 입력하신 정보를 확인하고, 필요한 경우 추가 상담을 통해 요구사항을 파악합니다.'
    },
    {
      step: 3,
      title: '맞춤 견적 산출',
      description: '계약서의 복잡도, 업종, 서비스 유형(작성/검토), 요구사항을 반영하여 투명하고 합리적인 맞춤 견적을 안내해 드립니다.'
    },
    {
      step: 4,
      title: '견적서 전달 및 확정',
      description: '견적은 이메일 또는 문자로 신속하게 전달되며, 고객님의 확인 후 서비스가 시작됩니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 text-white overflow-hidden flex items-center justify-center min-h-[320px]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">견적 및 예상 비용 안내</h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-6">
              계약서의 복잡도와 요구사항에 따라 맞춤 견적을 신속하게 안내해 드립니다.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Stat Cards Section */}
      <section className="pt-12 pb-4">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header emphasizing transparency */}
          <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-5 text-indigo-900 leading-tight">
            오킴스 법무법인은 귀하에게 최대한 <span className="text-indigo-600 font-extrabold">투명한</span> 견적을 산출합니다
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 평균 견적 */}
            <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-3 px-2 border border-indigo-100">
              <CalculatorIcon className="w-6 h-6 text-indigo-600 mb-1" />
              <div className="text-lg font-bold text-indigo-800">₩450,000</div>
              <div className="text-xs text-gray-500 mt-0.5">평균 견적</div>
            </div>
            {/* 누적 분석횟수 */}
            <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-3 px-2 border border-indigo-100">
              <ChartBarIcon className="w-6 h-6 text-indigo-600 mb-1" />
              <div className="text-lg font-bold text-indigo-800">12,000+</div>
              <div className="text-xs text-gray-500 mt-0.5">누적 분석횟수</div>
            </div>
            {/* 재구매율 */}
            <div className="bg-white rounded-xl shadow flex flex-col items-center justify-center py-3 px-2 border border-indigo-100">
              <ArrowPathIcon className="w-6 h-6 text-indigo-600 mb-1" />
              <div className="text-lg font-bold text-indigo-800">80%</div>
              <div className="text-xs text-gray-500 mt-0.5">재구매율</div>
            </div>
          </div>
        </div>
      </section>
      {/* Combined Premium Card Section */}
      <section className="py-12 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 border border-indigo-100 flex flex-col gap-8 md:gap-12">
            {/* Headers Row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-0 mb-2">
              <h3 className="flex-1 text-2xl md:text-3xl font-extrabold text-indigo-800 text-left md:pr-12">
                견적 산출 주요 요소 <span className='text-indigo-400'>(상세 설명)</span>
              </h3>
              <h3 className="flex-1 text-2xl md:text-3xl font-extrabold text-indigo-800 text-left md:pl-12">
                견적 산출 정보 입력 <span className='text-indigo-400'>(예시)</span>
              </h3>
            </div>
            {/* Content Row */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-stretch">
              {/* Left: Detailed Estimate Factors */}
              <div className="flex-1 flex flex-col justify-center items-center md:pr-12 border-b md:border-b-0 md:border-r border-indigo-100 mb-10 md:mb-0">
                <ul className="space-y-8 w-full">
                  <li>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        <CalculatorIcon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-800">서비스 유형 (작성/검토)</div>
                      <div className="text-gray-700 text-base mt-1">작성(신규 계약서 초안) 또는 검토(기존 계약서 분석)에 따라 견적이 달라집니다. <br/>작성은 보통 검토보다 20~40% 높은 비용이 산정됩니다.</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        <ChartBarIcon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-800">계약서의 복잡도 및 분량</div>
                      <div className="text-gray-700 text-base mt-1">페이지 수(5~50p), 조항 수, 특수 조항(예: 옵션, 부속합의 등) 유무에 따라 비용이 달라집니다. <br/>예: 10p 미만 단순 계약서 → 30~40만원, 30p 이상 복잡 계약서 → 70만원 이상</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        <ShieldCheckIcon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-800">업종별 특수성 및 규제 요건</div>
                      <div className="text-gray-700 text-base mt-1">금융, 의료, IT, 제조 등 업종별 특수 규제나 산업별 리스크가 반영됩니다. <br/>예: 단순 용역계약(일반) vs. 의료기기/금융상품 계약(고난도)</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        <ClockIcon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-800">긴급성 및 납기 요구사항</div>
                      <div className="text-gray-700 text-base mt-1">일반(2~3일), 익일(익일/당일), 주말/야간 등 요청 시 추가 비용이 발생할 수 있습니다. <br/>예: 당일/익일 납기 +20~30% 가산</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        <ArrowPathIcon className="w-7 h-7 text-indigo-600" />
                      </div>
                      <div className="text-lg font-semibold text-gray-800">추가 상담 및 협상 지원</div>
                      <div className="text-gray-700 text-base mt-1">계약서 협상, 추가 자문, 2회 이상 피드백 등 부가 서비스 요청 시 별도 견적이 산정됩니다. <br/>예: 1회 추가 협상 지원 +10만원</div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Right: Stepper for Quote Details */}
              <div className="flex-1 flex flex-col justify-center items-center md:pl-12">
                <ol className="space-y-8 w-full">
                  {quoteSteps.map((step, idx) => (
                    <li key={step.step} className="flex flex-col items-center text-center">
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-4 border-white">{step.step}</span>
                      </div>
                      <div className="text-lg font-semibold text-indigo-800">{step.title}</div>
                      <div className="text-gray-700 text-base mt-1">{step.description}</div>
                      {/* Example details for each step */}
                      {step.step === 1 && (
                        <div className="text-sm text-gray-500 mt-1">예: 계약서 검토 요청, 신규 작성 요청 등</div>
                      )}
                      {step.step === 2 && (
                        <div className="text-sm text-gray-500 mt-1">예: 전화/이메일/메신저 상담, 추가 자료 요청 등</div>
                      )}
                      {step.step === 3 && (
                        <div className="text-sm text-gray-500 mt-1">예: 15p, IT 업종, 당일 납기, 추가 협상 지원 등 입력 정보 기반 산출</div>
                      )}
                      {step.step === 4 && (
                        <div className="text-sm text-gray-500 mt-1">예: 이메일/문자 견적서 발송, 확정 후 결제 진행</div>
                      )}
                    </li>
                  ))}
                </ol>
                <div className="mt-10 p-5 bg-yellow-50 rounded-lg text-center">
                  <p className="text-base text-yellow-800">
                    <strong>참고:</strong> 실제 견적은 입력하신 정보와 상담 결과에 따라 달라질 수 있습니다. 결제는 견적 확인 후 진행됩니다.
                  </p>
                </div>
                <div className="mt-10 flex justify-center">
                  <a href="/contract" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg text-lg">
                    지금 견적 받기
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 