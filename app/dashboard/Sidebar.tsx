import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HomeIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, CreditCardIcon, LifebuoyIcon, ClockIcon } from '@heroicons/react/24/outline';

const navItems = [
  { key: 'overview', label: '홈', icon: HomeIcon },
  { key: 'contracts', label: '내 계약서', icon: DocumentTextIcon },
  { key: 'messages', label: '메시지 & 알림', icon: ChatBubbleLeftRightIcon },
  { key: 'billing', label: '결제 및 계정', icon: CreditCardIcon },
  { key: 'support', label: '지원 & 자료실', icon: LifebuoyIcon },
  { key: 'activity', label: '활동 내역', icon: ClockIcon },
];

type SectionKey = 'overview' | 'contracts' | 'messages' | 'billing';
export default function Sidebar({ activeSection, setActiveSection }: {
  activeSection: SectionKey;
  setActiveSection: (key: SectionKey) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync tab with URL
  useEffect(() => {
    if (searchParams) {
      const tab = searchParams.get('tab');
      if (tab && tab !== activeSection) {
        setActiveSection(tab as SectionKey);
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const handleNavClick = (key: string) => {
    setActiveSection(key as SectionKey);
    if (searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', key);
      router.replace(`?${params.toString()}`);
    }
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <div className="mb-10 text-xl font-bold tracking-tight text-indigo-700">대시보드</div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded font-medium transition-colors border-l-4 ${
                  activeSection === item.key
                    ? 'bg-indigo-50 text-indigo-700 font-bold border-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600 border-transparent'
                }`}
                onClick={() => handleNavClick(item.key)}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.key ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 