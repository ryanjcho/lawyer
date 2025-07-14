export default function AuditLogPanel() {
  const logs = [
    { id: 1, event: '계약 수정', user: '홍길동', time: '2024-06-25 10:12' },
    { id: 2, event: '계약 생성', user: '김변호사', time: '2024-06-24 09:00' },
    { id: 3, event: '담당자 변경', user: '이변호사', time: '2024-06-23 15:30' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4 mt-8">
      <div className="font-bold text-black mb-2">감사 로그</div>
      <ul className="space-y-2">
        {logs.map(l => (
          <li key={l.id} className="flex items-center justify-between text-sm">
            <span className="text-black">{l.event}</span>
            <span className="text-gray-600">{l.user}</span>
            <span className="text-gray-400">{l.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 