export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <div className="font-bold text-black mb-2">빠른 작업</div>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">계약 할당</button>
      <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">계약 업로드</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">사용자 메시지</button>
      <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">보고서 다운로드</button>
    </div>
  );
} 