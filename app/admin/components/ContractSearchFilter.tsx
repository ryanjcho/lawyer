export default function ContractSearchFilter() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
      <input className="border rounded px-3 py-2 text-black" placeholder="계약명 검색" />
      <select className="border rounded px-3 py-2 text-black">
        <option>상태 전체</option>
        <option>진행 중</option>
        <option>검토 대기</option>
        <option>최종 완료</option>
      </select>
      <select className="border rounded px-3 py-2 text-black">
        <option>위험도 전체</option>
        <option>낮음</option>
        <option>중간</option>
        <option>높음</option>
      </select>
      <select className="border rounded px-3 py-2 text-black">
        <option>담당 변호사 전체</option>
        <option>김변호사</option>
        <option>이변호사</option>
        <option>박변호사</option>
      </select>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">검색</button>
    </div>
  );
} 