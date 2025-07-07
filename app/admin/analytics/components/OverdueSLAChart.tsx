"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: '2024-01', overdue: 2, sla: 1 },
  { month: '2024-02', overdue: 3, sla: 0 },
  { month: '2024-03', overdue: 1, sla: 2 },
  { month: '2024-04', overdue: 4, sla: 1 },
  { month: '2024-05', overdue: 2, sla: 0 },
  { month: '2024-06', overdue: 3, sla: 1 },
];

export default function OverdueSLAChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">연체/SLA 위반</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="overdue" fill="#f56565" name="연체" />
          <Bar dataKey="sla" fill="#ecc94b" name="SLA 위반" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 