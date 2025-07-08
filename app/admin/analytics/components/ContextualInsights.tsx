"use client";

import { FaFileAlt, FaBolt, FaExclamationTriangle, FaBullseye, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';

export default function ContextualInsights() {
  const insights = [
    {
      type: 'positive',
      icon: <FaFileAlt className="text-blue-600" />,
      title: '계약 볼륨 증가',
      description: '이번 달 계약 수는 지난달 대비 11% 증가했습니다.',
      metric: '+11%',
      action: '추세 분석 보기'
    },
    {
      type: 'positive',
      icon: <FaBolt className="text-green-600" />,
      title: '효율성 향상',
      description: '평균 검토 시간이 2.7일로 업계 평균(4.0일)보다 빠릅니다.',
      metric: '2.7일',
      action: '프로세스 최적화'
    },
    {
      type: 'warning',
      icon: <FaExclamationTriangle className="text-yellow-600" />,
      title: '위험 계약 증가',
      description: '고위험 계약 비율이 10%로 지난 분기보다 2% 증가했습니다.',
      metric: '+2%',
      action: '위험 관리 검토'
    },
    {
      type: 'positive',
      icon: <FaBullseye className="text-indigo-600" />,
      title: 'SLA 준수율 우수',
      description: 'SLA 준수율이 92%로 목표치(90%)를 상회합니다.',
      metric: '92%',
      action: '성과 보고서'
    },
    {
      type: 'info',
      icon: <FaMoneyBillWave className="text-yellow-600" />,
      title: '수익성 개선',
      description: '이번 달 수익이 지난달 대비 23% 증가했습니다.',
      metric: '+23%',
      action: '재무 분석'
    },
    {
      type: 'info',
      icon: <FaUserFriends className="text-blue-600" />,
      title: '고객 만족도',
      description: '고객 만족도 점수가 4.8/5.0으로 높은 수준을 유지합니다.',
      metric: '4.8/5.0',
      action: '고객 피드백'
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getMetricStyles = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">주요 인사이트</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          모든 인사이트 보기 →
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow ${getTypeStyles(insight.type)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-2xl">{insight.icon}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMetricStyles(insight.type)}`}>
                {insight.metric}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
            
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 underline">
              {insight.action}
            </button>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 권장사항</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">성과 개선 기회</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 고위험 계약에 대한 사전 검토 프로세스 강화</li>
              <li>• 자동화 도구 도입으로 검토 시간 단축</li>
              <li>• 변호사별 성과 분석 및 교육 프로그램</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">비즈니스 성장 전략</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 고객 만족도 높은 서비스 패키지 개발</li>
              <li>• 수익성 높은 계약 유형에 집중</li>
              <li>• 신규 고객 확보를 위한 마케팅 강화</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 