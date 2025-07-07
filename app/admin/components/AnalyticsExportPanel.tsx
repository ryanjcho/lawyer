export default function AnalyticsExportPanel() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3 mb-6">
      <div className="font-bold text-black mb-4 text-xl flex items-center gap-2"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>분석 내보내기/보고서</div>
      <button className="bg-gray-600 text-white py-3 px-6 rounded hover:bg-gray-700 text-lg">CSV 내보내기</button>
      <button className="bg-gray-600 text-white py-3 px-6 rounded hover:bg-gray-700 text-lg">PDF 내보내기</button>
      <button className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 text-lg">보고서 생성</button>
    </div>
  );
} 