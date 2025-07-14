'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeftIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { FaListUl, FaSearch, FaFilter, FaHistory, FaCommentDots, FaRobot, FaDownload, FaShareAlt } from 'react-icons/fa';
import { diffLines } from 'diff';
import { FaRegCommentDots } from 'react-icons/fa';

const ReactDiffViewer = dynamic(() => import('react-diff-viewer'), { ssr: false });

// Mock data for demonstration
const mockVersions = [
  {
    id: 'v1',
    label: '초안',
    date: '2024-06-25',
    author: '클라이언트',
    content: `1. 계약 목적\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발을 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간 보고서를 고객에게 제출한다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 5,000,000원의 대가를 지급한다.\n4.2 지급은 매월 말일에 이루어지며, 세금계산서 발행 후 7일 이내에 지급한다.\n4.3 지연 시 연 5%의 이자가 부과된다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n\n6. 비밀유지\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 3년간 유효하다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관련 법령을 준수한다.\n7.2 데이터 백업은 주 1회 이상 수행하며, 복구 테스트는 분기별로 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지한다.\n\n8. 계약 기간 및 해지\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 30일 전에 서면 통지해야 한다.\n8.3 중대한 계약 위반 시, 즉시 해지할 수 있다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울중앙지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n\n12. 기타\n12.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n12.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.`,
  },
  {
    id: 'v2',
    label: '1차 수정',
    date: '2024-06-27',
    author: '김변호사',
    content: `1. 계약 목적\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다. 본 계약은 Beta LLC의 표준 약관을 따른다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발, 그리고 인프라 최적화를 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n2.3 \"SLA\"란 별첨 B에 정의된 서비스 수준 협약을 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A 및 별첨 C에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간 및 분기별 보고서를 고객에게 제출한다.\n3.4 고객은 연 1회 서비스 품질 평가를 요청할 수 있다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 6,000,000원의 대가를 지급한다.\n4.2 지급은 매월 10일에 이루어지며, 세금계산서 발행 후 5일 이내에 지급한다.\n4.3 지연 시 연 7%의 이자가 부과된다.\n4.4 추가 서비스 비용은 별도 청구된다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n5.3 서비스 제공자는 변경 요청 시 예상 일정 및 비용을 사전에 안내한다.\n\n6. 비밀유지 및 데이터 보호\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 5년간 유효하다.\n6.3 서비스 제공자는 개인정보 및 데이터 보호 관련 법령을 준수한다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관련 법령을 준수한다.\n7.2 데이터 백업은 주 1회 이상 수행하며, 복구 테스트는 매월 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지하고, 24시간 이내에 대응 계획을 제출한다.\n7.4 고객 데이터의 무단 접근 방지를 위한 다중 인증을 적용한다.\n\n8. 계약 기간, 해지 및 자동 갱신\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 계약 만료 60일 전 별도의 해지 통보가 없을 경우, 본 계약은 1년 단위로 자동 갱신된다.\n8.3 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 60일 전에 서면 통지해야 한다.\n8.4 중대한 계약 위반 시, 즉시 해지할 수 있다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해 및 실제 발생한 비용에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n9.3 서비스 제공자의 총 배상책임은 최근 6개월간 지급된 금액을 초과하지 않는다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울동부지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제, 감염병 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n11.2 불가항력 사유 발생 시, 즉시 상대방에게 서면 통지해야 한다.\n\n12. 하도급 및 양도\n12.1 서비스 제공자는 고객의 사전 서면 동의 없이 본 계약상의 권리와 의무를 제3자에게 양도하거나 하도급할 수 없다.\n\n13. 기타\n13.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n13.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.\n13.3 본 계약은 한글과 영어로 작성되며, 해석상 차이가 있을 경우 한글본을 우선한다.`,
  },
  {
    id: 'v3',
    label: '최종본',
    date: '2024-06-29',
    author: '이변호사',
    content: `1. 계약 목적\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다. 본 계약은 Beta LLC의 표준 약관 및 별첨 D의 추가 조항을 따른다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발, 인프라 최적화, 그리고 기술 지원을 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n2.3 \"SLA\"란 별첨 B에 정의된 서비스 수준 협약을 의미한다.\n2.4 \"추가 서비스\"란 본 계약 체결 후 별도 합의에 따라 제공되는 서비스를 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A, C 및 D에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간, 분기별 및 연간 보고서를 고객에게 제출한다.\n3.4 고객은 연 2회 서비스 품질 평가를 요청할 수 있다.\n3.5 서비스 제공자는 고객의 요청에 따라 긴급 지원을 제공한다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 6,500,000원의 대가를 지급한다.\n4.2 지급은 매월 10일에 이루어지며, 세금계산서 발행 후 3일 이내에 지급한다.\n4.3 지연 시 연 8%의 이자가 부과된다.\n4.4 추가 서비스 비용은 별도 청구된다.\n4.5 고객은 서비스 품질 평가 결과에 따라 보너스 지급을 결정할 수 있다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n5.3 서비스 제공자는 변경 요청 시 예상 일정 및 비용을 사전에 안내한다.\n5.4 모든 변경 및 추가 서비스는 별도의 계약서로 작성한다.\n\n6. 비밀유지 및 데이터 보호\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 7년간 유효하다.\n6.3 서비스 제공자는 개인정보 및 데이터 보호 관련 법령을 준수한다.\n6.4 고객 데이터의 무단 접근 방지를 위한 다중 인증 및 암호화를 적용한다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관련 법령을 준수한다.\n7.2 데이터 백업은 주 2회 이상 수행하며, 복구 테스트는 매월 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지하고, 12시간 이내에 대응 계획을 제출한다.\n7.4 고객 데이터의 무단 접근 방지를 위한 다중 인증 및 암호화를 적용한다.\n7.5 서비스 제공자는 연 1회 외부 보안 감사를 실시한다.\n\n8. 계약 기간, 해지 및 자동 갱신\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 계약 만료 90일 전 별도의 해지 통보가 없을 경우, 본 계약은 1년 단위로 자동 갱신된다.\n8.3 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 90일 전에 서면 통지해야 한다.\n8.4 중대한 계약 위반 시, 즉시 해지할 수 있다.\n8.5 계약 해지 시, 서비스 제공자는 모든 데이터와 자료를 고객에게 반환한다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해 및 실제 발생한 비용에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n9.3 서비스 제공자의 총 배상책임은 최근 12개월간 지급된 금액을 초과하지 않는다.\n9.4 고객은 서비스 제공자의 고의 또는 중대한 과실이 없는 한, 제3자의 청구에 대해 면책한다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울동부지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제, 감염병 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n11.2 불가항력 사유 발생 시, 즉시 상대방에게 서면 통지해야 한다.\n11.3 불가항력 기간 동안의 의무 이행은 유예된다.\n\n12. 하도급 및 양도\n12.1 서비스 제공자는 고객의 사전 서면 동의 없이 본 계약상의 권리와 의무를 제3자에게 양도하거나 하도급할 수 없다.\n12.2 하도급 시, 서비스 제공자는 하도급 업체의 행위에 대해 연대책임을 진다.\n\n13. 기타\n13.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n13.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.\n13.3 본 계약은 한글과 영어로 작성되며, 해석상 차이가 있을 경우 한글본을 우선한다.\n13.4 본 계약의 각 조항은 독립적으로 해석된다.`,
  },
];

const mockComments = [
  {
    id: 'c1',
    version: 'v2',
    section: '3. 비밀유지',
    author: '김변호사',
    comment: '비밀유지 조항을 더 명확하게 수정했습니다.',
    date: '2024-06-27 10:00',
  },
  {
    id: 'c2',
    version: 'v3',
    section: '3. 비밀유지',
    author: '이변호사',
    comment: '계약 당사자 범위를 명확히 했습니다.',
    date: '2024-06-29 09:30',
  },
];

function parseClauses(text: string) {
  return text.split(/\n/)
    .map((line, idx) => {
      const match = line.match(/^(\d+)\.\s*(.+)$/);
      if (match) {
        return { number: match[1], title: match[2], line: idx };
      }
      return null;
    })
    .filter(Boolean);
}

const clauseStatusMap = mockVersions.reduce((acc, v) => {
  parseClauses(v.content).forEach((c: any) => {
    if (c && !acc[c.number]) acc[c.number] = { title: c.title, status: 'unchanged' };
  });
  return acc;
}, {} as Record<string, { title: string; status: string }>);

export default function ContractDiffPage() {
  const [leftVersion, setLeftVersion] = useState('v1');
  const [rightVersion, setRightVersion] = useState('v3');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [showCollab, setShowCollab] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [clauseFilter, setClauseFilter] = useState('all');
  const [selectedClause, setSelectedClause] = useState<number | null>(null);
  const [commentModal, setCommentModal] = useState<{line: number, comment: any} | null>(null);

  const left = mockVersions.find(v => v.id === leftVersion);
  const right = mockVersions.find(v => v.id === rightVersion);
  const commentsForRight = mockComments.filter(c => c.version === rightVersion);
  const clauses = parseClauses(right?.content || '');

  // Map comments to line indices in the right (edited) contract
  const commentLineMap: Record<number, typeof mockComments[0]> = {};
  if (right) {
    mockComments.filter(c => c.version === rightVersion).forEach(comment => {
      // Find the line index for the section header in the right contract
      const sectionLine = right.content.split(/\n/).findIndex(line => line.trim().startsWith(comment.section));
      if (sectionLine !== -1) {
        commentLineMap[sectionLine] = comment;
      }
    });
  }

  // Summary analytics (mocked)
  const summary = {
    insertions: 2,
    deletions: 1,
    affectedClauses: ['3. 비밀유지'],
    risk: '낮음',
    changeTypes: ['법적 변경'],
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto pt-8 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <Link href="../" className="text-indigo-600 hover:underline flex items-center gap-1">
            <ArrowLeftIcon className="w-5 h-5" />
            돌아가기
          </Link>
          <DocumentTextIcon className="w-7 h-7 text-indigo-700 ml-2" />
          <h1 className="text-3xl font-bold text-gray-900 ml-2">계약서 버전 비교</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-6 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <span className="text-blue-600 text-2xl font-bold">ℹ️</span>
        <div>
          <div className="font-semibold text-blue-800 mb-1">이 페이지는 무엇인가요?</div>
          <div className="text-blue-900 text-sm">여기서는 계약서의 주요 변경사항을 한눈에 확인할 수 있습니다. 각 조항별로 어떤 부분이 바뀌었는지, 고객님께 중요한 영향이 있는지 쉽게 파악하실 수 있습니다. 궁금한 점이 있으면 언제든 변호사에게 문의하세요!</div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 p-4">
        {/* Clause Navigation Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showSidebar ? '' : 'hidden md:block'}`}>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 sticky top-24 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg flex items-center gap-2"><FaListUl /> 목차</span>
              <button className="text-xs text-indigo-600" onClick={() => setShowSidebar(false)}>숨기기</button>
            </div>
            <div className="flex gap-2 mb-2">
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('all')}>전체</button>
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'changed' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('changed')}>변경</button>
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'added' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('added')}>추가</button>
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'removed' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('removed')}>삭제</button>
            </div>
            <ul className="space-y-2 text-sm">
              {clauses.filter(Boolean).map((clause, idx) => {
                const c = clause as { number: string; title: string; line: number };
                return (
                  <li key={c.number}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded hover:bg-indigo-50 transition text-sm font-medium ${selectedClause === idx ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`}
                      onClick={() => setSelectedClause(idx)}
                    >
                      <span className="inline-block w-2 h-2 rounded-full mr-2 align-middle" style={{ backgroundColor: '#a3a3a3' }}></span>
                      {c.number}. {c.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <button className="flex items-center gap-2 px-3 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold"><FaSearch /> 조항 검색</button>
              <button className="flex items-center gap-2 px-3 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold"><FaFilter /> 유형별 필터</button>
            </div>
          </div>
        </aside>
        {/* Main Diff Area */}
        <section className="flex-1 flex flex-col gap-4">
          {/* Top Controls */}
          <div className="flex flex-wrap gap-2 items-center justify-between mb-2">
            <div className="flex gap-2 items-center">
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow transition-colors" onClick={() => setShowSidebar(v => !v)}><FaListUl /> 목차</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition-colors" onClick={() => setShowSummary(v => !v)}><FaHistory /> 변경 요약</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow transition-colors" onClick={() => setShowCollab(v => !v)}><FaCommentDots /> 협업</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium shadow transition-colors" onClick={() => setShowAI(v => !v)}><FaRobot /> AI 제안</button>
            </div>
            <div className="flex gap-2 items-center">
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium shadow transition-colors"><FaDownload /> PDF</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium shadow transition-colors"><FaDownload /> Word</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium shadow transition-colors"><FaShareAlt /> 공유</button>
            </div>
          </div>
          {/* Version Selector and Summary */}
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-sm">비교 기준:</span>
              <select className="border rounded px-2 py-1 text-sm" value={leftVersion} onChange={e => setLeftVersion(e.target.value)}>
                {mockVersions.filter(v => v.id !== rightVersion).map(v => (
                  <option key={v.id} value={v.id}>{v.label} ({v.date})</option>
                ))}
              </select>
              <span className="font-semibold text-sm ml-4">대상 버전:</span>
              <select className="border rounded px-2 py-1 text-sm" value={rightVersion} onChange={e => setRightVersion(e.target.value)}>
                {mockVersions.map(v => (
                  <option key={v.id} value={v.id}>{v.label} ({v.date})</option>
                ))}
              </select>
            </div>
            {showSummary && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                <span>삽입: <span className="text-green-600 font-bold">+{summary.insertions}</span></span>
                <span>삭제: <span className="text-red-600 font-bold">-{summary.deletions}</span></span>
                <span>영향받은 조항: <span className="font-semibold">{summary.affectedClauses.join(', ')}</span></span>
                <span>변경 유형: <span className="font-semibold">{summary.changeTypes.join(', ')}</span></span>
                <span>리스크: <span className="font-semibold text-yellow-700">{summary.risk}</span></span>
              </div>
            )}
          </div>
          {/* Main Diff Display (side-by-side) */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-lg">계약 변경 내역</span>
                <span className="text-xs text-gray-500">({left?.label} → {right?.label})</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow transition-colors">변호사에게 문의</button>
                <button className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition-colors">수정 요청</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {/* Original */}
              <div className="overflow-auto h-[500px] border-r pr-2 relative" aria-label="원본 계약서">
                <div className="text-lg font-semibold mb-4 text-gray-700">원본 계약서</div>
                {left?.content.split(/\n/).map((line, i) => {
                  const isSectionHeader = /^\d+\.\s/.test(line);
                  return (
                    <div key={i} className={`flex flex-row gap-0 items-center py-1 text-base font-mono whitespace-pre-wrap text-black`}>
                      <span className="w-10 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0">{i + 1}</span>
                      <span className={isSectionHeader ? 'font-bold flex-1 ml-4' : 'flex-1 ml-4'}>{line || '\u00A0'}</span>
                    </div>
                  );
                })}
              </div>
              {/* Edited/Redline */}
              <div className="overflow-auto h-[500px] relative" aria-label="수정/최종 계약서">
                <div className="text-lg font-semibold mb-4 text-gray-700">수정/최종 계약서</div>
                {(() => {
                  const diff = diffLines(left?.content || '', right?.content || '');
                  let editLine = 0;
                  return diff.flatMap((part, idx) => {
                    const lines = part.value.split(/\n/);
                    lines.pop();
                    return lines.map((line, j) => {
                      const isSectionHeader = /^\d+\.\s/.test(line);
                      let className = 'flex flex-row gap-2 items-center py-1 text-base font-mono whitespace-pre-wrap cursor-pointer';
                      if (part.added) className += ' bg-green-50 text-green-700';
                      if (part.removed) className += ' bg-red-50 text-red-700 line-through';
                      const hasComment = commentLineMap[editLine];
                      return (
                        <div key={`${idx}-${j}`} className={className} onClick={() => hasComment && setCommentModal({line: editLine, comment: hasComment})}>
                          <span className="w-10 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0 -ml-2">{editLine + 1}</span>
                          <span className={isSectionHeader ? 'font-bold flex-1 ml-4' : 'flex-1 ml-4'}>{line || '\u00A0'}
                            {hasComment && <FaRegCommentDots className="inline ml-2 text-blue-500" title="변호사 코멘트 있음" />}
                          </span>
                        </div>
                      );
                    });
                  });
                })()}
              </div>
            </div>
          </div>
          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600" />
              <span className="text-lg font-bold text-gray-900">변호사 코멘트</span>
            </div>
            {commentsForRight.length === 0 ? (
              <div className="text-gray-500 text-sm">이 버전에 대한 변호사 코멘트가 없습니다. 궁금한 점이 있으면 문의 버튼을 이용해 주세요.</div>
            ) : (
              <ul className="space-y-4">
                {commentsForRight.map(c => (
                  <li key={c.id} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-indigo-700">{c.author}</span>
                      <span className="text-xs text-gray-500">{c.date}</span>
                      <span className="ml-2 text-xs text-gray-600">[{c.section}]</span>
                    </div>
                    <div className="text-gray-900 text-sm">{c.comment}</div>
                    <div className="text-xs text-blue-700 mt-2">이 조항이 고객님께 미치는 영향에 대해 궁금하다면, 변호사에게 문의해 주세요.</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
      {/* Comment Modal */}
      {commentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-md">
            <div className="font-bold mb-2 text-blue-700 flex items-center gap-2"><FaRegCommentDots /> 변호사 코멘트</div>
            <div className="mb-2 text-sm text-gray-800"><b>조항:</b> {commentModal.comment.section}</div>
            <div className="mb-4 text-gray-900">{commentModal.comment.comment}</div>
            <div className="text-xs text-gray-500 mb-4">{commentModal.comment.author} | {commentModal.comment.date}</div>
            <button className="px-3 py-1 rounded bg-blue-700 text-white text-xs font-semibold" onClick={() => setCommentModal(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
} 