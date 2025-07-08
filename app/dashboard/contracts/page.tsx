'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, ArrowDownTrayIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const mockContracts = [
  {
    id: 'C-2024-001',
    name: 'NDA_2024.pdf',
    type: '검토',
    status: '진행 중',
    lastUpdated: '2024-07-01',
    lawyer: '김변호사',
    nextAction: '피드백 확인',
  },
  {
    id: 'C-2024-002',
    name: '서비스 계약서',
    type: '작성',
    status: '완료',
    lastUpdated: '2024-06-28',
    lawyer: '이변호사',
    nextAction: '없음',
  },
  {
    id: 'C-2024-003',
    name: '용역 계약서',
    type: '검토',
    status: '검토 대기',
    lastUpdated: '2024-06-27',
    lawyer: '박변호사',
    nextAction: '자료 업로드',
  },
];

export default function ContractsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const filteredContracts = mockContracts.filter(c =>
    (statusFilter === '전체' || c.status === statusFilter) &&
    (c.name.includes(search) || c.type.includes(search))
  );

  return (
    <div>
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">내 계약서</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/contracts/new" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            <PlusIcon className="w-5 h-5 mr-1" /> 새 계약 요청
          </Link>
          <Link href="/dashboard/contracts/bulk-upload" className="inline-flex items-center px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">
            <ArrowDownTrayIcon className="w-5 h-5 mr-1" /> 계약서 일괄 업로드
          </Link>
        </div>
      </div>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
        <div className="flex items-center bg-gray-50 rounded px-3 py-2 w-full md:w-80">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="계약서명, 유형 검색"
            className="bg-transparent outline-none flex-1"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <select
            className="border rounded px-2 py-1 text-sm"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="진행 중">진행 중</option>
            <option value="완료">완료</option>
            <option value="검토 대기">검토 대기</option>
          </select>
        </div>
      </div>
      {/* Contracts Table */}
      {filteredContracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <span className="text-4xl mb-4">📄</span>
          <div className="text-lg font-semibold mb-2">아직 계약서가 없습니다.</div>
          <div className="mb-4">새 계약을 요청하거나 파일을 업로드해보세요.</div>
          <div className="flex gap-2">
            <Link href="/dashboard/contracts/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">새 계약 요청</Link>
            <Link href="/dashboard/contracts/bulk-upload" className="px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">일괄 업로드</Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-black border-b">
                <th className="py-2 px-3 font-semibold">이름</th>
                <th className="py-2 px-3 font-semibold">유형</th>
                <th className="py-2 px-3 font-semibold">상태</th>
                <th className="py-2 px-3 font-semibold">최근 업데이트</th>
                <th className="py-2 px-3 font-semibold">담당 변호사</th>
                <th className="py-2 px-3 font-semibold">다음 조치</th>
                <th className="py-2 px-3 font-semibold">바로가기</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map(contract => (
                <tr key={contract.id} className="border-b hover:bg-indigo-50 transition-colors cursor-pointer"
                  onClick={() => window.open(`/dashboard/contracts/${contract.id}`, '_blank')}>
                  <td className="py-2 px-3 text-black font-medium">{contract.name}</td>
                  <td className="py-2 px-3 text-black">{contract.type}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      contract.status === '진행 중' ? 'bg-blue-100 text-blue-700' :
                      contract.status === '완료' ? 'bg-green-100 text-green-700' :
                      contract.status === '검토 대기' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                    }`}>{contract.status}</span>
                  </td>
                  <td className="py-2 px-3 text-black">{contract.lastUpdated}</td>
                  <td className="py-2 px-3 text-black">{contract.lawyer}</td>
                  <td className="py-2 px-3 text-black font-semibold">{contract.nextAction}</td>
                  <td className="py-2 px-3" onClick={e => e.stopPropagation()}>
                    <Link href={`/dashboard/contracts/${contract.id}`} className="text-indigo-600 hover:underline text-sm font-medium">상세 보기</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 