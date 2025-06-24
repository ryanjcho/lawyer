"use client";
import { useState, useEffect } from 'react';

interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // Percentage chance of showing this variant
  component: React.ReactNode;
}

interface ABTestProps {
  testId: string;
  variants: ABTestVariant[];
  onVariantShown?: (variantId: string) => void;
  onConversion?: (variantId: string, conversionType: string) => void;
}

export default function ABTest({ testId, variants, onVariantShown, onConversion }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get or assign variant based on test ID
    const storedVariant = localStorage.getItem(`ab_test_${testId}`);
    
    if (storedVariant) {
      setSelectedVariant(storedVariant);
    } else {
      // Assign variant based on weights
      const random = Math.random() * 100;
      let cumulativeWeight = 0;
      
      for (const variant of variants) {
        cumulativeWeight += variant.weight;
        if (random <= cumulativeWeight) {
          setSelectedVariant(variant.id);
          localStorage.setItem(`ab_test_${testId}`, variant.id);
          break;
        }
      }
    }
    
    setIsLoaded(true);
  }, [testId, variants]);

  useEffect(() => {
    if (selectedVariant && onVariantShown) {
      onVariantShown(selectedVariant);
    }
  }, [selectedVariant, onVariantShown]);

  if (!isLoaded || !selectedVariant) {
    return null;
  }

  const variant = variants.find(v => v.id === selectedVariant);
  
  if (!variant) {
    return null;
  }

  return (
    <div data-test-id={testId} data-variant={selectedVariant}>
      {variant.component}
    </div>
  );
}

// Specific A/B test components for different conversion strategies

export function PricingABTest() {
  const variants = [
    {
      id: 'control',
      name: 'Control - Single Price',
      weight: 50,
      component: (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">전문가 검토</h3>
          <div className="text-4xl font-bold text-indigo-600 mb-6">₩499,000</div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              실제 변호사 직접 검토
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              24시간 내 완료
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              100% 만족 보장
            </li>
          </ul>
          <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            지금 결제하기
          </button>
        </div>
      )
    },
    {
      id: 'variant_a',
      name: 'Variant A - Discounted Price',
      weight: 25,
      component: (
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
          <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
            🔥 40% 할인
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">전문가 검토</h3>
          <div className="mb-2">
            <span className="text-4xl font-bold text-indigo-600">₩299,000</span>
            <span className="text-gray-500 line-through ml-2">₩499,000</span>
          </div>
          <div className="text-sm text-red-600 font-semibold mb-6">⏰ 24시간 한정</div>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              실제 변호사 직접 검토
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              24시간 내 완료
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              100% 만족 보장
            </li>
          </ul>
          <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            할인가로 결제하기
          </button>
        </div>
      )
    },
    {
      id: 'variant_b',
      name: 'Variant B - Multiple Tiers',
      weight: 25,
      component: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">기본</h4>
            <div className="text-2xl font-bold text-gray-900 mb-4">₩199,000</div>
            <ul className="space-y-2 mb-6 text-sm">
              <li>AI 분석</li>
              <li>기본 권고사항</li>
              <li>24시간 완료</li>
            </ul>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm">
              선택하기
            </button>
          </div>
          <div className="bg-white rounded-lg p-6 border-2 border-indigo-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                인기
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">전문가</h4>
            <div className="text-2xl font-bold text-indigo-600 mb-4">₩499,000</div>
            <ul className="space-y-2 mb-6 text-sm">
              <li>변호사 직접 검토</li>
              <li>상세 분석</li>
              <li>15분 상담</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded text-sm">
              선택하기
            </button>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">프리미엄</h4>
            <div className="text-2xl font-bold text-gray-900 mb-4">₩999,000</div>
            <ul className="space-y-2 mb-6 text-sm">
              <li>완전한 자문</li>
              <li>수정 초안</li>
              <li>60분 상담</li>
            </ul>
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm">
              선택하기
            </button>
          </div>
        </div>
      )
    }
  ];

  const handleVariantShown = (variantId: string) => {
    // Track variant shown
    fetch('/api/analytics/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'ab_test_variant_shown',
        properties: {
          test_id: 'pricing_test',
          variant_id: variantId
        }
      })
    });
  };

  const handleConversion = (variantId: string, conversionType: string) => {
    // Track conversion
    fetch('/api/analytics/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'ab_test_conversion',
        properties: {
          test_id: 'pricing_test',
          variant_id: variantId,
          conversion_type: conversionType
        }
      })
    });
  };

  return (
    <ABTest
      testId="pricing_test"
      variants={variants}
      onVariantShown={handleVariantShown}
      onConversion={handleConversion}
    />
  );
}

export function CTAABTest() {
  const variants = [
    {
      id: 'control',
      name: 'Control - Standard CTA',
      weight: 50,
      component: (
        <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          지금 결제하기
        </button>
      )
    },
    {
      id: 'variant_a',
      name: 'Variant A - Urgency CTA',
      weight: 25,
      component: (
        <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg">
          ⏰ 24시간 한정 - 지금 결제하기
        </button>
      )
    },
    {
      id: 'variant_b',
      name: 'Variant B - Benefit-focused CTA',
      weight: 25,
      component: (
        <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200">
          💰 위험 방지하고 절약하기
        </button>
      )
    }
  ];

  return (
    <ABTest
      testId="cta_test"
      variants={variants}
    />
  );
}

export function SocialProofABTest() {
  const variants = [
    {
      id: 'control',
      name: 'Control - No Social Proof',
      weight: 33,
      component: <div></div>
    },
    {
      id: 'variant_a',
      name: 'Variant A - Customer Reviews',
      weight: 33,
      component: (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">고객 후기</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">"정말 도움이 되었습니다!" - 김지훈</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'variant_b',
      name: 'Variant B - Statistics',
      weight: 34,
      component: (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4">신뢰할 수 있는 서비스</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-indigo-600">98%</div>
              <div className="text-sm text-gray-600">만족도</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">1,247</div>
              <div className="text-sm text-gray-600">검토 완료</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">24h</div>
              <div className="text-sm text-gray-600">평균 완료</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <ABTest
      testId="social_proof_test"
      variants={variants}
    />
  );
} 