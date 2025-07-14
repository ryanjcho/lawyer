export default function ReviewTurnaroundChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="font-bold text-black mb-2 flex items-center gap-2 text-sm whitespace-nowrap truncate"><svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>월별 평균 검토 소요 시간</div>
      <pre className="text-sm text-black mt-2 whitespace-nowrap truncate">1월: 4.2일 | 2월: 3.8일 | 3월: 3.5일 | 4월: 3.2일 | 5월: 2.9일</pre>
    </div>
  );
} 