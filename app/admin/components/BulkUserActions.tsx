export default function BulkUserActions() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
      <input type="checkbox" className="mr-2" />
      <span className="text-black mr-4">전체 선택</span>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">역할 변경</button>
      <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">비활성화</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">메시지 보내기</button>
    </div>
  );
} 