'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalContracts: number
  contractsThisMonth: number
  revenue: number
  revenueThisMonth: number
  averageProcessingTime: number
  customerSatisfaction: number
}

interface User {
  id: string
  name: string
  email: string
  company: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  contractsAnalyzed: number
}

interface Contract {
  id: string
  fileName: string
  user: string
  status: 'processing' | 'completed' | 'failed' | 'uploaded' | 'review'
  riskLevel: 'low' | 'medium' | 'high' | 'critical' | '알 수 없음'
  uploadedAt: string
  completedAt?: string
  assignedLawyer?: string
}

interface Lawyer {
  id: string
  name: string
  specialization: string
  contractsReviewed: number
  averageRating: number
  status: 'available' | 'busy' | 'offline'
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'contracts' | 'lawyers' | 'analytics' | 'settings' | 'profile'>('overview')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return

    // Check if user is admin (this should be implemented with proper role checking)
    if (!session?.user) {
      router.push('/login')
      return
    }

    // Load real data from API endpoints
    const loadAdminData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [statsRes, usersRes, contractsRes, lawyersRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/users'),
          fetch('/api/admin/contracts'),
          fetch('/api/admin/lawyers')
        ])

        if (!statsRes.ok || !usersRes.ok || !contractsRes.ok || !lawyersRes.ok) {
          throw new Error('Failed to fetch admin data')
        }

        const [statsData, usersData, contractsData, lawyersData] = await Promise.all([
          statsRes.json(),
          usersRes.json(),
          contractsRes.json(),
          lawyersRes.json()
        ])

        setStats(statsData)
        setUsers(usersData)
        setContracts(contractsData)
        setLawyers(lawyersData)
      } catch (error) {
        console.error('Failed to load admin data:', error)
        setError('Failed to load admin data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadAdminData()
  }, [session, status, router])

  // Fetch profile data when profile tab is selected
  useEffect(() => {
    if (activeTab === 'profile') {
      setProfileLoading(true)
      setProfileError(null)
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(() => setProfileError('프로필 정보를 불러오지 못했습니다.'))
        .finally(() => setProfileLoading(false))
    }
  }, [activeTab])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileError(null)
    setProfileSuccess(null)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile?.name || '',
          company: profile?.company || '',
          phone: profile?.phone || '',
          image: profile?.image || ''
        })
      })
      if (!res.ok) throw new Error('프로필 업데이트에 실패했습니다.')
      setProfileSuccess('프로필이 성공적으로 업데이트되었습니다.')
    } catch (err) {
      setProfileError('프로필 업데이트에 실패했습니다.')
    } finally {
      setProfileLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'available':
        return 'text-green-600 bg-green-100'
      case 'processing':
      case 'busy':
      case 'review':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
      case 'suspended':
        return 'text-red-600 bg-red-100'
      case 'inactive':
      case 'offline':
      case 'uploaded':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      case 'critical': return 'text-red-800 bg-red-200'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료'
      case 'processing': return '처리중'
      case 'review': return '검토중'
      case 'uploaded': return '업로드됨'
      case 'failed': return '실패'
      case 'active': return '활성'
      case 'inactive': return '비활성'
      case 'available': return '대기중'
      case 'busy': return '업무중'
      case 'offline': return '오프라인'
      default: return status
    }
  }

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'low': return '낮음'
      case 'medium': return '중간'
      case 'high': return '높음'
      case 'critical': return '위험'
      default: return '알 수 없음'
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">관리자 대시보드 로딩 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-900 font-medium mb-2">오류가 발생했습니다</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-gray-600">안녕하세요, {session?.user?.name || '관리자'}님</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-indigo-600 hover:text-indigo-800"
              >
                사용자 대시보드로 이동
              </Link>
              <Link href="/admin/auditlog" className="text-indigo-600 hover:underline">감사 로그 보기</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '개요' },
              { id: 'users', label: '사용자 관리' },
              { id: 'contracts', label: '계약 관리' },
              { id: 'lawyers', label: '변호사 관리' },
              { id: 'analytics', label: '분석' },
              { id: 'settings', label: '설정' },
              { id: 'profile', label: '프로필' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">총 사용자</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">총 계약</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalContracts.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">총 매출</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">고객 만족도</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.customerSatisfaction}/5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">최근 계약</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {contracts.slice(0, 5).map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{contract.fileName}</p>
                          <p className="text-sm text-gray-500">{contract.user}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                            {getStatusText(contract.status)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(contract.riskLevel)}`}>
                            {getRiskLevelText(contract.riskLevel)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">변호사 현황</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {lawyers.map((lawyer) => (
                      <div key={lawyer.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{lawyer.name}</p>
                          <p className="text-sm text-gray-500">{lawyer.specialization}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lawyer.status)}`}>
                            {getStatusText(lawyer.status)}
                          </span>
                          <span className="text-sm text-gray-500">★ {lawyer.averageRating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">사용자 관리</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회사</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마지막 로그인</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">계약 수</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                          {getStatusText(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(user.lastLogin)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.contractsAnalyzed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">보기</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">계약 관리</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파일명</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위험도</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드일</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">담당 변호사</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contracts.map((contract) => (
                    <tr key={contract.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.fileName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                          {getStatusText(contract.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(contract.riskLevel)}`}>
                          {getRiskLevelText(contract.riskLevel)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(contract.uploadedAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contract.assignedLawyer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">보기</button>
                        <button className="text-green-600 hover:text-green-900">할당</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'lawyers' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">변호사 관리</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">변호사</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전문분야</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">검토 계약</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">평점</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lawyers.map((lawyer) => (
                    <tr key={lawyer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lawyer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lawyer.specialization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lawyer.contractsReviewed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">★ {lawyer.averageRating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lawyer.status)}`}>
                          {getStatusText(lawyer.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">보기</button>
                        <button className="text-green-600 hover:text-green-900">할당</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">분석 기능</h3>
              <p className="text-gray-600">고급 분석 기능이 곧 추가될 예정입니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">시스템 설정</h3>
              <p className="text-gray-600">시스템 설정 기능이 곧 추가될 예정입니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">프로필 정보 수정</h3>
            {profileLoading ? (
              <div className="text-gray-500">로딩 중...</div>
            ) : profileError ? (
              <div className="text-red-600 mb-2">{profileError}</div>
            ) : profile ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">이름</label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">회사</label>
                  <input
                    type="text"
                    name="company"
                    value={profile?.company || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">전화번호</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">프로필 이미지 URL</label>
                  <input
                    type="text"
                    name="image"
                    value={profile?.image || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                {profileSuccess && <div className="text-green-600 mb-2">{profileSuccess}</div>}
                {profileError && <div className="text-red-600 mb-2">{profileError}</div>}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={profileLoading}
                >
                  저장
                </button>
              </form>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
} 