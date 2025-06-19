"use client";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-5xl font-bold text-indigo-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors">홈으로 돌아가기</Link>
    </div>
  );
} 