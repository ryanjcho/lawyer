export default function UserAuditTrail() {
  const logs = [
    { user: '홍길동', action: '비밀번호 변경', time: '2024-06-25 10:12' },
    { user: '김철수', action: '계정 비활성화', time: '2024-06-24 09:00' },
    { user: '이영희', action: '역할 변경', time: '2024-06-23 15:30' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">사용자 감사 로그</div>
      <ul className="space-y-2">
        {logs.map((l, idx) => (
          <li key={idx} className="flex items-center justify-between text-sm">
            <span className="text-black">{l.user}</span>
            <span className="text-gray-600">{l.action}</span>
            <span className="text-gray-400">{l.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 