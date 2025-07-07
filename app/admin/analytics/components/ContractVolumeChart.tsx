"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { contracts } from '../mock/contracts';

const data = [
  { month: '2024-01', contracts: 10 },
  { month: '2024-02', contracts: 12 },
  { month: '2024-03', contracts: 15 },
  { month: '2024-04', contracts: 14 },
  { month: '2024-05', contracts: 18 },
  { month: '2024-06', contracts: 20 },
];

export default function ContractVolumeChart() {
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