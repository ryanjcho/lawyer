export default function CollaborationPanel() {
  const comments = [
    { id: 1, user: '홍길동', comment: '2.1항을 명확히 해주세요.', time: '30분 전' },
    { id: 2, user: '김변호사', comment: '요청대로 수정했습니다.', time: '10분 전' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">협업/댓글</div>
      <ul className="space-y-2 mb-2">
        {comments.map(c => (
          <li key={c.id} className="flex items-center justify-between text-sm">
            <span className="text-black">{c.user}: {c.comment}</span>
            <span className="text-gray-400">{c.time}</span>
          </li>
        ))}
      </ul>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">답글 달기</button>
    </div>
  );
} 