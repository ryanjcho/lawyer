export default function UserDirectoryTable() {
  const users = [
    { name: '홍길동', role: '변호사', status: '활성', email: 'hong@example.com', lastLogin: '2024-06-25' },
    { name: '김철수', role: '고객', status: '비활성', email: 'kim@example.com', lastLogin: '2024-06-20' },
    { name: '이영희', role: '관리자', status: '활성', email: 'lee@example.com', lastLogin: '2024-06-24' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">이름</th>
            <th className="py-2 px-3 font-semibold text-black">역할</th>
            <th className="py-2 px-3 font-semibold text-black">상태</th>
            <th className="py-2 px-3 font-semibold text-black">이메일</th>
            <th className="py-2 px-3 font-semibold text-black">최근 로그인</th>
            <th className="py-2 px-3 font-semibold text-black">작업</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u.email} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-2 px-3 text-black font-semibold">{u.name}</td>
              <td className="py-2 px-3 text-black">{u.role}</td>
              <td className="py-2 px-3 text-black">{u.status}</td>
              <td className="py-2 px-3 text-black">{u.email}</td>
              <td className="py-2 px-3 text-black">{u.lastLogin}</td>
              <td className="py-2 px-3">
                <button className="text-blue-600 hover:underline mr-2">보기</button>
                <button className="text-green-600 hover:underline">수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 