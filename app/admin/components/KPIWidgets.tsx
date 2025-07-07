export default function KPIWidgets() {
  const kpis = [
    { label: '평균 처리 시간', value: '3.2일' },
    { label: '평균 수정 횟수', value: '2.1' },
    { label: '총 계약 금액', value: '₩2.4M' },
    { label: '준수율', value: '98%' },
    { label: '갱신율', value: '87%' },
  ];
  return (
    <div className="grid grid-cols-1 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="text-lg font-bold text-blue-700 mb-1">{kpi.value}</div>
          <div className="text-gray-600 text-xs font-medium">{kpi.label}</div>
        </div>
      ))}
    </div>
  );
} 