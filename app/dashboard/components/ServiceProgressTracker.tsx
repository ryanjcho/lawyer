'use client';

import React from 'react';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  UserIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface ServiceProgressTrackerProps {
  currentStep: string;
  progress: number;
  estimatedCompletion: string;
  lawyerName: string;
  pagesReviewed: number;
  totalPages: number;
  issuesFound: number;
  nextAction: string;
  priority?: 'high' | 'medium' | 'low';
  status?: string;
}

const steps = [
  { key: 'upload', label: '업로드 완료', icon: DocumentTextIcon },
  { key: 'analysis', label: '분석 중', icon: ClockIcon },
  { key: 'lawyer_review', label: '변호사 검토', icon: UserIcon },
  { key: 'feedback', label: '피드백 대기', icon: ChatBubbleLeftRightIcon },
  { key: 'completed', label: '완료', icon: CheckCircleIcon },
];

export default function ServiceProgressTracker({
  currentStep,
  progress,
  estimatedCompletion,
  lawyerName,
  pagesReviewed,
  totalPages,
  issuesFound,
  nextAction,
  priority = 'medium',
  status = '진행 중'
}: ServiceProgressTrackerProps) {
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행 중': return 'text-blue-600 bg-blue-50 border-blue-200';
      case '완료': return 'text-green-600 bg-green-50 border-green-200';
      case '검토 대기': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case '지연': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">서비스 진행 상황</h3>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(priority)}`}>
            {priority === 'high' ? '긴급' : priority === 'medium' ? '보통' : '일반'}
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-gray-900">담당 변호사: {lawyerName}</span>
          </div>
          <div className="text-sm text-gray-600">
            예상 완료: {estimatedCompletion}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>전체 진행률</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const Icon = step.icon;
              
              return (
                <div key={step.key} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
                    isCompleted 
                      ? 'bg-green-600 border-green-600 text-white' 
                      : isCurrent 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs mt-2 text-center ${
                    isCompleted || isCurrent ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{pagesReviewed}</div>
          <div className="text-xs text-blue-700">검토된 페이지</div>
          <div className="text-xs text-gray-500">총 {totalPages}페이지</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{issuesFound}</div>
          <div className="text-xs text-yellow-700">발견된 이슈</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{Math.round((pagesReviewed / totalPages) * 100)}%</div>
          <div className="text-xs text-green-700">검토 완료율</div>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <div className="text-2xl font-bold text-indigo-600">{progress}%</div>
          <div className="text-xs text-indigo-700">전체 진행률</div>
        </div>
      </div>

      {/* Next Action */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ExclamationTriangleIcon className="w-5 h-5 text-indigo-600" />
          <span className="font-medium text-gray-900">다음 조치</span>
        </div>
        <p className="text-sm text-gray-700">{nextAction}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          상세 보기
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          <ChatBubbleLeftRightIcon className="w-5 h-5" />
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          <DocumentTextIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 