'use client'

import { useState } from 'react'

interface Issue {
  id: string
  category: 'legal' | 'financial' | 'operational' | 'compliance' | 'risk'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  location: string
  recommendation: string
  impact: string
}

interface Recommendation {
  id: string
  priority: 'low' | 'medium' | 'high'
  title: string
  description: string
  action: string
  estimatedTime: string
  cost: string
}

interface AnalysisResult {
  contractId: string
  contractName: string
  analysisDate: string
  overallRiskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  totalIssues: number
  totalRecommendations: number
  processingTime: number
  issues: Issue[]
  recommendations: Recommendation[]
  summary: string
  legalReviewer?: string
  reviewDate?: string
}

interface AnalysisResultsProps {
  result: AnalysisResult
  className?: string
}

export default function AnalysisResults({ result, className = '' }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'recommendations' | 'details'>('overview')
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set())
  const [expandedRecommendations, setExpandedRecommendations] = useState<Set<string>>(new Set())

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'legal': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
      case 'financial': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
      case 'operational': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
      case 'compliance': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
      case 'risk': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
      default: return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  }

  const toggleIssueExpansion = (issueId: string) => {
    const newExpanded = new Set(expandedIssues)
    if (newExpanded.has(issueId)) {
      newExpanded.delete(issueId)
    } else {
      newExpanded.add(issueId)
    }
    setExpandedIssues(newExpanded)
  }

  const toggleRecommendationExpansion = (recId: string) => {
    const newExpanded = new Set(expandedRecommendations)
    if (newExpanded.has(recId)) {
      newExpanded.delete(recId)
    } else {
      newExpanded.add(recId)
    }
    setExpandedRecommendations(newExpanded)
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'legal': return '법적'
      case 'financial': return '재무'
      case 'operational': return '운영'
      case 'compliance': return '준법'
      case 'risk': return '리스크'
      default: return category
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'low': return '낮음'
      case 'medium': return '보통'
      case 'high': return '높음'
      case 'critical': return '심각'
      default: return severity
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">계약 분석 결과</h2>
            <p className="text-sm text-gray-600">{result.contractName}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">리스크 점수:</span>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRiskLevelColor(result.riskLevel)}`}>
                {result.overallRiskScore}/100
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              분석일: {new Date(result.analysisDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: '개요' },
            { id: 'issues', label: `이슈 (${result.totalIssues})` },
            { id: 'recommendations', label: `권장사항 (${result.totalRecommendations})` },
            { id: 'details', label: '상세정보' }
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

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Risk Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">리스크 요약</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{result.overallRiskScore}</div>
                  <div className="text-sm text-gray-600">전체 리스크 점수</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{result.totalIssues}</div>
                  <div className="text-sm text-gray-600">발견된 이슈</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{result.totalRecommendations}</div>
                  <div className="text-sm text-gray-600">권장사항</div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">분석 요약</h3>
              <p className="text-gray-700 leading-relaxed">{result.summary}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">처리 시간</h4>
                <p className="text-2xl font-semibold text-indigo-600">{result.processingTime}분</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">법률 검토자</h4>
                <p className="text-lg text-gray-700">{result.legalReviewer || 'AI 시스템'}</p>
              </div>
            </div>

            {/* New note or badge */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">복잡한 법률 용어도 쉽게 풀어 설명합니다. 누구나 이해할 수 있는 리포트 제공!</p>
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">발견된 이슈</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>모든 카테고리</option>
                  <option>법적</option>
                  <option>재무</option>
                  <option>운영</option>
                  <option>준법</option>
                  <option>리스크</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>모든 심각도</option>
                  <option>심각</option>
                  <option>높음</option>
                  <option>보통</option>
                  <option>낮음</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {result.issues.map((issue) => (
                <div key={issue.id} className="border border-gray-200 rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleIssueExpansion(issue.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-gray-400">
                          {getCategoryIcon(issue.category)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{issue.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                              {getSeverityLabel(issue.severity)}
                            </span>
                            <span className="text-sm text-gray-500">{getCategoryLabel(issue.category)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{issue.location}</span>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform ${expandedIssues.has(issue.id) ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {expandedIssues.has(issue.id) && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">설명</h5>
                          <p className="text-gray-700">{issue.description}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">영향</h5>
                          <p className="text-gray-700">{issue.impact}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">권장사항</h5>
                          <p className="text-gray-700">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">권장사항</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                  <option>모든 우선순위</option>
                  <option>높음</option>
                  <option>보통</option>
                  <option>낮음</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {result.recommendations.map((rec) => (
                <div key={rec.id} className="border border-gray-200 rounded-lg">
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleRecommendationExpansion(rec.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                              rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {rec.priority === 'high' ? '높음' : rec.priority === 'medium' ? '보통' : '낮음'}
                            </span>
                            <span className="text-sm text-gray-500">{rec.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform ${expandedRecommendations.has(rec.id) ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedRecommendations.has(rec.id) && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="pt-4 space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">설명</h5>
                          <p className="text-gray-700">{rec.description}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">실행 방안</h5>
                          <p className="text-gray-700">{rec.action}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">예상 시간</h5>
                            <p className="text-gray-700">{rec.estimatedTime}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">예상 비용</h5>
                            <p className="text-gray-700">{rec.cost}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">계약 정보</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">계약서명</dt>
                    <dd className="text-sm text-gray-900">{result.contractName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">분석 ID</dt>
                    <dd className="text-sm text-gray-900">{result.contractId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">분석일시</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(result.analysisDate).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">분석 정보</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">처리 시간</dt>
                    <dd className="text-sm text-gray-900">{result.processingTime}분</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">법률 검토자</dt>
                    <dd className="text-sm text-gray-900">{result.legalReviewer || 'AI 시스템'}</dd>
                  </div>
                  {result.reviewDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">검토일</dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(result.reviewDate).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">리스크 분포</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['legal', 'financial', 'operational', 'compliance', 'risk'].map((category) => {
                  const categoryIssues = result.issues.filter(issue => issue.category === category)
                  const criticalIssues = categoryIssues.filter(issue => issue.severity === 'critical').length
                  const highIssues = categoryIssues.filter(issue => issue.severity === 'high').length
                  
                  return (
                    <div key={category} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{categoryIssues.length}</div>
                      <div className="text-sm text-gray-600">{getCategoryLabel(category)}</div>
                      {(criticalIssues > 0 || highIssues > 0) && (
                        <div className="text-xs text-red-600 mt-1">
                          {criticalIssues > 0 && `${criticalIssues} 심각`}
                          {criticalIssues > 0 && highIssues > 0 && ', '}
                          {highIssues > 0 && `${highIssues} 높음`}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 