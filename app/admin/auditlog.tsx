"use client";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuditLog {
  id: string;
  user?: { email: string; name: string } | null;
  action: string;
  details?: string;
  createdAt: string;
}

const PAGE_SIZE = 20;

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

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    fetch("/api/admin/auditlog")
      .then((res) => res.json())
      .then((data) => {
        let logs = data.logs || [];
        // If no logs, use mock data for demo
        if (logs.length === 0) {
          logs = [
            {
              id: "1",
              user: { name: "홍길동", email: "hong@lawscan.com" },
              action: "LOGIN",
              details: "User 홍길동 logged in successfully.",
              createdAt: new Date().toISOString(),
            },
            {
              id: "2",
              user: { name: "김변호사", email: "kim@lawscan.com" },
              action: "UPLOAD_CONTRACT",
              details: "Uploaded contract: NDA.pdf",
              createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            },
            {
              id: "3",
              user: { name: "이영희", email: "lee@lawscan.com" },
              action: "CREATE_PAYMENT",
              details: "Created payment for contract NDA.pdf, amount: 500,000",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            },
          ];
        }
        setLogs(logs);
        setLoading(false);
      })
      .catch(() => {
        setError("감사 로그를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [session, status, router]);

  // Filtering and search
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
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
  }, [logs, search, userFilter, actionFilter, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);
  const pagedLogs = filteredLogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
      new Date(l.createdAt).toLocaleString(),
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
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">감사 로그 (Audit Log)</h1>
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
          <label className="text-xs text-gray-500 mb-1">시작일</label>
          <input type="date" className="border rounded px-3 py-2 text-black" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">종료일</label>
          <input type="date" className="border rounded px-3 py-2 text-black" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} />
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition ml-auto" onClick={exportCSV}>CSV 내보내기</button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
        <table className="min-w-full text-base sticky-header">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 font-bold text-black border-b">시간</th>
              <th className="py-3 px-4 font-bold text-black border-b">사용자</th>
              <th className="py-3 px-4 font-bold text-black border-b">이메일</th>
              <th className="py-3 px-4 font-bold text-black border-b">행동</th>
              <th className="py-3 px-4 font-bold text-black border-b">세부 정보</th>
            </tr>
          </thead>
          <tbody>
            {pagedLogs.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-400">감사 로그가 없습니다.</td></tr>
            ) : pagedLogs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-blue-50 cursor-pointer transition" onClick={() => setShowDetail(log)}>
                <td className="py-3 px-4 text-xs text-gray-500 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="py-3 px-4">{log.user?.name || "-"}</td>
                <td className="py-3 px-4">{log.user?.email || "-"}</td>
                <td className="py-3 px-4 font-semibold">
                  <span className={
                    log.action.toLowerCase().includes("delete") ? "text-red-600" :
                    log.action.toLowerCase().includes("update") ? "text-yellow-700" :
                    log.action.toLowerCase().includes("create") ? "text-green-700" :
                    "text-blue-700"
                  }>
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-xs text-gray-600 truncate max-w-xs">{log.details || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>이전</button>
          <span className="font-semibold">{page} / {totalPages}</span>
          <button className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>다음</button>
        </div>
      )}
      {/* Details Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowDetail(null)}>&times;</button>
            <div className="font-bold text-lg mb-2">감사 로그 상세</div>
            <div className="mb-2"><span className="font-semibold">시간:</span> {new Date(showDetail.createdAt).toLocaleString()}</div>
            <div className="mb-2"><span className="font-semibold">사용자:</span> {showDetail.user?.name || "-"}</div>
            <div className="mb-2"><span className="font-semibold">이메일:</span> {showDetail.user?.email || "-"}</div>
            <div className="mb-2"><span className="font-semibold">행동:</span> <span className="font-semibold text-blue-700">{showDetail.action}</span></div>
            <div className="mb-2"><span className="font-semibold">세부 정보:</span></div>
            <pre className="bg-gray-100 rounded p-3 text-xs text-gray-800 overflow-x-auto max-h-60 whitespace-pre-wrap">{showDetail.details || "-"}</pre>
          </div>
        </div>
      )}
    </div>
  );
} 