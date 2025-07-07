export default function OverviewPanel() {
  const stats = [
    { label: '검토 대기', value: 5 },
    { label: '연체 계약', value: 2 },
    { label: '위험 계약', value: 1 },
    { label: '전체 계약 금액', value: '₩120,000,000' },
    { label: '이번 달 수익', value: '₩18,000,000' },
    { label: '미수금', value: '₩2,500,000' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {stats.map((card) => (
        <div key={card.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-700 mb-2">{card.value}</div>
          <div className="text-black text-sm font-medium">{card.label}</div>
        </div>
      ))}
    </div>
  );
} 