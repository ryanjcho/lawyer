export default function NotificationsPanel() {
  const notifications = [
    { id: 1, type: '댓글', message: '새 댓글이 있습니다.', time: '2분 전' },
    { id: 2, type: '할당', message: '새 계약이 할당되었습니다.', time: '10분 전' },
    { id: 3, type: '알림', message: '시스템 점검 예정 안내', time: '1시간 전' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-bold text-black mb-2">알림</div>
      <ul className="space-y-2">
        {notifications.map(n => (
          <li key={n.id} className="flex items-center justify-between text-sm">
            <span className="font-semibold text-blue-700">[{n.type}]</span>
            <span className="text-black">{n.message}</span>
            <span className="text-gray-400">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 