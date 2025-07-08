"use client";
import { useState } from 'react';
import { lawyers } from '../mock/lawyers';
import { clients } from '../mock/clients';

export default function AnalyticsFilters({ onChange }: { onChange?: (filters: any) => void }) {
  // Use empty string as default, only set date in event handlers
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [type, setType] = useState('all');
  const [lawyer, setLawyer] = useState('all');
  const [client, setClient] = useState('all');
  const [risk, setRisk] = useState('all');
  const [status, setStatus] = useState('all');

  const presetFilters = [
    { label: '이번 주', value: 'this-week' },
    { label: '이번 달', value: 'this-month' },
    { label: '이번 분기', value: 'this-quarter' },
    { label: '올해', value: 'this-year' },
  ];

  const handleChange = () => {
    const filters = { dateRange, type, lawyer, client, risk, status };
    onChange && onChange(filters);
  };

  const applyPreset = (preset: string) => {
    // Only use new Date() here, not for initial state
    const today = new Date();
    let from = new Date();
    
    switch (preset) {
      case 'this-week':
        from.setDate(today.getDate() - 7);
        break;
      case 'this-month':
        from.setMonth(today.getMonth() - 1);
        break;
      case 'this-quarter':
        from.setMonth(today.getMonth() - 3);
        break;
      case 'this-year':
        from.setFullYear(today.getFullYear() - 1);
        break;
    }
    
    setDateRange({
      from: from.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0]
    });
    handleChange();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">필터 및 검색</h3>
        <button 
          onClick={() => {
            setDateRange({ from: '', to: '' });
            setType('all');
            setLawyer('all');
            setClient('all');
            setRisk('all');
            setStatus('all');
            handleChange();
          }}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          필터 초기화
        </button>
      </div>
      
      {/* Preset Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {presetFilters.map((preset) => (
          <button
            key={preset.value}
            onClick={() => applyPreset(preset.value)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="date"
            value={dateRange.from}
            onChange={e => { setDateRange({ ...dateRange, from: e.target.value }); handleChange(); }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="date"
            value={dateRange.to}
            onChange={e => { setDateRange({ ...dateRange, to: e.target.value }); handleChange(); }}
          />
        </div>
      </div>

      {/* Other Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">계약 유형</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            value={type} 
            onChange={e => { setType(e.target.value); handleChange(); }}
          >
            <option value="all">전체</option>
            <option value="review">검토</option>
            <option value="draft">작성</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">담당 변호사</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            value={lawyer} 
            onChange={e => { setLawyer(e.target.value); handleChange(); }}
          >
            <option value="all">전체</option>
            {lawyers.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">고객사</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            value={client} 
            onChange={e => { setClient(e.target.value); handleChange(); }}
          >
            <option value="all">전체</option>
            {clients.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">위험도</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            value={risk} 
            onChange={e => { setRisk(e.target.value); handleChange(); }}
          >
            <option value="all">전체</option>
            <option value="low">낮음</option>
            <option value="medium">중간</option>
            <option value="high">높음</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
          <select 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            value={status} 
            onChange={e => { setStatus(e.target.value); handleChange(); }}
          >
            <option value="all">전체</option>
            <option value="pending">진행 중</option>
            <option value="overdue">연체</option>
            <option value="complete">완료</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            onClick={handleChange}
          >
            필터 적용
          </button>
        </div>
      </div>
    </div>
  );
} 