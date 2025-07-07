export default function ExportReportingTools() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
      <div className="font-bold text-black mb-2">내보내기/보고서</div>
      <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">CSV 내보내기</button>
      <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">PDF 내보내기</button>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">보고서 생성</button>
    </div>
  );
} 