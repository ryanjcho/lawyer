"use client";

import { useState, useEffect } from 'react';
import { clients } from '../mock/clients';
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

export default function TopClientsTable() {
  const [contracts, setContracts] = useState<ContractType[] | null>(null);
  const [clientStats, setClientStats] = useState<any[] | null>(null);
  useEffect(() => {
    setContracts(mockContracts);
    const stats = clients.map(client => ({
      ...client,
      contracts: mockContracts.filter(c => c.client === client.name).length,
    })).sort((a, b) => b.contracts - a.contracts).slice(0, 5);
    setClientStats(stats);
  }, []);
  if (!contracts) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <div className="font-bold text-black mb-2">상위 고객사</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold">고객사</th>
            <th className="py-2 px-3 font-semibold">산업</th>
            <th className="py-2 px-3 font-semibold">계약 수</th>
          </tr>
        </thead>
        <tbody>
          {clientStats === null ? (
            <tr><td colSpan={3} className="py-8 text-center text-gray-400">로딩 중...</td></tr>
          ) : clientStats.length === 0 ? (
            <tr><td colSpan={3} className="py-8 text-center text-gray-400">데이터 없음</td></tr>
          ) : clientStats.map((c, idx) => (
            <tr key={c.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{c.name}</td>
              <td className="py-2 px-3 text-black">{c.industry}</td>
              <td className="py-2 px-3 text-black">{c.contracts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 