"use client";

export default function CompactQuickActions() {
  return (
    <div className="flex items-center gap-2">
      <button 
        title="계약 할당" 
        className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium text-blue-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        할당
      </button>
      <button 
        title="계약 업로드" 
        className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium text-green-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
        </svg>
        업로드
      </button>
      <button 
        title="보고서 생성" 
        className="flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium text-purple-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        보고서
      </button>
    </div>
  );
} 