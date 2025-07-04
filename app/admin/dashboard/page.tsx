import Sidebar from '../components/Sidebar';
import OverviewPanel from '../components/OverviewPanel';
import TeamPerformancePanel from '../components/TeamPerformancePanel';
import CriticalContractsPanel from '../components/CriticalContractsPanel';
import PendingContractsTable from '../components/PendingContractsTable';
import NotificationsPanel from '../components/NotificationsPanel';
import QuickActions from '../components/QuickActions';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">관리자 대시보드</h1>
          <div className="relative">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">3</span>
          </div>
        </div>
        <OverviewPanel />
        <hr className="my-6 border-gray-200" />
        <PendingContractsTable />
        <CriticalContractsPanel />
        <hr className="my-6 border-gray-200" />
        <TeamPerformancePanel />
      </main>
      <aside className="w-80 p-6 bg-white border-l flex flex-col gap-6">
        <NotificationsPanel />
        <QuickActions />
      </aside>
    </div>
  );
} 