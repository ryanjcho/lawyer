"use client";

import { contracts } from '../mock/contracts';

const overdueContracts = contracts
  .filter(c => c.status === 'overdue')
  .map(c => ({
    ...c,
    daysOverdue: Math.max(0, Math.floor((new Date().getTime() - new Date(c.completedAt || c.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
  }))
  .sort((a, b) => b.daysOverdue - a.daysOverdue)
  .slice(0, 5);

export default function OverdueContractsTable() {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <div className="font-bold text-black mb-2">상위 연체 계약</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold">계약명</th>
            <th className="py-2 px-3 font-semibold">고객사</th>
            <th className="py-2 px-3 font-semibold">담당 변호사</th>
            <th className="py-2 px-3 font-semibold">마감일</th>
            <th className="py-2 px-3 font-semibold">연체일</th>
          </tr>
        </thead>
        <tbody>
          {overdueContracts.length === 0 ? (
            <tr><td colSpan={5} className="py-8 text-center text-gray-400">연체 계약 없음</td></tr>
          ) : overdueContracts.map((c, idx) => (
            <tr key={c.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{c.id}</td>
              <td className="py-2 px-3 text-black">{c.client}</td>
              <td className="py-2 px-3 text-black">{c.lawyer}</td>
              <td className="py-2 px-3 text-black">{c.completedAt || c.createdAt}</td>
              <td className="py-2 px-3 text-black">{c.daysOverdue}일</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 