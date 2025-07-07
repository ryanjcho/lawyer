type TeamPerformancePanelProps = { limit?: number };
export default function TeamPerformancePanel({ limit }: TeamPerformancePanelProps) {
  const lawyers = [
    { name: '김변호사', count: 7, avgTime: '3.1일', overdue: 1 },
    { name: '이변호사', count: 3, avgTime: '2.8일', overdue: 0 },
    { name: '박변호사', count: 5, avgTime: '3.5일', overdue: 2 },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="font-bold text-black mb-4">팀 성과</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">변호사</th>
            <th className="py-2 px-3 font-semibold text-black">업무량</th>
            <th className="py-2 px-3 font-semibold text-black">평균 검토 시간</th>
            <th className="py-2 px-3 font-semibold text-black">연체</th>
          </tr>
        </thead>
        <tbody>
          {lawyers.slice(0, limit ?? lawyers.length).map((l, idx) => (
            <tr key={l.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{l.name}</td>
              <td className="py-2 px-3 text-black">{l.count}건</td>
              <td className="py-2 px-3 text-black">{l.avgTime}</td>
              <td className="py-2 px-3 text-black">{l.overdue}건</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 