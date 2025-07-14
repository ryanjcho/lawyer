export default function LawyerPerformanceChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="font-bold text-black mb-2 flex items-center gap-2 text-sm whitespace-nowrap truncate"><svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>변호사별 성과</div>
      <pre className="text-sm text-black mt-2 whitespace-nowrap truncate">김변호사: 12건(3.1일, 1건 연체) | 이변호사: 8건(2.8일, 0건 연체) | 박변호사: 10건(3.5일, 2건 연체)</pre>
    </div>
  );
} 