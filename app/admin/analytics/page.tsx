"use client";
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import KPISection from './components/KPISection';
import ContractVolumeChart from './components/ContractVolumeChart';
import RevenueTrendsChart from './components/RevenueTrendsChart';
import TopClientsTable from './components/TopClientsTable';
import TopLawyersTable from './components/TopLawyersTable';
import OverdueContractsTable from './components/OverdueContractsTable';
import ContextualInsights from './components/ContextualInsights';
import LawyerPerformanceChart from './components/LawyerPerformanceChart';
import ReviewTurnaroundChart from './components/ReviewTurnaroundChart';
import RiskDistributionChart from './components/RiskDistributionChart';
import OverdueSLAChart from './components/OverdueSLAChart';
import ContractLifecycleChart from './components/ContractLifecycleChart';
import ClientActivityChart from './components/ClientActivityChart';
import AnalyticsFilters from './components/AnalyticsFilters';
import AnalyticsExportPanel from './components/AnalyticsExportPanel';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const quickDateRanges = [
    { label: '7일', value: '7d' },
    { label: '30일', value: '30d' },
    { label: '90일', value: '90d' },
    { label: '1년', value: '1y' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">비즈니스 분석</h1>
              <p className="text-gray-600">계약, 성과 및 수익성에 대한 종합적인 인사이트</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium"
              >
                필터
              </button>
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                {quickDateRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      dateRange === range.value
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setShowExport(!showExport)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                보고서 내보내기
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-6">
              <AnalyticsFilters />
            </div>
          )}

          {/* Export Panel */}
          {showExport && (
            <div className="mb-6">
              <AnalyticsExportPanel />
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`flex-1 py-4 text-sm font-semibold rounded-tl-lg transition-colors border-b-2 ${
                activeTab === 'overview' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              개요
            </button>
            <button 
              onClick={() => setActiveTab('performance')} 
              className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'performance' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              성과 분석
            </button>
            <button 
              onClick={() => setActiveTab('financial')} 
              className={`flex-1 py-4 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'financial' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              재무 분석
            </button>
            <button 
              onClick={() => setActiveTab('insights')} 
              className={`flex-1 py-4 text-sm font-semibold rounded-tr-lg transition-colors border-b-2 ${
                activeTab === 'insights' 
                  ? 'bg-blue-50 text-blue-700 border-blue-700' 
                  : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent'
              }`}
            >
              인사이트
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* KPI Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">핵심 지표</h2>
                  <KPISection />
                </div>

                {/* Charts Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">주요 트렌드</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ContractVolumeChart />
                    <RevenueTrendsChart />
                  </div>
                </div>

                {/* Tables Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">상위 성과</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopClientsTable />
                    <TopLawyersTable />
                  </div>
                </div>

                {/* Contextual Insights */}
                <ContextualInsights />
              </div>
            )}
            
            {activeTab === 'performance' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">성과 분석</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <LawyerPerformanceChart />
                    <ReviewTurnaroundChart />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <RiskDistributionChart />
                    <OverdueSLAChart />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <ContractLifecycleChart />
                  </div>
                </div>

                {/* Overdue Contracts */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">연체 계약</h2>
                  <OverdueContractsTable />
                </div>
              </div>
            )}
            
            {activeTab === 'financial' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">재무 분석</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RevenueTrendsChart />
                    <ClientActivityChart />
                  </div>
                </div>

                {/* Financial KPIs */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">재무 지표</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                      <div className="text-2xl font-bold text-green-700 mb-2">₩23,500,000</div>
                      <div className="text-sm font-medium text-gray-600">이번 달 수익</div>
                      <div className="text-xs text-green-600 mt-1">+23% vs 지난달</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                      <div className="text-2xl font-bold text-blue-700 mb-2">₩156,000,000</div>
                      <div className="text-sm font-medium text-gray-600">연간 수익</div>
                      <div className="text-xs text-blue-600 mt-1">+18% vs 작년</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                      <div className="text-2xl font-bold text-purple-700 mb-2">₩2,450,000</div>
                      <div className="text-sm font-medium text-gray-600">평균 계약 가치</div>
                      <div className="text-xs text-purple-600 mt-1">+12% vs 지난달</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                      <div className="text-2xl font-bold text-yellow-700 mb-2">92%</div>
                      <div className="text-sm font-medium text-gray-600">수익성 목표 달성</div>
                      <div className="text-xs text-yellow-600 mt-1">목표: 90%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'insights' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">인사이트 및 권장사항</h2>
                  <ContextualInsights />
                </div>

                {/* Additional Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">성과 개선 기회</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>고위험 계약에 대한 사전 검토 프로세스 강화</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>자동화 도구 도입으로 검토 시간 단축</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>변호사별 성과 분석 및 교육 프로그램</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">비즈니스 성장 전략</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>고객 만족도 높은 서비스 패키지 개발</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>수익성 높은 계약 유형에 집중</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>신규 고객 확보를 위한 마케팅 강화</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 