"use client";
import { useState } from 'react';
import { lawyers } from '../mock/lawyers';
import { clients } from '../mock/clients';

export default function AnalyticsFilters({ onChange }: { onChange?: (filters: any) => void }) {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [type, setType] = useState('all');
  const [lawyer, setLawyer] = useState('all');
  const [client, setClient] = useState('all');
  const [risk, setRisk] = useState('all');
  const [status, setStatus] = useState('all');

  const handleChange = () => {
    const filters = { dateRange, type, lawyer, client, risk, status };
    onChange && onChange(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
      <input
        className="border rounded px-3 py-2 text-black"
        placeholder="시작일"
        type="date"
        value={dateRange.from}
        onChange={e => { setDateRange({ ...dateRange, from: e.target.value }); handleChange(); }}
      />
      <input
        className="border rounded px-3 py-2 text-black"
        placeholder="종료일"
        type="date"
        value={dateRange.to}
        onChange={e => { setDateRange({ ...dateRange, to: e.target.value }); handleChange(); }}
      />
      <select className="border rounded px-3 py-2 text-black" value={type} onChange={e => { setType(e.target.value); handleChange(); }}>
        <option value="all">계약 유형 전체</option>
        <option value="review">검토</option>
        <option value="draft">작성</option>
      </select>
      <select className="border rounded px-3 py-2 text-black" value={lawyer} onChange={e => { setLawyer(e.target.value); handleChange(); }}>
        <option value="all">변호사 전체</option>
        {lawyers.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
      </select>
      <select className="border rounded px-3 py-2 text-black" value={client} onChange={e => { setClient(e.target.value); handleChange(); }}>
        <option value="all">고객사 전체</option>
        {clients.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
      </select>
      <select className="border rounded px-3 py-2 text-black" value={risk} onChange={e => { setRisk(e.target.value); handleChange(); }}>
        <option value="all">위험도 전체</option>
        <option value="low">낮음</option>
        <option value="medium">중간</option>
        <option value="high">높음</option>
      </select>
      <select className="border rounded px-3 py-2 text-black" value={status} onChange={e => { setStatus(e.target.value); handleChange(); }}>
        <option value="all">상태 전체</option>
        <option value="pending">진행 중</option>
        <option value="overdue">연체</option>
        <option value="complete">완료</option>
      </select>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleChange}>필터 적용</button>
    </div>
  );
} 