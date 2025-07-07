import Link from 'next/link';

export default function Sidebar() {
  const navItems = [
    { name: '대시보드', href: '/admin/dashboard' },
    { name: '계약서', href: '/admin/contracts' },
    { name: '분석', href: '/admin/analytics' },
    { name: '사용자', href: '/admin/users' },
    { name: '감사 로그', href: '/admin/audit-log' },
    { name: '설정', href: '/admin/settings' },
  ];
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <div className="mb-10 text-xl font-bold tracking-tight text-black">관리자 패널</div>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-gray-700 hover:text-blue-600 font-medium">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 