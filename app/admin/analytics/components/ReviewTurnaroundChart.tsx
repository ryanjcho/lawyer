"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '2024-01', avgDays: 4.2 },
  { month: '2024-02', avgDays: 3.8 },
  { month: '2024-03', avgDays: 3.5 },
  { month: '2024-04', avgDays: 3.2 },
  { month: '2024-05', avgDays: 2.9 },
  { month: '2024-06', avgDays: 2.7 },
];

export default function ReviewTurnaroundChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">월별 평균 검토/작성 소요 시간</div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="avgDays" stroke="#f6ad55" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 