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
import ContractsTable from '../components/ContractsTable'; // Added ContractsTable import

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
    <main className="min-h-screen p-8 bg-gray-50">
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

        {/* Simplified: Show only ContractsTable and related panels below stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-black">계약 관리</h1>
          <ContractsTable />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <NotificationCenter />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <ImportExport />
          </div>
        </div>
    </main>
  );
} 