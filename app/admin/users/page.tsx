"use client";

import Sidebar from '../components/Sidebar';
import BulkUserActions from '../components/BulkUserActions';
import UserDirectoryTable from '../components/UserDirectoryTable';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import NotificationCenter from '../components/NotificationCenter';
import ImportExport from '../components/ImportExport';
import UserPerformanceMetrics from '../components/UserPerformanceMetrics';
import ClientHealthPanel from '../components/ClientHealthPanel';
import UserFlagsPanel from '../components/UserFlagsPanel';
import UserAuditTrail from '../components/UserAuditTrail';
import UserFinancialsPanel from '../components/UserFinancialsPanel';
import NotificationsPanel from '../components/NotificationsPanel';
import { useState } from 'react';

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserAnalytics, setShowUserAnalytics] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);

  // Mock user statistics
  const userStats = {
    total: 156,
    active: 142,
    newThisMonth: 23,
    pendingInvites: 8,
    lawyers: 12,
    clients: 134,
    admins: 10
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">사용자 관리</h1>
              <p className="text-gray-600">사용자 계정, 권한 및 활동을 관리하세요</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                + 새 사용자 초대
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                CSV 내보내기
              </button>
            </div>
          </div>

          {/* User Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 사용자</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium">+{userStats.newThisMonth}</span>
                <span className="text-gray-500 ml-1">이번 달</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">활성 사용자</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.active}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(userStats.active / userStats.total) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{Math.round((userStats.active / userStats.total) * 100)}% 활성률</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">변호사</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.lawyers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-purple-600 font-medium">{userStats.clients}</span>
                <span className="text-gray-500 ml-1">고객 관리 중</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">대기 초대</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.pendingInvites}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  재전송 →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`flex-1 py-4 text-sm font-semibold rounded-tl-lg transition-colors border-b-2 ${
                activeTab === 'overview' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              사용자 목록
            </button>
            <button 
              onClick={() => setActiveTab('performance')} 
              className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'performance' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              성과 분석
            </button>
            <button 
              onClick={() => setActiveTab('activity')} 
              className={`flex-1 py-4 text-sm font-semibold rounded-tr-lg transition-colors border-b-2 ${
                activeTab === 'activity' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              활동 로그
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <BulkUserActions />
                <UserDirectoryTable />
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserPerformanceMetrics />
                <ClientHealthPanel />
                <UserFlagsPanel />
                <UserFinancialsPanel />
              </div>
            )}
            
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <UserAuditTrail />
                <NotificationsPanel />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 