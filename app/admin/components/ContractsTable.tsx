"use client";
import { FaEye, FaEdit, FaUserCheck, FaComments, FaHistory } from 'react-icons/fa';
import { useState } from 'react';
import { HiOutlineDocumentText, HiOutlinePencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const statusMap = {
  'awaiting_ai': { label: 'AI 검토 대기', color: 'bg-yellow-100 text-yellow-800' },
  'ai_complete': { label: 'AI 검토 완료', color: 'bg-blue-100 text-blue-800' },
  'lawyer_review': { label: '변호사 검토 중', color: 'bg-indigo-100 text-indigo-800' },
  'drafting': { label: '작성 중', color: 'bg-purple-100 text-purple-800' },
  'needs_info': { label: '추가 정보 필요', color: 'bg-red-100 text-red-800' },
  'complete': { label: '완료', color: 'bg-green-100 text-green-800' },
};

const typeMap = {
  'review': { label: '검토', icon: <HiOutlineDocumentText className="inline mr-1 text-blue-500" /> },
  'draft': { label: '작성', icon: <HiOutlinePencilAlt className="inline mr-1 text-purple-500" /> },
};

const mockContracts = [
  { id: 'C-2024-001', name: 'NDA - Acme', client: 'Acme Corp', type: 'review', status: 'awaiting_ai', lastUpdated: '2024-07-01', lawyer: 'Jane Smith', keyDate: '2024-07-03', urgent: false },
  { id: 'C-2024-002', name: 'MSA - Beta', client: 'Beta LLC', type: 'draft', status: 'ai_complete', lastUpdated: '2024-06-30', lawyer: 'John Doe', keyDate: '2024-07-10', urgent: true },
  { id: 'C-2024-003', name: 'SLA - Gamma', client: 'Gamma Inc', type: 'review', status: 'lawyer_review', lastUpdated: '2024-06-29', lawyer: 'Emily Lee', keyDate: '2024-07-05', urgent: false },
  { id: 'C-2024-004', name: 'Consulting - Delta', client: 'Delta Partners', type: 'draft', status: 'needs_info', lastUpdated: '2024-06-28', lawyer: 'Jane Smith', keyDate: '2024-07-07', urgent: true },
  { id: 'C-2024-005', name: 'IP Agreement - Epsilon', client: 'Epsilon Ltd', type: 'review', status: 'complete', lastUpdated: '2024-06-25', lawyer: 'John Doe', keyDate: '2024-06-30', urgent: false },
];

type ContractsTableProps = { limit?: number };
export default function ContractsTable({ limit }: ContractsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const router = useRouter();

  // Filter and sort logic (mock)
  let filtered = mockContracts.filter(c =>
    (statusFilter === 'all' || c.status === statusFilter) &&
    (c.id.includes(search) || c.name.includes(search) || c.client.includes(search))
  );
  filtered = filtered.sort((a, b) => {
    if (sortBy === 'lastUpdated') {
      return sortDir === 'asc'
        ? a.lastUpdated.localeCompare(b.lastUpdated)
        : b.lastUpdated.localeCompare(a.lastUpdated);
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="계약 ID, 이름, 고객사 검색..."
          className="border rounded px-3 py-2 w-full md:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full md:w-48"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">전체 상태</option>
          {Object.entries(statusMap).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">정렬:</span>
          <button
            className={`px-2 py-1 rounded ${sortBy === 'lastUpdated' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setSortBy('lastUpdated')}
          >최종 수정일</button>
          <button
            className="px-2 py-1 rounded border border-gray-200"
            onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
            title="정렬 방향 변경"
          >{sortDir === 'asc' ? '▲' : '▼'}</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-black border-b">
              <th className="py-2 px-3 font-semibold">ID</th>
              <th className="py-2 px-3 font-semibold">계약명/구분</th>
              <th className="py-2 px-3 font-semibold">고객사</th>
              <th className="py-2 px-3 font-semibold">상태</th>
              <th className="py-2 px-3 font-semibold">최종 수정일</th>
              <th className="py-2 px-3 font-semibold">담당 변호사</th>
              <th className="py-2 px-3 font-semibold">주요 일정</th>
              <th className="py-2 px-3 font-semibold">작업</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-400">계약이 없습니다.</td>
              </tr>
            ) : filtered.slice(0, limit ?? filtered.length).map((c, idx) => (
              <tr
                key={c.id}
                className={`border-b transition-colors ${c.urgent ? 'bg-red-50' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 cursor-pointer`}
                tabIndex={0}
                title="상세 보기"
                onClick={() => window.open(`/admin/contracts/${c.id}`, '_blank')}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') window.open(`/admin/contracts/${c.id}`, '_blank'); }}
                role="button"
                aria-label={`계약 상세 보기: ${c.name}`}
              >
                <td className="py-2 px-3 font-mono font-bold text-black">{c.id}</td>
                <td className="py-2 px-3 font-semibold text-black flex items-center gap-2">
                  {typeMap[c.type].icon}
                  {c.name}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">{typeMap[c.type].label}</span>
                </td>
                <td className="py-2 px-3 text-black">{c.client}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[c.status].color}`}>{statusMap[c.status].label}</span>
                </td>
                <td className="py-2 px-3 text-black">{c.lastUpdated}</td>
                <td className="py-2 px-3 text-black">{c.lawyer}</td>
                <td className="py-2 px-3 text-black">{c.keyDate}</td>
                <td className="py-2 px-3 flex gap-2 items-center">
                  <FaEye size={16} className="text-blue-600" />
                  <button title="수정" className="text-green-600 hover:text-green-900"><FaEdit size={16} /></button>
                  <button title="배정" className="text-indigo-600 hover:text-indigo-900"><FaUserCheck size={16} /></button>
                  <button title="메시지" className="text-yellow-600 hover:text-yellow-900"><FaComments size={16} /></button>
                  <button title="타임라인" className="text-gray-600 hover:text-gray-900"><FaHistory size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 