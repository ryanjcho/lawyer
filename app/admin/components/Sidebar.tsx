"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname() || "";
  
  const navItems = [
    { name: '대시보드', href: '/admin/dashboard' },
    { name: '계약서', href: '/admin/contracts' },
    // { name: '분석', href: '/admin/analytics' },
    // { name: '사용자', href: '/admin/users' },
    // { name: '감사 로그', href: '/admin/auditlog' },
    // { name: '설정', href: '/admin/settings' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <div className="mb-10 text-xl font-bold tracking-tight text-black">관리자 패널</div>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 