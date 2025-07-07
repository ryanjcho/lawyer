"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: '2024-01', draft: 3, review: 4, complete: 2, overdue: 1 },
  { month: '2024-02', draft: 2, review: 5, complete: 4, overdue: 1 },
  { month: '2024-03', draft: 4, review: 6, complete: 4, overdue: 1 },
  { month: '2024-04', draft: 3, review: 7, complete: 3, overdue: 1 },
  { month: '2024-05', draft: 2, review: 8, complete: 6, overdue: 2 },
  { month: '2024-06', draft: 1, review: 9, complete: 8, overdue: 2 },
];

export default function ContractLifecycleChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">계약 라이프사이클</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="draft" stackId="a" fill="#a0aec0" name="작성" />
          <Bar dataKey="review" stackId="a" fill="#63b3ed" name="검토" />
          <Bar dataKey="complete" stackId="a" fill="#68d391" name="완료" />
          <Bar dataKey="overdue" stackId="a" fill="#fc8181" name="연체" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 