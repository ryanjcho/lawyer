export default function ResourceCenter() {
  const resources = [
    { name: '계약서 템플릿', link: '#' },
    { name: '검토 가이드라인', link: '#' },
    { name: '자주 묻는 질문', link: '#' },
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="font-bold text-black mb-2">자료실</div>
      <ul className="space-y-2">
        {resources.map((r, idx) => (
          <li key={idx}>
            <a href={r.link} className="text-blue-600 hover:underline">{r.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
} 