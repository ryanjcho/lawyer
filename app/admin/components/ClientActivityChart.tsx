export default function ClientActivityChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100 bg-gradient-to-br from-gray-50 to-white">
      <div className="font-bold text-black mb-2 flex items-center gap-2 text-sm whitespace-nowrap truncate"><svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m4 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10m16 0a2 2 0 01-2 2H5a2 2 0 01-2-2" /></svg>고객사 활동</div>
      <pre className="text-sm text-black mt-2 whitespace-nowrap truncate">Acme Corp: 8건 | Beta LLC: 6건(2건 위험) | Gamma Inc: 5건</pre>
    </div>
  );
} 