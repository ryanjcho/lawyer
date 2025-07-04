export default function UserPerformanceMetrics() {
  const metrics = [
    { name: '김변호사', assigned: 7, completed: 12, overdue: 1, avgTime: '3.1일' },
    { name: '이변호사', assigned: 3, completed: 8, overdue: 0, avgTime: '2.8일' },
    { name: '박변호사', assigned: 5, completed: 10, overdue: 2, avgTime: '3.5일' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">변호사 성과 지표</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">이름</th>
            <th className="py-2 px-3 font-semibold text-black">할당</th>
            <th className="py-2 px-3 font-semibold text-black">완료</th>
            <th className="py-2 px-3 font-semibold text-black">연체</th>
            <th className="py-2 px-3 font-semibold text-black">평균 검토 시간</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m, idx) => (
            <tr key={m.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{m.name}</td>
              <td className="py-2 px-3 text-black">{m.assigned}</td>
              <td className="py-2 px-3 text-black">{m.completed}</td>
              <td className="py-2 px-3 text-black">{m.overdue}</td>
              <td className="py-2 px-3 text-black">{m.avgTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 