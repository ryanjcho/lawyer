"use client";
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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

const data = [
  { month: '2024-01', contracts: 10 },
  { month: '2024-02', contracts: 12 },
  { month: '2024-03', contracts: 15 },
  { month: '2024-04', contracts: 14 },
  { month: '2024-05', contracts: 18 },
  { month: '2024-06', contracts: 20 },
];

export default function ContractVolumeChart() {
  const [contracts, setContracts] = useState<ContractType[] | null>(null);
  const [data, setData] = useState<{ month: string; contracts: number }[]>([]);
  useEffect(() => {
    setContracts(mockContracts);
    // Aggregate contracts by month
    const monthMap = {};
    mockContracts.forEach(c => {
      const month = c.createdAt?.slice(0, 7) || 'Unknown';
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    const chartData = Object.entries(monthMap).map(([month, count]) => ({ month, contracts: count as number }));
    setData(chartData);
  }, []);
  if (!contracts) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">월별 계약 건수</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="contracts" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 