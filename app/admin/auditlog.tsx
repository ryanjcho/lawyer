"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuditLog {
  id: string;
  user?: { email: string; name: string } | null;
  action: string;
  details?: string;
  createdAt: string;
}

export default function AuditLogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session.user.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }
    fetch("/api/admin/auditlog")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("감사 로그를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, [session, status, router]);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">감사 로그 (Audit Log)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">시간</th>
              <th className="px-4 py-2 border-b">사용자</th>
              <th className="px-4 py-2 border-b">이메일</th>
              <th className="px-4 py-2 border-b">행동</th>
              <th className="px-4 py-2 border-b">세부 정보</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{log.user?.name || "-"}</td>
                <td className="px-4 py-2">{log.user?.email || "-"}</td>
                <td className="px-4 py-2 font-semibold">{log.action}</td>
                <td className="px-4 py-2 text-xs text-gray-600">{log.details || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 