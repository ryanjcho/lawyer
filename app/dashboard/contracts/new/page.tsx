'use client';

import React, { useState } from 'react';

export default function NewContractPage() {
  const [type, setType] = useState('검토');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [instructions, setInstructions] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: handle actual submission
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">새 계약 요청</h1>
      {submitted ? (
        <div className="text-green-600 font-semibold text-center py-8">계약 요청이 제출되었습니다!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">계약 유형</label>
            <select className="w-full border rounded px-3 py-2" value={type} onChange={e => setType(e.target.value)}>
              <option value="검토">검토</option>
              <option value="작성">작성</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">설명</label>
            <textarea className="w-full border rounded px-3 py-2" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="계약에 대한 설명을 입력하세요." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">파일 업로드</label>
            <input type="file" className="w-full" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">특이사항/요청사항</label>
            <textarea className="w-full border rounded px-3 py-2" rows={2} value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="특별 요청사항이 있다면 입력하세요." />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition">제출</button>
        </form>
      )}
    </div>
  );
} 