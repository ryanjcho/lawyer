"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { diffLines, diffWords } from 'diff';
import {
  FaCommentDots, FaChevronLeft, FaChevronRight, FaFilter, FaCheck, FaTimes, FaReply, FaUser, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaListUl, FaSearch, FaDownload, FaShareAlt, FaHistory, FaEye, FaMoon, FaSun, FaFilePdf, FaFileWord, FaExchangeAlt, FaArrowLeft, FaArrowRight, FaSyncAlt, FaRobot, FaUserShield, FaUndo, FaRedo
} from 'react-icons/fa';

// Mock contract versions with clause headings
const originalText = `1. 서론\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발을 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간 보고서를 고객에게 제출한다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 5,000,000원의 대가를 지급한다.\n4.2 지급은 매월 말일에 이루어지며, 세금계산서 발행 후 7일 이내에 지급한다.\n4.3 지연 시 연 5%의 이자가 부과된다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n\n6. 비밀유지\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 3년간 유효하다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관련 법령을 준수한다.\n7.2 데이터 백업은 주 1회 이상 수행하며, 복구 테스트는 분기별로 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지한다.\n\n8. 계약 기간 및 해지\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 30일 전에 서면 통지해야 한다.\n8.3 중대한 계약 위반 시, 즉시 해지할 수 있다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울중앙지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n\n12. 기타\n12.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n12.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.`;

const editedText = `1. 서론\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다. 본 계약은 Beta LLC의 표준 약관을 따른다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발, 그리고 인프라 최적화를 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n2.3 \"SLA\"란 별첨 B에 정의된 서비스 수준 협약을 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A 및 별첨 C에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간 및 분기별 보고서를 고객에게 제출한다.\n3.4 고객은 연 1회 서비스 품질 평가를 요청할 수 있다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 6,000,000원의 대가를 지급한다.\n4.2 지급은 매월 10일에 이루어지며, 세금계산서 발행 후 5일 이내에 지급한다.\n4.3 지연 시 연 7%의 이자가 부과된다.\n4.4 추가 서비스 비용은 별도 청구된다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n5.3 서비스 제공자는 변경 요청 시 예상 일정 및 비용을 사전에 안내한다.\n\n6. 비밀유지 및 데이터 보호\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 5년간 유효하다.\n6.3 서비스 제공자는 개인정보 및 데이터 보호 관련 법령을 준수한다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관련 법령을 준수한다.\n7.2 데이터 백업은 주 1회 이상 수행하며, 복구 테스트는 매월 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지하고, 24시간 이내에 대응 계획을 제출한다.\n7.4 고객 데이터의 무단 접근 방지를 위한 다중 인증을 적용한다.\n\n8. 계약 기간, 해지 및 자동 갱신\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 계약 만료 60일 전 별도의 해지 통보가 없을 경우, 본 계약은 1년 단위로 자동 갱신된다.\n8.3 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 60일 전에 서면 통지해야 한다.\n8.4 중대한 계약 위반 시, 즉시 해지할 수 있다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해 및 실제 발생한 비용에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n9.3 서비스 제공자의 총 배상책임은 최근 6개월간 지급된 금액을 초과하지 않는다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울동부지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제, 감염병 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n11.2 불가항력 사유 발생 시, 즉시 상대방에게 서면 통지해야 한다.\n\n12. 하도급 및 양도\n12.1 서비스 제공자는 고객의 사전 서면 동의 없이 본 계약상의 권리와 의무를 제3자에게 양도하거나 하도급할 수 없다.\n\n13. 기타\n13.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n13.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.\n13.3 본 계약은 한글과 영어로 작성되며, 해석상 차이가 있을 경우 한글본을 우선한다.`;

// Parse clauses from contract text
function parseClauses(text: string): { number: string; title: string; line: number }[] {
  const lines = text.split(/\n/);
  const clauses: { number: string; title: string; line: number }[] = [];
  lines.forEach((line, idx) => {
    const match = line.match(/^(\d+)\.\s*(.+)$/);
    if (match) {
      clauses.push({
        number: match[1],
        title: match[2],
        line: idx
      });
    }
  });
  return clauses;
}

const clauses = parseClauses(originalText);

// Diff logic for redline view
function getRedlineDiff(orig, edit) {
  const diff = diffLines(orig, edit);
  let origLine = 0, editLine = 0;
  const origLines = orig.split(/\n/);
  const rightLines: { type: string; value: string; line: number }[] = [];
  diff.forEach(part => {
    const lines = part.value.split(/\n/);
    lines.pop();
    lines.forEach(line => {
      if (part.added) {
        rightLines.push({ type: 'added', value: line, line: editLine });
        editLine++;
      } else if (part.removed) {
        // Show deletions inline in the right card as red/strikeout
        rightLines.push({ type: 'removed', value: line, line: editLine });
      } else {
        rightLines.push({ type: 'unchanged', value: line, line: editLine });
        editLine++;
      }
    });
  });
  return { origLines, rightLines };
}

// Add helper function above the component
function getRelativeOffset(child, parent) {
  let offset = 0;
  let node = child;
  while (node && node !== parent) {
    offset += node.offsetTop;
    node = node.offsetParent;
  }
  return offset;
}

// 1. Compute clause change status for each clause header
function getClauseChangeStatus(origLines, rightLines) {
  // Map: header text -> { status: 'added' | 'removed' | 'changed' | 'unchanged', origIdx, rightIdx }
  const statusMap = {};
  origLines.forEach((line, idx) => {
    const headerMatch = line.match(/^\d+\.\s*[^0-9].*$/);
    if (headerMatch) {
      const headerText = line.trim();
      // Find in rightLines
      let rightIdx = rightLines.findIndex(l => l.value && l.value.trim() === headerText);
      if (rightIdx === -1) {
        // Fallback: match by section number
        const sectionNumMatch = headerText.match(/^(\d+)\./);
        if (sectionNumMatch) {
          const sectionNum = sectionNumMatch[1];
          rightIdx = rightLines.findIndex(l => l.value && l.value.trim().startsWith(sectionNum + '.'));
        }
      }
      let status = 'unchanged';
      if (rightIdx === -1) {
        status = 'removed';
      } else {
        // Check if any line in the clause is changed
        // Find next header in origLines
        let nextHeaderIdx = origLines.findIndex((l, i) => i > idx && /^\d+\.\s*[^0-9].*$/.test(l));
        if (nextHeaderIdx === -1) nextHeaderIdx = origLines.length;
        const origClauseLines = origLines.slice(idx, nextHeaderIdx);
        const rightClauseLines = rightLines.slice(rightIdx, rightIdx + origClauseLines.length);
        const changed = rightClauseLines.some(l => l.type !== 'unchanged');
        if (changed) status = 'changed';
      }
      statusMap[headerText] = { status, origIdx: idx, rightIdx };
    }
  });
  // Find added headers in rightLines
  rightLines.forEach((l, idx) => {
    const headerMatch = l.value && l.value.match(/^\d+\.\s*[^0-9].*$/);
    if (headerMatch) {
      const headerText = l.value.trim();
      if (!statusMap[headerText]) {
        statusMap[headerText] = { status: 'added', origIdx: -1, rightIdx: idx };
      }
    }
  });
  return statusMap;
}

// Mock version history data
const mockVersions = [
  { id: 'v1', label: 'v1.0', date: '2024-06-01' },
  { id: 'v2', label: 'v1.1', date: '2024-06-15' },
  { id: 'v3', label: 'v2.0', date: '2024-07-01' },
];

type ClauseStatus = {
  status: 'added' | 'removed' | 'changed' | 'unchanged';
  origIdx: number;
  rightIdx: number;
  headerText?: string;
};

export default function ContractDiffViewer() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [showCollab, setShowCollab] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [selectedClause, setSelectedClause] = useState<ClauseStatus | null>(null);
  const [selectedChange, setSelectedChange] = useState(0);
  const origPane = useRef<HTMLDivElement | null>(null);
  const editPane = useRef<HTMLDivElement | null>(null);
  const { origLines, rightLines } = getRedlineDiff(originalText, editedText);
  // Find changes for navigation
  const changes: ({ type: string; value: string; line: number; idx: number })[] =
    rightLines.map((l, i) => ({ ...l, idx: i })).filter(l => l.type !== 'unchanged');

  // Add filter state
  const [clauseFilter, setClauseFilter] = useState('all'); // 'all' | 'changed' | 'added' | 'removed'

  // Clause jump
  useEffect(() => {
    if (selectedClause && typeof selectedClause === 'object') {
      const { origIdx, rightIdx } = selectedClause;
      // Scroll original pane
      const origEl = document.getElementById(`orig-line-${origIdx}`);
      if (origEl && origPane.current) {
        const parent = origPane.current as HTMLDivElement;
        const top = getRelativeOffset(origEl, parent);
        parent.scrollTo({ top: top - parent.clientHeight / 2 + origEl.clientHeight / 2, behavior: 'smooth' });
      }
      // Scroll edited pane
      const editEl = document.getElementById(`edit-line-${rightIdx}`);
      if (editEl && editPane.current && rightIdx !== -1) {
        const parent = editPane.current as HTMLDivElement;
        const top = getRelativeOffset(editEl, parent);
        requestAnimationFrame(() => {
          parent.scrollTo({ top: top - parent.clientHeight / 2 + editEl.clientHeight / 2, behavior: 'smooth' });
        });
      }
    }
  }, [selectedClause]);

  // Change navigation
  useEffect(() => {
    if (changes.length === 0) return;
    const idx = changes[selectedChange]?.idx;
    const el = document.getElementById(`edit-line-${idx}`);
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [selectedChange, changes]);

  // Summary analytics (mocked)
  const summary = {
    insertions: rightLines.filter(l => l.type === 'added').length,
    deletions: rightLines.filter(l => l.type === 'removed').length,
    affectedClauses: [3, 4, 5], // mock
    risk: '중간',
    changeTypes: ['비즈니스 변경', '법적 변경']
  };

  const clauseStatusMap: Record<string, ClauseStatus> = getClauseChangeStatus(origLines, rightLines);

  // Export/Share modal/toast state
  const [showExportToast, setShowExportToast] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const [selectedVersion, setSelectedVersion] = useState('v3');
  const [compareVersion, setCompareVersion] = useState('v1');

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto pt-8 pb-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 tracking-tight">계약서 워크샾</h1>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 p-4">
        {/* Clause Navigation Sidebar */}
        <aside className={`w-full md:w-64 flex-shrink-0 ${showSidebar ? '' : 'hidden md:block'}`}>
          <div className={`bg-white rounded-lg shadow p-4 mb-4 sticky top-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg flex items-center gap-2"><FaListUl /> 목차</span>
              <button className="text-xs text-indigo-600" onClick={() => setShowSidebar(false)}>숨기기</button>
            </div>
            {/* Sidebar navigation: only section headers */}
            <div className="flex gap-2 mb-2">
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('all')}>전체</button>
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'changed' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('changed')}>변경</button>
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'added' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('added')}>추가</button>
              <button className={`px-2 py-1 rounded text-xs font-semibold ${clauseFilter === 'removed' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setClauseFilter('removed')}>삭제</button>
            </div>
            <ul className="space-y-2 text-sm">
              {Object.entries(clauseStatusMap)
                .filter(([_, { status }]) => clauseFilter === 'all' || status === clauseFilter)
                .sort((a, b) => {
                  // Extract leading numbers for sorting
                  const numA = parseInt(a[0].match(/^\d+/)?.[0] || '0', 10);
                  const numB = parseInt(b[0].match(/^\d+/)?.[0] || '0', 10);
                  return numA - numB;
                })
                .map(([headerText, { status, origIdx, rightIdx }]) => (
                  <li
                    key={headerText}
                    className={`hover:bg-indigo-50 rounded px-2 py-1 cursor-pointer ${(selectedClause && typeof selectedClause === 'object' && selectedClause.origIdx === origIdx) ? 'bg-indigo-100 text-indigo-700 font-bold' : ''}`}
                    onClick={() => setSelectedClause({ origIdx, rightIdx, headerText, status })}
                  >
                    <span className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                      style={{ backgroundColor: status === 'added' ? '#22c55e' : status === 'removed' ? '#ef4444' : status === 'changed' ? '#f59e42' : '#a3a3a3' }}
                      title={status}
                    ></span>
                    {headerText}
                  </li>
                ))}
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
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium shadow transition-colors" onClick={() => setShowExportToast('PDF')}>PDF 다운로드</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium shadow transition-colors" onClick={() => setShowExportToast('Word')}>Word 다운로드</button>
              <button className="flex items-center gap-1 px-3 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium shadow transition-colors" onClick={() => { setShareLink('https://lawyer.app/share/contract-diff/12345'); setShowShareModal(true); }}>공유 링크</button>
            </div>
          </div>

          {/* Version Selector and Timeline */}
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-sm">비교 기준:</span>
              <select className="border rounded px-2 py-1 text-sm" value={compareVersion} onChange={e => setCompareVersion(e.target.value)}>
                {mockVersions.filter(v => v.id !== selectedVersion).map(v => (
                  <option key={v.id} value={v.id}>{v.label} ({v.date})</option>
                ))}
              </select>
              <span className="font-semibold text-sm ml-4">대상 버전:</span>
              <select className="border rounded px-2 py-1 text-sm" value={selectedVersion} onChange={e => setSelectedVersion(e.target.value)}>
                {mockVersions.map(v => (
                  <option key={v.id} value={v.id}>{v.label} ({v.date})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Change Summary & Analytics */}
          {showSummary && (
            <div className="bg-white rounded-lg shadow p-4 mb-2">
              <div className="flex items-center gap-2 mb-2 text-lg font-bold"><FaHistory /> 변경 요약</div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">삽입 {summary.insertions}</div>
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">삭제 {summary.deletions}</div>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">영향받은 조항 {summary.affectedClauses.length}</div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">리스크 {summary.risk}</div>
                {summary.changeTypes.map((type, i) => (
                  <div key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">{type}</div>
                ))}
              </div>
            </div>
          )}

          {/* Main Diff Display (side-by-side) */}
          <div className="bg-white rounded-lg shadow p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-lg">계약 변경 내역</span>
                <span className="text-xs text-gray-500">(v1.0 → v1.1)</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-2 py-1 rounded bg-gray-200 text-gray-800 text-xs font-medium shadow transition-colors" onClick={() => setSelectedChange(c => Math.max(c - 1, 0))}><FaArrowLeft /> 이전 변경</button>
                <button className="flex items-center gap-1 px-2 py-1 rounded bg-gray-200 text-gray-800 text-xs font-medium shadow transition-colors" onClick={() => setSelectedChange(c => Math.min(c + 1, rightLines.filter(l => l.type !== 'unchanged').length - 1))}>다음 변경 <FaArrowRight /></button>
              </div>
            </div>
            {/* Side-by-side diff: left = original, right = redline */}
            <div className="grid grid-cols-2 gap-8">
              {/* Original */}
              <div className="overflow-auto h-[600px] border-r pr-2 relative" aria-label="원본 계약서" ref={origPane}>
                <div className="text-lg font-semibold mb-4 text-gray-700">원본 계약서</div>
                {origLines.map((line, i) => {
                  const isSectionHeader = /^\d+\.\s/.test(line);
                  return (
                    <div
                  key={i}
                      id={`orig-line-${i}`}
                      className={`flex flex-row gap-0 items-center py-1 text-base font-mono whitespace-pre-wrap text-black ${(selectedClause && typeof selectedClause === 'object' && selectedClause.origIdx === i) ? 'bg-indigo-50' : ''}`}
                    >
                      <span className="w-10 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0">{i + 1}</span>
                      <span className={isSectionHeader ? 'font-bold flex-1 ml-4' : 'flex-1 ml-4'}>{line || '\u00A0'}</span>
                    </div>
                  );
                })}
              </div>
              {/* Edited/Redline */}
              <div className="overflow-auto h-[600px] relative" aria-label="수정/초안 계약서" ref={editPane}>
                <div className="text-lg font-semibold mb-4 text-gray-700">수정/초안 계약서</div>
                {rightLines.map((line, i) => {
                  const isSectionHeader = /^\d+\.\s/.test(line.value);
                  let lineContent = line.value || '\u00A0';
                  if (line.type === 'changed' && line.value) {
                    // Word-level diff is not possible without 'orig', so just render line.value as string
                    lineContent = line.value;
                  }
                  return (
                    <div
                      key={i}
                      id={`edit-line-${i}`}
                      className={`flex flex-row gap-2 items-center py-1 text-base font-mono whitespace-pre-wrap
                        ${line.type === 'added' ? 'bg-green-50 text-green-700' : ''}
                        ${line.type === 'removed' ? 'bg-red-50 text-red-700 line-through' : ''}
                        ${(selectedClause && typeof selectedClause === 'object' && selectedClause.rightIdx === i) ? 'bg-indigo-50' : ''}
                        ${selectedChange === rightLines.filter(l => l.type !== 'unchanged').findIndex(l => l.line === i) ? 'ring-2 ring-yellow-400' : ''}`}
                    >
                      <span className="w-10 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0 -ml-2">{i + 1}</span>
                      <span className={isSectionHeader ? 'font-bold flex-1 ml-4' : 'flex-1 ml-4'}>{lineContent}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Collaboration Panel (stub) */}
          {showCollab && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 mb-2 text-lg font-bold"><FaCommentDots /> 협업/댓글</div>
              <div className="text-gray-500">실시간 댓글, 멘션, 필터, 해결/보관 기능 구현 예정</div>
            </div>
          )}

          {/* AI Suggestions Panel (stub) */}
          {showAI && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-2 mb-2 text-lg font-bold"><FaRobot /> AI 제안</div>
              <div className="text-gray-500">AI가 제안하는 대체 문구, 자동 요약, 리스크 분석 등 구현 예정</div>
            </div>
          )}
        </section>
      </div>
      {/* Export Toast */}
      {showExportToast && (
        <div className="fixed top-8 right-8 z-50 bg-indigo-700 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
          {showExportToast} 내보내기 기능은 곧 제공됩니다.
          <button className="ml-4 text-xs underline" onClick={() => setShowExportToast('')}>닫기</button>
        </div>
      )}
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
            <div className="font-bold mb-2">공유 링크</div>
            <div className="mb-4 text-sm break-all">{shareLink}</div>
            <button className="px-3 py-1 rounded bg-blue-700 text-white text-xs font-semibold mr-2" onClick={() => { navigator.clipboard.writeText(shareLink); }}>복사</button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold" onClick={() => setShowShareModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </main>
  );
} 