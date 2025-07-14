"use client";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { FaTrash, FaEdit, FaPlus, FaSignInAlt, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

interface AuditLog {
  id: string;
  user?: { email: string; name: string } | null;
  action: string;
  details?: string;
  createdAt: string;
}

const PAGE_SIZE = 20;

function parseDetails(details) {
  try {
    const obj = JSON.parse(details);
    if (obj && (obj.before || obj.after)) return obj;
  } catch {}
  return null;
}

function getEventIcon(action) {
  const a = action.toLowerCase();
  if (a.includes('delete')) return <FaTrash className="text-red-600 inline mr-1" title="삭제" />;
  if (a.includes('update')) return <FaEdit className="text-yellow-700 inline mr-1" title="수정" />;
  if (a.includes('create')) return <FaPlus className="text-green-700 inline mr-1" title="생성" />;
  if (a.includes('login')) return <FaSignInAlt className="text-blue-700 inline mr-1" title="로그인" />;
  if (a.includes('fail') || a.includes('error')) return <FaExclamationTriangle className="text-red-500 inline mr-1" title="실패" />;
  return <FaInfoCircle className="text-gray-500 inline mr-1" title="기타" />;
}

export default function AuditLogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [showDetail, setShowDetail] = useState<AuditLog | null>(null);
  const [sortCol, setSortCol] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    // Always use mock data for demo/dev
    const fixedBaseDate = new Date('2024-07-07T09:00:00+09:00');
    const mockUsers = [
      { name: '오성헌', email: 'shoh@ohkimslaw.com' },
      { name: '김용범', email: 'ybkim@ohkimslaw.com' },
      { name: '엄태섭', email: 'tsum@ohkimslaw.com' },
      { name: '조진석', email: 'jscho@ohkimslaw.com' },
      { name: 'Beta LLC', email: 'kim@betallc.com' },
      { name: 'Admin', email: 'admin@lawkit.com' }
    ];
    const mockActions = [
      '계약서 업로드',
      '계약서 수정',
      'AI 검토 요청',
      'AI 검토 완료',
      '변호사 검토 시작',
      '변호사 검토 완료',
      '클라이언트 피드백 등록',
      '계약 승인',
      '계약 반려',
      '전자서명 완료',
      '파일 다운로드',
      '알림 발송',
      '계정 생성',
      '계정 비밀번호 변경',
      '로그인',
      '로그아웃'
    ];
    const mockAuditLogs = Array.from({ length: 30 }, (_, i) => {
      const user = mockUsers[i % mockUsers.length];
      const action = mockActions[i % mockActions.length];
      // Spread entries over the last 30 days
      const createdAt = new Date(fixedBaseDate.getTime() - i * 24 * 60 * 60 * 1000).toISOString();
      return {
        id: String(i + 1), // id as string
        action,
        createdAt,
        user
      };
    });
    setLogs(mockAuditLogs);
    setLoading(false);
  }, [session, status, router]);

  // Filtering, then sorting
  const filteredLogs = useMemo(() => {
    let arr = logs.filter((log) => {
      const matchesSearch =
        !search ||
        log.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        log.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        (log.details || "").toLowerCase().includes(search.toLowerCase());
      const matchesUser = !userFilter || log.user?.email === userFilter;
      const matchesAction = !actionFilter || log.action === actionFilter;
      const logDate = new Date(log.createdAt);
      const matchesDateFrom = !dateFrom || logDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || logDate <= new Date(dateTo + "T23:59:59");
      return matchesSearch && matchesUser && matchesAction && matchesDateFrom && matchesDateTo;
    });
    // Sorting
    arr = arr.sort((a, b) => {
      let vA, vB;
      if (sortCol === 'createdAt') {
        vA = new Date(a.createdAt).getTime();
        vB = new Date(b.createdAt).getTime();
      } else if (sortCol === 'user') {
        vA = (a.user?.name || '').localeCompare(b.user?.name || '');
        vB = (b.user?.name || '').localeCompare(a.user?.name || '');
      } else if (sortCol === 'action') {
        vA = (a.action || '').localeCompare(b.action || '');
        vB = (b.action || '').localeCompare(a.action || '');
      }
      return sortDir === 'asc' ? vA - vB : vB - vA;
    });
    return arr;
  }, [logs, search, userFilter, actionFilter, dateFrom, dateTo, sortCol, sortDir]);

  // Infinite scroll: show only visibleCount logs
  const pagedLogs = filteredLogs.slice(0, visibleCount);

  // Unique users and actions for filters
  const userOptions = useMemo(() => {
    const emails = Array.from(new Set(logs.map(l => l.user?.email).filter(Boolean)));
    return emails.map(email => {
      const name = logs.find(l => l.user?.email === email)?.user?.name || email;
      return { email, name };
    });
  }, [logs]);
  const actionOptions = useMemo(() => Array.from(new Set(logs.map(l => l.action))), [logs]);

  // CSV Export
  const exportCSV = () => {
    const header = ["시간", "사용자", "이메일", "행동", "세부 정보"];
    const rows = filteredLogs.map(l => [
      new Date(l.createdAt).toLocaleString('Asia/Seoul'),
      l.user?.name || "-",
      l.user?.email || "-",
      l.action,
      l.details || "-",
    ]);
    const csvContent = [header, ...rows].map(r => r.map(x => `"${x ?? ''}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "audit-log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">감사 로그</h1>
              <div className="flex flex-wrap gap-4 mb-6 items-end">
          <input
            className="border rounded px-3 py-2 text-black w-56"
            placeholder="검색 (사용자, 이메일, 행동, 세부)"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
          <select
            className="border rounded px-3 py-2 text-black"
            value={userFilter}
            onChange={e => { setUserFilter(e.target.value); setPage(1); }}
          >
            <option value="">전체 사용자</option>
            {userOptions.map(u => <option key={u.email} value={u.email}>{u.name} ({u.email})</option>)}
          </select>
          <select
            className="border rounded px-3 py-2 text-black"
            value={actionFilter}
            onChange={e => { setActionFilter(e.target.value); setPage(1); }}
          >
            <option value="">전체 행동</option>
            {actionOptions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <div className="flex flex-col">
            <label className="text-xs text-black mb-1">시작일</label>
            <input type="date" className="border rounded px-3 py-2 text-black" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-black mb-1">종료일</label>
            <input type="date" className="border rounded px-3 py-2 text-black" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} />
          </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition ml-auto" onClick={exportCSV}>CSV 내보내기</button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-black border-b">
              <th className="py-2 px-3 font-semibold cursor-pointer" onClick={() => { setSortCol('createdAt'); setSortDir(sortCol==='createdAt'&&sortDir==='desc'?'asc':'desc'); }}>
                시간 {sortCol==='createdAt' ? (sortDir==='desc'?'▼':'▲') : ''}
              </th>
              <th className="py-2 px-3 font-semibold cursor-pointer" onClick={() => { setSortCol('user'); setSortDir(sortCol==='user'&&sortDir==='desc'?'asc':'desc'); }}>
                사용자 {sortCol==='user' ? (sortDir==='desc'?'▼':'▲') : ''}
              </th>
              <th className="py-2 px-3 font-semibold">이메일</th>
              <th className="py-2 px-3 font-semibold cursor-pointer" onClick={() => { setSortCol('action'); setSortDir(sortCol==='action'&&sortDir==='desc'?'asc':'desc'); }}>
                행동 {sortCol==='action' ? (sortDir==='desc'?'▼':'▲') : ''}
              </th>
              <th className="py-2 px-3 font-semibold">세부 정보</th>
            </tr>
          </thead>
          <tbody>
            {pagedLogs.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-400">감사 로그가 없습니다.</td></tr>
            ) : pagedLogs.map((log, idx) => (
              <tr 
                key={log.id} 
                className={`border-b transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 cursor-pointer`}
                onClick={() => setShowDetail(log)}
              >
                <td className="py-2 px-3 text-black whitespace-nowrap">{new Date(log.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
                <td className="py-2 px-3 text-black">{log.user?.name || "-"}</td>
                <td className="py-2 px-3 text-black">{log.user?.email || "-"}</td>
                <td className="py-2 px-3">
                  {getEventIcon(log.action)}
                  <span className={
                    log.action.toLowerCase().includes("delete") ? "text-red-600 font-semibold" :
                    log.action.toLowerCase().includes("update") ? "text-yellow-700 font-semibold" :
                    log.action.toLowerCase().includes("create") ? "text-green-700 font-semibold" :
                    "text-blue-700 font-semibold"
                  }>
                    {log.action}
                  </span>
                </td>
                <td className="py-2 px-3 text-black truncate max-w-xs">{log.details || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Infinite scroll load more */}
        {visibleCount < filteredLogs.length && (
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
              더 보기
            </button>
          </div>
        )}
      </div>
      {/* Modal for detail */}
      {showDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">감사 로그 상세</h3>
              <button onClick={() => setShowDetail(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
                          <div className="space-y-3">
                <div>
                  <label className="font-semibold text-gray-900">시간:</label>
                  <p className="text-black">{new Date(showDetail.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-900">사용자:</label>
                  <p className="text-black">{showDetail.user?.name || "-"}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-900">이메일:</label>
                  <p className="text-black">{showDetail.user?.email || "-"}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-900">행동:</label>
                  <p className={
                    showDetail.action.toLowerCase().includes("delete") ? "text-red-600" :
                    showDetail.action.toLowerCase().includes("update") ? "text-yellow-700" :
                    showDetail.action.toLowerCase().includes("create") ? "text-green-700" :
                    "text-blue-700"
                  }>{getEventIcon(showDetail.action)}{showDetail.action}</p>
                </div>
              {/* Enhanced details: before/after diff, IP, device, etc. */}
              {(() => {
                const parsed = parseDetails(showDetail.details);
                if (parsed) {
                  return (
                    <div className="space-y-2">
                                             {parsed.before && (
                         <div>
                           <label className="font-semibold text-gray-900">변경 전:</label>
                           <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto text-black">{JSON.stringify(parsed.before, null, 2)}</pre>
                         </div>
                       )}
                       {parsed.after && (
                         <div>
                           <label className="font-semibold text-gray-900">변경 후:</label>
                           <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto text-black">{JSON.stringify(parsed.after, null, 2)}</pre>
                         </div>
                       )}
                       {parsed.ip && (
                         <div><label className="font-semibold text-gray-900">IP:</label> <span className="text-black">{parsed.ip}</span></div>
                       )}
                       {parsed.device && (
                         <div><label className="font-semibold text-gray-900">디바이스:</label> <span className="text-black">{parsed.device}</span></div>
                       )}
                       {parsed.location && (
                         <div><label className="font-semibold text-gray-900">위치:</label> <span className="text-black">{parsed.location}</span></div>
                       )}
                    </div>
                  );
                }
                                 return (
                   <div>
                     <label className="font-semibold text-gray-900">세부 정보:</label>
                     <p className="whitespace-pre-wrap text-black">{showDetail.details || "-"}</p>
                   </div>
                 );
              })()}
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
} 