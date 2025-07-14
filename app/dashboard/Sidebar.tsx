import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CreditCardIcon, LifebuoyIcon, ClockIcon } from '@heroicons/react/24/outline';

const navItems = [
  { key: 'overview', label: '홈', icon: HomeIcon, href: '/dashboard/overview' },
  { key: 'contracts', label: '내 계약서', icon: DocumentTextIcon, href: '/dashboard/contracts' },
  { key: 'messages', label: '메시지 & 알림', icon: ChatBubbleLeftRightIcon, href: '/dashboard/messages' },
  { key: 'billing', label: '결제 및 계정', icon: CreditCardIcon, href: '/dashboard/billing' },
  { key: 'support', label: '지원 & 자료실', icon: LifebuoyIcon, href: '/dashboard/support' },
  { key: 'activity', label: '활동 내역', icon: ClockIcon, href: '/dashboard/activity' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <div className="mb-10 text-xl font-bold tracking-tight text-indigo-700">대시보드</div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded font-medium transition-colors border-l-4 no-underline ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold border-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 border-transparent'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 