export default function RecentActivityLog() {
  const activities = [
    { id: 1, action: '계약 업로드', user: '홍길동', time: '5분 전' },
    { id: 2, action: '검토 완료', user: '김변호사', time: '1시간 전' },
    { id: 3, action: '담당자 할당', user: '이변호사', time: '어제' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-bold text-black mb-2">최근 활동</div>
      <ul className="space-y-2">
        {activities.map(a => (
          <li key={a.id} className="flex items-center justify-between text-sm">
            <span className="text-black">{a.action}</span>
            <span className="text-gray-600">{a.user}</span>
            <span className="text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 