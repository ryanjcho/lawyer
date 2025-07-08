'use client';

import React from 'react';
import Link from 'next/link';

// Mock contract detail data
const contract = {
  id: 'C-2024-001',
  name: 'NDA_2024.pdf',
  type: '검토',
  status: '진행 중',
  lastUpdated: '2024-07-01',
  lawyer: '김변호사',
  nextAction: '피드백 확인',
  files: [
    { name: 'NDA_2024.pdf', url: '/files/NDA_2024.pdf' },
    { name: '변경내역.pdf', url: '/files/changes.pdf' },
  ],
  history: [
    { date: '2024-07-01', action: '피드백 요청', by: '김변호사' },
    { date: '2024-06-30', action: '자료 업로드', by: '클라이언트' },
    { date: '2024-06-29', action: '계약 요청', by: '클라이언트' },
  ],
  comments: [
    { from: '김변호사', message: '검토가 완료되었습니다. 피드백을 확인해주세요.', date: '2024-07-01' },
    { from: '클라이언트', message: '자료를 업로드했습니다.', date: '2024-06-30' },
  ],
};

export default function ContractDetailPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{contract.name}</h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <span className="font-semibold">유형:</span> {contract.type} &nbsp;|
          <span className="font-semibold ml-2">상태:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${
            contract.status === '진행 중' ? 'bg-blue-100 text-blue-700' :
            contract.status === '완료' ? 'bg-green-100 text-green-700' :
            contract.status === '검토 대기' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
          }`}>{contract.status}</span>
          <span className="font-semibold ml-2">담당 변호사:</span> {contract.lawyer}
        </div>
        <div>
          <span className="font-semibold">최근 업데이트:</span> {contract.lastUpdated}
        </div>
      </div>
      {/* Timeline/Stepper */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {['요청', '자료 업로드', '검토', '피드백', '완료'].map((step, idx) => (
            <React.Fragment key={step}>
              <div className={`flex flex-col items-center ${idx === 2 ? 'font-bold text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${idx === 2 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-white'}`}>{idx + 1}</div>
                <div className="text-xs mt-1 text-center w-16">{step}</div>
              </div>
              {idx < 4 && <div className={`flex-1 h-0.5 ${idx < 2 ? 'bg-indigo-400' : 'bg-gray-200'} mx-1`} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Files */}
      <div className="mb-6">
        <div className="font-semibold mb-2">관련 파일</div>
        <ul className="space-y-2">
          {contract.files.map((file, i) => (
            <li key={i} className="flex items-center gap-2">
              <a href={file.url} className="text-indigo-600 hover:underline" download>{file.name}</a>
              <Link href="#" className="text-xs text-gray-500 hover:underline">미리보기</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Comments/Messages */}
      <div className="mb-6">
        <div className="font-semibold mb-2">메시지/코멘트</div>
        <ul className="space-y-2">
          {contract.comments.map((c, i) => (
            <li key={i} className="bg-gray-50 rounded p-2">
              <span className="font-semibold text-indigo-700">{c.from}</span>: {c.message}
              <span className="ml-2 text-xs text-gray-400">{c.date}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition">자료 업로드</button>
        <button className="px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded font-semibold hover:bg-indigo-50 transition">피드백 제출</button>
        <button className="px-4 py-2 bg-white border border-gray-400 text-gray-700 rounded font-semibold hover:bg-gray-50 transition">상담 요청</button>
      </div>
      {/* History */}
      <div>
        <div className="font-semibold mb-2">진행 내역</div>
        <ul className="text-sm text-gray-700 space-y-1">
          {contract.history.map((h, i) => (
            <li key={i}>{h.date} - {h.action} ({h.by})</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 