"use client";
import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'urgent' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
  contractId?: string;
  lawyerId?: string;
}

export default function NotificationsPanel({ limit }: { limit?: number }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'urgent',
      title: '연체 계약 발견',
      message: 'C-2024-001 계약이 2일 연체되었습니다. 즉시 조치가 필요합니다.',
      time: '5분 전',
      priority: 'high',
      action: '계약 보기',
      contractId: 'C-2024-001'
    },
    {
      id: 2,
      type: 'warning',
      title: '검토 시간 초과',
      message: '김변호사 담당 계약 3건이 평균 검토 시간을 초과했습니다.',
      time: '1시간 전',
      priority: 'medium',
      action: '담당자 확인',
      lawyerId: 'lawyer-001'
    },
    {
      id: 3,
      type: 'info',
      title: '새 계약 업로드',
      message: '홍길동님이 새로운 계약서를 업로드했습니다.',
      time: '2시간 전',
      priority: 'low',
      action: '검토하기'
    },
    {
      id: 4,
      type: 'success',
      title: '검토 완료',
      message: '이변호사가 C-2024-003 계약 검토를 완료했습니다.',
      time: '3시간 전',
      priority: 'low',
      action: '결과 확인',
      contractId: 'C-2024-003'
    },
    {
      id: 5,
      type: 'urgent',
      title: '고위험 계약 알림',
      message: 'C-2024-005 계약에서 5개의 고위험 요소가 발견되었습니다.',
      time: '4시간 전',
      priority: 'high',
      action: '위험 분석',
      contractId: 'C-2024-005'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'urgent' | 'warning' | 'info' | 'success'>('all');
  const [showAll, setShowAll] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };

  const filteredNotifications = notifications
    .filter(notification => filter === 'all' || notification.type === filter)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    })
    .slice(0, showAll ? undefined : (limit || 5));

  const urgentCount = notifications.filter(n => n.type === 'urgent').length;
  const warningCount = notifications.filter(n => n.type === 'warning').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">알림</h3>
        <div className="flex items-center gap-2">
          {urgentCount > 0 && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
              긴급 {urgentCount}
            </span>
          )}
          {warningCount > 0 && (
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
              경고 {warningCount}
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('urgent')}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            filter === 'urgent' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          긴급
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            filter === 'warning' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          경고
        </button>
        <button
          onClick={() => setFilter('info')}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            filter === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          정보
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${getPriorityColor(notification.priority)} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start space-x-3">
              {getTypeIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {notification.message}
                </p>
                {notification.action && (
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    {notification.action} →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {notifications.length > (limit || 5) && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium py-2"
        >
          {showAll ? '간단히 보기' : `더 보기 (${notifications.length - (limit || 5)}개 더)`}
        </button>
      )}

      {/* Mark All as Read */}
      {filteredNotifications.length > 0 && (
        <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 border-t border-gray-100">
          모두 읽음으로 표시
        </button>
      )}
    </div>
  );
} 