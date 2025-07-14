"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { generateMockRevenue } from '../mock/revenue';

const mockRevenue = generateMockRevenue();

export default function RevenueTrendsChart() {
  const [revenue, setRevenue] = useState<{ month: string; value: number }[] | null>(mockRevenue);
  useEffect(() => {
    // setRevenue(generateMockRevenue()); // Remove this line to avoid re-randomizing on mount
  }, []);
  if (!revenue) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">월별 수익 추이</div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={revenue}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#38a169" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 