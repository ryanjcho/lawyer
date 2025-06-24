"use client";
import { useState, useEffect } from 'react';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

interface ProgressTrackerProps {
  currentStep: string;
  steps: ProgressStep[];
  showTimeEstimate?: boolean;
}

export default function ProgressTracker({ currentStep, steps, showTimeEstimate = true }: ProgressTrackerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (showTimeEstimate) {
      const timer = setInterval(() => {
        const now = new Date();
        const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
        const diff = endTime.getTime() - now.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showTimeEstimate]);

  const getStepIcon = (step: ProgressStep) => {
    switch (step.status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'current':
        return (
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-sm">{step.icon}</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">진행 상황</h3>
        {showTimeEstimate && (
          <div className="text-right">
            <div className="text-sm text-gray-600">예상 완료 시간</div>
            <div className="text-lg font-bold text-indigo-600">{timeRemaining}</div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              {getStepIcon(step)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`text-sm font-medium ${
                  step.status === 'completed' ? 'text-green-600' :
                  step.status === 'current' ? 'text-indigo-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </h4>
                {step.status === 'current' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    진행 중
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-px h-8 ml-4 ${
                step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>전체 진행률</span>
          <span>{Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
          <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="text-sm font-medium text-indigo-600">새 계약서 업로드</span>
        </button>
        <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium text-gray-600">상담 문의</span>
        </button>
      </div>
    </div>
  );
}

export function CompletionIncentive() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">완료 보너스</h3>
          <p className="text-sm text-gray-600">첫 계약서 검토 완료 시 추가 혜택</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">₩50,000</div>
          <div className="text-sm text-gray-600">다음 검토 할인</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">30분</div>
          <div className="text-sm text-gray-600">무료 상담</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">90일</div>
          <div className="text-sm text-gray-600">무제한 문의</div>
        </div>
      </div>
    </div>
  );
} 