import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    id: 'basic-generate',
    name: 'Basic',
    price: 300000,
    priceDisplay: '₩300,000',
    features: [
      '계약서 1건 생성',
      '24시간 이내 초안 제공',
      '기본 조항 포함',
      '이메일 상담 지원',
    ],
    highlight: false,
  },
  {
    id: 'professional-generate',
    name: 'Professional',
    price: 500000,
    priceDisplay: '₩500,000',
    features: [
      '계약서 1건 생성',
      '12시간 이내 초안 제공',
      '맞춤형 조항 추가',
      '전문가 상담 1회',
      '긴급 생성 가능',
    ],
    highlight: true,
  },
  {
    id: 'enterprise-generate',
    name: 'Enterprise',
    price: 1000000,
    priceDisplay: '₩1,000,000',
    features: [
      '계약서 1건 생성',
      '3시간 이내 초안 제공',
      '심층 맞춤 조항',
      '전문가 상담 3회',
      '긴급 생성 가능',
      '계약 협상 지원',
    ],
    highlight: false,
  },
];

interface ContractGenerationPreviewProps {
  contractData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientCompany: string;
    contractType: string;
    otherContractType: string;
    counterparty: string;
    counterpartyRole: string;
    startDate: string;
    endDate: string;
    amount: string;
    purpose: string;
    specialTerms: string;
    specialRequests: string;
  };
}

export default function ContractGenerationPreview({ contractData }: ContractGenerationPreviewProps) {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // Default to Professional
  const router = useRouter();

  const handlePlanSelection = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
    }
  };

  const handleProceedToPayment = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
    }
    router.push(`/payment?planId=${selectedPlan.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative pb-40">
      {/* Preview Header */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          전문 변호사 계약서 초안 완성
        </h2>
        <p className="text-lg text-gray-600">
          강남 최고 로펌 출신 변호사가 직접 작성한 맞춤형 계약서 초안입니다.<br />
          아래 요약을 확인하고, 결제 후 다운로드 및 추가 요청을 진행하세요.
        </p>
      </div>

      {/* Contract Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">계약서 요약</h3>
        <ul className="text-gray-800 text-base space-y-2">
          <li><b>계약 종류:</b> {contractData.contractType === '기타' ? contractData.otherContractType : contractData.contractType}</li>
          <li><b>계약 당사자:</b> {contractData.clientName} {contractData.clientCompany && `(${contractData.clientCompany})`} - {contractData.counterparty} ({contractData.counterpartyRole})</li>
          <li><b>계약 기간:</b> {contractData.startDate} ~ {contractData.endDate}</li>
          {contractData.amount && <li><b>금액:</b> {contractData.amount}</li>}
          <li><b>계약 목적/내용:</b> {contractData.purpose}</li>
          {contractData.specialTerms && <li><b>특약/주요 조건:</b> {contractData.specialTerms}</li>}
          {contractData.specialRequests && <li><b>추가 요청사항:</b> {contractData.specialRequests}</li>}
        </ul>
      </div>

      {/* 주요 조건 Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">주요 조건</h3>
        <ul className="list-disc pl-6 text-gray-800 space-y-1">
          <li>계약 종류: {contractData.contractType === '기타' ? contractData.otherContractType : contractData.contractType}</li>
          <li>계약 기간: {contractData.startDate} ~ {contractData.endDate}</li>
          <li>계약 당사자: {contractData.clientName} - {contractData.counterparty} ({contractData.counterpartyRole})</li>
          <li>계약 목적: {contractData.purpose}</li>
          {contractData.amount && <li>금액: {contractData.amount}</li>}
          {contractData.specialTerms && <li>특약: {contractData.specialTerms}</li>}
        </ul>
      </div>

      {/* Plan Selection */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border-2 p-6 flex flex-col items-center shadow-sm transition-all cursor-pointer relative ${selectedPlan.id === plan.id ? 'border-indigo-600 bg-indigo-50 scale-105 shadow-lg' : 'border-gray-200 bg-white hover:border-indigo-400'}`}
            onClick={() => handlePlanSelection(plan)}
          >
            {/* Urgency Badge */}
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  🔥 인기 요금제
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-gray-900">{plan.name}</span>
              {plan.highlight && <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-200 text-yellow-900 font-semibold">추천</span>}
            </div>
            <div className="text-2xl font-extrabold text-indigo-700 mb-2">{plan.priceDisplay}</div>
            {/* Limited Time Offer */}
            {plan.id === 'professional-generate' && (
              <div className="mb-3 p-2 bg-orange-100 rounded-lg text-center">
                <div className="text-xs text-orange-800 font-semibold">🎯 한정 특가</div>
                <div className="text-xs text-orange-700">오늘만 20% 할인</div>
              </div>
            )}
            <ul className="text-sm text-gray-700 mb-4 space-y-1">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-1"><CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" />{f}</li>
              ))}
            </ul>
            <button
              className={`mt-auto px-4 py-2 rounded-lg font-semibold w-full transition-colors ${selectedPlan.id === plan.id ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
              onClick={(e) => { e.stopPropagation(); handlePlanSelection(plan); }}
              type="button"
            >
              {selectedPlan.id === plan.id ? '선택됨' : '이 요금제 선택'}
            </button>
          </div>
        ))}
      </div>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg">⏰</span>
          <span className="font-bold">오늘 신청 시 특별 혜택</span>
        </div>
        <p className="text-sm opacity-90">
          오늘 신청하시면 추가 상담 1회 무료 + 계약서 템플릿 3종 제공
        </p>
      </div>

      {/* Value Props & Trust Stats */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-700 mb-2">5,000+</div>
          <div className="text-gray-700 font-semibold">누적 계약서 생성</div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-700 mb-2">98%</div>
          <div className="text-gray-700 font-semibold">고객 만족도</div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-indigo-700 mb-2">₩1.8B+</div>
          <div className="text-gray-700 font-semibold">누적 절감 비용</div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">고객 후기</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              "맞춤형 계약서로 분쟁을 미연에 방지할 수 있었습니다. 신속한 대응과 전문성에 만족합니다."
            </p>
            <div className="text-xs text-gray-500">- 이대표, 중소기업 CEO</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              "전문 변호사가 직접 작성해주니 안심이 됩니다. 빠른 피드백과 꼼꼼한 설명이 인상적이었어요."
            </p>
            <div className="text-xs text-gray-500">- 박팀장, IT 스타트업</div>
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="mt-6 bg-green-50 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🛡️</span>
          <span className="font-bold text-green-800">100% 만족 보장</span>
        </div>
        <p className="text-sm text-green-700">
          계약서에 만족하지 못하시면 7일 이내 전액 환불해드립니다.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">자주 묻는 질문</h4>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-900 mb-2">Q: 계약서 생성에 얼마나 시간이 걸리나요?</h5>
            <p className="text-sm text-gray-700">A: 선택하신 요금제에 따라 3-24시간 내에 완료됩니다. 긴급한 경우 3시간 내 완료 가능합니다.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-900 mb-2">Q: 어떤 형태의 결과를 받을 수 있나요?</h5>
            <p className="text-sm text-gray-700">A: 상세한 PDF 계약서와 함께 변호사 의견, 맞춤 조항, 협상 포인트를 제공합니다.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-900 mb-2">Q: 복잡한 계약서도 생성 가능한가요?</h5>
            <p className="text-sm text-gray-700">A: 네, 모든 종류의 계약서를 생성 가능합니다. 전문 변호사가 직접 작성하므로 복잡한 조항도 정확히 반영됩니다.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-900 mb-2">Q: 생성 후 추가 수정이 가능한가요?</h5>
            <p className="text-sm text-gray-700">A: Professional 이상 요금제에는 전문가 상담 및 1회 무료 수정이 포함되어 있습니다. 추가 수정도 별도로 제공 가능합니다.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-semibold text-gray-900 mb-2">Q: 어떤 변호사가 작성하나요?</h5>
            <p className="text-sm text-gray-700">A: 강남 최고 로펌 출신 변호사들이 직접 작성합니다. 계약서 분야 전문 변호사가 담당하여 정확하고 신뢰할 수 있는 계약서를 제공합니다.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        * 결제 후 즉시 계약서 초안 다운로드 및 추가 요청이 가능합니다. 모든 계약서는 변호사 검토를 거쳐 제공됩니다.
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white/95 border-t border-gray-200 shadow-lg py-3 px-6 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex flex-row items-center justify-between gap-4 whitespace-nowrap">
          <div className="flex flex-row items-center gap-3 whitespace-nowrap">
            <span className="text-lg font-semibold text-gray-900">{selectedPlan.name} 요금제</span>
            <span className="text-2xl font-extrabold text-indigo-700">{selectedPlan.priceDisplay}</span>
            <span className="text-sm text-gray-400 ml-2">(VAT 포함)</span>
            {selectedPlan.id === 'professional-generate' && (
              <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold ml-3">
                오늘만 20% 할인
              </span>
            )}
          </div>
          <button
            onClick={handleProceedToPayment}
            className="inline-flex items-center px-10 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all text-xl whitespace-nowrap"
          >
            지금 결제하고 계약서 받기 →
          </button>
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">
          ⚡ 12시간 내 완료 • 🛡️ 100% 만족 보장 • 📞 전문가 상담 포함
        </div>
      </div>
    </div>
  );
} 