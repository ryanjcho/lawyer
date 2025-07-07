"use client";

export default function AnalyticsExportPanel() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 mb-6">
      <div className="font-bold text-black mb-4 text-xl flex items-center gap-2">분석 내보내기/보고서</div>
      <button className="bg-gray-600 text-white py-3 px-6 rounded hover:bg-gray-700 text-lg">CSV 내보내기</button>
      <button className="bg-gray-600 text-white py-3 px-6 rounded hover:bg-gray-700 text-lg">PDF 내보내기</button>
      <button className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 text-lg">이미지로 저장</button>
      <button className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 text-lg">보고서 생성</button>
    </div>
  );
} 