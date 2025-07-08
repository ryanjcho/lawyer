'use client';

import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide sidebar on contract details page
  const hideSidebar = /^\/dashboard\/contracts\/[^/]+$/.test(pathname || '');
  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 bg-white p-8">{children}</main>
    </div>
  );
} 