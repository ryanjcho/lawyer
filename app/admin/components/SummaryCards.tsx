export default function SummaryCards() {
  const cards = [
    { label: '총 계약서', value: 128 },
    { label: '진행 중', value: 34 },
    { label: '검토 대기', value: 12 },
    { label: '최종 완료', value: 70 },
    { label: '연체', value: 6 },
    { label: '위험 표시', value: 3 },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-700 mb-2">{card.value}</div>
          <div className="text-gray-600 text-sm font-medium">{card.label}</div>
        </div>
      ))}
    </div>
  );
} 