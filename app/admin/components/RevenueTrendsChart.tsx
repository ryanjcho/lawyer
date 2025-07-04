export default function RevenueTrendsChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="font-bold text-black mb-2 flex items-center gap-2 text-sm whitespace-nowrap truncate"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17l6-6 4 4 8-8" /></svg>월별 수익 추이</div>
      <pre className="text-sm text-black mt-2 whitespace-nowrap truncate">1월: ₩10,000,000 | 2월: ₩12,000,000 | 3월: ₩15,000,000 | 4월: ₩13,000,000 | 5월: ₩18,000,000</pre>
    </div>
  );
} 