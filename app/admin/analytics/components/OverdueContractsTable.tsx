"use client";

import { useState, useEffect } from 'react';
import { generateMockContracts } from '../mock/contracts';

interface ContractType {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  lastUpdated: string;
  lawyer: string;
  keyDate: string;
  urgent: boolean;
  riskLevel: string;
  value: number;
  tags: string[];
  clientContact: string;
  estimatedCompletion: string;
  slaDeadline: string;
  createdAt: string;
  completedAt: string | null;
  slaViolated: boolean;
  risk: string;
}

const mockContracts = generateMockContracts();

export default function OverdueContractsTable() {
  const [contracts, setContracts] = useState<ContractType[] | null>(null);
  useEffect(() => {
    setContracts(mockContracts);
  }, []);
  if (!contracts) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }
  const fixedNow = new Date('2024-07-07T09:00:00+09:00');
  const overdueContracts = contracts
    .filter(c => c.status === 'overdue')
    .map(c => ({
      ...c,
      daysOverdue: Math.max(0, Math.floor((fixedNow.getTime() - new Date(c.completedAt || c.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
    }))
    .sort((a, b) => b.daysOverdue - a.daysOverdue)
    .slice(0, 5);

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