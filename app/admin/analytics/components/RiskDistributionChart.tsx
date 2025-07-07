"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '낮음', value: 60 },
  { name: '중간', value: 30 },
  { name: '높음', value: 10 },
];
const COLORS = ['#68d391', '#f6e05e', '#fc8181'];

export default function RiskDistributionChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-bold text-black mb-2">위험도 분포</div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 