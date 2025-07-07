"use client";

import { clients } from '../mock/clients';
import { contracts } from '../mock/contracts';

const clientStats = clients.map(client => ({
  ...client,
  contracts: contracts.filter(c => c.client === client.name).length,
})).sort((a, b) => b.contracts - a.contracts).slice(0, 5);

export default function TopClientsTable() {
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
          {clientStats.length === 0 ? (
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