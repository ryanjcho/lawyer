export default function WorkloadOverview() {
  const lawyers = [
    { name: '김변호사', count: 7 },
    { name: '이변호사', count: 3 },
    { name: '박변호사', count: 5 },
  ];
  const max = Math.max(...lawyers.map(l => l.count));
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">변호사별 업무량</div>
      <ul className="space-y-2">
        {lawyers.map(lawyer => (
          <li key={lawyer.name} className="flex items-center">
            <span className="w-24 text-black">{lawyer.name}</span>
            <div className="flex-1 bg-gray-100 rounded h-4 mx-2">
              <div className="bg-blue-500 h-4 rounded" style={{ width: `${(lawyer.count / max) * 100}%` }}></div>
            </div>
            <span className="ml-2 text-black font-semibold">{lawyer.count}건</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 