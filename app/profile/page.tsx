"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({ name: "", company: "", phone: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      router.push("/login?callbackUrl=/profile");
      return;
    }
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setProfile({
          name: data.name || "",
          company: data.company || "",
          phone: data.phone || "",
          image: data.image || "",
        });
        setError("");
      })
      .catch((err) => setError(err.message || "프로필 정보를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [session, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("프로필 업데이트에 실패했습니다.");
      setSuccess("프로필이 성공적으로 업데이트되었습니다.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "프로필 업데이트에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">로딩 중...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">프로필 정보</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile?.name || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">회사</label>
              <input
                type="text"
                id="company"
                name="company"
                value={profile?.company || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">전화번호</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profile?.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">프로필 이미지 URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={profile?.image || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              />
            </div>
            {success && <div className="text-green-600 mb-2">{success}</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              disabled={saving}
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 