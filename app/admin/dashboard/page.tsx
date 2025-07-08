"use client";
import Sidebar from '../components/Sidebar';
import RecentActivityLog from '../components/RecentActivityLog';
import PendingContractsTable from '../components/PendingContractsTable';
import CriticalContractsPanel from '../components/CriticalContractsPanel';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import NotificationsPanel from '../components/NotificationsPanel';
import CompactQuickActions from '../components/CompactQuickActions';
import AdvancedSearch from '../components/AdvancedSearch';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import NotificationCenter from '../components/NotificationCenter';
import ImportExport from '../components/ImportExport';
import { useState, useEffect } from 'react';

type Stats = {
  totalContracts: number;
  overdueContracts: number;
  revenueThisMonth: number;
  urgentContracts: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [mainTab, setMainTab] = useState('activity');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Inline the mock stats generator here to avoid importing DashboardStats
      setStats({
        totalContracts: 234,
        overdueContracts: 3,
        revenueThisMonth: 5600000,
        urgentContracts: 12
      });
    }
  }, []);

  function formatCurrency(amount) {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  }

  if (!stats) {
    return <div className="w-full flex justify-center items-center py-12 text-gray-400">로딩 중...</div>;
  }
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Enhanced Top Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">안녕하세요, 김대표님!</h1>
            <div className="text-gray-500 text-sm">오늘도 좋은 하루 보내세요.</div>
          </div>
          <div className="flex items-center gap-4">
            <CompactQuickActions />
            <AdvancedSearch />
          </div>
        </div>

        {/* Only 4 Essential Cards */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Contracts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">총 계약</span>
              <span className="text-blue-600 text-2xl font-bold">{stats.totalContracts}</span>
            </div>
            <div className="text-xs text-gray-500">전체 계약 수</div>
          </div>
          {/* Overdue Contracts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">연체 계약</span>
              <span className="text-red-600 text-2xl font-bold">{stats.overdueContracts}</span>
            </div>
            <div className="text-xs text-gray-500">기한 초과된 계약</div>
          </div>
          {/* Revenue This Month */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">이번 달 수익</span>
              <span className="text-green-600 text-2xl font-bold">{formatCurrency(stats.revenueThisMonth)}</span>
            </div>
            <div className="text-xs text-gray-500">월간 수익</div>
          </div>
          {/* Urgent Contracts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">긴급 계약</span>
              <span className="text-orange-600 text-2xl font-bold">{stats.urgentContracts}</span>
            </div>
            <div className="text-xs text-gray-500">즉시 조치 필요</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left/Main Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Tabbed Card: Recent Activity / Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setMainTab('activity')} 
                  className={`flex-1 py-4 text-sm font-semibold rounded-tl-lg transition-colors border-b-2 ${
                    mainTab === 'activity' 
                      ? 'bg-blue-50 text-blue-700 border-blue-700' 
                      : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  최근 활동
                </button>
                <button 
                  onClick={() => setMainTab('deadlines')} 
                  className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                    mainTab === 'deadlines' 
                      ? 'bg-blue-50 text-blue-700 border-blue-700' 
                      : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  임박 마감
                </button>
                <button
                  onClick={() => setMainTab('critical')}
                  className={`flex-1 py-4 text-sm font-semibold rounded-tr-lg transition-colors border-b-2 ${
                    mainTab === 'critical'
                      ? 'bg-blue-50 text-blue-700 border-blue-700'
                      : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  위험/임박 계약
                </button>
              </div>
              <div className="p-6">
                {mainTab === 'activity' ? <RecentActivityLog /> : mainTab === 'deadlines' ? <UpcomingDeadlines /> : <CriticalContractsPanel />}
              </div>
            </div>

            {/* Enhanced Pending Contracts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">검토/조치 필요 계약</h2>
                <a href="/admin/contracts" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  전체 보기 →
                </a>
              </div>
              <div className="p-6">
                <PendingContractsTable limit={3} />
              </div>
            </div>

            {/* Notifications Panel moved here */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <NotificationsPanel limit={4} />
              </div>
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="flex flex-col gap-6">
            {/* Enhanced Team Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">팀 성과</h2>
                <a href="/admin/analytics" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  상세 보기 →
                </a>
              </div>
              <div className="p-6">
                <AdvancedAnalytics />
              </div>
            </div>
            {/* Simple Export/Import Button */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center p-6">
              <a href="/admin/contracts" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">데이터 내보내기/가져오기</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 