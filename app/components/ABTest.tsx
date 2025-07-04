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