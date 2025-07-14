'use client';

import React, { useState } from 'react';
import { 
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  StarIcon,
  UserIcon,
  CalendarDaysIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface ReviewResultsViewProps {
  originalContract: string;
  reviewedContract: string;
  changes: Array<{
    id: string;
    type: 'addition' | 'deletion' | 'modification';
    section: string;
    originalText?: string;
    newText?: string;
    reason: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  lawyerComments: Array<{
    id: string;
    section: string;
    comment: string;
    type: 'suggestion' | 'warning' | 'recommendation';
    timestamp: string;
  }>;
  riskScore: string;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    action: string;
  }>;
  qualityScore: number;
  reviewDate: string;
  lawyerName: string;
}

export default function ReviewResultsView({
  originalContract,
  reviewedContract,
  changes,
  lawyerComments,
  riskScore,
  recommendations,
  qualityScore,
  reviewDate,
  lawyerName
}: ReviewResultsViewProps) {
  const [activeTab, setActiveTab] = useState<'changes' | 'comments' | 'recommendations'>('changes');
  const [selectedChange, setSelectedChange] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskScoreColor = (score: string) => {
    switch (score) {
      case '낮음': return 'text-green-600 bg-green-50 border-green-200';
      case '중간': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case '높음': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'addition': return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'deletion': return <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />;
      case 'modification': return <DocumentMagnifyingGlassIcon className="w-4 h-4 text-blue-600" />;
      default: return <DocumentTextIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">검토 결과</h2>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskScoreColor(riskScore)}`}>
              위험도: {riskScore}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">{qualityScore}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>담당 변호사: {lawyerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>검토 완료: {reviewDate}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              원본 보기
            </button>
            <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors flex items-center gap-1">
              <ArrowDownTrayIcon className="w-4 h-4" />
              검토본 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('changes')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'changes'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            변경사항 ({changes.length})
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'comments'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            변호사 코멘트 ({lawyerComments.length})
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === 'recommendations'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            권장사항 ({recommendations.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'changes' && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              총 {changes.length}개의 변경사항이 발견되었습니다.
            </div>
            {changes.map((change) => (
              <div key={change.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getChangeTypeIcon(change.type)}
                    <div>
                      <h4 className="font-medium text-gray-900">{change.section}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(change.severity)}`}>
                        {change.severity === 'high' ? '높음' : change.severity === 'medium' ? '중간' : '낮음'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChange(selectedChange === change.id ? null : change.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    {selectedChange === change.id ? '접기' : '상세 보기'}
                  </button>
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  <strong>변경 이유:</strong> {change.reason}
                </div>

                {selectedChange === change.id && (
                  <div className="mt-4 space-y-3">
                    {change.originalText && (
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">원본 텍스트:</div>
                        <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                          <del className="text-red-700">{change.originalText}</del>
                        </div>
                      </div>
                    )}
                    {change.newText && (
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">수정된 텍스트:</div>
                        <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                          <ins className="text-green-700">{change.newText}</ins>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-4">
            {lawyerComments.map((comment) => (
              <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">{comment.section}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      comment.type === 'warning' ? 'bg-red-100 text-red-700' :
                      comment.type === 'recommendation' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {comment.type === 'warning' ? '경고' : comment.type === 'recommendation' ? '권장' : '제안'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(rec.priority)}`}>
                      {rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '중간' : '낮음'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="text-xs font-medium text-blue-700 mb-1">권장 조치:</div>
                  <p className="text-sm text-blue-800">{rec.action}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            검토 결과 승인
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            추가 질문
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            수정 요청
          </button>
        </div>
      </div>
    </div>
  );
} 