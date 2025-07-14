export default function UpcomingDeadlines() {
  const deadlines = [
    { id: '1', name: 'NDA - Acme', client: 'Acme Corp', due: '2024-07-01' },
    { id: '2', name: 'MSA - Beta', client: 'Beta LLC', due: '2024-07-10' },
  ];
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 mb-6">
      <div className="font-bold text-yellow-700 mb-2">임박 마감 계약</div>
      <ul className="space-y-2">
        {deadlines.map(d => (
          <li key={d.id} className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-black">{d.name}</span>
              <span className="ml-2 text-gray-600">({d.client})</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">{d.due}</span>
            </div>
            <button className="text-blue-600 hover:underline text-sm">바로가기</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 