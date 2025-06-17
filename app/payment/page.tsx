'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import { Navbar } from '../components/Navbar';

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

interface Plan {
  id: string;
  name: string;
  price: string;
  type: 'one-time' | 'subscription';
  features: string[];
}

const plans: Record<string, Plan> = {
  'basic-onetime': {
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
  'professional-onetime': {
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
  'enterprise-onetime': {
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
  },
  'basic-subscription': {
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
  'professional-subscription': {
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
  'enterprise-subscription': {
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
};

interface PaymentPageProps {
  searchParams: {
    planId?: string
  }
}

export default function PaymentPage({ searchParams }: PaymentPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.push('/login?callbackUrl=/payment');
      return;
    }

    if (!searchParams.planId) {
      router.push('/pricing');
      return;
    }

    // Initialize I'mport
    const { IMP } = window as any;
    IMP.init(process.env.NEXT_PUBLIC_IMP_KEY);

    // Handle payment callback
    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `ORD_${Date.now()}`,
      name: 'AI 계약 검토 서비스',
      amount: 1000, // This should be dynamic based on the plan
      buyer_email: session.user.email,
      buyer_name: session.user.name,
      buyer_tel: '010-0000-0000',
    }, async (rsp: any) => {
      if (rsp.success) {
        setIsLoading(true);
        try {
          // Verify payment
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              userId: session.user.id,
              planId: searchParams.planId,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Payment verification failed');
          }

          // Redirect to success page
          router.push('/payment/success');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Payment failed');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError(rsp.error_msg || 'Payment failed');
      }
    });
  }, [router, searchParams.planId, session, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    if (!selectedPlan) {
      setError('선택된 요금제가 없습니다.');
      setIsProcessing(false);
      return;
    }

    try {
      // Convert price string to number (remove commas and convert to number)
      const amount = parseInt(selectedPlan.price.replace(/,/g, ''));
      
      // Create payment data
      const paymentData: IamportRequestPayParams = {
        pg: formData.paymentMethod === 'card' ? 'html5_inicis' : 'kcp',
        pay_method: formData.paymentMethod === 'card' ? 'card' : 'trans',
        merchant_uid: `ORDER_${new Date().getTime()}`,
        name: `${selectedPlan.name} ${selectedPlan.type === 'one-time' ? '일회성 검토' : '구독형 검토'}`,
        amount: amount,
        buyer_name: formData.name,
        buyer_email: formData.email,
        buyer_tel: formData.phone,
        company_name: formData.company || undefined
      };

      // Request payment
      window.IMP.request_pay(paymentData, async (response: IamportRequestPayResponse) => {
        if (response.success) {
          try {
            // Get current user ID from session or auth context
            const userId = 'current-user-id'; // TODO: Replace with actual user ID from auth

            // Verify payment with backend
            const verificationResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                imp_uid: response.imp_uid,
                merchant_uid: response.merchant_uid,
                amount: response.paid_amount,
                userId,
                planId: selectedPlan.id
              })
            });

            const verificationData = await verificationResponse.json();

            if (!verificationResponse.ok) {
              throw new Error(verificationData.error || '결제 검증에 실패했습니다.');
            }

            // Store payment details for success page
            localStorage.setItem('paymentDetails', JSON.stringify(verificationData.paymentDetails));

            // Clear the selected plan from localStorage
            localStorage.removeItem('selectedPlan');
            
            // Redirect to success page
            router.push('/payment/success');
          } catch (error) {
            console.error('Payment verification failed:', error);
            setError(error instanceof Error ? error.message : '결제 검증에 실패했습니다. 고객센터로 문의해주세요.');
          }
        } else {
          setError(response.error_msg || '결제에 실패했습니다.');
        }
        setIsProcessing(false);
      });
    } catch (error) {
      console.error('Payment processing failed:', error);
      setError('결제 처리 중 오류가 발생했습니다.');
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/pricing')}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Pricing
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
          <p className="text-gray-600">Please wait while we verify your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Script
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="beforeInteractive"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-blue-800 text-white pt-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              결제
            </h1>
            <p className="mt-6 text-xl text-white">
              선택하신 요금제의 결제를 진행해주세요
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Selected Plan Summary */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  선택된 요금제
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{selectedPlan?.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedPlan?.type === 'one-time' ? '일회성 검토' : '구독형 검토'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedPlan?.price}원
                    </p>
                    {selectedPlan?.type === 'subscription' && (
                      <p className="text-sm text-gray-600">/월</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      회사명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    결제 수단 *
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">신용카드</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">계좌이체</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    이용약관 및 개인정보 처리방침에 동의합니다
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                  >
                    {isProcessing ? '결제 처리 중...' : '결제하기'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 