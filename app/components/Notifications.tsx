'use client'

import { useState, useEffect, useRef } from 'react'
import { BellIcon, ExclamationTriangleIcon, ClockIcon, CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface Notification {
  id: string
  type: 'status' | 'risk' | 'deadline' | 'insight' | 'reminder'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high' | 'critical'
  contractId?: string
  actionUrl?: string
  insights?: {
    source: 'proprietary_database' | 'market_analysis' | 'risk_model'
    confidence: number
    recommendation: string
  }
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Mock notifications with proprietary database insights
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'risk',
        title: '위험 수준 변경',
        message: '계약서 #12345의 위험 수준이 낮음에서 보통으로 변경되었습니다. 독자적인 위험 평가 모델을 기반으로 분석되었습니다.',
        timestamp: '2분 전',
        read: false,
        priority: 'high',
        contractId: '12345',
        actionUrl: '/dashboard/contracts/12345',
        insights: {
          source: 'proprietary_database',
          confidence: 94,
          recommendation: '8.2조를 검토하세요 - 유사 패턴의 계약서에서 분쟁 발생률이 23% 더 높게 나타났습니다.'
        }
      },
      {
        id: '2',
        type: 'insight',
        title: '시장 벤치마크 알림',
        message: '해당 계약 조건이 유사 계약 대비 시장 평균보다 15% 낮습니다. 독자적인 데이터베이스 분석 결과입니다.',
        timestamp: '1시간 전',
        read: false,
        priority: 'medium',
        insights: {
          source: 'market_analysis',
          confidence: 87,
          recommendation: '1,247건의 유사 계약 분석 결과를 참고해 결제 조건 협상을 고려하세요.'
        }
      },
      {
        id: '3',
        type: 'deadline',
        title: '계약서 만료 알림',
        message: '계약서 #12340이 30일 후 만료됩니다. 데이터베이스 기준 78%의 유사 계약이 갱신됩니다.',
        timestamp: '3시간 전',
        read: true,
        priority: 'medium',
        contractId: '12340',
        actionUrl: '/dashboard/contracts/12340',
        insights: {
          source: 'proprietary_database',
          confidence: 92,
          recommendation: '지금 갱신 절차를 시작하세요 - 평균 처리 기간은 14일입니다.'
        }
      },
      {
        id: '4',
        type: 'status',
        title: '분석 완료',
        message: '계약서 분석이 완료되었습니다. 위험 평가 모델을 통해 3건의 이슈가 탐지되었습니다.',
        timestamp: '1일 전',
        read: true,
        priority: 'low',
        contractId: '12338',
        actionUrl: '/dashboard/contracts/12338'
      }
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'risk': return <ExclamationTriangleIcon className="w-5 h-5" />
      case 'deadline': return <ClockIcon className="w-5 h-5" />
      case 'status': return <CheckCircleIcon className="w-5 h-5" />
      case 'insight': return <DocumentTextIcon className="w-5 h-5" />
      default: return <BellIcon className="w-5 h-5" />
    }
  }

  const getInsightBadge = () => (
    <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded">
      독자적 데이터베이스 인사이트
    </span>
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">알림</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  모두 읽음으로 표시
                </button>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                알림이 없습니다
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id)
                    if (notification.actionUrl) {
                      router.push(notification.actionUrl)
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-400 ml-2">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      
                      {notification.insights && (
                        <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-indigo-700 bg-indigo-100 px-2 py-1 rounded">
                              {getInsightBadge()}
                            </span>
                            <span className="text-xs text-indigo-600">
                              {notification.insights.confidence}% 신뢰도
                            </span>
                          </div>
                          <p className="text-xs text-indigo-800">
                            {notification.insights.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => window.location.href = '/dashboard/notifications'}
              className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              모든 알림 보기
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 