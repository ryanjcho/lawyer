export default function ContractVolumeChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="font-bold text-black mb-2 flex items-center gap-2 text-sm whitespace-nowrap truncate"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-2a2 2 0 012-2h2a2 2 0 012 2v2" /></svg>월별 계약 건수</div>
      <pre className="text-sm text-black mt-2 whitespace-nowrap truncate">1월: 12 | 2월: 15 | 3월: 18 | 4월: 14 | 5월: 20</pre>
    </div>
  );
} 