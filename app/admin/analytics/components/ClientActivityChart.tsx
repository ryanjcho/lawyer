"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Acme Corp', contracts: 8 },
  { name: 'Beta LLC', contracts: 6 },
  { name: 'Gamma Inc', contracts: 5 },
];

export default function ClientActivityChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">고객사별 활동</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="contracts" fill="#4299e1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 