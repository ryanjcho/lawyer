"use client";

export default function ContextualInsights() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 mb-6">
      <div className="font-bold text-blue-800 text-lg mb-2">주요 인사이트</div>
      <ul className="space-y-2">
        <li className="bg-white/80 rounded px-3 py-2 text-base text-gray-900 shadow-sm">이번 달 계약 수는 지난달 대비 <span className="font-bold text-green-700">+11%</span> 증가했습니다.</li>
        <li className="bg-white/80 rounded px-3 py-2 text-base text-gray-900 shadow-sm">평균 검토/작성 시간은 <span className="font-bold text-green-700">2.7일</span>로, 업계 평균(4.0일)보다 빠릅니다.</li>
        <li className="bg-white/80 rounded px-3 py-2 text-base text-gray-900 shadow-sm">고위험 계약 비율이 <span className="font-bold text-red-700">10%</span>로, 지난 분기보다 <span className="font-bold text-red-700">2% 증가</span>했습니다.</li>
        <li className="bg-white/80 rounded px-3 py-2 text-base text-gray-900 shadow-sm">SLA 준수율은 <span className="font-bold text-green-700">92%</span>로, 목표치(90%)를 상회합니다.</li>
      </ul>
    </div>
  );
} 