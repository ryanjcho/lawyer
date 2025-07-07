export default function UserFinancialsPanel() {
  const financials = [
    { name: '홍길동', paid: '₩10,000,000', outstanding: '₩1,000,000', overdue: '₩500,000' },
    { name: '김철수', paid: '₩8,000,000', outstanding: '₩0', overdue: '₩0' },
    { name: 'Acme Corp', paid: '₩20,000,000', outstanding: '₩2,000,000', overdue: '₩1,000,000' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">사용자/고객사 재무 정보</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">이름/고객사</th>
            <th className="py-2 px-3 font-semibold text-black">총 결제</th>
            <th className="py-2 px-3 font-semibold text-black">미수금</th>
            <th className="py-2 px-3 font-semibold text-black">연체</th>
          </tr>
        </thead>
        <tbody>
          {financials.map((f, idx) => (
            <tr key={f.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{f.name}</td>
              <td className="py-2 px-3 text-black">{f.paid}</td>
              <td className="py-2 px-3 text-black">{f.outstanding}</td>
              <td className="py-2 px-3 text-black">{f.overdue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 