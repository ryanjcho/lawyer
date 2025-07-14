'use client'
import React, { useState } from 'react';
import { BellIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, CurrencyDollarIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';

export default function MessagesPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: '새 계약서가 업로드되었습니다.', type: 'upload', read: false, time: '방금 전' },
    { id: 2, message: '계약서 검토가 완료되었습니다.', type: 'review', read: false, time: '5분 전' },
    { id: 3, message: '결제 영수증이 발급되었습니다.', type: 'payment', read: true, time: '1시간 전' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">메시지 & 알림</h1>
      <div className="flex items-center gap-2 mb-4 relative">
        {/* Notification Bell with badge */}
        <button
          className="relative focus:outline-none"
          onClick={() => setShowNotifications((prev) => !prev)}
          aria-label="Show notifications"
        >
          <BellIcon className="w-7 h-7 text-indigo-600" />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </button>
        <span className="text-sm text-gray-700">읽지 않은 메시지 {notifications.filter(n => !n.read).length}개 <button className="ml-2 text-xs text-indigo-600 underline">새로고침</button></span>
        {/* Notification Dropdown Panel */}
        {showNotifications && (
          <div className="absolute right-0 top-10 w-80 bg-white rounded shadow-lg z-50 border">
            <ul>
              {notifications.map(n => (
                <li key={n.id} className={`p-3 border-b last:border-b-0 ${!n.read ? 'bg-indigo-50' : ''}`}>
                  <div className="flex items-center gap-2">
                    {/* Icon based on n.type */}
                    {n.type === 'upload' && <DocumentArrowUpIcon className="w-5 h-5 text-indigo-400" />}
                    {n.type === 'review' && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
                    {n.type === 'payment' && <CurrencyDollarIcon className="w-5 h-5 text-blue-500" />}
                    <span className="text-xs">{n.message}</span>
                    <span className="ml-auto text-xs text-gray-400">{n.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {[
            { from: 'LawKit', subject: '계약서 검토가 완료되었습니다.', date: '2024-06-30', unread: true },
            { from: '담당 변호사', subject: '추가 자료 요청', date: '2024-06-29', unread: true },
            { from: 'LawKit', subject: '결제 영수증 안내', date: '2024-06-28', unread: false },
          ].map((msg, i) => (
            <li key={i} className={`py-3 flex items-center gap-3 ${msg.unread ? 'bg-indigo-50' : ''}`}>
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-400" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{msg.subject}</div>
                <div className="text-xs text-gray-500">{msg.from} · {msg.date}</div>
              </div>
              {msg.unread && <button className="ml-2 px-2 py-0.5 rounded bg-indigo-600 text-white text-xs">읽음</button>}
              <button className="ml-2 px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs">보관</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 