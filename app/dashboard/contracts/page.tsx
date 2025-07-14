'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  UserIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const mockContracts = [
  {
    id: 'C-2024-001',
    name: 'NDA_2024.pdf',
    type: '검토',
    status: '진행 중',
    lastUpdated: '2024-07-01',
    lawyer: '김변호사',
    nextAction: '피드백 확인',
    progress: 75,
    priority: 'high',
    estimatedCompletion: '2024-07-05',
    pagesReviewed: 8,
    totalPages: 12,
    issuesFound: 3,
    qualityScore: null,
    riskScore: null
  },
  {
    id: 'C-2024-002',
    name: '서비스 계약서',
    type: '작성',
    status: '완료',
    lastUpdated: '2024-06-28',
    lawyer: '이변호사',
    nextAction: '없음',
    progress: 100,
    priority: 'medium',
    estimatedCompletion: '2024-06-28',
    pagesReviewed: 15,
    totalPages: 15,
    issuesFound: 0,
    qualityScore: 4.8,
    riskScore: '낮음'
  },
  {
    id: 'C-2024-003',
    name: '용역 계약서',
    type: '검토',
    status: '검토 대기',
    lastUpdated: '2024-06-27',
    lawyer: '박변호사',
    nextAction: '자료 업로드',
    progress: 0,
    priority: 'low',
    estimatedCompletion: '2024-07-10',
    pagesReviewed: 0,
    totalPages: 8,
    issuesFound: 0,
    qualityScore: null,
    riskScore: null
  },
  {
    id: 'C-2024-004',
    name: '매매 계약서_v2.pdf',
    type: '검토',
    status: '진행 중',
    lastUpdated: '2024-07-01',
    lawyer: '최변호사',
    nextAction: '변호사 검토 중',
    progress: 45,
    priority: 'medium',
    estimatedCompletion: '2024-07-07',
    pagesReviewed: 5,
    totalPages: 11,
    issuesFound: 1,
    qualityScore: null,
    riskScore: null
  }
];

export default function ContractsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [priorityFilter, setPriorityFilter] = useState('전체');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const router = useRouter();

  const filteredContracts = mockContracts.filter(c =>
    (statusFilter === '전체' || c.status === statusFilter) &&
    (typeFilter === '전체' || c.type === typeFilter) &&
    (priorityFilter === '전체' || c.priority === priorityFilter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || 
     c.type.toLowerCase().includes(search.toLowerCase()) ||
     c.lawyer.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행 중': return 'bg-blue-100 text-blue-700';
      case '완료': return 'bg-green-100 text-green-700';
      case '검토 대기': return 'bg-yellow-100 text-yellow-700';
      case '지연': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '긴급';
      case 'medium': return '보통';
      case 'low': return '일반';
      default: return '일반';
    }
  };

  return (
    <div>
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">내 계약서</h1>
        <div className="flex gap-2">
          <Link href="/upload" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            <PlusIcon className="w-5 h-5 mr-1" /> 새 계약 요청
          </Link>
          <Link href="/dashboard/contracts/bulk-upload" className="inline-flex items-center px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">
            <ArrowDownTrayIcon className="w-5 h-5 mr-1" /> 계약서 일괄 업로드
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="flex items-center bg-gray-50 rounded px-3 py-2 flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="계약서명, 유형, 담당변호사 검색"
              className="bg-transparent outline-none flex-1"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <select
                className="border rounded px-3 py-2 text-sm"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="전체">상태 전체</option>
                <option value="진행 중">진행 중</option>
                <option value="완료">완료</option>
                <option value="검토 대기">검토 대기</option>
                <option value="지연">지연</option>
              </select>
            </div>

            <select
              className="border rounded px-3 py-2 text-sm"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="전체">유형 전체</option>
              <option value="검토">검토</option>
              <option value="작성">작성</option>
            </select>

            <select
              className="border rounded px-3 py-2 text-sm"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              <option value="전체">우선순위 전체</option>
              <option value="high">긴급</option>
              <option value="medium">보통</option>
              <option value="low">일반</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}
            >
              <DocumentTextIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded ${viewMode === 'cards' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <div className="text-sm text-gray-600">
          총 {filteredContracts.length}개의 계약서 (전체 {mockContracts.length}개)
        </div>
      </div>

      {/* Contracts Display */}
      {filteredContracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <span className="text-4xl mb-4">📄</span>
          <div className="text-lg font-semibold mb-2">검색 결과가 없습니다.</div>
          <div className="mb-4">다른 검색어나 필터를 시도해보세요.</div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setSearch('');
                setStatusFilter('전체');
                setTypeFilter('전체');
                setPriorityFilter('전체');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              필터 초기화
            </button>
            <Link href="/upload" className="px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">
              새 계약 요청
            </Link>
          </div>
        </div>
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-black border-b">
                <th className="py-3 px-4 font-semibold">계약서명</th>
                <th className="py-3 px-4 font-semibold">유형</th>
                <th className="py-3 px-4 font-semibold">상태</th>
                <th className="py-3 px-4 font-semibold">진행률</th>
                <th className="py-3 px-4 font-semibold">담당 변호사</th>
                <th className="py-3 px-4 font-semibold">우선순위</th>
                <th className="py-3 px-4 font-semibold">예상 완료</th>
                <th className="py-3 px-4 font-semibold">다음 조치</th>
                <th className="py-3 px-4 font-semibold">작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map(contract => (
                <tr
                  key={contract.id}
                  className="border-b hover:bg-indigo-50 transition-colors cursor-pointer"
                  onClick={() => window.open(`/dashboard/contracts/${contract.id}`, '_blank')}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium text-black">{contract.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-black">{contract.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${contract.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{contract.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-black">{contract.lawyer}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(contract.priority)}`}>
                      {getPriorityLabel(contract.priority)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-black">{contract.estimatedCompletion}</td>
                  <td className="py-3 px-4 text-black font-semibold">{contract.nextAction}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link 
                        href={`/dashboard/contracts/${contract.id}`} 
                        className="text-indigo-600 hover:underline text-sm font-medium"
                        onClick={e => e.stopPropagation()}
                      >
                        상세 보기
                      </Link>
                      <button className="text-gray-600 hover:text-gray-800 text-sm" onClick={e => e.stopPropagation()}>
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map(contract => (
            <div key={contract.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900 truncate">{contract.name}</h3>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>진행률</span>
                    <span>{contract.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${contract.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">유형:</span>
                    <span className="font-medium">{contract.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">담당:</span>
                    <span className="font-medium">{contract.lawyer}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">우선순위:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getPriorityColor(contract.priority)}`}>
                      {getPriorityLabel(contract.priority)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">예상 완료:</span>
                    <span className="font-medium">{contract.estimatedCompletion}</span>
                  </div>
                </div>

                {/* Quality Score (if completed) */}
                {contract.qualityScore && (
                  <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">품질 점수: {contract.qualityScore}</span>
                    {contract.riskScore && (
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        contract.riskScore === '낮음' ? 'bg-green-100 text-green-700' :
                        contract.riskScore === '중간' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        위험도: {contract.riskScore}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Link 
                    href={`/dashboard/contracts/${contract.id}`}
                    className="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded text-sm font-medium hover:bg-indigo-200 transition-colors text-center"
                  >
                    상세 보기
                  </Link>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 