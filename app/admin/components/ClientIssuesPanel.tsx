export default function ClientIssuesPanel() {
  const issues = [
    { client: 'Acme Corp', issue: '정보 누락' },
    { client: 'Beta LLC', issue: '지연 제출' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">고객 이슈</div>
      <ul className="space-y-2">
        {issues.map((i, idx) => (
          <li key={idx} className="flex items-center">
            <span className="w-32 text-black">{i.client}</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium ml-2">{i.issue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 