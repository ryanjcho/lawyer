'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import * as XLSX from 'xlsx'

interface Subscription {
  id: string
  status: 'active' | 'cancelled' | 'expired'
  startDate: string
  endDate: string
  plan: {
    name: string
    type: 'monthly' | 'yearly'
    price: number
  }
}

interface Contract {
  id: string
  name: string
  uploadedAt: string
  status: 'processing' | 'completed' | 'failed' | 'uploaded' | 'review'
  riskLevel: 'low' | 'medium' | 'high' | 'critical' | 'unknown'
  fileSize: number
  analysisResult?: {
    riskScore: number
    issuesFound: number
    recommendations: number
  }
  assignedLawyer?: string
  fileUrl?: string
}

interface UsageStats {
  totalContracts: number
  contractsThisMonth: number
  averageRiskScore: number
  totalIssuesFound: number
  processingTime: number
  activeSubscriptions: number
  averageProcessingTime: number
  customerSatisfaction: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [contracts, setContracts] = useState<Contract[]>([])
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts' | 'analytics' | 'settings' | 'profile'>('overview')
  const [profile, setProfile] = useState<any>(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user) {
      router.push('/login')
      return
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [subscriptionRes, contractsRes, statsRes] = await Promise.all([
          fetch('/api/subscription'),
          fetch('/api/dashboard/contracts'),
          fetch('/api/dashboard/stats')
        ])

        // Handle subscription data
        if (subscriptionRes.ok) {
          const subscriptionData = await subscriptionRes.json()
          setSubscription(subscriptionData)
        }

        // Handle contracts data
        if (contractsRes.ok) {
          const contractsData = await contractsRes.json()
          setContracts(contractsData)
        } else {
          throw new Error('Failed to fetch contracts')
        }

        // Handle stats data
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setUsageStats(statsData)
        } else {
          throw new Error('Failed to fetch stats')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [router, session, status])

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
          name: profile.name,
          company: profile.company,
          phone: profile.phone,
          image: profile.image
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'review': return 'text-yellow-600 bg-yellow-100'
      case 'uploaded': return 'text-gray-600 bg-gray-100'
      case 'failed': return 'text-red-600 bg-red-100'
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
      default: return status
    }
  }

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'low': return '낮음'
      case 'medium': return '보통'
      case 'high': return '높음'
      case 'critical': return '위험'
      default: return '알 수 없음'
    }
  }

  // Export contracts as CSV
  const exportContractsCSV = () => {
    const headers = ['계약서명', '업로드일', '상태', '리스크', '이슈', '크기', '담당변호사']
    const rows = contracts.map(contract => [
      contract.name,
      new Date(contract.uploadedAt).toLocaleDateString(),
      getStatusText(contract.status),
      getRiskLevelText(contract.riskLevel),
      contract.analysisResult?.issuesFound || 0,
      formatFileSize(contract.fileSize),
      contract.assignedLawyer || '미할당'
    ])
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'contracts.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Export contracts as Excel
  const exportContractsExcel = () => {
    const ws = XLSX.utils.json_to_sheet(contracts.map(contract => ({
      '계약서명': contract.name,
      '업로드일': new Date(contract.uploadedAt).toLocaleDateString(),
      '상태': getStatusText(contract.status),
      '리스크': getRiskLevelText(contract.riskLevel),
      '이슈': contract.analysisResult?.issuesFound || 0,
      '크기': formatFileSize(contract.fileSize),
      '담당변호사': contract.assignedLawyer || '미할당'
    })))
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Contracts')
    XLSX.writeFile(wb, 'contracts.xlsx')
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">대시보드 로딩 중...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
              <p className="text-gray-600">안녕하세요, {session?.user?.name || '사용자'}님</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-800"
              >
                홈으로 이동
              </Link>
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
              { id: 'contracts', label: '계약 관리' },
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            {usageStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">총 계약</p>
                      <p className="text-2xl font-semibold text-gray-900">{usageStats.totalContracts}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">이번 달 계약</p>
                      <p className="text-2xl font-semibold text-gray-900">{usageStats.contractsThisMonth}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">평균 리스크</p>
                      <p className="text-2xl font-semibold text-gray-900">{usageStats.averageRiskScore}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">평균 처리시간</p>
                      <p className="text-2xl font-semibold text-gray-900">{usageStats.processingTime}시간</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Contracts */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">최근 계약</h3>
                  <Link
                    href="/dashboard?tab=contracts"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    모두 보기
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {contracts.slice(0, 5).map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{contract.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(contract.uploadedAt).toLocaleDateString()} • {formatFileSize(contract.fileSize)}
                        </p>
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
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            {/* Export Buttons */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">계약 관리</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={exportContractsCSV}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                  >
                    CSV 내보내기
                  </button>
                  <button
                    onClick={exportContractsExcel}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Excel 내보내기
                  </button>
                </div>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">계약서명</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드일</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">리스크</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이슈</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">크기</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">담당변호사</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">다운로드</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contracts.map((contract) => (
                      <tr key={contract.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(contract.uploadedAt).toLocaleDateString()}
                        </td>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contract.analysisResult?.issuesFound || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatFileSize(contract.fileSize)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contract.assignedLawyer || '미할당'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {contract.fileUrl && (
                            <a
                              href={contract.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              다운로드
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">계약 분석 및 통계</h3>
              {usageStats ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">총 계약서 업로드</span>
                    <span className="font-semibold text-indigo-700">{usageStats.totalContracts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">이번 달 업로드</span>
                    <span className="font-semibold text-indigo-700">{usageStats.contractsThisMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">활성 구독</span>
                    <span className="font-semibold text-indigo-700">{usageStats.activeSubscriptions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">평균 처리 시간</span>
                    <span className="font-semibold text-indigo-700">{usageStats.averageProcessingTime}일</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">고객 만족도</span>
                    <span className="font-semibold text-indigo-700">{usageStats.customerSatisfaction} / 5.0</span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">분석 데이터를 불러오는 중...</div>
              )}
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-indigo-700">
                <p className="font-medium">고급 분석 기능이 곧 추가될 예정입니다.<br/>계약 리스크, 조항별 통계, AI 인사이트 등 다양한 분석을 제공할 예정입니다.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">설정</h3>
              <SettingsForm />
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
                    value={profile.name || ''}
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
                    value={profile.company || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">전화번호</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone || ''}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">프로필 이미지 URL</label>
                  <input
                    type="text"
                    name="image"
                    value={profile.image || ''}
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

function SettingsForm() {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('ko');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      setSuccess('설정이 저장되었습니다.');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">알림 수신</label>
        <select
          value={notifications ? 'on' : 'off'}
          onChange={e => setNotifications(e.target.value === 'on')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
        >
          <option value="on">켜기</option>
          <option value="off">끄기</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">언어</label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        disabled={saving}
      >
        {saving ? '저장 중...' : '저장'}
      </button>
    </form>
  );
} 