import React from 'react';

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">결제 및 계정</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 최근 결제 내역 */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-gray-900">최근 결제 내역</span>
            <button className="text-xs text-indigo-600 hover:underline">전체 보기</button>
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="py-2 text-left text-gray-500 font-medium">날짜</th>
                <th className="py-2 text-left text-gray-500 font-medium">항목</th>
                <th className="py-2 text-left text-gray-500 font-medium">금액</th>
                <th className="py-2 text-left text-gray-500 font-medium">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: '2024-06-29', item: '계약서 검토', amount: '₩120,000', status: '완료' },
                { date: '2024-06-20', item: '계약서 생성', amount: '₩90,000', status: '완료' },
                { date: '2024-06-10', item: '추가 자문', amount: '₩50,000', status: '환불' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-2 text-gray-800">{row.date}</td>
                  <td className="py-2 text-gray-800">{row.item}</td>
                  <td className="py-2 text-gray-800">{row.amount}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      row.status === '완료' ? 'bg-green-100 text-green-700' :
                      row.status === '환불' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 