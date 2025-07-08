"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '오성헌', contracts: 12 },
  { name: '김용범', contracts: 8 },
  { name: '엄태섭', contracts: 10 },
  { name: '조진석', contracts: 7 },
];

export default function LawyerPerformanceChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">변호사별 성과</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="contracts" fill="#805ad5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 