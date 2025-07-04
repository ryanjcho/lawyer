export default function CriticalContractsPanel() {
  const contracts = [
    { id: 1, name: 'NDA - Acme', client: 'Acme Corp', risk: '높음', due: '2024-07-01', urgent: true },
    { id: 2, name: 'IP 계약 - Delta', client: 'Delta Ltd', risk: '높음', due: '2024-07-03', urgent: false },
    { id: 3, name: 'MSA - Beta', client: 'Beta LLC', risk: '중간', due: '2024-07-02', urgent: true },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="font-bold text-black mb-4">위험/임박 계약</div>
      <ul className="space-y-2">
        {contracts.map(c => (
          <li key={c.id} className="flex items-center gap-4">
            <span className="font-semibold text-black">{c.name}</span>
            <span className="text-gray-600">({c.client})</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${c.risk === '높음' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{c.risk}</span>
            <span className="text-black">{c.due}</span>
            {c.urgent && <span className="ml-2 px-2 py-1 text-xs font-bold rounded-full bg-orange-200 text-orange-800">임박</span>}
          </li>
        ))}
      </ul>
    </div>
  );
} 