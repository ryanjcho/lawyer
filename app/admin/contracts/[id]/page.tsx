"use client";
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function ContractDetail() {
  const tabKeys = [
    'Overview',
    'Content',
    'RevisionHistory',
    'Comments',
    'AuditLog',
  ];
  const [tab, setTab] = useState('Overview');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">계약서 #1024 - NDA - Acme</h1>
        <div className="mb-6 flex space-x-4 border-b">
          {tabKeys.map((key) => (
            <button
              key={key}
              className={`py-2 px-4 font-medium border-b-2 ${tab === key ? 'border-blue-700 text-blue-700' : 'border-transparent text-gray-600'}`}
              onClick={() => setTab(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <div>
          {tab === 'Overview' && (
            <div className="space-y-2">
              <div><b>고객:</b> Acme Corp</div>
              <div><b>상태:</b> 진행 중</div>
              <div><b>담당 변호사:</b> Jane Smith</div>
              <div><b>금액:</b> ₩10,000</div>
              <div><b>주요 일정:</b> 2024-07-01</div>
            </div>
          )}
          {tab === 'Content' && (
            <div className="bg-white rounded shadow p-6">
              <div className="font-semibold mb-2">현재 버전</div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">[계약서 내용이 여기에 표시됩니다...]</pre>
            </div>
          )}
          {tab === 'RevisionHistory' && (
            <div className="bg-white rounded shadow p-6">
              <div className="font-semibold mb-2">수정 이력</div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>v3 - Jane Smith - 2024-06-25 - 비밀유지 조항 소폭 수정</li>
                <li>v2 - John Doe - 2024-06-24 - 당사자명 수정</li>
                <li>v1 - Jane Smith - 2024-06-20 - 최초 초안</li>
              </ul>
            </div>
          )}
          {tab === 'Comments' && (
            <div className="bg-white rounded shadow p-6">
              <div className="font-semibold mb-2">댓글</div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><b>Emily Lee:</b> 2.1항을 명확히 해주세요. (30분 전)</li>
                <li><b>Jane Smith:</b> 요청대로 수정했습니다. (10분 전)</li>
              </ul>
            </div>
          )}
          {tab === 'AuditLog' && (
            <div className="bg-white rounded shadow p-6">
              <div className="font-semibold mb-2">감사 로그</div>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>[2024-06-25 10:12] Jane Smith 계약서 수정</li>
                <li>[2024-06-24 16:40] John Doe 당사자명 수정</li>
                <li>[2024-06-20 09:00] Jane Smith 계약서 생성</li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 