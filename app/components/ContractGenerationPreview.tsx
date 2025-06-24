import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

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
  quote: number;
  onProceedToPayment: () => void;
}

export default function ContractGenerationPreview({ contractData, quote, onProceedToPayment }: ContractGenerationPreviewProps) {
  const router = useRouter();

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

      {/* Quoted Amount and CTA */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">견적 금액</h3>
        <div className="text-4xl font-bold text-indigo-700 mb-2">₩{quote.toLocaleString()}</div>
        <p className="text-gray-600 mb-4">VAT 포함, 1회 결제로 모든 서비스 제공</p>
        <button
          onClick={onProceedToPayment}
          className="inline-flex items-center px-10 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all text-xl whitespace-nowrap"
        >
          결제하고 계약서 받기 →
        </button>
      </div>
    </div>
  );
} 