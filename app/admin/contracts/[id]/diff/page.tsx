"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { diffLines, diffWords } from 'diff';
import {
  FaCommentDots, FaChevronLeft, FaChevronRight, FaFilter, FaCheck, FaTimes, FaReply, FaUser, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaListUl, FaSearch, FaDownload, FaShareAlt, FaHistory, FaEye, FaMoon, FaSun, FaFilePdf, FaFileWord, FaExchangeAlt, FaArrowLeft, FaArrowRight, FaSyncAlt, FaRobot, FaUserShield, FaUndo, FaRedo, FaBars, FaUsers, FaUserPlus, FaUserCheck, FaUserTimes, FaCalendarAlt, FaExclamationCircle, FaCheckDouble, FaChartBar, FaColumns, FaFileAlt, FaExpandAlt, FaCompressAlt, FaPercentage
} from 'react-icons/fa';
import { ContractExporter, ContractData, ExportOptions } from '../../../../../lib/exportUtils';
import { CollaborationManager, User, Comment as CollaborationComment, ReviewAssignment, mockUsers } from '../../../../../lib/collaborationUtils';

// Mock contract versions with clause headings
const originalText = `1. 서론\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발을 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간 보고서를 고객에게 제출한다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 5,000,000원의 대가를 지급한다.\n4.2 지급은 매월 말일에 이루어지며, 세금계산서 발행 후 7일 이내에 지급한다.\n4.3 지연 시 연 5%의 이자가 부과된다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n\n6. 비밀유지\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 3년간 유효하다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관령을 준수한다.\n7.2 데이터 백업은 주 1회 이상 수행하며, 복구 테스트는 분기별로 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지한다.\n\n8. 계약 기간 및 해지\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 30일 전에 서면 통지해야 한다.\n8.3 중대한 계약 위반 시, 즉시 해지할 수 있다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울중앙지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n\n12. 기타\n12.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n12.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.`;

const editedText = `1. 서론\n이 계약은 2024년 7월 1일, Alpha Corp(이하 \"고객\")와 Beta LLC(이하 \"서비스 제공자\") 간에 체결된다. 본 계약은 Beta LLC의 표준 약관을 따른다.\n\n2. 정의\n2.1 \"서비스\"란 본 계약에 따라 서비스 제공자가 고객에게 제공하는 IT 컨설팅, 유지보수, 클라우드 관리, 보안 모니터링, 데이터 백업 및 복구, 소프트웨어 개발, 그리고 인프라 최적화를 의미한다.\n2.2 \"기밀 정보\"란 계약 당사자가 계약 이행 중 알게 된 모든 비공개 정보를 의미한다.\n2.3 \"SLA\"란 별첨 B에 정의된 서비스 수준 협약을 의미한다.\n\n3. 서비스 범위\n3.1 서비스 제공자는 고객에게 별첨 A 및 별첨 C에 명시된 서비스와 추가적으로 요청된 업무를 제공한다.\n3.2 서비스 제공자는 서비스의 품질을 보장하며, SLA(서비스 수준 협약)에 따라 대응한다.\n3.3 서비스 제공자는 월간 및 분기별 보고서를 고객에게 제출한다.\n3.4 고객은 연 1회 서비스 품질 평가를 요청할 수 있다.\n\n4. 지불 조건\n4.1 고객은 서비스 제공자에게 월 6,000,000원의 대가를 지급한다.\n4.2 지급은 매월 10일에 이루어지며, 세금계산서 발행 후 5일 이내에 지급한다.\n4.3 지연 시 연 7%의 이자가 부과된다.\n4.4 추가 서비스 비용은 별도 청구된다.\n\n5. 변경 및 추가 서비스\n5.1 고객은 서비스 범위의 변경 또는 추가를 요청할 수 있으며, 양 당사자는 변경사항을 서면으로 합의해야 한다.\n5.2 추가 서비스에 대한 비용은 별도로 협의한다.\n5.3 서비스 제공자는 변경 요청 시 예상 일정 및 비용을 사전에 안내한다.\n\n6. 비밀유지 및 데이터 보호\n6.1 양 당사자는 계약 이행 중 알게 된 모든 기밀 정보를 제3자에게 누설해서는 안 된다.\n6.2 본 조항은 계약 종료 후 5년간 유효하다.\n6.3 서비스 제공자는 개인정보 및 데이터 보호 관련 법령을 준수한다.\n\n7. 데이터 보호 및 보안\n7.1 서비스 제공자는 개인정보보호법 등 관령을 준수한다.\n7.2 데이터 백업은 주 1회 이상 수행하며, 복구 테스트는 매월 실시한다.\n7.3 보안 사고 발생 시 즉시 고객에게 통지하고, 24시간 이내에 대응 계획을 제출한다.\n7.4 고객 데이터의 무단 접근 방지를 위한 다중 인증을 적용한다.\n\n8. 계약 기간, 해지 및 자동 갱신\n8.1 본 계약의 유효기간은 2024년 7월 1일부터 2025년 6월 30일까지로 한다.\n8.2 계약 만료 60일 전 별도의 해지 통보가 없을 경우, 본 계약은 1년 단위로 자동 갱신된다.\n8.3 어느 한 쪽이 계약을 해지하고자 할 경우, 최소 60일 전에 서면 통지해야 한다.\n8.4 중대한 계약 위반 시, 즉시 해지할 수 있다.\n\n9. 손해배상\n9.1 계약 위반 시, 위반 당사자는 상대방에게 직접적 손해 및 실제 발생한 비용에 대해 배상해야 한다.\n9.2 간접손해, 특별손해, 결과적 손해는 배상하지 않는다.\n9.3 서비스 제공자의 총 배상책임은 최근 6개월간 지급된 금액을 초과하지 않는다.\n\n10. 준거법 및 관할\n10.1 본 계약은 대한민국 법에 따라 해석된다.\n10.2 본 계약과 관련된 모든 분쟁은 서울동부지방법원을 1심 전속 관할로 한다.\n\n11. 불가항력\n11.1 천재지변, 전쟁, 정부의 규제, 감염병 등 불가항력 사유로 인한 계약 불이행 시, 당사자는 책임을 지지 않는다.\n11.2 불가항력 사유 발생 시, 즉시 상대방에게 서면 통지해야 한다.\n\n12. 하도급 및 양도\n12.1 서비스 제공자는 고객의 사전 서면 동의 없이 본 계약상의 권리와 의무를 제3자에게 양도하거나 하도급할 수 없다.\n\n13. 기타\n13.1 본 계약에 명시되지 않은 사항은 상호 협의하여 별도로 정한다.\n13.2 본 계약의 모든 변경은 서면으로 이루어져야 한다.\n13.3 본 계약은 한글과 영어로 작성되며, 해석상 차이가 있을 경우 한글본을 우선한다.`;

// Parse clauses from contract text
function parseClauses(text: string): { number: string; title: string; line: number }[] {
  const lines = text.split(/\n/);
  const clauses: { number: string; title: string; line: number }[] = [];
  lines.forEach((line, idx) => {
    // Only match top-level headers: e.g., 1. 서론 (not 2.1, 3.2, etc.)
    const match = line.match(/^(\d+)\.\s+(.+)$/);
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

// Enhanced diff logic with word-level diffing
function getAdvancedDiff(orig, edit) {
  const lineDiff = diffLines(orig, edit);
  const wordDiff = diffWords(orig, edit);
  
  let origLine = 0, editLine = 0;
  const origLines = orig.split(/\n/);
  const rightLines: { type: string; value: string; line: number; wordChanges?: any[] }[] = [];
  
  lineDiff.forEach(part => {
    const lines = part.value.split(/\n/);
    lines.pop();
    lines.forEach(line => {
      if (part.added) {
        // Add word-level changes for added lines
        const wordChanges = getWordChanges(line, '');
        rightLines.push({ type: 'added', value: line, line: editLine, wordChanges });
        editLine++;
      } else if (part.removed) {
        // Show deletions inline in the right card as red/strikeout
        const wordChanges = getWordChanges('', line);
        rightLines.push({ type: 'removed', value: line, line: editLine, wordChanges });
      } else {
        // Check for word-level changes in unchanged lines
        const wordChanges = getWordChanges(line, line);
        rightLines.push({ type: 'unchanged', value: line, line: editLine, wordChanges });
        editLine++;
      }
    });
  });
  
  return { origLines, rightLines, wordDiff };
}

// Word-level change detection
function getWordChanges(origLine: string, editLine: string) {
  if (origLine === editLine) return [];
  
  const words = diffWords(origLine, editLine);
  return words.map(word => ({
    type: word.added ? 'added' : word.removed ? 'removed' : 'unchanged',
    value: word.value,
    length: word.value.length
  }));
}

// Calculate diff statistics
function calculateDiffStats(origLines, rightLines) {
  let addedLines = 0;
  let removedLines = 0;
  let modifiedLines = 0;
  let totalWords = 0;
  let changedWords = 0;
  
  rightLines.forEach(line => {
    if (line.type === 'added') {
      addedLines++;
      if (line.wordChanges) {
        line.wordChanges.forEach(word => {
          if (word.type === 'added') changedWords++;
          totalWords += word.length;
        });
      }
    } else if (line.type === 'removed') {
      removedLines++;
      if (line.wordChanges) {
        line.wordChanges.forEach(word => {
          if (word.type === 'removed') changedWords++;
          totalWords += word.length;
        });
      }
    } else if (line.type === 'unchanged') {
      if (line.wordChanges) {
        const hasChanges = line.wordChanges.some(word => word.type !== 'unchanged');
        if (hasChanges) {
          modifiedLines++;
          line.wordChanges.forEach(word => {
            if (word.type !== 'unchanged') changedWords++;
            totalWords += word.length;
          });
        }
      }
    }
  });
  
  return {
    addedLines,
    removedLines,
    modifiedLines,
    totalWords,
    changedWords,
    changePercentage: totalWords > 0 ? Math.round((changedWords / totalWords) * 100) : 0
  };
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
  const params = useParams();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [showCollab, setShowCollab] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showChanges, setShowChanges] = useState(true);
  const [selectedClause, setSelectedClause] = useState<ClauseStatus | null>(null);
  const [selectedChange, setSelectedChange] = useState(0);
  const [leftVersion, setLeftVersion] = useState(0);
  const [rightVersion, setRightVersion] = useState(1);
  const origPane = useRef<HTMLDivElement | null>(null);
  const editPane = useRef<HTMLDivElement | null>(null);
  const { origLines, rightLines, wordDiff } = getAdvancedDiff(originalText, editedText);
  
  // Advanced diff features state
  const [viewMode, setViewMode] = useState<'unified' | 'side-by-side'>('unified');
  const [showWordLevel, setShowWordLevel] = useState(true);
  const [showDiffStats, setShowDiffStats] = useState(true);
  const [diffStats, setDiffStats] = useState(() => calculateDiffStats(origLines, rightLines));
  
  // Find changes for navigation
  const changes: ({ type: string; value: string; line: number; idx: number })[] =
    rightLines.map((l, i) => ({ ...l, idx: i })).filter(l => l.type !== 'unchanged');

  // Add filter state
  const [clauseFilter, setClauseFilter] = useState('all'); // 'all' | 'changed' | 'added' | 'removed'

  // Collaboration state
  const [currentUser] = useState<User>(mockUsers[0]); // Mock current user
  const [collaborationManager] = useState(() => new CollaborationManager(params?.id as string, currentUser));
  const [collaborationState, setCollaborationState] = useState(collaborationManager.getState());
  const [showCollaborationPanel, setShowCollaborationPanel] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeComments: true,
    includeSummary: true,
    watermark: 'DRAFT',
  });

  // Initialize collaboration
  useEffect(() => {
    // Add mock users to collaboration
    mockUsers.slice(1).forEach(user => collaborationManager.addUser(user));
    
    // Set up state change listener
    collaborationManager['onStateChange'] = setCollaborationState;
  }, [collaborationManager]);

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
    if (el && editPane.current) {
      const parent = editPane.current as HTMLDivElement;
      const top = el.offsetTop - parent.offsetTop;
      parent.scrollTo({ top: top - 80, behavior: 'smooth' }); // 80px from top
    }
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

  const [comments, setComments] = useState<{ line: number; text: string; id: string; timestamp: Date; author: User }[]>([]);
  const [selectedLineForComment, setSelectedLineForComment] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  // Export function
  const handleExport = async () => {
    try {
      const contractData: ContractData = {
        id: params?.id as string,
        originalText,
        modifiedText: editedText,
        changes: rightLines
          .filter(line => line.type !== 'unchanged')
          .map(line => ({
            type: line.type as 'added' | 'removed' | 'modified',
            line: line.line,
            originalText: line.type === 'removed' ? line.value : undefined,
            newText: line.type === 'added' ? line.value : undefined,
          })),
        comments: collaborationState.comments.map(c => ({
          line: c.line,
          text: c.text,
          author: c.author.name,
          timestamp: c.timestamp,
        })),
        metadata: {
          contractName: `Contract ${params?.id}`,
          version: 'v1.1',
          lastModified: new Date(),
          authors: collaborationState.activeUsers.map(u => u.name),
        },
      };

      const exporter = new ContractExporter(contractData, exportOptions);
      await exporter.export();
      setShowExportToast('Export completed successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      setShowExportToast('Export failed. Please try again.');
    }
  };

  // --- FILTERED RIGHT LINES FOR CHANGES ONLY ---
  const filteredRightLines = showChanges ? rightLines.filter(line => line.type !== 'removed') : rightLines;

  // --- Synchronized scrolling for side-by-side panes ---
  useEffect(() => {
    if (viewMode !== 'side-by-side') return;
    const orig = origPane.current;
    const edit = editPane.current;
    if (!orig || !edit) return;
    let isSyncing = false;
    const syncScroll = (source, target) => {
      if (isSyncing) return;
      isSyncing = true;
      target.scrollTop = source.scrollTop;
      setTimeout(() => { isSyncing = false; }, 1);
    };
    const origHandler = () => syncScroll(orig, edit);
    const editHandler = () => syncScroll(edit, orig);
    orig.addEventListener('scroll', origHandler);
    edit.addEventListener('scroll', editHandler);
    return () => {
      orig.removeEventListener('scroll', origHandler);
      edit.removeEventListener('scroll', editHandler);
    };
  }, [viewMode]);

  // Build a combined, sorted list of all top-level clause headers (original + added)
  const sidebarClauses = [
    ...clauses.map(clause => ({
      headerText: `${clause.number}. ${clause.title}`,
      origIdx: clause.line,
      rightIdx: clauseStatusMap[`${clause.number}. ${clause.title}`]?.rightIdx,
      status: clauseStatusMap[`${clause.number}. ${clause.title}`]?.status,
      isAdded: false,
    })),
    ...Object.entries(clauseStatusMap)
      .filter(([headerText, { status, origIdx }]) => status === 'added')
      .map(([headerText, { rightIdx }]) => ({
        headerText,
        origIdx: -1,
        rightIdx,
        status: 'added',
        isAdded: true,
      }))
  ].filter(clause => clauseFilter === 'all' || clause.status === clauseFilter)
   .sort((a, b) => {
     const numA = parseInt(a.headerText.match(/^(\d+)/)?.[1] || '0', 10);
     const numB = parseInt(b.headerText.match(/^(\d+)/)?.[1] || '0', 10);
     return numA - numB;
   });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link href={`/admin/contracts/${params?.id}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">계약서 워크샾</h1>
                  <p className="text-sm text-gray-500">계약 변경 내역 비교 및 검토</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowExportModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <FaDownload className="mr-2" />
                  내보내기
                </button>
                <button 
                  onClick={() => setShowCollaborationPanel(!showCollaborationPanel)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showCollaborationPanel 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FaUsers className="mr-2" />
                  협업 ({collaborationState.activeUsers.length})
                </button>
                <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <FaShareAlt className="mr-2" />
                  공유
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Enhanced Clause Navigation Sidebar */}
          <aside className={`lg:col-span-2 ${showSidebar ? '' : 'hidden lg:block'}`} ref={sidebarRef}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-[900px] sticky top-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <FaListUl className="mr-2 text-indigo-600" />
                  목차
                </h2>
                <button className="text-xs text-gray-500 hover:text-gray-700" onClick={() => setShowSidebar(false)}>
                  <FaChevronLeft className="h-4 w-4" />
                </button>
              </div>
              
              {/* Simple Filter */}
              <div className="mb-4">
                <select 
                  value={clauseFilter} 
                  onChange={(e) => setClauseFilter(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-black bg-white"
                >
                  <option value="all">전체 조항</option>
                  <option value="changed">변경된 조항</option>
                  <option value="added">추가된 조항</option>
                  <option value="removed">삭제된 조항</option>
                </select>
              </div>
              
              {/* Enhanced Clause List */}
              <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
                {sidebarClauses.map(clause => (
                  <div
                    key={clause.headerText}
                    className={`p-2 rounded cursor-pointer transition-colors ${
                      (selectedClause && typeof selectedClause === 'object' &&
                        (clause.isAdded
                          ? selectedClause.rightIdx === clause.rightIdx
                          : selectedClause.origIdx === clause.origIdx))
                        ? 'bg-indigo-50 border border-indigo-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedClause(clauseStatusMap[clause.headerText]);
                      // Scroll original contract pane (if not added)
                      if (!clause.isAdded) {
                        const origEl = document.getElementById(`orig-header-${clause.origIdx}`);
                        if (origEl && origPane.current) {
                          const parent = origPane.current as HTMLDivElement;
                          const top = origEl.offsetTop - parent.offsetTop;
                          parent.scrollTo({ top: top - 80, behavior: 'smooth' });
                        }
                      }
                      // Scroll edited contract pane
                      let editIdx = clause.rightIdx;
                      if (!showChanges) {
                        editIdx = filteredRightLines.findIndex(l => rightLines.indexOf(l) === clause.rightIdx);
                      }
                      const editEl = document.getElementById(`clause-header-${editIdx}`);
                      if (editEl && editPane.current) {
                        const parent = editPane.current as HTMLDivElement;
                        const top = editEl.offsetTop - parent.offsetTop;
                        parent.scrollTo({ top: top - 80, behavior: 'smooth' });
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${
                        (selectedClause && typeof selectedClause === 'object' &&
                          (clause.isAdded
                            ? selectedClause.rightIdx === clause.rightIdx
                            : selectedClause.origIdx === clause.origIdx))
                          ? 'text-indigo-700'
                          : 'text-gray-700'
                      }`}>
                        {clause.headerText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              

            </div>
          </aside>

          {/* Main Diff Area */}
          <section className="lg:col-span-8 flex flex-col gap-4">
            {/* Minimal Unified Diff Block */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">계약서 비교 분석</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">계약서 ID:</span>
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-black">{params?.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">보기 모드:</span>
                    <button
                      onClick={() => setViewMode('unified')}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        viewMode === 'unified'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      통합 보기
                    </button>
                    <button
                      onClick={() => setViewMode('side-by-side')}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        viewMode === 'side-by-side'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      나란히 보기
                    </button>
                  </div>
                  
                  {/* Changes Toggle */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">변경사항:</span>
                    <button
                      onClick={() => setShowChanges(!showChanges)}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${
                        showChanges
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {showChanges ? '변경사항만' : '전체 텍스트'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Unified View */}
              {viewMode === 'unified' && (
                <div className="overflow-auto h-[900px] border border-gray-200 rounded-lg p-2" aria-label="통합 계약서" ref={editPane}>
                  <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-200 px-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-gray-900">통합 계약서</h4>
                  </div>
                  <div className="space-y-0">
                    {(showChanges ? rightLines : rightLines.filter(line => line.type !== 'removed'))
                      .map((line, i) => {
                        const isSectionHeader = /^\d+\.\s/.test(line.value);
                        let lineContent = line.value || '\u00A0';
                        if (line.type === 'changed' && line.value) {
                          lineContent = line.value;
                        }
                        const originalIndex = rightLines.indexOf(line);
                        const lineComments = comments.filter(c => c.line === originalIndex);
                        const hasComments = lineComments.length > 0;
                        return (
                          <div key={i} id={`edit-line-${originalIndex}`}
                            className={`flex items-start py-1 px-1 rounded group hover:bg-gray-50 ${
                              showChanges ? (
                                line.type === 'added' ? 'bg-green-50 border-l-2 border-green-500' :
                                line.type === 'removed' ? 'bg-red-50 border-l-2 border-red-500' :
                                line.type === 'changed' ? 'bg-yellow-50 border-l-2 border-yellow-500' :
                                isSectionHeader ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                              ) : (
                                isSectionHeader ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                              )
                            }`}
                          >
                            <span className="w-8 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0 mr-2">{i + 1}</span>
                            <div className="flex-1 flex items-start justify-between">
                              {isSectionHeader ? (
                                <span
                                  className="text-sm leading-relaxed text-blue-800 font-semibold"
                                  id={`clause-header-${originalIndex}`}
                                  onClick={() => {
                                    const clause = clauses.find(c => c.line === originalIndex);
                                    if (clause) setSelectedClause(clauseStatusMap[`${clause.number}. ${clause.title}`]);
                                  }}
                                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                  {lineContent}
                                </span>
                              ) : (
                                <span
                                  className={`text-sm leading-relaxed ${
                                    showChanges ? (
                                      line.type === 'added' ? 'text-green-800' :
                                      line.type === 'removed' ? 'text-red-800 line-through' :
                                      line.type === 'changed' ? 'text-yellow-800' : 'text-gray-700'
                                    ) : 'text-gray-700'
                                  }`}
                                >
                                  {lineContent}
                                </span>
                              )}
                              <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {hasComments && (
                                  <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                                    {lineComments.length}
                                  </span>
                                )}
                                <button
                                  onClick={() => setSelectedLineForComment(originalIndex)}
                                  className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50"
                                  title="댓글 추가"
                                >
                                  <FaCommentDots className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Side-by-Side View */}
              {viewMode === 'side-by-side' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Original */}
                  <div className="overflow-auto h-[900px] border border-gray-200 rounded-lg p-2" aria-label="원본 계약서" ref={origPane}>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-200 px-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <h4 className="text-sm font-semibold text-gray-900">원본 계약서</h4>
                    </div>
                    <div className="space-y-0">
                      {Array.from({ length: Math.max(origLines.length, filteredRightLines.length) }).map((_, i) => {
                        const origLine = origLines[i];
                        const isSectionHeader = origLine && /^\d+\.\s/.test(origLine);
                        return (
                          <div key={i} className={`flex items-start py-1 px-1 rounded ${isSectionHeader ? 'bg-blue-50 border-l-2 border-blue-500' : ''}`}>
                            <span className="w-8 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0 mr-2">{i + 1}</span>
                            <span
                              className={`flex-1 text-sm leading-relaxed ${isSectionHeader ? 'text-blue-800 font-semibold' : 'text-gray-700'}`}
                              {...(isSectionHeader ? { id: `orig-header-${i}` } : {})}
                            >
                              {origLine || '\u00A0'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Edited */}
                  <div className="overflow-auto h-[900px] border border-gray-200 rounded-lg p-2" aria-label="수정/초안 계약서" ref={editPane}>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-gray-200 px-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <h4 className="text-sm font-semibold text-gray-900">수정/초안 계약서</h4>
                    </div>
                    <div className="space-y-0">
                      {(showChanges ? rightLines : rightLines.filter(line => line.type !== 'removed')).map((line, i) => {
                        const isSectionHeader = line && /^\d+\.\s/.test(line.value);
                        let lineContent = line && (line.value || '\u00A0');
                        if (line && line.type === 'changed' && line.value) {
                          lineContent = line.value;
                        }
                        const lineComments = line ? comments.filter(c => c.line === rightLines.indexOf(line)) : [];
                        const hasComments = lineComments.length > 0;
                        const originalIndex = line ? rightLines.indexOf(line) : i;
                        return (
                          <div
                            key={i}
                            id={line && isSectionHeader ? `clause-header-${i}` : undefined}
                            className={`flex items-start py-1 px-1 rounded group hover:bg-gray-50 ${
                              showChanges ? (
                                line.type === 'added' ? 'bg-green-50 border-l-2 border-green-500' :
                                line.type === 'removed' ? 'bg-red-50 border-l-2 border-red-500' :
                                line.type === 'changed' ? 'bg-yellow-50 border-l-2 border-yellow-500' :
                                isSectionHeader ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                              ) : (
                                isSectionHeader ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                              )
                            }`}
                          >
                            <span className="w-8 text-right text-xs text-gray-400 select-none font-mono flex-shrink-0 mr-2">{i + 1}</span>
                            <div className="flex-1 flex items-start justify-between">
                              {line ? (
                                isSectionHeader ? (
                                  <span
                                    className="text-sm leading-relaxed text-blue-800 font-semibold"
                                    id={`clause-header-${originalIndex}`}
                                    onClick={() => {
                                      const clause = clauses.find(c => c.line === originalIndex);
                                      if (clause) setSelectedClause(clauseStatusMap[`${clause.number}. ${clause.title}`]);
                                    }}
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                  >
                                    {lineContent}
                                  </span>
                                ) : (
                                  <span
                                    className={`text-sm leading-relaxed ${
                                      showChanges ? (
                                        line.type === 'added' ? 'text-green-800' :
                                        line.type === 'removed' ? 'text-red-800 line-through' :
                                        line.type === 'changed' ? 'text-yellow-800' : 'text-gray-700'
                                      ) : 'text-gray-700'
                                    }`}
                                  >
                                    {lineContent}
                                  </span>
                                )
                              ) : (
                                <span className="text-sm leading-relaxed text-gray-300">\u00A0</span>
                              )}
                              <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {hasComments && (
                                  <span className="text-xs text-blue-600 bg-blue-100 px-1 py-0.5 rounded">
                                    {lineComments.length}
                                  </span>
                                )}
                                {line && (
                                  <button
                                    onClick={() => setSelectedLineForComment(originalIndex)}
                                    className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50"
                                    title="댓글 추가"
                                  >
                                    <FaCommentDots className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Enhanced Collaboration Panel */}
          {showCollab && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCommentDots className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">협업/댓글</h3>
              </div>
              <div className="text-gray-500 text-sm">실시간 댓글, 멘션, 필터, 해결/보관 기능 구현 예정</div>
            </div>
          )}

          {/* Comments Panel */}
          <aside className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-[900px] sticky top-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <FaCommentDots className="mr-2 text-indigo-600" />
                  댓글
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {comments.length}개
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaCommentDots className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">아직 댓글이 없습니다.</p>
                    <p className="text-xs text-gray-400 mt-1">라인에 마우스를 올리고 댓글 아이콘을 클릭하세요.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {comments
                      .sort((a, b) => a.line - b.line)
                      .map((comment) => (
                        <div key={comment.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                라인 {comment.line + 1}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <button
                              onClick={() => setComments(prev => prev.filter(c => c.id !== comment.id))}
                              className="text-gray-400 hover:text-red-600 text-xs"
                              title="댓글 삭제"
                            >
                              <FaTimes className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-800">{comment.text}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <FaUser className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{comment.author?.name || '사용자'}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedLineForComment(0)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <FaCommentDots className="h-4 w-4" />
                  새 댓글 추가
                </button>
              </div>
            </div>
          </aside>

          {/* Enhanced AI Suggestions Panel */}
          {showAI && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaRobot className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-bold text-gray-900">AI 제안</h3>
              </div>
              <div className="text-gray-500 text-sm">AI가 제안하는 대체 문구, 자동 요약, 리스크 분석 등 구현 예정</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 min-w-[500px] max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <FaDownload className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">내보내기 설정</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">파일 형식</label>
                <select 
                  value={exportOptions.format}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, format: e.target.value as 'pdf' | 'docx' | 'txt' }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white"
                >
                  <option value="pdf">PDF (권장)</option>
                  <option value="docx">Word 문서</option>
                  <option value="txt">텍스트 파일</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">워터마크</label>
                <input 
                  type="text"
                  value={exportOptions.watermark || ''}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, watermark: e.target.value }))}
                  placeholder="예: DRAFT, CONFIDENTIAL"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    checked={exportOptions.includeSummary}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeSummary: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">변경 요약 포함</span>
                </label>
                
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    checked={exportOptions.includeComments}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeComments: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">댓글 포함</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                내보내기
              </button>
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Panel */}
      {showCollaborationPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 min-w-[600px] max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaUsers className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">협업 관리</h3>
              </div>
              <button 
                onClick={() => setShowCollaborationPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Active Users */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <FaUserCheck className="mr-2 text-green-600" />
                  활성 사용자 ({collaborationState.activeUsers.length})
                </h4>
                <div className="space-y-2">
                  {collaborationState.activeUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FaUser className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">온라인</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Review Assignments */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  검토 할당
                </h4>
                <div className="space-y-2">
                  {collaborationState.assignments.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center py-4">
                      할당된 검토 작업이 없습니다.
                    </div>
                  ) : (
                    collaborationState.assignments.map(assignment => (
                      <div key={assignment.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{assignment.clauseTitle}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            assignment.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                            assignment.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {assignment.priority}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          담당: {assignment.assignedTo.name} | 마감: {assignment.dueDate.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                            assignment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                            assignment.status === 'overdue' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-md font-semibold text-gray-900 mb-3">빠른 작업</h4>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  <FaUserPlus className="h-4 w-4" />
                  사용자 초대
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  <FaCalendarAlt className="h-4 w-4" />
                  검토 할당
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  <FaCheckDouble className="h-4 w-4" />
                  승인 요청
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Export Toast */}
      {showExportToast && (
        <div className="fixed top-8 right-8 z-50 bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <FaDownload className="h-4 w-4" />
            <span>{showExportToast}</span>
            <button className="ml-4 text-xs underline hover:text-indigo-200" onClick={() => setShowExportToast('')}>닫기</button>
          </div>
        </div>
      )}
      
      {/* Enhanced Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 min-w-[400px] max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <FaShareAlt className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">공유 링크</h3>
            </div>
            <div className="mb-6 p-3 bg-gray-50 rounded-lg text-sm break-all font-mono">{shareLink}</div>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors" onClick={() => { navigator.clipboard.writeText(shareLink); }}>
                복사
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors" onClick={() => setShowShareModal(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Input Modal */}
      {selectedLineForComment !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <FaCommentDots className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">댓글 추가</h3>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              placeholder="댓글을 입력하세요..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelectedLineForComment(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  if (commentInput.trim()) {
                    const newComment = {
                      id: `comment-${Date.now()}`,
                      line: selectedLineForComment,
                      text: commentInput,
                      author: currentUser,
                      timestamp: new Date(),
                    };
                    setComments(prev => [...prev, newComment]);
                    setCommentInput('');
                    setSelectedLineForComment(null);
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                댓글 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 