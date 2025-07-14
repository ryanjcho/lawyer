'use client';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface IndustryCardProps {
  icon: React.ReactNode;
  name: string;
  summary: string;
  details: {
    description: string;
    services: string[];
    clients: string;
    caseSummary: string;
    metrics: string;
  };
}

export default function IndustryCard({ icon, name, summary, details }: IndustryCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 transition-all border border-indigo-50 hover:shadow-xl">
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="text-indigo-600 mb-2">{icon}</div>
        <h3 className="text-2xl font-bold text-indigo-900 mb-1 text-center">{name}</h3>
      </div>
      <div className="w-full">
        <div className="text-base text-gray-700 mb-4 text-center bg-indigo-50 rounded-lg px-4 py-2 border border-indigo-100">
          {summary}
        </div>
      </div>
      <button
        className="w-full flex items-center justify-center gap-2 text-indigo-700 font-semibold py-2 rounded-lg border border-indigo-100 bg-indigo-50 hover:bg-indigo-100 transition focus:outline-none mt-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`industry-details-${name}`}
      >
        {open ? '상세 닫기' : '상세보기'}
        {open ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>
      {open && (
        <div id={`industry-details-${name}`} className="w-full mt-4 bg-indigo-50 rounded-xl p-5 border border-indigo-100 space-y-4">
          <div>
            <div className="font-semibold text-indigo-800 mb-1">설명</div>
            <div className="text-sm text-gray-700">{details.description}</div>
          </div>
          <div>
            <div className="font-semibold text-indigo-800 mb-1">주요 서비스</div>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              {details.services.map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-indigo-800">대표 고객사: </span>
            <span className="text-sm text-gray-600">{details.clients}</span>
          </div>
          <div>
            <span className="font-semibold text-indigo-800">실제 사례: </span>
            <span className="text-sm text-gray-600">{details.caseSummary}</span>
          </div>
          <div className="text-xs text-indigo-700 bg-white rounded px-3 py-1 mt-1 inline-block border border-indigo-100"><span className="font-semibold">경험/성과: </span>{details.metrics}</div>
        </div>
      )}
    </div>
  );
} 