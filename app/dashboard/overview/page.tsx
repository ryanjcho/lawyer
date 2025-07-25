'use client'
import React from 'react';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentMagnifyingGlassIcon,
  DocumentArrowUpIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  UserIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import PieChart from '../components/PieChart';

export default function OverviewPage() {
  // Enhanced mock data
  const quickStats = {
    inProgress: 5,
    completed: 12,
    pendingReview: 2,
    uploaded: 1,
    delayed: 0,
  };

  const pieData = [
    { label: '진행 중', value: 5, color: '#6366F1' },
    { label: '완료', value: 12, color: '#22C55E' },
    { label: '검토 대기', value: 2, color: '#FACC15' },
    { label: '업로드 완료', value: 1, color: '#3B82F6' },
  ];

  // Active reviews with detailed progress
  const activeReviews = [
    {
      id: 'R-2024-001',
      name: 'NDA_2024.pdf',
      lawyer: '김변호사',
      progress: 75,
      estimatedCompletion: '2024-07-05 14:00',
      status: '검토 중',
      pagesReviewed: 8,
      totalPages: 12,
      issuesFound: 3,
      priority: 'high'
    },
    {
      id: 'R-2024-002',
      name: '서비스 계약서_v2.pdf',
      lawyer: '이변호사',
      progress: 45,
      estimatedCompletion: '2024-07-07 10:00',
      status: '검토 중',
      pagesReviewed: 5,
      totalPages: 11,
      issuesFound: 1,
      priority: 'medium'
    }
  ];

  // Recent deliveries with quality scores
  const recentDeliveries = [
    {
      id: 'D-2024-001',
      name: '용역 계약서.pdf',
      completedDate: '2024-06-30',
      lawyer: '박변호사',
      qualityScore: 4.8,
      riskScore: '낮음',
      downloadUrl: '/files/Work_Contract_Reviewed.pdf'
    },
    {
      id: 'D-2024-002',
      name: '매매 계약서.pdf',
      completedDate: '2024-06-28',
      lawyer: '최변호사',
      qualityScore: 4.9,
      riskScore: '중간',
      downloadUrl: '/files/Sales_Contract_Reviewed.pdf'
    }
  ];

  const deadlines = [
    { date: '2024-07-01', label: 'NDA 계약서 검토 마감', status: '예정' },
    { date: '2024-07-03', label: '서비스 계약서 피드백 제출', status: '완료' },
    { date: '2024-07-10', label: '변호사 상담 일정', status: '긴급' },
  ];

  const activity = [
    { id: 1, type: 'upload', description: 'NDA_2024.pdf 업로드', time: '2024-06-29 10:00' },
    { id: 2, type: 'request', description: '추가 자료 요청 제출', time: '2024-06-28 15:30' },
    { id: 3, type: 'alert', description: '계약서 검토 마감 임박', time: '2024-06-27 09:00' },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">안녕하세요! 👋</h1>
        <p className="text-gray-600 mt-1">오늘도 좋은 하루 되세요. 아래에서 계약 현황과 최근 활동을 확인하세요.</p>
      </div>

      {/* Quick Stats & Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center md:items-start w-full md:w-80 flex-shrink-0">
          <PieChart data={pieData} />
        </div>
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

      {/* Active Reviews Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">진행 중인 검토</h2>
          <Link href="/dashboard/contracts" className="text-sm text-indigo-600 hover:underline">전체 보기</Link>
        </div>
        {activeReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <DocumentTextIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>현재 진행 중인 검토가 없습니다.</p>
            <Link href="/upload" className="text-indigo-600 hover:underline">새 계약서 업로드하기</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <UserIcon className="w-4 h-4" />
                        <span>{review.lawyer}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          review.priority === 'high' ? 'bg-red-100 text-red-700' :
                          review.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {review.priority === 'high' ? '긴급' : review.priority === 'medium' ? '보통' : '일반'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>예상 완료: {review.estimatedCompletion}</div>
                    <div className="text-xs">{review.pagesReviewed}/{review.totalPages} 페이지 검토 완료</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>진행률</span>
                    <span>{review.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${review.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>발견된 이슈: {review.issuesFound}개</span>
                    <span>상태: {review.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors">
                      상세 보기
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                      메시지
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Deliveries Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">최근 완료된 검토</h2>
          <Link href="/dashboard/contracts" className="text-sm text-indigo-600 hover:underline">전체 보기</Link>
        </div>
        {recentDeliveries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircleIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>완료된 검토가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentDeliveries.map((delivery) => (
              <div key={delivery.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{delivery.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{delivery.completedDate} 완료</span>
                        <span>담당: {delivery.lawyer}</span>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          <span>{delivery.qualityScore}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          delivery.riskScore === '낮음' ? 'bg-green-100 text-green-700' :
                          delivery.riskScore === '중간' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          위험도: {delivery.riskScore}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      보기
                    </button>
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors">
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Contracts List & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        <div>
          <span className="text-lg font-bold text-gray-900 mb-4 block">빠른 작업</span>
          <div className="flex flex-col gap-3 mb-4">
            <Link href="/upload" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              새 계약 검토 요청
            </Link>
            <button className="inline-flex items-center px-4 py-2 bg-white border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              문서 업로드
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-white border border-blue-600 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition">
              <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
              상담 예약
            </button>
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

      {/* Recent Activity Feed */}
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

      {/* Announcements/Tips Banner */}
      <div className="mb-4">
        <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-900 p-4 rounded flex items-center justify-between">
          <span><b>새로운 기능:</b> 계약서 자동 분류 및 알림 기능이 추가되었습니다!</span>
          <button className="ml-4 text-indigo-700 hover:underline text-sm">닫기</button>
        </div>
      </div>
    </div>
  );
} 