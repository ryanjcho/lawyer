"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jane Smith', contracts: 12 },
  { name: 'John Doe', contracts: 8 },
  { name: 'Emily Lee', contracts: 10 },
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