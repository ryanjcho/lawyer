"use client";
import { useState, useEffect, useRef } from 'react';
import { 
  FaBell, FaEnvelope, FaTimes, FaCheck, FaExclamationTriangle, 
  FaInfoCircle, FaCog, FaEye, FaEyeSlash, FaTrash, FaDownload 
} from 'react-icons/fa';

// Mock notification data
const generateMockNotifications = () => {
  const types = ['urgent', 'info', 'success', 'warning'];
  const categories = ['contract', 'user', 'system', 'payment', 'security'];
  const messages = [
    '새로운 긴급 계약이 등록되었습니다.',
    '계약 검토가 완료되었습니다.',
    '새 사용자가 가입했습니다.',
    '결제가 성공적으로 처리되었습니다.',
    '시스템 점검이 예정되어 있습니다.',
    '보안 알림: 비정상적인 로그인 시도가 감지되었습니다.',
    '변호사 배정이 완료되었습니다.',
    '계약 상태가 변경되었습니다.',
    '새로운 리뷰가 등록되었습니다.',
    '데이터베이스 백업이 완료되었습니다.'
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const createdAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const isRead = Math.random() > 0.3;
    const isUrgent = type === 'urgent';
    
    return {
      id: `notif-${i + 1}`,
      type,
      category,
      message,
      createdAt: createdAt.toISOString(),
      isRead,
      isUrgent,
      priority: isUrgent ? 'high' : Math.random() > 0.7 ? 'medium' : 'low',
      actionRequired: isUrgent && Math.random() > 0.5,
      relatedId: `item-${Math.floor(Math.random() * 1000)}`,
      sender: ['System', 'Admin', 'Lawyer', 'Client'][Math.floor(Math.random() * 4)]
    };
  });
};

const notificationTypes = {
  urgent: { label: '긴급', color: 'text-red-600', bgColor: 'bg-red-100', icon: <FaExclamationTriangle /> },
  info: { label: '정보', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: <FaInfoCircle /> },
  success: { label: '성공', color: 'text-green-600', bgColor: 'bg-green-100', icon: <FaCheck /> },
  warning: { label: '경고', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: <FaExclamationTriangle /> }
};

const categories = {
  contract: { label: '계약', color: 'bg-blue-100 text-blue-800' },
  user: { label: '사용자', color: 'bg-green-100 text-green-800' },
  system: { label: '시스템', color: 'bg-gray-100 text-gray-800' },
  payment: { label: '결제', color: 'bg-purple-100 text-purple-800' },
  security: { label: '보안', color: 'bg-red-100 text-red-800' }
};

const mockNotifications = generateMockNotifications();

export default function NotificationCenter() {
  const [notifications] = useState(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    readStatus: 'all',
    priority: 'all'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    urgentOnly: false,
    autoMarkRead: false,
    soundEnabled: true
  });
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Filter and sort notifications
  useEffect(() => {
    let filtered = notifications;

    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(n => n.type === filters.type);
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter(n => n.category === filters.category);
    }
    if (filters.readStatus !== 'all') {
      filtered = filtered.filter(n => 
        filters.readStatus === 'read' ? n.isRead : !n.isRead
      );
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(n => n.priority === filters.priority);
    }
    if (showUnreadOnly) {
      filtered = filtered.filter(n => !n.isRead);
    }
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.sender.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aVal = priorityOrder[a.priority];
          bVal = priorityOrder[b.priority];
          break;
        case 'type':
          aVal = a.type;
          bVal = b.type;
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }
      
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });

    setFilteredNotifications(filtered);
  }, [notifications, filters, showUnreadOnly, searchQuery, sortBy, sortDir]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.isUrgent && !n.isRead).length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return '어제';
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    }
  };

  const markAsRead = (notificationId) => {
    // In a real app, this would update the backend
    console.log('Mark as read:', notificationId);
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Mark all as read');
  };

  const deleteNotification = (notificationId) => {
    // In a real app, this would update the backend
    console.log('Delete notification:', notificationId);
  };

  const bulkAction = (action) => {
    if (selectedNotifications.size === 0) return;
    
    switch (action) {
      case 'markRead':
        console.log('Mark selected as read:', Array.from(selectedNotifications));
        break;
      case 'delete':
        console.log('Delete selected:', Array.from(selectedNotifications));
        break;
    }
    setSelectedNotifications(new Set());
  };

  const exportNotifications = () => {
    const dataToExport = filteredNotifications.map(n => ({
      ID: n.id,
      타입: notificationTypes[n.type].label,
      카테고리: categories[n.category].label,
      메시지: n.message,
      발신자: n.sender,
      생성일: new Date(n.createdAt).toLocaleString('ko-KR'),
      읽음여부: n.isRead ? '읽음' : '안읽음',
      우선순위: n.priority
    }));

    const csvContent = [
      Object.keys(dataToExport[0]).join(','),
      ...dataToExport.map(row => Object.values(row).map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `notifications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaBell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">알림 센터</h2>
              <p className="text-sm text-gray-600">
                {unreadCount}개의 읽지 않은 알림, {urgentCount}개의 긴급 알림
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaCog className="w-5 h-5" />
            </button>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              모두 읽음 처리
            </button>
            <button
              onClick={exportNotifications}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center space-x-2"
            >
              <FaDownload className="w-4 h-4" />
              <span>내보내기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="알림 검색..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="all">전체 타입</option>
              {Object.entries(notificationTypes).map(([key, type]) => (
                <option key={key} value={key}>{type.label}</option>
              ))}
            </select>

            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">전체 카테고리</option>
              {Object.entries(categories).map(([key, category]) => (
                <option key={key} value={key}>{category.label}</option>
              ))}
            </select>

            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.readStatus}
              onChange={(e) => setFilters(prev => ({ ...prev, readStatus: e.target.value }))}
            >
              <option value="all">전체 상태</option>
              <option value="unread">읽지 않음</option>
              <option value="read">읽음</option>
            </select>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm">읽지 않은 것만</span>
            </label>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedNotifications.size > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {selectedNotifications.size}개 선택됨
              </span>
              <button
                onClick={() => bulkAction('markRead')}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                읽음 처리
              </button>
              <button
                onClick={() => bulkAction('delete')}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              알림 목록 ({filteredNotifications.length}개)
            </h3>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={`${sortBy}-${sortDir}`}
              onChange={(e) => {
                const [field, dir] = e.target.value.split('-');
                setSortBy(field);
                setSortDir(dir as 'asc' | 'desc');
              }}
            >
              <option value="createdAt-desc">최신순</option>
              <option value="createdAt-asc">오래된순</option>
              <option value="priority-desc">우선순위순</option>
              <option value="type-asc">타입순</option>
            </select>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              알림이 없습니다.
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50' : ''
                } ${notification.isUrgent ? 'border-l-4 border-l-red-500' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.has(notification.id)}
                    onChange={(e) => {
                      const newSet = new Set(selectedNotifications);
                      if (e.target.checked) {
                        newSet.add(notification.id);
                      } else {
                        newSet.delete(notification.id);
                      }
                      setSelectedNotifications(newSet);
                    }}
                    className="mt-1 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notificationTypes[notification.type].bgColor
                  }`}>
                    <span className={notificationTypes[notification.type].color}>
                      {notificationTypes[notification.type].icon}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          categories[notification.category].color
                        }`}>
                          {categories[notification.category].label}
                        </span>
                        {notification.isUrgent && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                            긴급
                          </span>
                        )}
                        {notification.actionRequired && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                            조치 필요
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatDate(notification.createdAt)}</span>
                        <span>•</span>
                        <span>{notification.sender}</span>
                      </div>
                    </div>
                    
                    <p className={`mt-1 text-sm ${!notification.isRead ? 'font-medium' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          읽음 처리
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">알림 설정</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">이메일 알림</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">푸시 알림</span>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">긴급 알림만</span>
                <input
                  type="checkbox"
                  checked={settings.urgentOnly}
                  onChange={(e) => setSettings(prev => ({ ...prev, urgentOnly: e.target.checked }))}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">자동 읽음 처리</span>
                <input
                  type="checkbox"
                  checked={settings.autoMarkRead}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoMarkRead: e.target.checked }))}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium">알림음</span>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 