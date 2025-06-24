"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import TrustIndicators, { GuaranteeBanner } from '../components/TrustIndicators';
import { CheckCircleIcon, ExclamationTriangleIcon, UserIcon, LockClosedIcon, ArrowRightCircleIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, UserGroupIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Import types
declare global {
  interface Window {
    IMP: {
      init: (userCode: string) => void;
      request_pay: (params: IamportRequestPayParams, callback: (response: IamportRequestPayResponse) => void) => void;
    };
  }
}

interface IamportRequestPayParams {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_name: string;
  buyer_email: string;
  buyer_tel: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  company_name?: string;
  company_number?: string;
}

interface IamportRequestPayResponse {
  success: boolean;
  error_code?: string;
  error_msg?: string;
  imp_uid?: string;
  merchant_uid?: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iamportLoaded, setIamportLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || status === 'loading') return;
    if (!session?.user) {
      router.push('/login?callbackUrl=/payment');
      return;
    }
    if (typeof window !== 'undefined') {
      const storedFiles = sessionStorage.getItem('uploadedFiles');
      const storedAnalysis = sessionStorage.getItem('analysis');
      const storedQuote = sessionStorage.getItem('quote');
      const analysisComplete = sessionStorage.getItem('analysisComplete');
      if (!storedFiles || !storedAnalysis || !storedQuote || !analysisComplete) {
        router.push('/upload');
        return;
      }
      try {
        const files = JSON.parse(storedFiles);
        setUploadedFiles(files);
        setAnalysis(JSON.parse(storedAnalysis));
        setQuote(Number(storedQuote));
      } catch (err) {
        console.error('Error parsing stored data:', err);
        router.push('/upload');
      }
    }
  }, [router, session, status, mounted]);

  const handlePayment = async () => {
    if (!session?.user) return;

    console.log('Payment button clicked')
    setIsLoading(true);
    setError(null);

    try {
      console.log('Creating payment record with data:', { amount: quote, filesCount: uploadedFiles?.length, hasAnalysis: !!analysis })
      
      // Create payment record in database with the quoted amount
      const response = await fetch('/api/contracts/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: quote,
          files: uploadedFiles,
          analysis: analysis,
        }),
      });

      console.log('Payment API response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Payment API error:', errorData)
        throw new Error(errorData.error || 'Failed to create payment record');
      }

      const responseData = await response.json();
      console.log('Payment API success:', responseData)
      const { contractId } = responseData;

      // Initialize Iamport payment
      if (window.IMP) {
        window.IMP.init('your-iamport-code'); // Replace with actual Iamport code

        const paymentData = {
          pg: 'html5_inicis',
          pay_method: 'card',
          merchant_uid: `contract_${contractId}_${Date.now()}`,
          name: '계약서 분석 서비스',
          amount: quote,
          buyer_name: session.user.name || 'Unknown',
          buyer_email: session.user.email || '',
          buyer_tel: '',
          custom_data: {
            contractId,
          },
        };

        window.IMP.request_pay(paymentData, async (response) => {
          if (response.success) {
            // Payment successful - verify with our backend
            try {
              const verifyResponse = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  impUid: response.imp_uid,
                  merchantUid: response.merchant_uid,
                  userId: session.user.id,
                  amount: quote,
                }),
              });

              if (verifyResponse.ok) {
                // Payment verified successfully
                router.push(`/payment/success?contractId=${contractId}`);
              } else {
                const errorData = await verifyResponse.json();
                setError(errorData.error || '결제 검증에 실패했습니다.');
                setIsLoading(false);
              }
            } catch (verifyError) {
              console.error('Payment verification error:', verifyError);
              setError('결제 검증 중 오류가 발생했습니다.');
              setIsLoading(false);
            }
          } else {
            setError(response.error_msg || '결제에 실패했습니다.');
            setIsLoading(false);
          }
        });
      } else {
        // Fallback for development
        setTimeout(() => {
          router.push(`/payment/success?contractId=${contractId}`);
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '결제 처리 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center gap-2 text-red-600 mb-4">
            <ExclamationTriangleIcon className="w-6 h-6" />
            <h2 className="text-2xl font-bold">결제 오류</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/upload')}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              업로드 페이지로 돌아가기
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">결제 처리 중</h2>
          <p className="text-gray-600">결제를 확인하고 있습니다. 잠시만 기다려 주세요...</p>
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
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white">
                2
              </div>
              <span className="text-sm font-medium text-indigo-600">결제 및 완료</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              맞춤형 계약서 분석 서비스
            </h1>
            <p className="text-lg text-gray-600">
              전문 변호사가 직접 검토하는 상세한 계약서 분석을 받으실 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">주문 요약</h2>

            {/* Why Choose Us */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-indigo-700 mb-1">왜 저희 서비스를 선택해야 하나요?</h3>
              <ul className="text-xs text-gray-700 space-y-1 pl-2 list-disc">
                <li>수천 건의 실제 사례와 데이터베이스 기반 분석</li>
                <li>업계 최고 변호사 직접 검토 및 1:1 상담</li>
                <li>평균 12시간 이내 신속한 결과 제공</li>
                <li>7일 이내 100% 환불 보장</li>
              </ul>
            </div>

            {/* Analysis Summary */}
            {analysis && (
              <div className="flex items-center gap-4 bg-indigo-50 rounded-lg p-3 mb-4">
                <div className="flex flex-col items-center flex-1">
                  <span className="text-xs text-gray-600">예상 위험 수준</span>
                  <span className={`font-bold text-lg ${analysis.riskLevel === 'HIGH' ? 'text-red-600' : analysis.riskLevel === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600'}`}>{analysis.riskLevel === 'HIGH' ? '높음' : analysis.riskLevel === 'MEDIUM' ? '보통' : '낮음'}</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-xs text-gray-600">위험 점수</span>
                  <span className="font-bold text-lg text-indigo-700">{analysis.riskScore}/10</span>
                </div>
              </div>
            )}

            {/* Step-by-step vertical stepper */}
            <div className="mb-4 relative">
              <h3 className="text-sm font-bold text-indigo-700 mb-2">진행 절차</h3>
              <ol className="space-y-3 ml-4 border-l-2 border-indigo-100 pl-4">
                {[1,2,3,4,5,6].map((step, idx) => (
                  <li key={step} className="flex items-start gap-3 relative">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base mt-1 z-10">{step}</div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {[
                          '결제 완료',
                          '담당 변호사 배정',
                          '1:1 사전 상담',
                          '계약서 정밀 분석',
                          '맞춤 리포트 전달',
                          '사후 1:1 Q&A',
                        ][idx]}
                      </div>
                      <div className="text-xs text-gray-500">
                        {[
                          '안전한 결제 완료',
                          '계약서 분야 전문 변호사 배정',
                          '필요시 사전 질의/상담 가능',
                          '축적 데이터 기반 정밀 분석',
                          '핵심 리스크, 개선안 포함',
                          '분석 후 추가 질의/상담 지원',
                        ][idx]}
                      </div>
                    </div>
                    {/* Vertical line for stepper */}
                    {idx < 5 && <div className="absolute left-3.5 top-8 w-1 h-7 bg-indigo-100 z-0" />}
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                <span className="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs">평균 12시간 이내 결과 제공</span>
                <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">7일 이내 100% 환불 보장</span>
              </div>
            </div>

            {/* Quoted Service */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">계약서 분석 서비스</h3>
                  <p className="text-sm text-gray-600">실제 변호사 직접 검토, 상세 리포트 제공</p>
                </div>
                <span className="text-lg font-bold text-indigo-600">₩{quote?.toLocaleString()}</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-4 h-4 text-green-500" /> 상세 리스크 분석 리포트</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-4 h-4 text-green-500" /> 변호사 1:1 Q&A 및 상담</li>
                <li className="flex items-center gap-2"><CheckCircleIcon className="w-4 h-4 text-green-500" /> 계약서 개선 제안</li>
              </ul>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">업로드된 파일</h3>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <DocumentTextIcon className="w-4 h-4 text-indigo-400" />
                    {file.name}
                  </div>
                ))}
              </div>
            )}

            {/* Trust/Stats Row */}
            <div className="border-t border-b border-gray-100 py-3 flex flex-row items-center justify-between bg-white mb-4">
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs text-indigo-700 font-bold">10,000+</span>
                <span className="text-[11px] text-gray-500">누적 분석</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs text-indigo-700 font-bold">97%</span>
                <span className="text-[11px] text-gray-500">만족도</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-xs text-indigo-700 font-bold">₩2.5B+</span>
                <span className="text-[11px] text-gray-500">절감 비용</span>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="text-right mt-2">
              <a href="#faq" className="text-xs text-indigo-500 hover:underline flex items-center gap-1 justify-end"><QuestionMarkCircleIcon className="w-4 h-4" /> 자주 묻는 질문 보기</a>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">총 결제 금액</span>
                <span className="text-2xl font-bold text-indigo-600">₩{quote?.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">VAT 포함</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">결제 정보</h2>
            
            {/* Trust Indicators */}
            <TrustIndicators />
            
            {/* Testimonial/review block */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center shadow-sm">
              <div className="flex justify-center mb-2">
                <UserIcon className="w-6 h-6 text-yellow-400 mr-1" />
                <span className="text-yellow-500 font-bold">고객 후기</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">“결제 후 바로 변호사님이 연락을 주셔서 안심하고 진행할 수 있었습니다. 리포트도 정말 꼼꼼해서 큰 도움이 됐어요!”</p>
              <div className="text-xs text-gray-500">- 이대표, 스타트업 CEO</div>
            </div>

            {/* Attorney Profile */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-3 overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Attorney" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <div className="font-bold text-lg text-gray-900 mb-1">김지훈 변호사</div>
              <div className="text-sm text-gray-600 mb-2">Senior Attorney, Contract Law Specialist</div>
              <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs mb-2">100% 실제 변호사 직접 검토</span>
              <p className="text-gray-700 text-center mb-2">“안녕하세요! 저는 계약서 검토 및 분쟁 예방을 전문으로 하는 변호사 김지훈입니다. 고객님의 계약서를 꼼꼼하게 검토하여, 실질적인 리스크와 개선점을 명확하게 안내드리겠습니다. 언제든 궁금한 점이 있으면 1:1 상담을 통해 직접 도와드리겠습니다.”</p>
              <div className="text-xs text-gray-400">— 김지훈 변호사 드림</div>
            </div>

            {/* Payment Button */}
            <div className="mt-6 flex flex-col items-center">
              <button
                onClick={handlePayment}
                disabled={isProcessing || isLoading}
                className="inline-flex items-center px-10 py-4 rounded-xl font-bold text-white text-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mb-2"
              >
                결제하기
              </button>
              <div className="text-xs text-gray-400 mt-2">
                모든 파일은 암호화되어 안전하게 처리되며, 외부에 절대 공유되지 않습니다.
              </div>
            </div>

            {/* No hidden fees microcopy */}
            <div className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
              <CheckCircleIcon className="w-4 h-4 text-green-400" /> 숨겨진 비용 없이, 1회 결제로 모든 분석 결과 제공
            </div>

            {/* Guarantee Banner */}
            <GuaranteeBanner />

            {/* Security Notice */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center gap-2">
              <LockClosedIcon className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">보안 안내</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 모든 결제 정보는 SSL 암호화로 보호됩니다</li>
                  <li>• 결제 정보는 안전하게 처리되며 저장되지 않습니다</li>
                  <li>• 결제 후 즉시 계약서 분석이 시작됩니다</li>
                  <li>• 모든 정보는 변호사 윤리 기준에 따라 안전하게 보호됩니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-indigo-700 mb-2">10,000+</div>
            <div className="text-gray-700 font-semibold">누적 계약서 분석</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-indigo-700 mb-2">97%</div>
            <div className="text-gray-700 font-semibold">고객 만족도</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-indigo-700 mb-2">₩2.5B+</div>
            <div className="text-gray-700 font-semibold">누적 절감 비용</div>
          </div>
        </div>
      </div>

      {/* Iamport Script */}
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        onLoad={() => setIamportLoaded(true)}
      />
    </div>
  );
} 