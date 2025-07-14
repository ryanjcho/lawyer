"use client";
import { useState } from 'react';

export default function AnalyticsExportPanel() {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedRange, setSelectedRange] = useState('current');

  const exportOptions = [
    { id: 'pdf', label: 'PDF 보고서', icon: '📄', color: 'bg-red-500 hover:bg-red-600' },
    { id: 'excel', label: 'Excel 스프레드시트', icon: '📊', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'csv', label: 'CSV 데이터', icon: '📋', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'image', label: '이미지 (PNG)', icon: '🖼️', color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  const dateRanges = [
    { id: 'current', label: '현재 선택된 기간' },
    { id: 'last7', label: '최근 7일' },
    { id: 'last30', label: '최근 30일' },
    { id: 'last90', label: '최근 90일' },
    { id: 'custom', label: '사용자 정의' },
  ];

  const reportTemplates = [
    { id: 'executive', label: '경영진 요약 보고서', description: '핵심 지표와 인사이트 요약' },
    { id: 'detailed', label: '상세 분석 보고서', description: '모든 차트와 데이터 포함' },
    { id: 'performance', label: '성과 분석 보고서', description: '변호사 및 팀 성과 중심' },
    { id: 'financial', label: '재무 분석 보고서', description: '수익성 및 재무 지표 중심' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">보고서 및 내보내기</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>마지막 업데이트: 2024-07-07 오전 09:00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">데이터 내보내기</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내보내기 형식</label>
              <div className="grid grid-cols-2 gap-3">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFormat(option.id)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedFormat === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜 범위</label>
              <select 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>

            <button className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-colors ${
              exportOptions.find(opt => opt.id === selectedFormat)?.color || 'bg-blue-500 hover:bg-blue-600'
            }`}>
              {exportOptions.find(opt => opt.id === selectedFormat)?.label} 내보내기
            </button>
          </div>
        </div>

        {/* Report Templates */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">보고서 템플릿</h3>
          
          <div className="space-y-3">
            {reportTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{template.label}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    생성
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">📅 자동 보고서</h4>
            <p className="text-sm text-gray-600 mb-3">정기적으로 보고서를 이메일로 받아보세요</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              자동화 설정
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors text-left">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-900 mb-1">실시간 대시보드</h4>
            <p className="text-sm text-gray-600">현재 데이터로 대시보드 새로고침</p>
          </button>
          <button className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors text-left">
            <div className="text-2xl mb-2">🔔</div>
            <h4 className="font-medium text-gray-900 mb-1">알림 설정</h4>
            <p className="text-sm text-gray-600">중요 지표 알림 설정</p>
          </button>
          <button className="bg-white rounded-lg p-4 border border-blue-200 hover:border-blue-300 transition-colors text-left">
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-medium text-gray-900 mb-1">트렌드 분석</h4>
            <p className="text-sm text-gray-600">시계열 데이터 분석</p>
          </button>
        </div>
      </div>
    </div>
  );
} 