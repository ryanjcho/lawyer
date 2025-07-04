export default function CustomAlertsPanel() {
  const alerts = [
    { id: 1, message: '3일 이상 연체 계약 알림' },
    { id: 2, message: '위험 계약 발생 시 알림' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <div className="font-bold text-black mb-2">맞춤 알림</div>
      <ul className="space-y-2 mb-2">
        {alerts.map(a => (
          <li key={a.id} className="text-black">{a.message}</li>
        ))}
      </ul>
      <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">알림 추가</button>
    </div>
  );
} 