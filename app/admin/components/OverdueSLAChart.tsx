export default function OverdueSLAChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="font-bold text-black mb-2 flex items-center gap-2 text-sm whitespace-nowrap truncate"><svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>연체/SLA 위반</div>
      <pre className="text-sm text-black mt-2 whitespace-nowrap truncate">연체: 3건(8%) | SLA 위반: 1건(2%)</pre>
    </div>
  );
} 