"use client";

import { useState, useEffect } from 'react';
import { lawyers } from '../mock/lawyers';
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

export default function TopLawyersTable() {
  const [contracts, setContracts] = useState<ContractType[]>([]);
  const [lawyerStats, setLawyerStats] = useState<any[]>([]);
  const mockContracts = generateMockContracts();
  useEffect(() => {
    setContracts(mockContracts);
    const stats = lawyers.map(lawyer => ({
      ...lawyer,
      contracts: mockContracts.filter(c => c.lawyer === lawyer.name).length,
    })).sort((a, b) => b.contracts - a.contracts).slice(0, 5);
    setLawyerStats(stats);
  }, [mockContracts]);
  if (contracts.length === 0) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }
  if (lawyerStats.length === 0) {
    return <div className="py-12 text-center text-gray-400">데이터 없음</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <div className="font-bold text-black mb-2">상위 변호사</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold">이름</th>
            <th className="py-2 px-3 font-semibold">팀</th>
            <th className="py-2 px-3 font-semibold">계약 수</th>
          </tr>
        </thead>
        <tbody>
          {lawyerStats?.length === 0 ? (
            <tr><td colSpan={3} className="py-8 text-center text-gray-400">데이터 없음</td></tr>
          ) : lawyerStats?.map((l, idx) => (
            <tr key={l.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{l.name}</td>
              <td className="py-2 px-3 text-black">{l.team}</td>
              <td className="py-2 px-3 text-black">{l.contracts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 