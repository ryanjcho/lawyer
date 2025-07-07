"use client";

import Sidebar from '../components/Sidebar';
import BulkUserActions from '../components/BulkUserActions';
import UserDirectoryTable from '../components/UserDirectoryTable';
import UserPerformanceMetrics from '../components/UserPerformanceMetrics';
import ClientHealthPanel from '../components/ClientHealthPanel';
import UserFlagsPanel from '../components/UserFlagsPanel';
import UserAuditTrail from '../components/UserAuditTrail';
import UserFinancialsPanel from '../components/UserFinancialsPanel';
import NotificationsPanel from '../components/NotificationsPanel';

export default function UsersPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-black">사용자 관리</h1>
        <BulkUserActions />
        <UserDirectoryTable />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <UserPerformanceMetrics />
          <ClientHealthPanel />
          <UserFlagsPanel />
          <UserAuditTrail />
          <NotificationsPanel limit={5} />
          <UserFinancialsPanel />
        </div>
      </main>
    </div>
  );
} 