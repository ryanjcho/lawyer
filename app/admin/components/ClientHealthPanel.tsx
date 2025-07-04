export default function ClientHealthPanel() {
  const clients = [
    { name: 'Acme Corp', submitted: 8, highRisk: 2, overdue: 1 },
    { name: 'Beta LLC', submitted: 6, highRisk: 1, overdue: 0 },
    { name: 'Gamma Inc', submitted: 5, highRisk: 0, overdue: 0 },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">고객사 건강 상태</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">고객사</th>
            <th className="py-2 px-3 font-semibold text-black">제출 계약</th>
            <th className="py-2 px-3 font-semibold text-black">위험 계약</th>
            <th className="py-2 px-3 font-semibold text-black">연체</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c, idx) => (
            <tr key={c.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{c.name}</td>
              <td className="py-2 px-3 text-black">{c.submitted}</td>
              <td className="py-2 px-3 text-black">{c.highRisk}</td>
              <td className="py-2 px-3 text-black">{c.overdue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 