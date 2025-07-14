export default function RiskAlerts() {
  const alerts = [
    { id: '1', name: 'NDA - Acme', client: 'Acme Corp', risk: '높음' },
    { id: '4', name: 'IP 계약 - Delta', client: 'Delta Ltd', risk: '높음' },
  ];
  return (
    <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 mb-6">
      <div className="font-bold text-red-700 mb-2">위험 계약 알림</div>
      <ul className="space-y-2">
        {alerts.map(a => (
          <li key={a.id} className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-black">{a.name}</span>
              <span className="ml-2 text-gray-600">({a.client})</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">{a.risk}</span>
            </div>
            <button className="text-blue-600 hover:underline text-sm">바로가기</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 