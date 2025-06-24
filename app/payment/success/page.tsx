'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CheckCircleIcon, DocumentTextIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const contractId = searchParams.get('contractId');
  const [contractDetails, setContractDetails] = useState<any>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.push('/login');
      return;
    }

    if (!contractId) {
      router.push('/upload');
      return;
    }

    // Load contract details from sessionStorage
    const storedPlan = sessionStorage.getItem('selectedPlan');
    const storedFiles = sessionStorage.getItem('uploadedFiles');

    if (storedPlan && storedFiles) {
      try {
        const plan = JSON.parse(storedPlan);
        const files = JSON.parse(storedFiles);
        setContractDetails({ plan, files, contractId });
      } catch (err) {
        console.error('Error parsing stored data:', err);
      }
    }

    // Clear sessionStorage after successful payment
    sessionStorage.removeItem('selectedPlan');
    sessionStorage.removeItem('uploadedFiles');
    sessionStorage.removeItem('analysisComplete');
  }, [router, session, status, contractId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!contractDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">계약 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Indicator */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-green-600">계약서 업로드</span>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gray-200 rounded">
                <div className="h-1 bg-indigo-600 rounded w-full"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-green-600">결제 및 완료</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">결제가 완료되었습니다!</h1>
          <p className="text-xl text-gray-600 mb-2">
            {contractDetails.plan.name} 요금제로 계약서 검토가 시작됩니다.
          </p>
          <p className="text-gray-500">
            계약서 번호: {contractDetails.contractId}
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">다음 단계</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <DocumentTextIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">전문 변호사 배정</h3>
              <p className="text-sm text-gray-600">
                계약서 유형에 맞는 전문 변호사가 배정됩니다.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <ClockIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">상세 분석 진행</h3>
              <p className="text-sm text-gray-600">
                {contractDetails.plan.name === 'Basic' && '24시간 이내'}
                {contractDetails.plan.name === 'Professional' && '12시간 이내'}
                {contractDetails.plan.name === 'Enterprise' && '3시간 이내'}
                에 상세 분석이 완료됩니다.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <EnvelopeIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">결과 전달</h3>
              <p className="text-sm text-gray-600">
                이메일로 상세 분석 리포트가 전달됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">주문 요약</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">선택된 요금제</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{contractDetails.plan.name}</h4>
                    <p className="text-sm text-gray-600">계약서 전문 검토 서비스</p>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">{contractDetails.plan.priceDisplay}</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {contractDetails.plan.features.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">업로드된 파일</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                {contractDetails.files.map((file: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            href="/dashboard"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            대시보드에서 진행 상황 확인
          </Link>
          <div className="text-sm text-gray-500">
            또는 <Link href="/" className="text-indigo-600 hover:text-indigo-700">홈으로 돌아가기</Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-12 bg-indigo-50 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">도움이 필요하신가요?</h3>
          <p className="text-gray-600 mb-4">
            문의사항이 있으시면 언제든지 연락해주세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              문의하기
            </Link>
            <Link
              href="/faq"
              className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 