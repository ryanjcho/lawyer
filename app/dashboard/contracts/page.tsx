import { useSession } from 'next-auth/react';
import { EyeIcon, ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/24/outline';
import React from 'react';

const typeColors = {
  '검토': 'bg-purple-100 text-purple-800',
  '작성': 'bg-gray-200 text-gray-800',
};

const statusColors = {
  '진행 중': 'bg-blue-100 text-blue-800',
  '검토 대기': 'bg-yellow-100 text-yellow-800',
  '최종 완료': 'bg-green-100 text-green-800',
};

const contracts = [
  { id: '1024', name: 'NDA_2024.pdf', type: '검토', status: '진행 중', lastUpdated: '2024-06-29', lawyer: '홍길동', keyDates: '2024-07-01', fileUrl: '/files/NDA_2024.pdf', urgent: false },
  { id: '1019', name: '서비스 계약서', type: '작성', status: '검토 대기', lastUpdated: '2024-06-28', lawyer: '김변호사', keyDates: '2024-07-03', fileUrl: '/files/Service_Agreement.pdf', urgent: true },
  { id: '1012', name: '용역 계약서', type: '검토', status: '최종 완료', lastUpdated: '2024-06-25', lawyer: '이변호사', keyDates: '2024-07-10', fileUrl: '/files/Work_Contract.pdf', urgent: false },
];

export default function DashboardContractsPage() {
  const { data: session } = useSession();
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black mb-1">내 계약서</h1>
          <div className="text-gray-600 text-sm">{session?.user?.name ? `${session.user.name}님의 계약 현황입니다.` : '내 계약 현황을 확인하세요.'}</div>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
          <PlusIcon className="w-5 h-5 mr-2" /> 계약서 업로드
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-black border-b">
              <th className="py-2 px-3 font-semibold text-black">계약 ID</th>
              <th className="py-2 px-3 font-semibold text-black">계약명</th>
              <th className="py-2 px-3 font-semibold text-black">구분</th>
              <th className="py-2 px-3 font-semibold text-black">상태</th>
              <th className="py-2 px-3 font-semibold text-black">최종 수정일</th>
              <th className="py-2 px-3 font-semibold text-black">담당 변호사</th>
              <th className="py-2 px-3 font-semibold text-black">주요 일정</th>
              <th className="py-2 px-3 font-semibold text-black">작업</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, idx) => (
              <tr
                key={c.id}
                className={`border-b transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 ${c.urgent ? 'bg-red-50' : ''}`}
              >
                <td className="py-2 px-3 font-mono font-bold text-black">{c.id}</td>
                <td className="py-2 px-3 font-semibold text-black">{c.name}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[c.type] || 'bg-gray-100 text-gray-800'}`}>{c.type}</span>
                </td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[c.status] || 'bg-gray-100 text-gray-800'}`}>{c.status}</span>
                  {c.urgent && <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs">긴급</span>}
                </td>
                <td className="py-2 px-3 text-black">{c.lastUpdated}</td>
                <td className="py-2 px-3 text-black">{c.lawyer}</td>
                <td className="py-2 px-3 text-black">{c.keyDates}</td>
                <td className="py-2 px-3 flex gap-3 items-center">
                  {c.fileUrl && (
                    <a href={c.fileUrl} download className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1" title="다운로드"><ArrowDownTrayIcon className="w-4 h-4" /></a>
                  )}
                  <button title="계약 보기" className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"><EyeIcon className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 