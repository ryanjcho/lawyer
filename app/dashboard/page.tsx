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

    if (!session?.user) {
      router.push('/login?callbackUrl=/dashboard')
      return
    }

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

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-black">로딩 중...</p>
        </div>
      </div>
    )
  }

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