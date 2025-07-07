"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { revenue } from '../mock/revenue';

export default function RevenueTrendsChart() {
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