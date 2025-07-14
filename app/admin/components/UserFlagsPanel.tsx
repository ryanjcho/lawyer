export default function UserFlagsPanel() {
  const flags = [
    { name: '홍길동', issue: '지연 검토 2회' },
    { name: '김철수', issue: '정보 누락' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">사용자 이슈/플래그</div>
      <ul className="space-y-2">
        {flags.map((f, idx) => (
          <li key={idx} className="flex items-center">
            <span className="w-32 text-black">{f.name}</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium ml-2">{f.issue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 