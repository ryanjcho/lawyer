const activities = [
  { user: 'Jane Smith', action: '승인함', target: '계약서 #1024', time: '2분 전' },
  { user: 'John Doe', action: '수정함', target: '계약서 #1019', time: '10분 전' },
  { user: 'Emily Lee', action: '댓글 작성', target: '계약서 #1012', time: '30분 전' },
  { user: 'Michael Brown', action: '할당함', target: '계약서 #1020', time: '1시간 전' },
];

export default function ActivityFeed() {
  const actionMap = {
    approved: '승인함',
    revised: '수정함',
    commented: '댓글 작성',
    assigned: '할당함',
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-semibold mb-4">최근 활동</div>
      <ul className="space-y-3">
        {activities.map((a, i) => (
          <li key={i} className="text-sm text-gray-700">
            <span className="font-medium text-blue-700">{a.user}</span> {actionMap[a.action]} <span className="font-medium">{a.target}</span> <span className="text-gray-400">({a.time})</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 