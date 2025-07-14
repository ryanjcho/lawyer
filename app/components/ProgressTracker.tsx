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
  activeStepIndex?: number;
  onStepClick?: (index: number) => void;
}

export default function ProgressTracker({ currentStep, steps, showTimeEstimate = true, activeStepIndex, onStepClick }: ProgressTrackerProps) {
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

  // Determine step status based on activeStepIndex if provided
  const getStepStatus = (index: number, step: ProgressStep) => {
    if (typeof activeStepIndex === 'number') {
      if (index < activeStepIndex) return 'completed';
      if (index === activeStepIndex) {
        // If this is the final step and we've reached it, mark as completed
        if (index === steps.length - 1) return 'completed';
        return 'current';
      }
      return 'upcoming';
    }
    return step.status;
  };

  const getStepIcon = (status: 'completed' | 'current' | 'upcoming', step: ProgressStep) => {
    switch (status) {
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

  const handleNext = () => {
    if (typeof activeStepIndex === 'number' && typeof onStepClick === 'function' && activeStepIndex < steps.length - 1) {
      onStepClick(activeStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (typeof activeStepIndex === 'number' && typeof onStepClick === 'function' && activeStepIndex > 0) {
      onStepClick(activeStepIndex - 1);
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
        {steps.map((step, index) => {
          const status = getStepStatus(index, step);
          const clickable = typeof onStepClick === 'function';
          return (
            <div key={step.id} className="flex items-start group">
              <div className="flex-shrink-0 mr-4">
                {getStepIcon(status, step)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    disabled={!clickable}
                    onClick={clickable ? () => onStepClick(index) : undefined}
                    className={`text-sm font-medium text-left focus:outline-none transition-colors ${
                      status === 'completed' ? 'text-green-600' :
                      status === 'current' ? 'text-indigo-600 underline' : 'text-gray-500'
                    } ${clickable ? 'hover:text-indigo-700 cursor-pointer' : ''}`}
                  >
                    {step.title}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-px h-8 ml-4 ${
                  status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {typeof onStepClick === 'function' && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={typeof activeStepIndex === 'number' ? activeStepIndex === 0 : true}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            이전
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={typeof activeStepIndex === 'number' ? activeStepIndex === steps.length - 1 : true}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>전체 진행률</span>
          <span>{Math.round((
            typeof activeStepIndex === 'number'
              ? (activeStepIndex + 1) / steps.length
              : steps.filter(s => s.status === 'completed').length / steps.length
          ) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(
                typeof activeStepIndex === 'number'
                  ? (activeStepIndex + 1) / steps.length
                  : steps.filter(s => s.status === 'completed').length / steps.length
              ) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
} 