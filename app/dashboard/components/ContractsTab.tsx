import React, { useState } from 'react';
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Define contract type
export type Contract = {
  id: string;
  name: string;
  type: string;
  status: string;
  lastUpdated: string;
  lawyer: string;
  keyDates: string;
  fileUrl: string | null;
  urgent?: boolean;
};

const ContractsTab: React.FC = () => {
  // Local state for modal and contract upload
  const [contracts, setContracts] = useState<Contract[]>([
    { id: '1024', name: 'NDA_2024.pdf', type: '검토', status: '견적 결제 완료', lastUpdated: '2024-06-29', lawyer: '홍길동', keyDates: '2024-07-01', fileUrl: null, urgent: false },
    { id: '1019', name: '서비스 계약서', type: '작성', status: '검토 대기', lastUpdated: '2024-06-28', lawyer: '김변호사', keyDates: '2024-07-03', fileUrl: '/files/Service_Agreement.pdf', urgent: true },
    { id: '1012', name: '용역 계약서', type: '검토', status: '최종 완료', lastUpdated: '2024-06-25', lawyer: '이변호사', keyDates: '2024-07-10', fileUrl: '/files/Work_Contract.pdf', urgent: false },
  ]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      // Simulate upload success
      setContracts(prev => prev.map(c =>
        c.id === '1024' // Assuming 1024 is the ID of the contract to update
          ? { ...c, fileUrl: '/files/' + file.name, status: '업로드 완료', lastUpdated: new Date().toISOString().slice(0, 10) }
          : c
      ));
      setUploading(false);
    }, 1200);
  }

  const typeColors: Record<string, string> = {
    '검토': 'bg-purple-100 text-purple-800',
    '작성': 'bg-gray-200 text-gray-800',
  };
  const statusColors: Record<string, string> = {
    '견적 결제 완료': 'bg-blue-100 text-blue-800',
    '진행 중': 'bg-blue-100 text-blue-800',
    '검토 대기': 'bg-yellow-100 text-yellow-800',
    '업로드 완료': 'bg-indigo-100 text-indigo-800',
    '최종 완료': 'bg-green-100 text-green-800',
  };

  // Add mock data for client, payment, lawyer, messages, etc.
  const mockClient = {
    name: '이준호',
    email: 'junho.lee@email.com',
    phone: '010-1234-5678',
  };
  const mockLawyer = {
    name: '홍길동',
    email: 'hong.lawyer@lawkit.com',
    phone: '02-555-1234',
    firm: '로킷 법률사무소',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };
  const mockPayment = {
    amount: 250000,
    status: '결제 완료',
    date: '2024-06-28',
    method: '신용카드',
    receiptUrl: '#',
  };
  const mockMessages = [
    { id: 1, sender: '홍길동', content: '계약서 초안 검토를 시작하겠습니다.', date: '2024-06-29 10:12' },
    { id: 2, sender: '이준호', content: '감사합니다. 일정 내에 부탁드립니다.', date: '2024-06-29 10:15' },
  ];
  const mockTimeline = [
    { label: '견적 요청', date: '2024-06-25', done: true },
    { label: '견적 발송', date: '2024-06-26', done: true },
    { label: '결제 완료', date: '2024-06-28', done: true },
    { label: '계약서 업로드', date: '2024-06-29', done: true },
    { label: '검토 시작', date: '2024-06-30', done: false },
    { label: '검토 완료', date: '', done: false },
  ];
  const mockTags = ['NDA', '긴급', 'IT', '영문'];
  const mockPriority = '높음';
  const mockDescription = '미국 파트너사와의 NDA 계약서 검토 요청. 주요 조항: 비밀유지, 관할법원, 손해배상.';

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2 text-black">내 계약서</h1>
      <div className="mb-6 text-lg text-black font-medium">계약 현황을 한눈에 확인하고, 필요한 작업을 빠르게 진행하세요.</div>
      {/* ...search/filter/export as before... */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input type="text" placeholder="계약명 또는 ID 검색" className="border rounded px-3 py-2 w-full md:w-64 text-black font-semibold placeholder-gray-400" />
        <select className="border rounded px-3 py-2 w-full md:w-40 text-black font-semibold">
          <option className="text-black font-semibold">상태 전체</option>
          <option className="text-black font-semibold">견적 결제 완료</option>
          <option className="text-black font-semibold">진행 중</option>
          <option className="text-black font-semibold">검토 대기</option>
          <option className="text-black font-semibold">업로드 완료</option>
          <option className="text-black font-semibold">최종 완료</option>
        </select>
        <select className="border rounded px-3 py-2 w-full md:w-40 text-black font-semibold">
          <option className="text-black font-semibold">구분 전체</option>
          <option className="text-black font-semibold">검토</option>
          <option className="text-black font-semibold">작성</option>
        </select>
        <select className="border rounded px-3 py-2 w-full md:w-40 text-black font-semibold">
          <option className="text-black font-semibold">담당 변호사 전체</option>
          <option className="text-black font-semibold">홍길동</option>
          <option className="text-black font-semibold">김변호사</option>
          <option className="text-black font-semibold">이변호사</option>
        </select>
        <button className="ml-auto px-4 py-2 bg-gray-100 rounded text-base font-bold text-black hover:bg-gray-200 transition">Export</button>
      </div>
      {/* ...bulk actions, skeletons, empty state as before... */}
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-black border-b">
              <th className="py-2 px-3"><input type="checkbox" title="전체 선택" /></th>
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
                className={`border-b transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-50 ${c.urgent ? 'bg-red-50' : ''}`}
              >
                <td className="py-2 px-3"><input type="checkbox" title="선택" /></td>
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
                  <Link
                    href={`/dashboard/contracts/${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="계약 보기"
                    className="px-3 py-1 bg-indigo-600 text-white rounded shadow text-xs font-semibold hover:bg-indigo-700 transition"
                  >
                    상세보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractsTab; 