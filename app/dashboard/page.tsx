'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

type Contract = {
  id: string
  title: string
  status: string
  amount: number
  createdAt: string
  updatedAt: string
  riskLevel?: string
  fileSize?: number
  analysisResult?: any
  assignedLawyer?: string
}

interface DashboardStats {
  totalContracts: number;
  completedContracts: number;
  pendingContracts: number;
  totalSpent: number;
  averageProcessingTime: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  monthlyTrends: {
    month: string;
    contracts: number;
    spending: number;
    avgRisk: number;
  }[];
  proprietaryInsights: {
    marketBenchmark: number;
    riskPrediction: number;
    costSavings: number;
    similarContracts: number;
  };
}

const TABS = [
  { key: 'review', label: '계약서 검토' },
  { key: 'generated', label: '계약서 생성' },
]

// Placeholder components
function CaseSummaryCard({ caseNumber, status }: { caseNumber: string, status: string }) {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="text-xs text-black mb-1">케이스 번호</div>
      <div className="text-lg font-semibold">{caseNumber}</div>
      <div className="text-sm text-indigo-600 mt-1">상태: {status}</div>
    </div>
  );
}

function ContractUpload({ onUpload }: { onUpload: (file: File) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">계약서 업로드</label>
      <input type="file" className="block" onChange={e => {
        if (e.target.files && e.target.files[0]) onUpload(e.target.files[0]);
      }} />
    </div>
  );
}

function RequestChanges({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">추가 요청/변경사항</label>
      <textarea className="w-full border rounded p-2 mb-2" rows={3} value={text} onChange={e => setText(e.target.value)} />
      <button className="bg-indigo-600 text-white px-4 py-1 rounded" onClick={() => { onSubmit(text); setText(''); }}>제출</button>
    </div>
  );
}

function Notifications({ items }: { items: string[] }) {
  return (
    <div className="mb-4">
      <div className="font-medium mb-1">알림</div>
      <ul className="text-sm text-black space-y-1">
        {items.length === 0 ? <li>알림 없음</li> : items.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
}

function ActivityFeed({ items }: { items: string[] }) {
  return (
    <div className="mb-4">
      <div className="font-medium mb-1">활동 내역</div>
      <ul className="text-xs text-black space-y-1">
        {items.length === 0 ? <li>아직 활동 내역이 없습니다</li> : items.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [notifications, setNotifications] = useState<string[]>(['견적 결제 완료. 케이스 생성됨.', '담당 변호사 배정 완료.'])
  const [activity, setActivity] = useState<string[]>(['케이스 생성', '견적 결제', '변호사 배정'])

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user) {
      router.push('/login?callbackUrl=/dashboard')
      return
    }
    fetchContracts()
    fetchStats()
  }, [session, status, router])

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/dashboard/contracts')
      if (response.ok) {
        const data = await response.json()
        setContracts(data.contracts || [])
      }
    } catch (error) {
      console.error('Error fetching contracts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats || null)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleUpload = (file: File) => {
    setNotifications(n => [
      `계약서 파일 "${file.name}" 업로드됨`,
      ...n,
    ])
    setActivity(a => [
      `계약서 업로드 (${file.name})`,
      ...a,
    ])
  }

  const handleRequestChange = (text: string) => {
    if (text.trim()) {
      setNotifications(n => [
        '새 요청/변경사항 제출됨',
        ...n,
      ])
      setActivity(a => [
        `요청/변경: "${text}"`,
        ...a,
      ])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'PROCESSING':
      case 'REVIEW':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      case 'FAILED':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      default:
        return <DocumentTextIcon className="w-5 h-5 text-black" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'UPLOADED':
        return '업로드 완료'
      case 'PROCESSING':
        return '처리 중'
      case 'REVIEW':
        return '검토 중'
      case 'COMPLETED':
        return '완료'
      case 'FAILED':
        return '실패'
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return '날짜 정보 없음'
      }
      return date.toLocaleDateString('ko-KR')
    } catch (error) {
      return '날짜 정보 없음'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">인증 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">클라이언트 대시보드</h1>
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
              <span className="text-xs text-black mb-1">전체 계약</span>
              <span className="text-2xl font-bold text-indigo-700">{stats.totalContracts}</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
              <span className="text-xs text-black mb-1">완료</span>
              <span className="text-2xl font-bold text-green-600">{stats.completedContracts}</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
              <span className="text-xs text-black mb-1">진행 중</span>
              <span className="text-2xl font-bold text-yellow-600">{stats.pendingContracts}</span>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">내 계약서</h2>
            <Link href="/generate" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"><PlusIcon className="w-5 h-5 mr-2" /> 새 계약 요청</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">업데이트</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {contracts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-8">계약서가 없습니다.</td>
                  </tr>
                ) : contracts.map(contract => (
                  <tr key={contract.id}>
                    <td className="px-4 py-2 font-medium text-gray-900">{contract.title}</td>
                    <td className="px-4 py-2 flex items-center gap-2 text-black">{getStatusIcon(contract.status)} {getStatusText(contract.status)}</td>
                    <td className="px-4 py-2 text-gray-500">{formatDate(contract.updatedAt)}</td>
                    <td className="px-4 py-2">
                      <Link href={`/dashboard/contracts/${contract.id}`} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"><EyeIcon className="w-4 h-4 mr-1" /> 보기</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 