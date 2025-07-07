'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
<<<<<<< Updated upstream
=======
import Sidebar from './Sidebar';
import ContractsTab from './components/ContractsTab';
import PieChart from './components/PieChart'; // Added PieChart import
>>>>>>> Stashed changes

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

const TABS = [
  { key: 'review', label: '계약서 검토' },
  { key: 'generated', label: '계약서 생성' },
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'review' | 'generated'>('review')

  useEffect(() => {
    if (status === 'loading') return
<<<<<<< Updated upstream

=======
    
    // For demo mode, don't redirect and don't fetch data
>>>>>>> Stashed changes
    if (!session?.user) {
      setLoading(false)
      return
    }
<<<<<<< Updated upstream

=======
    
>>>>>>> Stashed changes
    fetchContracts()
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
      console.error('Error formatting date:', error)
      return '날짜 정보 없음'
    }
  }

<<<<<<< Updated upstream
  // Determine contract type based on analysis result or title
  const isGenerated = (contract: Contract) => {
    // Check if the contract title or analysis result indicates it's a generated contract
    const title = contract.title || ''
    const analysisResult = contract.analysisResult || {}
    
    // Look for keywords that indicate generation vs review
    return (
      /생성|generate|template|draft/i.test(title) || 
      /생성|generate|template|draft/i.test(analysisResult.contractType || '')
    )
  }

  const filteredContracts = contracts.filter(c =>
    activeTab === 'generated' ? isGenerated(c) : !isGenerated(c)
  )

=======
  // Debug info
  console.log('Dashboard Debug:', { status, loading, hasSession: !!session?.user })
  
>>>>>>> Stashed changes
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
<<<<<<< Updated upstream
          <p className="text-black">로딩 중...</p>
=======
          <p className="text-gray-600 font-medium">로딩 중... (Status: {status}, Loading: {loading.toString()})</p>
>>>>>>> Stashed changes
        </div>
      </div>
    )
  }

<<<<<<< Updated upstream
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
              <p className="text-black mt-1">안녕하세요, {session?.user?.name || session?.user?.email}님</p>
            </div>
            <Link
              href="/upload"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              새 계약서 업로드
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">총 계약서</p>
                <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">완료</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'COMPLETED').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">진행 중</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => ['UPLOADED', 'PROCESSING', 'REVIEW'].includes(c.status)).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">실패</p>
                <p className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'FAILED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for contract type */}
        <div className="mb-6 flex gap-2">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-black bg-gray-100 hover:text-indigo-600'
              }`}
              onClick={() => setActiveTab(tab.key as 'review' | 'generated')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contracts List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'review' ? '내 계약서 검토' : '내 생성 계약서'}
            </h2>
            <span className="text-sm text-black">총 {filteredContracts.length}건</span>
          </div>
          {filteredContracts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-black">{activeTab === 'review' ? '업로드/검토한 계약서가 없습니다.' : '생성한 계약서가 없습니다.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {filteredContracts.map(contract => (
                <div
                  key={contract.id}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition-shadow relative"
                >
                  {/* File name and icon */}
                  <div className="flex items-center gap-3 mb-2">
                    <DocumentTextIcon className="w-8 h-8 text-indigo-500" />
                    <span className="text-lg font-bold text-indigo-700 truncate" title={contract.title}>{contract.title}</span>
                  </div>
                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {/* Status badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      contract.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700'
                        : contract.status === 'FAILED'
                        ? 'bg-red-100 text-red-700'
                        : contract.status === 'REVIEW' || contract.status === 'PROCESSING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-800'
                    }`}>{getStatusText(contract.status)}</span>
                    {/* Risk badge */}
                    {contract.riskLevel && contract.riskLevel !== 'unknown' && (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        contract.riskLevel === 'low'
                          ? 'bg-green-50 text-green-700'
                          : contract.riskLevel === 'medium'
                          ? 'bg-yellow-50 text-yellow-700'
                          : contract.riskLevel === 'high'
                          ? 'bg-orange-100 text-orange-700'
                          : contract.riskLevel === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-800'
                      }`}>{contract.riskLevel.toUpperCase()}</span>
                    )}
                  </div>
                  {/* Amount and attorney */}
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-gray-500">금액</span>
                      <span className="text-lg font-bold text-black">{contract.amount ? contract.amount.toLocaleString() + '원' : '-'}</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="text-xs text-gray-500">담당 변호사</span>
                      <span className="flex items-center gap-2 text-black font-medium">
                        <span className="inline-block w-7 h-7 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
                          {contract.assignedLawyer && contract.assignedLawyer !== '미지정' ? contract.assignedLawyer[0] : <DocumentTextIcon className="w-4 h-4 text-indigo-400" />}
                        </span>
                        {contract.assignedLawyer || '미지정'}
                      </span>
                    </div>
                  </div>
                  {/* Created date and actions */}
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">업로드일: <span className="text-black font-medium">{formatDate(contract.createdAt)}</span></span>
                    <Link
                      href={`/dashboard/contracts/${contract.id}`}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors text-sm shadow text-center"
                    >
                      상세보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
=======
  // For development/demo purposes, allow viewing dashboard without authentication
  const isDemoMode = !session?.user;
  
  if (!session?.user && !isDemoMode) {
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
        {isDemoMode && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Demo Mode:</strong> You are viewing the dashboard in demo mode. 
                  <a href="/login" className="ml-2 underline">Login</a> to access full functionality.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'overview' && (
          <div>
            {/* Greeting */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {session?.user?.name ? `안녕하세요, ${session.user.name}님! 👋` : '안녕하세요! 👋'}
              </h1>
              <p className="text-gray-600 mt-1">오늘도 좋은 하루 되세요. 아래에서 계약 현황과 최근 활동을 확인하세요.</p>
            </div>
            {/* Combined Quick Stats & Pie Chart Section (improved) */}
            <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col md:flex-row gap-8 items-start">
              {/* Pie Chart and Legend (fixed width on desktop) */}
              <div className="flex flex-col items-center md:items-start w-full md:w-80 flex-shrink-0">
                <PieChart data={pieData} />
              </div>
              {/* Quick Stats (flexible) */}
              <div className="flex-1 w-full">
                <h2 className="text-lg font-bold text-indigo-700 mb-4">내 계약 현황</h2>
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
              </div>
            </div>
            {/* Restore the other dashboard cards */}
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
                          <span className={`px-2 py-1 text-xs rounded ${
                            row.status === '완료' ? 'bg-green-100 text-green-700' :
                            row.status === '환불' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>{row.status}</span>
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
>>>>>>> Stashed changes
