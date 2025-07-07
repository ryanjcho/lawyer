"use client";
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import SummaryCards from '../components/SummaryCards';
import RecentActivityLog from '../components/RecentActivityLog';
import PendingContractsTable from '../components/PendingContractsTable';
import CriticalContractsPanel from '../components/CriticalContractsPanel';
import PerformanceTrends from '../components/PerformanceTrends';
import TeamPerformancePanel from '../components/TeamPerformancePanel';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import NotificationsPanel from '../components/NotificationsPanel';
import QuickActions from '../components/QuickActions';
import { useState } from 'react';

export default function AdminDashboard() {
  const [mainTab, setMainTab] = useState('activity');
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black mb-1">안녕하세요, 관리자님!</h1>
            <div className="text-gray-500 text-sm">오늘도 좋은 하루 보내세요.</div>
          </div>
          <div className="flex items-center gap-4">
            <input type="text" placeholder="검색 (계약, 고객, 팀)" className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:ring-2 focus:ring-blue-400" />
            <div className="relative">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">3</span>
            </div>
          </div>
        </div>
        {/* Slim Metrics Row */}
        <DashboardStats />
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Left/Main Column */}
          <div className="xl:col-span-2 space-y-10">
            {/* Tabbed Card: Recent Activity / Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow p-0 mb-2">
              <div className="flex border-b">
                <button onClick={() => setMainTab('activity')} className={`flex-1 py-3 text-sm font-semibold rounded-tl-lg ${mainTab === 'activity' ? 'bg-gray-100 text-blue-700' : 'bg-white text-gray-500'}`}>최근 활동</button>
                <button onClick={() => setMainTab('deadlines')} className={`flex-1 py-3 text-sm font-semibold rounded-tr-lg ${mainTab === 'deadlines' ? 'bg-gray-100 text-blue-700' : 'bg-white text-gray-500'}`}>임박 마감</button>
              </div>
              <div className="p-6">
                {mainTab === 'activity' ? <RecentActivityLog /> : <UpcomingDeadlines />}
              </div>
            </div>
            {/* Pending Contracts: Top 3 only */}
            <div className="bg-white rounded-lg shadow p-6 mb-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-black">검토/조치 필요 계약</h2>
                <a href="/admin/contracts" className="text-xs text-blue-600 hover:underline">전체 보기</a>
              </div>
              <PendingContractsTable limit={3} />
            </div>
          </div>
          {/* Right Sidebar Column */}
          <div className="flex flex-col gap-8">
            {/* Team Performance: Top 2 only */}
            <div className="bg-white rounded-lg shadow p-6 mb-2">
              <TeamPerformancePanel limit={2} />
            </div>
            {/* Notifications: Top 2 only */}
            <div className="bg-gray-50 rounded-lg p-6 mb-2 border border-gray-100">
              <NotificationsPanel limit={2} />
            </div>
            {/* Icon-only Quick Actions */}
            <div className="bg-white rounded-lg shadow p-4 flex gap-3 justify-center">
              <button title="계약 할당" className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg></button>
              <button title="계약 업로드" className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg></button>
              <button title="보고서 다운로드" className="bg-gray-100 text-gray-700 p-2 rounded-full hover:bg-gray-200"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 