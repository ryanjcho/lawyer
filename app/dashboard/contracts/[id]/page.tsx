'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon, DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';

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

  // Mock data for demonstration
  const mockContract = contract || {
    id: contractId,
    title: '서비스 계약서_v1.0',
    type: '근로계약서',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
      ],
      suggestions: [
        { clause: '제5조', suggestion: '계약 해지 사유와 절차를 명확히 기재하세요.' },
        { clause: '제8조', suggestion: '지급 조건을 구체적으로 명시하세요.' },
        { clause: '제12조', suggestion: '분쟁 해결 조항(중재/재판 등)을 추가하세요.' },
      ],
      clauseAnalysis: [
        { clause: '제5조', risk: 'HIGH', lawyerComment: '계약 해지 관련 분쟁이 자주 발생합니다.' },
        { clause: '제8조', risk: 'MEDIUM', lawyerComment: '지급 조건이 모호하면 분쟁 소지가 있습니다.' },
        { clause: '제12조', risk: 'LOW', lawyerComment: '분쟁 해결 방식이 명확하면 좋습니다.' },
      ],
    },
    qna: [
      { question: '이 계약서로 소송 위험이 있나요?', answer: '제5조가 불명확해 소송 위험이 있습니다. 개선을 권장합니다.', time: '2024-06-25 14:12' },
      { question: '지급 조건은 안전한가요?', answer: '제8조를 구체적으로 명시하면 더 안전합니다.', time: '2024-06-25 14:15' },
    ],
    payment: { status: 'PAID', amount: 485043, invoiceUrl: '#', receiptUrl: '#' },
    timeline: [
      { event: '업로드', time: '2024-06-25 13:00' },
      { event: '분석 시작', time: '2024-06-25 13:05' },
      { event: '분석 완료', time: '2024-06-25 13:10' },
      { event: '결제 완료', time: '2024-06-25 13:12' },
      { event: '변호사 배정', time: '2024-06-25 13:20' },
      { event: '상세 리포트 제공', time: '2024-06-25 13:30' },
    ],
    notifications: [
      { title: '계약서 분석이 완료되었습니다.', time: '2024-06-25 13:10' },
      { title: '변호사 답변이 등록되었습니다.', time: '2024-06-25 14:15' },
    ],
    relatedDocs: [
      { name: 'NDA_v2.pdf', url: '#' },
      { name: '첨부파일_1.docx', url: '#' },
    ],
    versionHistory: [
      { version: 'v1.0', time: '2024-06-25 13:00' },
      { version: 'v1.1', time: '2024-06-25 13:20' },
    ],
    clientFeedback: { rating: 4.8, comment: '분석이 매우 상세하고 유용했습니다!' },
    nextSteps: [
      '변호사 상담 예약하기',
      '계약서 수정 요청하기',
      '추가 Q&A 남기기',
    ],
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
        <div className="flex items-center gap-4 mb-6">
          <DocumentTextIcon className="w-10 h-10 text-indigo-500" />
          <div>
            <h1 className="text-2xl font-bold text-indigo-700 mb-1 truncate" title={mockContract.title}>{mockContract.title}</h1>
            <div className="flex gap-2 items-center">
              {getStatusBadge(mockContract.status ?? '정보 없음')}
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{mockContract.type ?? '정보 없음'}</span>
              {getRiskBadge(mockContract.riskLevel ?? '정보 없음')}
            </div>
          </div>
        </div>
        <Tab.Group>
          <Tab.List className="flex space-x-2 border-b mb-6">
            {['개요', '당사자', '분석 요약', '상세 분석', 'Q&A', '결제', '타임라인', '알림', '보안', '첨부/연관문서', '버전', '피드백', '다음 단계'].map((tab) => (
              <Tab key={tab} className={({ selected }) => `px-4 py-2 text-sm font-semibold rounded-t-lg focus:outline-none ${selected ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}>{tab}</Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {/* 개요 */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-xs text-gray-500 mb-1">계약서명</div>
                  <div className="text-lg font-bold text-black">{mockContract.title}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">상태</div>
                  <div className="text-black font-medium">{mockContract.status ?? '정보 없음'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">업로드일</div>
                  <div className="text-black font-medium">{new Date(mockContract.createdAt).toLocaleString('ko-KR')}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">마지막 업데이트</div>
                  <div className="text-black font-medium">{new Date(mockContract.updatedAt).toLocaleString('ko-KR')}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">파일 크기</div>
                  <div className="text-black font-medium">{(mockContract.fileSize / 1024).toFixed(1)} KB</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">다운로드</div>
                  <a href={mockContract.fileUrl} className="text-indigo-600 underline font-semibold">원본 파일 다운로드</a>
                </div>
              </div>
            </Tab.Panel>
            {/* 당사자 */}
            <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-xs text-gray-500 mb-1">의뢰인</div>
                  <div className="text-black font-medium">{mockContract.user} ({mockContract.userEmail})</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">담당 변호사</div>
                  <div className="text-black font-medium">{mockContract.assignedLawyer} ({mockContract.assignedLawyerEmail})</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">상대방</div>
                  <div className="text-black font-medium">{mockContract.counterparty}</div>
                </div>
              </div>
            </Tab.Panel>
            {/* 분석 요약 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">분석 요약</div>
                <div className="mb-2">위험 수준: <span className="font-bold text-black">{mockContract.riskLevel ?? '정보 없음'}</span></div>
                <div className="mb-2">신뢰도: <span className="font-bold text-black">{mockContract.confidence}%</span></div>
                <div className="mb-2">주요 결과: {mockContract.analysisResult?.summary ?? '정보 없음'}</div>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>상세 리스크 리포트 제공</li>
                  <li>변호사 Q&A</li>
                  <li>계약서 개선 제안</li>
                </ul>
              </div>
            </Tab.Panel>
            {/* 상세 분석 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">리스크 상세</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.analysisResult?.risks ?? []).map((risk, i) => (
                    <li key={i}><b>{risk.clause}</b> [{risk.severity}]: {risk.description}</li>
                  ))}
                </ul>
                <div className="text-lg font-bold text-gray-900 mt-6 mb-2">조항별 분석</div>
                <table className="w-full text-sm border mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">조항</th>
                      <th className="p-2">위험</th>
                      <th className="p-2">변호사 의견</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(mockContract.analysisResult?.clauseAnalysis ?? []).map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{row.clause}</td>
                        <td className="p-2">{row.risk}</td>
                        <td className="p-2">{row.lawyerComment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-lg font-bold text-gray-900 mt-6 mb-2">AI/전문가 제안</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.analysisResult?.suggestions ?? []).map((s, i) => (
                    <li key={i}><b>{s.clause}</b>: {s.suggestion}</li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
            {/* Q&A */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">변호사 Q&A</div>
                <ul className="space-y-3">
                  {(mockContract.qna ?? []).map((q, i) => (
                    <li key={i} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-700"><b>Q:</b> {q.question}</div>
                      <div className="text-sm text-indigo-700 mt-1"><b>A:</b> {q.answer}</div>
                      <div className="text-xs text-gray-400 mt-1">{q.time}</div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="질문을 입력하세요 (모의 입력)" disabled />
                  <button className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors" disabled>질문 등록 (모의)</button>
                </div>
              </div>
            </Tab.Panel>
            {/* 결제 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">결제 정보</div>
                <div className="mb-2">상태: <span className="font-bold text-black">{mockContract.payment?.status ?? '정보 없음'}</span></div>
                <div className="mb-2">금액: <span className="font-bold text-black">{mockContract.payment?.amount ? mockContract.payment.amount.toLocaleString() + '원' : '정보 없음'}</span></div>
                <div className="mb-2">영수증: {mockContract.payment?.receiptUrl ? <a href={mockContract.payment.receiptUrl} className="text-indigo-600 underline">다운로드</a> : <span className="text-gray-400">정보 없음</span>}</div>
                <div className="mb-2">인보이스: {mockContract.payment?.invoiceUrl ? <a href={mockContract.payment.invoiceUrl} className="text-indigo-600 underline">다운로드</a> : <span className="text-gray-400">정보 없음</span>}</div>
              </div>
            </Tab.Panel>
            {/* 타임라인 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">진행 타임라인</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.timeline ?? []).map((t, i) => (
                    <li key={i}><b>{t.event}</b>: {t.time}</li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
            {/* 알림 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">관련 알림</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.notifications ?? []).map((n, i) => (
                    <li key={i}><b>{n.title}</b> <span className="text-xs text-gray-400">({n.time})</span></li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
            {/* 보안 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">보안 및 개인정보</div>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>모든 파일은 업로드 즉시 암호화되어 안전하게 저장됩니다.</li>
                  <li>외부에 절대 공유되지 않으며, 요청 시 즉시 삭제 가능합니다.</li>
                  <li>계약서 삭제/아카이브 <button className="ml-2 px-3 py-1 rounded bg-red-100 text-red-700 font-semibold" disabled>삭제 (모의)</button></li>
                </ul>
              </div>
            </Tab.Panel>
            {/* 첨부/연관문서 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">첨부/연관 문서</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.relatedDocs ?? []).map((doc, i) => (
                    <li key={i}><a href={doc.url} className="text-indigo-600 underline">{doc.name}</a></li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
            {/* 버전 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">버전 히스토리</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.versionHistory ?? []).map((v, i) => (
                    <li key={i}><b>{v.version}</b> <span className="text-xs text-gray-400">({v.time})</span></li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
            {/* 피드백 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">고객 피드백</div>
                <div className="mb-2">평점: <span className="font-bold text-yellow-500">★ {mockContract.clientFeedback?.rating ?? '정보 없음'}</span></div>
                <div className="mb-2">코멘트: <span className="text-black">{mockContract.clientFeedback?.comment ?? '정보 없음'}</span></div>
                <button className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors" disabled>피드백 남기기 (모의)</button>
              </div>
            </Tab.Panel>
            {/* 다음 단계 */}
            <Tab.Panel>
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-900 mb-2">다음 단계</div>
                <ul className="list-disc ml-6 text-gray-700">
                  {(mockContract.nextSteps ?? []).map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 