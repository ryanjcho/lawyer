export default function AnalyticsFilters() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
      <input className="border rounded px-3 py-2 text-black" placeholder="기간 선택 (예: 2024-01-01 ~ 2024-06-30)" />
      <select className="border rounded px-3 py-2 text-black">
        <option>변호사 전체</option>
        <option>김변호사</option>
        <option>이변호사</option>
        <option>박변호사</option>
      </select>
      <select className="border rounded px-3 py-2 text-black">
        <option>고객사 전체</option>
        <option>Acme Corp</option>
        <option>Beta LLC</option>
        <option>Gamma Inc</option>
      </select>
      <select className="border rounded px-3 py-2 text-black">
        <option>계약 유형 전체</option>
        <option>검토</option>
        <option>작성</option>
      </select>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">필터 적용</button>
    </div>
  );
} 