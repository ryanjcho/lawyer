'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, DocumentTextIcon, UserCircleIcon, UserGroupIcon, LinkIcon, ShieldCheckIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import CollaborationPanel from '@/app/components/CollaborationPanel';
import IntegrationPanel from '@/app/components/IntegrationPanel';

export default function ContractDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showIntegration, setShowIntegration] = useState(false);

  // Ensure id is always a string
  const contractId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    // Realistic mock contract data for fallback
    const mockContract = {
      id: contractId,
      title: '서비스 계약서_v1.0',
      type: '근로계약서',
      status: 'COMPLETED',
      createdAt: '2024-06-25T13:00:00Z',
      updatedAt: '2024-06-25T16:45:00Z',
      fileSize: 23456,
      fileUrl: '#',
      amount: 485043,
      assignedLawyer: '김변호사',
      assignedLawyerEmail: 'lawyer@example.com',
      assignedLawyerProfile: '#',
      user: '홍길동',
      userEmail: 'client@example.com',
      counterparty: '이상대',
      riskLevel: 'LOW',
      confidence: 96,
      analysisResult: {
        riskScore: 12,
        riskLevel: 'LOW',
        quote: 485043,
        summary: '3개의 주요 리스크가 발견되었으며, 2개 조항의 개선이 필요합니다.',
        risks: [
          { clause: '제5조', severity: 'HIGH', description: '계약 해지 조항이 불명확합니다.' },
          { clause: '제8조', severity: 'MEDIUM', description: '지급 조건이 모호합니다.' },
          { clause: '제12조', severity: 'LOW', description: '분쟁 해결 방식이 누락되었습니다.' },
          { clause: '제15조', severity: 'MEDIUM', description: '비밀유지 조항이 부족합니다.' },
          { clause: '제20조', severity: 'LOW', description: '계약 기간 연장 조건이 불명확합니다.' },
        ],
        suggestions: [
          { clause: '제5조', suggestion: '계약 해지 사유와 절차를 명확히 기재하세요.' },
          { clause: '제8조', suggestion: '지급 조건을 구체적으로 명시하세요.' },
          { clause: '제12조', suggestion: '분쟁 해결 조항(중재/재판 등)을 추가하세요.' },
          { clause: '제15조', suggestion: '비밀유지 의무와 위반 시 제재를 명시하세요.' },
          { clause: '제20조', suggestion: '계약 기간 연장 조건과 통지 기간을 명확히 하세요.' },
        ],
        clauseAnalysis: [
          { clause: '제5조', risk: 'HIGH', lawyerComment: '계약 해지 관련 분쟁이 자주 발생합니다.' },
          { clause: '제8조', risk: 'MEDIUM', lawyerComment: '지급 조건이 모호하면 분쟁 소지가 있습니다.' },
          { clause: '제12조', risk: 'LOW', lawyerComment: '분쟁 해결 방식이 명확하면 좋습니다.' },
          { clause: '제15조', risk: 'MEDIUM', lawyerComment: '비밀유지 조항이 부족하면 정보 유출 위험이 있습니다.' },
          { clause: '제20조', risk: 'LOW', lawyerComment: '계약 기간 연장 조건이 불명확하면 갈등이 발생할 수 있습니다.' },
        ],
        legalCompliance: {
          laborLaw: '준수',
          taxLaw: '준수',
          dataProtection: '개선 필요',
          antitrust: '준수'
        },
        marketComparison: {
          similarContracts: 1247,
          averageRisk: 23,
          percentile: 85,
          industryStandard: '우수'
        }
      },
      qna: [
        { question: '이 계약서로 소송 위험이 있나요?', answer: '제5조가 불명확해 소송 위험이 있습니다. 개선을 권장합니다.', time: '2024-06-25 14:12', lawyer: '김변호사' },
        { question: '지급 조건은 안전한가요?', answer: '제8조를 구체적으로 명시하면 더 안전합니다.', time: '2024-06-25 14:15', lawyer: '김변호사' },
        { question: '비밀유지 조항이 충분한가요?', answer: '제15조에 비밀유지 의무와 위반 시 제재를 추가하는 것이 좋습니다.', time: '2024-06-25 14:30', lawyer: '김변호사' },
        { question: '계약 기간 연장은 어떻게 되나요?', answer: '제20조에 연장 조건과 통지 기간을 명확히 기재하는 것을 권장합니다.', time: '2024-06-25 15:00', lawyer: '김변호사' },
        { question: '분쟁 발생 시 어떻게 해결하나요?', answer: '제12조에 중재 또는 재판 관할을 명시하는 것이 좋습니다.', time: '2024-06-25 15:30', lawyer: '김변호사' },
      ],
      payment: { 
        status: 'PAID', 
        amount: 485043, 
        invoiceUrl: '#', 
        receiptUrl: '#',
        paymentMethod: '신용카드',
        paymentDate: '2024-06-25 13:12',
        billingAddress: '서울시 강남구 테헤란로 123',
        taxInfo: '사업자등록번호: 123-45-67890',
        payer: '홍길동',
        payee: '법무법인 신뢰',
        approvalNumber: 'A123456789',
        vat: 48504,
        total: 533547
      },
      timeline: [
        { event: '업로드', time: '2024-06-25 13:00', status: 'completed', description: '고객이 계약서를 업로드했습니다.' },
        { event: '분석 시작', time: '2024-06-25 13:05', status: 'completed', description: '계약서 분석이 시작되었습니다.' },
        { event: '분석 완료', time: '2024-06-25 13:08', status: 'completed', description: '계약서 분석이 완료되었습니다.' },
        { event: '변호사 검토 시작', time: '2024-06-25 13:09', status: 'completed', description: '담당 변호사가 계약서 검토를 시작했습니다.' },
        { event: '결제 완료', time: '2024-06-25 13:12', status: 'completed', description: '고객이 결제를 완료했습니다.' },
        { event: '변호사 배정', time: '2024-06-25 13:20', status: 'completed', description: '담당 변호사가 배정되었습니다.' },
        { event: '상세 리포트 생성', time: '2024-06-25 13:25', status: 'completed', description: '상세 분석 리포트가 생성되었습니다.' },
        { event: '고객 알림 발송', time: '2024-06-25 13:30', status: 'completed', description: '고객에게 분석 결과 알림이 발송되었습니다.' },
        { event: 'Q&A 답변 등록', time: '2024-06-25 14:15', status: 'completed', description: '변호사가 Q&A 답변을 등록했습니다.' },
        { event: '최종 검토 완료', time: '2024-06-25 15:45', status: 'completed', description: '최종 검토가 완료되었습니다.' },
      ],
      notifications: [
        { title: '계약서 분석이 완료되었습니다.', time: '2024-06-25 13:10', type: '성공', detail: '계약서 분석 및 변호사 검토가 모두 완료되었습니다.' },
        { title: '변호사 답변이 등록되었습니다.', time: '2024-06-25 14:15', type: '정보', detail: 'Q&A에 변호사 답변이 추가되었습니다.' },
        { title: '결제가 성공적으로 완료되었습니다.', time: '2024-06-25 13:12', type: '성공', detail: '결제 내역이 확인되었습니다.' },
        { title: '상세 리포트가 준비되었습니다.', time: '2024-06-25 13:30', type: '정보', detail: '분석 리포트가 다운로드 가능합니다.' },
        { title: '계약서 수정 요청이 접수되었습니다.', time: '2024-06-25 16:00', type: '경고', detail: '고객이 계약서 수정 요청을 제출했습니다.' },
      ],
      relatedDocs: [
        { name: 'NDA_v2.pdf', url: '#', type: 'pdf', size: '156KB', uploadDate: '2024-06-25 13:05', description: '비밀유지계약서 샘플' },
        { name: '첨부파일_1.docx', url: '#', type: 'docx', size: '89KB', uploadDate: '2024-06-25 13:05', description: '계약 관련 참고자료' },
        { name: '회사등기부등본.pdf', url: '#', type: 'pdf', size: '234KB', uploadDate: '2024-06-25 13:10', description: '회사 등기부 등본' },
        { name: '사업자등록증.pdf', url: '#', type: 'pdf', size: '67KB', uploadDate: '2024-06-25 13:10', description: '사업자 등록증 사본' },
        { name: '분석_리포트_v1.pdf', url: '#', type: 'pdf', size: '1.2MB', uploadDate: '2024-06-25 13:30', description: '분석 리포트' },
      ],
      versionHistory: [
        { version: 'v1.0', time: '2024-06-25 13:00', changes: '초기 업로드', author: '홍길동' },
        { version: 'v1.1', time: '2024-06-25 13:20', changes: '변호사 검토 완료', author: '김변호사' },
        { version: 'v1.2', time: '2024-06-25 14:30', changes: 'Q&A 답변 추가', author: '김변호사' },
        { version: 'v1.3', time: '2024-06-25 15:45', changes: '최종 검토 완료', author: '김변호사' },
      ],
      clientFeedback: { 
        rating: 4.8, 
        comment: '분석이 매우 상세하고 유용했습니다! 변호사 답변도 빠르고 정확해서 만족합니다.',
        categories: {
          accuracy: 5.0,
          speed: 4.5,
          communication: 4.8,
          value: 4.9
        },
        submittedAt: '2024-06-25 16:30',
        suggestions: '다음에도 꼭 이용하고 싶습니다. UI가 직관적이고, 분석 결과가 신뢰할 만합니다.'
      },
      nextSteps: [
        '변호사 상담 예약하기',
        '계약서 수정 요청하기',
        '추가 Q&A 남기기',
        '리포트 다운로드',
        '관련 문서 업로드',
        '결제 내역 확인',
      ],
      security: {
        encryption: 'AES-256',
        accessLog: [
          { user: '홍길동', action: '로그인', time: '2024-06-25 16:45' },
          { user: '김변호사', action: '문서 접근', time: '2024-06-25 14:20' },
          { user: '홍길동', action: '다운로드', time: '2024-06-25 16:30' },
        ],
        retentionPolicy: '7년',
        dataLocation: '국내 클라우드',
        compliance: ['GDPR', '개인정보보호법', '전자상거래법']
      },
      collaboration: {
        participants: [
          { name: '홍길동', role: '고객', email: 'client@example.com', lastActive: '2024-06-25 16:45' },
          { name: '김변호사', role: '변호사', email: 'lawyer@example.com', lastActive: '2024-06-25 15:45' },
          { name: '이보조', role: '보조변호사', email: 'assistant@example.com', lastActive: '2024-06-25 14:30' },
        ],
        comments: [
          { author: '김변호사', content: '제5조 수정이 필요합니다.', time: '2024-06-25 14:15' },
          { author: '홍길동', content: '네, 수정하겠습니다.', time: '2024-06-25 14:20' },
          { author: '이보조', content: '관련 판례를 첨부했습니다.', time: '2024-06-25 14:25' },
        ]
      }
    };

    setContract(mockContract);
    setLoading(false);
    setError(null);
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
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative">
        <button onClick={() => router.back()} className="absolute top-6 right-6 px-4 py-1 rounded bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200">← 대시보드로</button>
        
        {/* Collaboration & Integration Buttons */}
        <div className="absolute top-6 left-6 flex gap-2">
          <button 
            onClick={() => setShowCollaboration(true)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <UserGroupIcon className="w-4 h-4" />
            협업
          </button>
          <button 
            onClick={() => setShowIntegration(true)}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            통합
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 mt-12">
          <DocumentTextIcon className="w-10 h-10 text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold text-indigo-700 mb-1 truncate" title={contract.title}>{contract.title}</h1>
            <div className="flex gap-2 items-center">
              {getStatusBadge(contract.status ?? '정보 없음')}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{contract.type ?? '정보 없음'}</span>
              {getRiskBadge(contract.riskLevel ?? '정보 없음')}
            </div>
          </div>
        </div>
        <Tab.Group>
          <Tab.List className="flex border-b mb-6 overflow-x-auto">
            {['개요', '분석', '진행상황', '문서', '결제', '작업'].map((tab, index) => (
              <Tab 
                key={tab} 
                className={({ selected }) => `
                  flex-1 px-4 py-3 text-sm font-semibold rounded-t-lg focus:outline-none whitespace-nowrap
                  ${selected 
                    ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }
                `}
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {/* 개요 - Overview (Contract info, parties, status) */}
            <Tab.Panel>
              {/* Progress/Status Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">진행 상태</span>
                  <span className="text-xs text-black">{contract.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      contract.status === 'COMPLETED' ? 'bg-green-500 w-full' :
                      contract.status === 'PROCESSING' ? 'bg-yellow-400 w-2/3' :
                      contract.status === 'UPLOADED' ? 'bg-blue-400 w-1/3' :
                      'bg-gray-400 w-1/6'
                    }`}
                  ></div>
                </div>
              </div>
              {/* Contract Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-500" />
                    <span className="text-xs text-black">계약서명</span>
                  </div>
                  <div className="text-lg font-bold text-black truncate" title={contract.title}>{contract.title}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-xs text-black">상태</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(contract.status ?? '정보 없음')}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <ClockIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-xs text-black">업로드일</span>
                  </div>
                  <div className="text-black font-medium">{new Date(contract.createdAt).toLocaleString('ko-KR')}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-400" />
                    <span className="text-xs text-black">위험 수준</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRiskBadge(contract.riskLevel ?? '정보 없음')}
                  </div>
                </div>
              </div>
              {/* Parties Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserCircleIcon className="w-5 h-5 text-indigo-400" /> 당사자 정보
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircleIcon className="w-5 h-5 text-indigo-400" />
                      <span className="text-xs text-black">의뢰인</span>
                    </div>
                    <div className="text-black font-medium">{contract.user} <span className="text-xs text-black">({contract.userEmail})</span></div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircleIcon className="w-5 h-5 text-green-500" />
                      <span className="text-xs text-black">담당 변호사</span>
                    </div>
                    <div className="text-black font-medium">{contract.assignedLawyer} <span className="text-xs text-black">({contract.assignedLawyerEmail})</span></div>
                  </div>
                  <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-yellow-100">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircleIcon className="w-5 h-5 text-yellow-500" />
                      <span className="text-xs text-black">상대방</span>
                    </div>
                    <div className="text-black font-medium">{contract.counterparty}</div>
                  </div>
                </div>
              </div>

              {/* Collaboration Quick Actions */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-indigo-400" /> 협업 도구
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setShowCollaboration(true)}
                    className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-indigo-700">실시간 협업</span>
                    </div>
                    <p className="text-sm text-indigo-600">변호사와 고객이 함께 작업할 수 있는 공간</p>
                  </button>
                  <button 
                    onClick={() => setShowIntegration(true)}
                    className="p-4 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">통합 관리</span>
                    </div>
                    <p className="text-sm text-green-600">캘린더, 이메일, 문서 동기화</p>
                  </button>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircleIcon className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-700">승인 워크플로우</span>
                    </div>
                    <p className="text-sm text-purple-600">단계별 승인 프로세스 관리</p>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* 분석 - Analysis (Risk analysis, Q&A, suggestions) */}
            <Tab.Panel>
              {/* Analysis Summary */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-400" />
                    <span className="text-xs text-black">위험 수준</span>
                  </div>
                  <div className="flex items-center gap-2">{getRiskBadge(contract.riskLevel ?? '정보 없음')}</div>
                  <div className="text-xs text-black">{contract.analysisResult?.riskScore ? `Risk Score: ${contract.analysisResult.riskScore}` : ''}</div>
                </div>
                <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-xs text-black">신뢰도</span>
                  </div>
                  <div className="text-lg font-bold text-black">{contract.confidence}%</div>
                </div>
                <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-black">주요 결과</span>
                  </div>
                  <div className="text-black font-medium">{contract.analysisResult?.summary ?? '정보 없음'}</div>
                </div>
              </div>

              {/* Risk Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-orange-400" /> 리스크 상세
                </h3>
                <div className="space-y-2">
                  {(contract.analysisResult?.risks ?? []).map((risk, i) => (
                    <div key={i} className="bg-orange-50 rounded-lg p-3 flex items-center gap-3 text-black">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${risk.severity === 'HIGH' ? 'bg-red-100 text-red-700' : risk.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-50 text-green-700'}`}>{risk.severity}</span>
                      <b>{risk.clause}</b>: {risk.description}
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" /> 개선 제안
                </h3>
                <div className="space-y-2">
                  {(contract.analysisResult?.suggestions ?? []).map((s, i) => (
                    <div key={i} className="bg-green-50 rounded-lg p-3 flex items-center gap-3 text-black">
                      <b>{s.clause}</b>: {s.suggestion}
                    </div>
                  ))}
                </div>
              </div>

              {/* Clause Analysis Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-indigo-400" /> 조항별 분석
                </h3>
                <div className="space-y-2">
                  {(contract.analysisResult?.clauseAnalysis ?? []).map((c, i) => (
                    <div key={i} className="bg-indigo-50 rounded-lg p-3 flex items-center gap-3 text-black">
                      <b>{c.clause}</b> <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{c.risk}</span>: {c.lawyerComment}
                    </div>
                  ))}
                </div>
              </div>

              {/* Q&A Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserCircleIcon className="w-5 h-5 text-indigo-400" /> 변호사 Q&A
                </h3>
                <div className="space-y-3 mb-4">
                  {(contract.qna ?? []).map((q, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-2">
                      <div className="text-sm text-black"><b>Q:</b> {q.question}</div>
                      <div className="text-sm text-indigo-700 mt-1"><b>A:</b> {q.answer}</div>
                      <div className="flex items-center justify-between text-xs text-black mt-2">
                        <span>답변자: {q.lawyer}</span>
                        <span>{q.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="질문을 입력하세요" disabled />
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors" disabled>질문 등록</button>
                </div>
              </div>

              {/* Legal Compliance */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400" /> 법적 준수성
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(contract.analysisResult?.legalCompliance || {}).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-xl shadow p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-3 h-3 rounded-full ${value === '준수' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        <span className="text-sm font-medium text-black">{key}</span>
                      </div>
                      <div className={`text-sm font-bold ${value === '준수' ? 'text-green-600' : 'text-yellow-600'}`}>{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Comparison */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-blue-400" /> 시장 비교 분석
                </h3>
                <div className="bg-white rounded-xl shadow p-6 border border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{contract.analysisResult?.marketComparison?.similarContracts}</div>
                      <div className="text-sm text-black">유사 계약서</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{contract.analysisResult?.marketComparison?.percentile}%</div>
                      <div className="text-sm text-black">백분위</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{contract.analysisResult?.marketComparison?.averageRisk}</div>
                      <div className="text-sm text-black">평균 리스크</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{contract.analysisResult?.marketComparison?.industryStandard}</div>
                      <div className="text-sm text-black">산업 표준</div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* 진행상황 - Timeline (Timeline, notifications, version history) */}
            <Tab.Panel>
              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-blue-400" /> 진행 타임라인
                </h3>
                <ol className="relative border-l-2 border-indigo-200 ml-4">
                  {(contract.timeline ?? []).map((t, i) => (
                    <li key={i} className="mb-8 ml-6">
                      <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-8 ring-white ${i === 0 ? 'bg-blue-400' : i === (contract.timeline.length-1) ? 'bg-green-400' : 'bg-indigo-400'}`}></span>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">{t.event}</span>
                        <span className="text-xs text-black">{t.description}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Notifications */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-indigo-400" /> 관련 알림
                </h3>
                <ol className="relative border-l-2 border-indigo-200 ml-4">
                  {(contract.notifications ?? []).map((n, i) => (
                    <li key={i} className="mb-8 ml-6">
                      <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-8 ring-white bg-indigo-400"></span>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">{n.title}</span>
                        <span className="text-xs text-black">{n.detail}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Version History */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-gray-400" /> 버전 히스토리
                </h3>
                <ol className="relative border-l-2 border-gray-200 ml-4">
                  {(contract.versionHistory ?? []).map((v, i) => (
                    <li key={i} className="mb-8 ml-6">
                      <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-8 ring-white bg-gray-400"></span>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">{v.version}</span>
                        <span className="text-xs text-black">{v.time}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Tab.Panel>

            {/* 문서 - Documents (Files, related docs, security) */}
            <Tab.Panel>
              {/* Original File */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-indigo-400" /> 원본 파일
                </h3>
                <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-black">파일 정보</span>
                  </div>
                  <div className="text-black font-medium">{(contract.fileSize / 1024).toFixed(1)} KB</div>
                  <a
                    href={contract.fileUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow w-fit"
                    title="계약서 원본 파일 다운로드"
                  >
                    <DocumentTextIcon className="w-4 h-4" /> 다운로드
                  </a>
                </div>
              </div>

              {/* Related Documents */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-blue-400" /> 첨부/연관 문서
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(contract.relatedDocs ?? []).map((doc, i) => (
                    <div key={i} className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 border border-indigo-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{doc.name}</div>
                            <div className="text-xs text-black">{doc.description}</div>
                          </div>
                        </div>
                        <div className="text-xs text-black">{doc.uploadDate}</div>
                      </div>
                      <div className="flex gap-2">
                        <a href={doc.url} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow" title="{doc.name} 다운로드">
                          <DocumentTextIcon className="w-4 h-4" /> 다운로드
                        </a>
                        <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                          미리보기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-red-400" /> 보안 및 개인정보
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow p-5 border border-red-100">
                    <h4 className="font-semibold text-gray-900 mb-3">보안 정보</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black">암호화:</span>
                        <span className="font-medium">{contract.security?.encryption}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">보관 기간:</span>
                        <span className="font-medium">{contract.security?.retentionPolicy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">데이터 위치:</span>
                        <span className="font-medium">{contract.security?.dataLocation}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">준수 규정</h5>
                      <div className="flex flex-wrap gap-2">
                        {contract.security?.compliance?.map((reg, i) => (
                          <span key={i} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{reg}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow p-5 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3">접근 로그</h4>
                    <div className="space-y-2">
                      {contract.security?.accessLog?.map((log, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-medium">{log.user}</span>
                            <span className="text-black ml-2">{log.action}</span>
                          </div>
                          <span className="text-black">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <ul className="list-disc ml-6 text-gray-700 mb-4">
                    <li>모든 파일은 업로드 즉시 암호화되어 안전하게 저장됩니다.</li>
                    <li>외부에 절대 공유되지 않으며, 요청 시 즉시 삭제 가능합니다.</li>
                    <li>접근 로그가 실시간으로 기록되어 보안을 보장합니다.</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors" disabled>계약서 삭제</button>
                    <button className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors" disabled>접근 로그 다운로드</button>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* 결제 - Payment */}
            <Tab.Panel>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-xs text-black">결제 상태</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${contract.payment?.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{contract.payment?.status ?? '정보 없음'}</span>
                  </div>
                  <div className="text-xs text-black">{contract.payment?.amount ? `₩${contract.payment.amount.toLocaleString()}` : ''}</div>
                </div>
                <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-1">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-black">영수증/인보이스</span>
                  </div>
                  <div className="flex gap-2">
                    {contract.payment?.receiptUrl ? <a href={contract.payment.receiptUrl} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition-colors" title="영수증 다운로드"><DocumentTextIcon className="w-4 h-4" />영수증</a> : <span className="text-black">영수증 없음</span>}
                    {contract.payment?.invoiceUrl ? <a href={contract.payment.invoiceUrl} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors" title="인보이스 다운로드"><DocumentTextIcon className="w-4 h-4" />인보이스</a> : <span className="text-black">인보이스 없음</span>}
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-blue-400" /> 결제 상세 정보
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow p-5 border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-3">결제 정보</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black">결제 방법:</span>
                        <span className="font-medium text-black">{contract.payment?.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">결제 일시:</span>
                        <span className="font-medium text-black">{contract.payment?.paymentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">결제 금액:</span>
                        <span className="font-medium text-black">₩{contract.payment?.amount?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow p-5 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3">청구 정보</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-black">청구 주소:</span>
                        <span className="font-medium text-black">{contract.payment?.billingAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">세금 정보:</span>
                        <span className="font-medium text-black">{contract.payment?.taxInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-blue-400" /> 결제 내역 상세
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-1"><span className="text-black">결제자:</span><span className="text-black">{contract.payment?.payer}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-black">수취인:</span><span className="text-black">{contract.payment?.payee}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-black">승인번호:</span><span className="text-black">{contract.payment?.approvalNumber}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-black">부가세:</span><span className="text-black">₩{contract.payment?.vat?.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-black">총 결제금액:</span><span className="text-black">₩{contract.payment?.total?.toLocaleString()}</span></div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-yellow-400" /> 고객 피드백
                </h3>
                <div className="bg-white rounded-xl shadow p-6 border border-yellow-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-500 mb-1">{contract.clientFeedback?.rating}</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`text-lg ${star <= Math.floor(contract.clientFeedback?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-black font-medium mb-2">{contract.clientFeedback?.comment}</div>
                      <div className="text-xs text-black">{contract.clientFeedback?.suggestions}</div>
                      <div className="text-sm text-black">제출일: {contract.clientFeedback?.submittedAt}</div>
                    </div>
                  </div>
                  
                  {/* Detailed Ratings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {Object.entries(contract.clientFeedback?.categories || {}).map(([category, rating]) => (
                      <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-indigo-600 mb-1">{String(rating)}</div>
                        <div className="text-sm text-black">
                          {category === 'accuracy' ? '정확성' :
                           category === 'speed' ? '속도' :
                           category === 'communication' ? '소통' :
                           category === 'value' ? '가치' : category}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors" disabled>피드백 남기기</button>
                </div>
              </div>
            </Tab.Panel>

            {/* 작업 - Actions (Next steps, quick actions) */}
            <Tab.Panel>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-indigo-400" /> 다음 단계
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(contract.nextSteps ?? []).map((step, i) => (
                    <button key={i} className="w-full px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition-colors shadow text-left flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-indigo-400" /> {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collaboration Overview */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-green-400" /> 협업 현황
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow p-5 border border-green-100">
                    <h4 className="font-semibold text-gray-900 mb-3">참여자</h4>
                    <div className="space-y-3">
                      {contract.collaboration?.participants?.map((participant, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
                              <span className="text-sm font-bold text-indigo-700">{participant.name[0]}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{participant.name}</div>
                              <div className="text-sm text-black">{participant.role}</div>
                            </div>
                          </div>
                          <div className="text-xs text-black">{participant.lastActive}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow p-5 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3">최근 댓글</h4>
                    <div className="space-y-3">
                      {contract.collaboration?.comments?.map((comment, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            <span className="text-xs text-black">{comment.time}</span>
                          </div>
                          <div className="text-sm text-black">{comment.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-green-400" /> 빠른 작업
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="px-4 py-3 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors shadow flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" /> PDF 리포트 다운로드
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors shadow flex items-center gap-2">
                    <UserCircleIcon className="w-5 h-5" /> 변호사 상담 예약
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition-colors shadow flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" /> 계약서 수정 요청
                  </button>
                </div>
              </div>

              {/* Export Options */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-orange-400" /> 내보내기 옵션
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="px-4 py-3 rounded-lg bg-orange-100 text-orange-700 font-semibold hover:bg-orange-200 transition-colors shadow flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" /> 전체 리포트
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors shadow flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" /> 리스크 분석
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition-colors shadow flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" /> Q&A 요약
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors shadow flex items-center gap-2">
                    <DocumentTextIcon className="w-5 h-5" /> 타임라인
                  </button>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Collaboration Panel */}
      <CollaborationPanel 
        contractId={contractId}
        isOpen={showCollaboration}
        onClose={() => setShowCollaboration(false)}
      />

      {/* Integration Panel */}
      <IntegrationPanel 
        contractId={contractId}
        isOpen={showIntegration}
        onClose={() => setShowIntegration(false)}
      />
    </div>
  );
} 