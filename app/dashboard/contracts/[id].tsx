import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function ContractDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure id is always a string
  const contractId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    async function fetchContract() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/dashboard/contracts?id=${contractId}`);
        if (!res.ok) throw new Error('계약서 정보를 불러오지 못했습니다.');
        const data = await res.json();
        let found = data.contract || (data.contracts?.find((c: any) => c.id === contractId));
        setContract(found);
      } catch (e: any) {
        setError(e.message || '오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }
    if (contractId) fetchContract();
  }, [contractId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">완료</span>;
      case 'FAILED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">실패</span>;
      case 'REVIEW':
      case 'PROCESSING':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">진행 중</span>;
      case 'UPLOADED':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-800">업로드 완료</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">LOW</span>;
      case 'medium':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700">MEDIUM</span>;
      case 'high':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">HIGH</span>;
      case 'critical':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">CRITICAL</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-black">로딩 중...</p>
        </div>
      </div>
    );
  }
  if (error || !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-black">{error || '계약서 정보를 찾을 수 없습니다.'}</p>
          <button onClick={() => router.back()} className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors">돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative">
        <button onClick={() => router.back()} className="absolute top-6 right-6 px-4 py-1 rounded bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200">← 대시보드로</button>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <DocumentTextIcon className="w-10 h-10 text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold text-indigo-700 mb-1 truncate" title={contract.title}>{contract.title}</h1>
            <div className="flex gap-2 items-center">
              {getStatusBadge(contract.status)}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">견적 기반</span>
              {getRiskBadge(contract.riskLevel)}
            </div>
          </div>
        </div>
        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-xs text-gray-500 mb-1">금액</div>
            <div className="text-lg font-bold text-black">{contract.amount ? contract.amount.toLocaleString() + '원' : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">담당 변호사</div>
            <div className="flex items-center gap-2 text-black font-medium">
              <span className="inline-block w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-base">
                {contract.assignedLawyer && contract.assignedLawyer !== '미지정' ? contract.assignedLawyer[0] : <UserCircleIcon className="w-5 h-5 text-indigo-400" />}
              </span>
              {contract.assignedLawyer || '미지정'}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">업로드일</div>
            <div className="text-black font-medium">{contract.createdAt ? new Date(contract.createdAt).toLocaleString('ko-KR') : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">마지막 업데이트</div>
            <div className="text-black font-medium">{contract.updatedAt ? new Date(contract.updatedAt).toLocaleString('ko-KR') : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">파일 크기</div>
            <div className="text-black font-medium">{contract.fileSize ? (contract.fileSize / 1024).toFixed(1) + ' KB' : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">플랜명</div>
            <div className="text-black font-medium">{contract.analysisResult?.planName || '-'}</div>
          </div>
        </div>
        {/* Analysis/Review Section */}
        {contract.analysisResult && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">분석/견적 결과</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {contract.analysisResult.riskScore !== undefined && (
                <div className="mb-2">위험 점수: <span className="font-bold text-black">{contract.analysisResult.riskScore}</span></div>
              )}
              {contract.analysisResult.riskLevel !== undefined && (
                <div className="mb-2">위험 수준: <span className="font-bold text-black">{contract.analysisResult.riskLevel}</span></div>
              )}
              {contract.analysisResult.quote !== undefined && (
                <div className="mb-2">견적: <span className="font-bold text-black">{contract.analysisResult.quote.toLocaleString()}원</span></div>
              )}
              {contract.analysisResult.summary && (
                <div className="mb-2">{contract.analysisResult.summary}</div>
              )}
            </div>
          </div>
        )}
        {/* Download/Action Section */}
        <div className="flex gap-4 mt-6">
          <a
            href={contract.fileUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow disabled:opacity-50"
            download
            tabIndex={contract.fileUrl ? 0 : -1}
            aria-disabled={!contract.fileUrl}
          >
            계약서 다운로드
          </a>
          {/* Add more actions as needed */}
        </div>
      </div>
    </div>
  );
} 