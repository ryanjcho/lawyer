"use client";
import { useState } from 'react';
import Link from 'next/link';

interface ContractPreviewProps {
  contractData: {
    riskScore: number;
    criticalIssues: string[];
    potentialSavings: number;
    industry: string;
    contractType: string;
  };
}

export default function ContractPreview({ contractData }: ContractPreviewProps) {
  const [showLimitedPreview, setShowLimitedPreview] = useState(true);

  const getRiskLevel = (score: number) => {
    if (score >= 7) return { level: 'High Risk', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 4) return { level: 'Medium Risk', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low Risk', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const riskInfo = getRiskLevel(contractData.riskScore);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Preview Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Contract Analysis Preview
        </h2>
        <p className="text-lg text-gray-600">
          Here's what our AI and legal experts found in your contract
        </p>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Risk Assessment</h3>
          <div className={`px-4 py-2 rounded-full ${riskInfo.bg}`}>
            <span className={`font-bold ${riskInfo.color}`}>
              {riskInfo.level}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {contractData.riskScore}/10
            </div>
            <div className="text-sm text-gray-600">Risk Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {contractData.criticalIssues.length}
            </div>
            <div className="text-sm text-gray-600">Critical Issues Found</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${contractData.potentialSavings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Potential Savings</div>
          </div>
        </div>
      </div>

      {/* Limited Preview Content */}
      {showLimitedPreview && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Preview: Top 3 Critical Issues</h3>
          </div>
          
          <div className="space-y-4 mb-6">
            {contractData.criticalIssues.slice(0, 3).map((issue, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-red-600 text-sm font-bold">{index + 1}</span>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{issue}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    This could expose you to significant legal and financial risks
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
            <p className="text-sm text-gray-700">
              <strong>Industry Insight:</strong> Similar {contractData.contractType} contracts in the {contractData.industry} industry 
              typically have 40% higher risk scores. Your contract needs immediate attention.
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your Complete Analysis
          </h3>
          <p className="text-gray-600 mb-4">
            Unlock the full report with detailed recommendations, legal precedents, and expert consultation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Complete Risk Analysis</h4>
            <p className="text-sm text-gray-600">All issues with detailed explanations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Legal Recommendations</h4>
            <p className="text-sm text-gray-600">Specific clauses to modify</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Expert Consultation</h4>
            <p className="text-sm text-gray-600">15-minute call with specialist</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/payment"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Complete Analysis - $299
          </Link>
          <button 
            onClick={() => setShowLimitedPreview(!showLimitedPreview)}
            className="px-8 py-4 border border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            View More Preview
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>✓ 100% satisfaction guarantee</p>
          <p>✓ Reviewed by 20+ year legal specialist</p>
          <p>✓ 24-hour turnaround time</p>
        </div>
      </div>
    </div>
  );
} 