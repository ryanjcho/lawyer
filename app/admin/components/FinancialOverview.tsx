export default function FinancialOverview() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 grid grid-cols-2 md:grid-cols-4 gap-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-green-700 mb-2 whitespace-nowrap truncate">₩320,000,000</div>
        <div className="text-black text-sm font-medium whitespace-nowrap truncate">전체 계약 금액</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-blue-700 mb-2 whitespace-nowrap truncate">₩48,000,000</div>
        <div className="text-black text-sm font-medium whitespace-nowrap truncate">이번 달 수익</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-red-700 mb-2 whitespace-nowrap truncate">₩7,200,000</div>
        <div className="text-black text-sm font-medium whitespace-nowrap truncate">미수금</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-yellow-700 mb-2 whitespace-nowrap truncate">17건</div>
        <div className="text-black text-sm font-medium whitespace-nowrap truncate">진행 중 프로젝트 (다음 결제일: 2024-07-10)</div>
      </div>
    </div>
  );
} 