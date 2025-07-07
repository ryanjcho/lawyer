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
  EyeIcon,
  InformationCircleIcon,
  ArrowTrendingDownIcon,
  DocumentArrowUpIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  BellIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'
import Sidebar from './Sidebar';
import ContractsTab from './components/ContractsTab';

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
  // Add mock data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: '새 계약서가 업로드되었습니다.', type: 'upload', read: false, time: '방금 전' },
    { id: 2, message: '계약서 검토가 완료되었습니다.', type: 'review', read: false, time: '5분 전' },
    { id: 3, message: '결제 영수증이 발급되었습니다.', type: 'payment', read: true, time: '1시간 전' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  // Add mock data for recent activity
  const [activity, setActivity] = useState([
    { id: 1, type: 'upload', description: 'NDA_2024.pdf 업로드', time: '2024-06-29 10:00' },
    { id: 2, type: 'request', description: '추가 자료 요청 제출', time: '2024-06-28 15:30' },
    { id: 3, type: 'alert', description: '계약서 검토 마감 임박', time: '2024-06-27 09:00' },
  ]);
  const [activeSection, setActiveSection] = useState<'overview' | 'contracts' | 'messages' | 'billing'>('overview');
  const [quickStats, setQuickStats] = useState({
    inProgress: 5,
    completed: 12,
    pendingReview: 2,
    uploaded: 1,
    delayed: 0,
  });
  // Add mock data for pie chart
  const [pieData] = useState([
    { label: '진행 중', value: 5, color: '#6366F1' },
    { label: '완료', value: 12, color: '#22C55E' },
    { label: '검토 대기', value: 2, color: '#FACC15' },
    { label: '업로드 완료', value: 1, color: '#3B82F6' },
  ]);
  // Add mock data for upcoming deadlines
  const [deadlines] = useState([
    { date: '2024-07-01', label: 'NDA 계약서 검토 마감', status: '예정' },
    { date: '2024-07-03', label: '서비스 계약서 피드백 제출', status: '완료' },
    { date: '2024-07-10', label: '변호사 상담 일정', status: '긴급' },
  ]);

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
      { id: Date.now(), message: `계약서 파일 "${file.name}" 업로드됨`, type: 'upload', read: false, time: '방금 전' },
      ...n,
    ])
    setActivity(a => [
      { id: Date.now(), type: 'upload', description: `계약서 업로드 (${file.name})`, time: '방금 전' },
      ...a,
    ])
  }

  const handleRequestChange = (text: string) => {
    if (text.trim()) {
      setNotifications(n => [
        { id: Date.now(), message: '새 요청/변경사항 제출됨', type: 'review', read: false, time: '방금 전' },
        ...n,
      ])
      setActivity(a => [
        { id: Date.now(), type: 'request', description: `요청/변경: "${text}"`, time: '방금 전' },
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
    <div className="flex min-h-screen">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-8 bg-gray-50">
        {activeSection === 'overview' && (
          <div>
            {/* Combined Quick Stats & Pie Chart Section (improved) */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Pie Chart on the left */}
              <div className="flex flex-col md:flex-row items-center w-full md:w-auto flex-1 order-1 md:order-none">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-lg font-bold text-indigo-700 mb-4 md:mb-2">계약 상태 분포</h2>
                  {/* Robust Pie Chart - refined for size and label placement */}
                  <div className="w-80 h-80 relative flex items-center justify-center">
                    <svg viewBox="0 0 160 160" className="w-full h-full">
                      {/* Background circle for clean look */}
                      <circle cx="80" cy="80" r="70" fill="#F3F4F6" />
                      {(() => {
                        let total = pieData.reduce((sum, d) => sum + d.value, 0);
                        let cumulative = 0;
                        return pieData.map((d, i) => {
                          const startAngle = (cumulative / total) * 2 * Math.PI;
                          const endAngle = ((cumulative + d.value) / total) * 2 * Math.PI;
                          const largeArc = d.value / total > 0.5 ? 1 : 0;
                          const radius = 70;
                          const center = 80;
                          const x1 = center + radius * Math.sin(startAngle);
                          const y1 = center - radius * Math.cos(startAngle);
                          const x2 = center + radius * Math.sin(endAngle);
                          const y2 = center - radius * Math.cos(endAngle);
                          const pathData = `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
                          cumulative += d.value;
                          return (
                            <path key={d.label} d={pathData} fill={d.color} />
                          );
                        });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="text-3xl font-bold text-indigo-700">{pieData.reduce((sum, d) => sum + d.value, 0)}</div>
                      <div className="text-base text-gray-500">총 계약</div>
                    </div>
                  </div>
                  {/* Pie Legend on the right, vertical, larger and more visible */}
                  <div className="flex flex-col gap-4 ml-0 md:ml-8 mt-4 md:mt-0">
                    {pieData.map(d => (
                      <span key={d.label} className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                        <span className="w-4 h-4 rounded-full inline-block" style={{ backgroundColor: d.color }}></span>
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Quick Stats on the right (already refactored) */}
                <div className="flex-1 w-full order-2 md:order-none">
                  <h2 className="text-lg font-bold text-indigo-700 mb-4">내 계약 현황</h2>
                  {/* Quick Stats Section (refactored) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-indigo-50 rounded-lg p-4 flex flex-col items-center" title="진행 중인 계약의 수">
                      <ClockIcon className="w-6 h-6 text-indigo-700 mb-1" />
                      <div className="text-2xl font-bold text-indigo-700">{quickStats.inProgress}</div>
                      <div className="text-xs text-gray-700 mt-1">진행 중</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center" title="완료된 계약의 수">
                      <CheckCircleIcon className="w-6 h-6 text-green-700 mb-1" />
                      <div className="text-2xl font-bold text-green-700">{quickStats.completed}</div>
                      <div className="text-xs text-gray-700 mt-1">완료</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center" title="검토 대기 중인 계약의 수">
                      <DocumentMagnifyingGlassIcon className="w-6 h-6 text-yellow-700 mb-1" />
                      <div className="text-2xl font-bold text-yellow-700">{quickStats.pendingReview}</div>
                      <div className="text-xs text-gray-700 mt-1">검토 대기</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center" title="업로드 완료된 계약의 수">
                      <DocumentArrowUpIcon className="w-6 h-6 text-blue-700 mb-1" />
                      <div className="text-2xl font-bold text-blue-700">{quickStats.uploaded}</div>
                      <div className="text-xs text-gray-700 mt-1">업로드 완료</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center" title="지연된 계약의 수">
                      <ExclamationTriangleIcon className="w-6 h-6 text-gray-700 mb-1" />
                      <div className="text-2xl font-bold text-gray-700">{quickStats.delayed}</div>
                      <div className="text-xs text-gray-700 mt-1">지연</div>
                    </div>
                  </div>
                  {/* End Quick Stats Section */}
                </div>
              </div>
              {/* Recent Contracts & Quick Actions (side by side on desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Recent Contracts List */}
                <div>
                  <div className="text-lg font-bold text-gray-900 mb-2">최근 계약서</div>
                  <ul className="divide-y divide-gray-100 bg-white rounded-lg shadow p-4">
                    {[
                      { id: '1024', name: 'NDA_2024.pdf', fileUrl: '/files/NDA_2024.pdf' },
                      { id: '1019', name: '서비스 계약서', fileUrl: '/files/Service_Agreement.pdf' },
                      { id: '1012', name: '용역 계약서', fileUrl: '/files/Work_Contract.pdf' },
                    ].map(c => (
                      <li key={c.id} className="flex items-center justify-between py-2">
                        <span className="font-semibold text-black">{c.name}</span>
                        <div className="flex gap-2">
                          <a href={c.fileUrl} download className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm">다운로드</a>
                          <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm">보기</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Quick Actions */}
                <div>
                  <span className="text-lg font-bold text-gray-900 mb-4 block">빠른 작업</span>
                  <div className="flex flex-col gap-3 mb-4">
                    <Link href="/generate" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">새 계약 검토 요청</Link>
                    <button className="inline-flex items-center px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">문서 업로드</button>
                    <button className="inline-flex items-center px-4 py-2 bg-white border border-blue-600 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition">상담 예약</button>
                  </div>
                  <div className="bg-indigo-50 rounded p-3 text-xs text-indigo-700 flex items-center gap-2">
                    <DocumentArrowUpIcon className="w-4 h-4" /> 최근 업로드: NDA_2024.pdf (2024-06-29)
                  </div>
                </div>
              </div>
              {/* Upcoming Deadlines/Tasks */}
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
                <span className="text-lg font-bold text-gray-900 mb-4 block">다가오는 일정</span>
                <ul className="text-sm text-gray-700 space-y-2">
                  {deadlines.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                      <CalendarDaysIcon className={`w-4 h-4 ${
                        d.status === '예정' ? 'text-yellow-400' :
                        d.status === '완료' ? 'text-blue-400' :
                        d.status === '긴급' ? 'text-red-400' : 'text-gray-400'
                      }`} />
                      <span>{d.date}: {d.label}</span>
                      <span className={`ml-auto px-2 py-0.5 rounded text-xs ${
                        d.status === '예정' ? 'bg-yellow-100 text-yellow-700' :
                        d.status === '완료' ? 'bg-green-100 text-green-700' :
                        d.status === '긴급' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>{d.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Recent Activity Feed (visually appealing timeline) */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">최근 활동</span>
                  <Link href="#" className="text-xs text-indigo-600 hover:underline">전체 보기</Link>
                </div>
                <div className="relative pl-6">
                  <div className="absolute top-0 left-2 w-0.5 h-full bg-gray-200" aria-hidden="true"></div>
                  <ul className="space-y-6">
                    {activity.length === 0 ? (
                      <li className="text-sm text-gray-500">아직 활동 내역이 없습니다</li>
                    ) : (
                      activity.map((a, i) => (
                        <li key={a.id} className="relative flex items-start group">
                          {/* Timeline dot and icon */}
                          <span className="absolute -left-6 flex items-center justify-center w-8 h-8">
                            <span className={`w-3 h-3 rounded-full block border-2 ${
                              a.type === 'upload' ? 'bg-indigo-400 border-indigo-400' :
                              a.type === 'request' ? 'bg-blue-400 border-blue-400' :
                              a.type === 'alert' ? 'bg-gray-400 border-gray-400' : 'bg-gray-200 border-gray-200'
                            }`}></span>
                            {a.type === 'upload' && <DocumentArrowUpIcon className="w-4 h-4 text-indigo-400 absolute left-4 top-2" />}
                            {a.type === 'request' && <ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-400 absolute left-4 top-2" />}
                            {a.type === 'alert' && <ExclamationTriangleIcon className="w-4 h-4 text-gray-400 absolute left-4 top-2" />}
                          </span>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{a.description}</span>
                              <span className="ml-auto text-xs text-gray-400">{a.time}</span>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              {/* Activity Timeline */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">최근 활동 타임라인</span>
                  <Link href="#" className="text-xs text-indigo-600 hover:underline">전체 보기</Link>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  {/* Mock timeline: show icons, action, and time */}
                  <li className="flex items-center gap-2"><DocumentArrowUpIcon className="w-4 h-4 text-indigo-400" /> NDA_2024.pdf 업로드 <span className="ml-auto text-xs text-gray-400">2024-06-29 10:00</span></li>
                  <li className="flex items-center gap-2"><ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-400" /> 추가 자료 요청 제출 <span className="ml-auto text-xs text-gray-400">2024-06-28 15:30</span></li>
                  <li className="flex items-center gap-2"><ExclamationTriangleIcon className="w-4 h-4 text-gray-400" /> 계약서 검토 마감 임박 <span className="ml-auto text-xs text-gray-400">2024-06-27 09:00</span></li>
                </ul>
              </div>
              {/* Announcements/Tips Banner */}
              <div className="mb-4">
                <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-900 p-4 rounded flex items-center justify-between">
                  <span><b>새로운 기능:</b> 계약서 자동 분류 및 알림 기능이 추가되었습니다!</span>
                  <button className="ml-4 text-indigo-700 hover:underline text-sm">닫기</button>
                </div>
              </div>
            </div>
          )}
          {activeSection === "contracts" && (
            <ContractsTab />
          )}
          {activeSection === "messages" && (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-black">메시지 & 알림</h1>
              <div className="flex items-center gap-2 mb-4 relative">
                {/* Notification Bell with badge */}
                <button
                  className="relative focus:outline-none"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  aria-label="Show notifications"
                >
                  <BellIcon className="w-7 h-7 text-indigo-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                <span className="text-sm text-gray-700">읽지 않은 메시지 {notifications.filter(n => !n.read).length}개 <button className="ml-2 text-xs text-indigo-600 underline">새로고침</button></span>
                {/* Notification Dropdown Panel */}
                {showNotifications && (
                  <div className="absolute right-0 top-10 w-80 bg-white rounded shadow-lg z-50 border">
                    <ul>
                      {notifications.map(n => (
                        <li key={n.id} className={`p-3 border-b last:border-b-0 ${!n.read ? 'bg-indigo-50' : ''}`}>
                          <div className="flex items-center gap-2">
                            {/* Icon based on n.type */}
                            {n.type === 'upload' && <DocumentArrowUpIcon className="w-5 h-5 text-indigo-400" />}
                            {n.type === 'review' && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
                            {n.type === 'payment' && <CurrencyDollarIcon className="w-5 h-5 text-blue-500" />}
                            <span className="text-xs">{n.message}</span>
                            <span className="ml-auto text-xs text-gray-400">{n.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <ul className="divide-y divide-gray-100">
                  {[
                    { from: 'LawKit', subject: '계약서 검토가 완료되었습니다.', date: '2024-06-30', unread: true },
                    { from: '담당 변호사', subject: '추가 자료 요청', date: '2024-06-29', unread: true },
                    { from: 'LawKit', subject: '결제 영수증 안내', date: '2024-06-28', unread: false },
                  ].map((msg, i) => (
                    <li key={i} className={`py-3 flex items-center gap-3 ${msg.unread ? 'bg-indigo-50' : ''}`}>
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-400" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{msg.subject}</div>
                        <div className="text-xs text-gray-500">{msg.from} · {msg.date}</div>
                      </div>
                      {msg.unread && <button className="ml-2 px-2 py-0.5 rounded bg-indigo-600 text-white text-xs">읽음</button>}
                      <button className="ml-2 px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs">보관</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeSection === 'billing' && (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-black">결제 및 계정</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 최근 결제 내역 */}
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">최근 결제 내역</span>
                    <button className="text-xs text-indigo-600 hover:underline">전체 보기</button>
                  </div>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr>
                        <th className="py-2 text-left text-gray-500 font-medium">날짜</th>
                        <th className="py-2 text-left text-gray-500 font-medium">항목</th>
                        <th className="py-2 text-left text-gray-500 font-medium">금액</th>
                        <th className="py-2 text-left text-gray-500 font-medium">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { date: '2024-06-29', item: '계약서 검토', amount: '₩120,000', status: '완료' },
                        { date: '2024-06-20', item: '계약서 생성', amount: '₩90,000', status: '완료' },
                        { date: '2024-06-10', item: '추가 자문', amount: '₩50,000', status: '환불' },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="py-2 text-gray-800">{row.date}</td>
                          <td className="py-2 text-gray-800">{row.item}</td>
                          <td className="py-2 text-gray-800">{row.amount}</td>
                          <td className="py-2">
                            <span className={``}></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    )
}