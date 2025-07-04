"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'saving'>('pending');
  const [caseNumber, setCaseNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract all required params
  const contractTypeChoice = searchParams?.get('contractTypeChoice');
  const contractType = searchParams?.get('contractType');
  const pageCount = searchParams?.get('pageCount');
  const revisionCount = searchParams?.get('revisionCount');
  const cleaning = searchParams?.get('cleaning') === 'true';
  const missingClauses = searchParams?.get('missingClauses') === 'true';
  const recommendedClauses = searchParams?.get('recommendedClauses') === 'true';
  const urgency = searchParams?.get('urgency');
  const email = searchParams?.get('email');
  const total = searchParams?.get('total');

  // If any required param is missing, show error
  if (!contractTypeChoice || !contractType || !pageCount || !revisionCount || !urgency || !email || !total) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">잘못된 접근입니다</h2>
          <p className="text-gray-700 mb-2">필수 정보가 누락되었습니다. 다시 견적을 진행해 주세요.</p>
        </div>
      </div>
    );
  }

  const isDisabled =
    !email ||
    !contractTypeChoice ||
    !contractType ||
    !pageCount ||
    !revisionCount ||
    !urgency ||
    paymentStatus === 'saving';

  async function handlePayment() {
    setPaymentStatus('saving');
    setError(null);
    try {
      // Prepare contract data
      const contractData = {
        amount: Number(total),
        files: [], // You can add file info if available
        analysis: {
          contractTypeChoice,
          contractType,
          pageCount: Number(pageCount),
          revisionCount: Number(revisionCount),
          cleaning,
          missingClauses,
          recommendedClauses,
          urgency,
          email,
        },
      };
      const res = await fetch('/api/contracts/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractData),
      });
      if (res.ok) {
        setPaymentStatus('completed');
        setCaseNumber('OKL-' + Date.now().toString().slice(-6));
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        const data = await res.json();
        setError(data.error || '서버 오류가 발생했습니다.');
        setPaymentStatus('pending');
      }
    } catch (e) {
      setError('서버 오류가 발생했습니다.');
      setPaymentStatus('pending');
    }
  }

  if (paymentStatus === 'saving') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="text-indigo-600 mb-4 animate-spin">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">결제 완료, 케이스 생성 중...</h2>
          <p className="text-gray-700 mb-4">잠시만 기다려 주세요.</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'completed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="text-green-600 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">결제 완료</h2>
          <p className="text-gray-700 mb-4">귀하의 사건번호:</p>
          <p className="text-2xl font-mono font-bold text-indigo-600 mb-6">{caseNumber}</p>
          <p className="text-gray-600">전문 변호사가 곧 연락드릴 예정입니다.<br/>문의: 02-1234-5678 | contact@ohkcontract.com</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">견적 및 결제</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">견적 요약</h2>
          <ul className="text-gray-900 text-base space-y-1 mb-4">
            <li>서비스 유형: {contractTypeChoice === 'draft' ? '계약서 작성' : '계약서 검토'}</li>
            <li>계약서 종류: {contractType}</li>
            <li>페이지 수: {pageCount}</li>
            <li>수정 횟수: {revisionCount}</li>
            <li>서식 클리닝: {cleaning ? '포함' : '미포함'}</li>
            <li>누락조항 추가: {missingClauses ? '포함' : '미포함'}</li>
            <li>추천조항 추가: {recommendedClauses ? '포함' : '미포함'}</li>
            <li>긴급도: {urgency}</li>
            <li>이메일: {email}</li>
          </ul>
          <div className="flex justify-between items-center text-xl font-bold text-indigo-800 mb-4">
            <span>총 견적</span>
            <span>₩{Number(total).toLocaleString()}</span>
          </div>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          className="w-full px-6 py-4 rounded-xl bg-indigo-600 text-white text-lg font-bold shadow-lg hover:bg-indigo-700 transition"
          onClick={handlePayment}
          disabled={isDisabled}
        >
          결제하기
        </button>
      </div>
    </div>
  );
} 