'use client';

import React, { useState } from 'react';

export default function BulkUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: handle actual upload
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">계약서 일괄 업로드</h1>
      {submitted ? (
        <div className="text-green-600 font-semibold text-center py-8">파일이 업로드되었습니다!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="border-2 border-dashed border-indigo-400 rounded-lg p-8 text-center cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            <input type="file" multiple className="hidden" id="bulk-upload-input" onChange={handleFileChange} />
            <label htmlFor="bulk-upload-input" className="block cursor-pointer">
              <span className="text-lg font-semibold text-indigo-700">여기로 파일을 드래그하거나 클릭하여 업로드</span>
            </label>
          </div>
          {files.length > 0 && (
            <div className="bg-white border rounded p-4">
              <div className="font-semibold mb-2">업로드된 파일</div>
              <ul className="text-sm text-gray-700 space-y-1">
                {files.map((file, i) => (
                  <li key={i}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition">업로드</button>
        </form>
      )}
    </div>
  );
} 