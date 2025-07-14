const activities = [
  { user: '오성헌', action: '승인함', target: '계약서 #1024', time: '2분 전' },
  { user: '김용범', action: '수정함', target: '계약서 #1019', time: '10분 전' },
  { user: '엄태섭', action: '댓글 작성', target: '계약서 #1012', time: '30분 전' },
  { user: '조진석', action: '할당함', target: '계약서 #1020', time: '1시간 전' },
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
          <li key={i} className="text-sm text-gray-700 flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center">
              <span className="font-medium text-blue-700 text-center w-24">{a.user}</span>
              <span className="mx-1">{a.action}</span>
              <span className="font-medium mx-1">{a.target}</span>
            </div>
            <span className="text-gray-400 text-xs whitespace-nowrap ml-2">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 