'use client';

import React from 'react';
import Link from 'next/link';
import { FaFileAlt, FaComments, FaHistory, FaUser, FaClock } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{contract.name}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">{contract.type}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            contract.status === '진행 중' ? 'bg-blue-100 text-blue-800' :
            contract.status === '완료' ? 'bg-green-100 text-green-800' :
            contract.status === '검토 대기' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
          }`}>{contract.status}</span>
        </div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-base text-gray-700">
          <div>
            <span className="font-bold">담당 변호사:</span> {contract.lawyer}
          </div>
          <div>
            <span className="font-bold">최근 업데이트:</span> <span className="text-gray-500">{contract.lastUpdated}</span>
          </div>
        </div>
        {/* Timeline/Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['요청', '자료 업로드', '검토', '피드백', '완료'].map((step, idx) => (
              <React.Fragment key={step}>
                <div className={`flex flex-col items-center ${idx === 2 ? 'font-extrabold text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full border-2 ${idx === 2 ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 bg-white'}`}>{idx + 1}</div>
                  <div className="text-sm mt-1 text-center w-20 font-semibold">{step}</div>
                </div>
                {idx < 4 && <div className={`flex-1 h-0.5 ${idx < 2 ? 'bg-indigo-400' : 'bg-gray-200'} mx-1`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Files */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-3">
            <FaFileAlt className="mr-2 text-indigo-600" />
            <div className="font-semibold text-lg text-gray-900">관련 파일</div>
          </div>
          <ul className="space-y-2">
            {contract.files.map((file, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <a href={file.url} className="text-indigo-600 font-semibold hover:underline" download>{file.name}</a>
                <Link href="#" className="text-xs text-gray-500 hover:underline">미리보기</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Comments/Messages */}
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-3">
            <FaComments className="mr-2 text-green-600" />
            <div className="font-semibold text-lg text-gray-900">메시지/코멘트</div>
          </div>
          <ul className="space-y-2">
            {contract.comments.map((c, i) => (
              <li key={i} className="bg-gray-50 rounded p-3 border border-indigo-100 text-gray-700">
                <span className="font-bold text-indigo-600">{c.from}</span>: {c.message}
                <span className="ml-2 text-xs text-gray-500">{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded font-bold hover:bg-indigo-700 transition text-lg shadow">자료 업로드</button>
          <button className="px-5 py-2 bg-white border-2 border-indigo-600 text-indigo-700 rounded font-bold hover:bg-indigo-50 transition text-lg shadow">피드백 제출</button>
          <button className="px-5 py-2 bg-white border-2 border-gray-400 text-gray-700 rounded font-bold hover:bg-gray-50 transition text-lg shadow">상담 요청</button>
          <a
            href={`/dashboard/contracts/${contract.id}/diff`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-yellow-100 border-2 border-yellow-400 text-yellow-900 rounded font-bold hover:bg-yellow-200 transition text-lg shadow flex items-center gap-2"
          >
            <FaHistory className="mr-1" /> 버전 비교/변경내역
          </a>
        </div>
        {/* History */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-3">
            <FaHistory className="mr-2 text-gray-600" />
            <div className="font-semibold text-lg text-gray-900">진행 내역</div>
          </div>
          <ul className="text-base text-gray-700 space-y-1">
            {contract.history.map((h, i) => (
              <li key={i}>{h.date} - {h.action} <span className="text-gray-500">({h.by})</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 