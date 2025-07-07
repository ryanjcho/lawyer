"use client";
import Sidebar from '../components/Sidebar';
import AnalyticsFilters from './components/AnalyticsFilters';
import KPISection from './components/KPISection';
import ContractVolumeChart from './components/ContractVolumeChart';
import ReviewTurnaroundChart from './components/ReviewTurnaroundChart';
import RiskDistributionChart from './components/RiskDistributionChart';
import LawyerPerformanceChart from './components/LawyerPerformanceChart';
import ClientActivityChart from './components/ClientActivityChart';
import OverdueSLAChart from './components/OverdueSLAChart';
import RevenueTrendsChart from './components/RevenueTrendsChart';
import ContractLifecycleChart from './components/ContractLifecycleChart';
import OverdueContractsTable from './components/OverdueContractsTable';
import TopLawyersTable from './components/TopLawyersTable';
import TopClientsTable from './components/TopClientsTable';
import AnalyticsExportPanel from './components/AnalyticsExportPanel';
import ContextualInsights from './components/ContextualInsights';
import FinancialOverview from '../components/FinancialOverview';
import UserFinancialsPanel from '../components/UserFinancialsPanel';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">분석</h1>
        <AnalyticsFilters />
        <KPISection />
        <FinancialOverview />
        <ContextualInsights />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ContractVolumeChart />
          <RevenueTrendsChart />
          <ReviewTurnaroundChart />
          {showMore && <>
            <RiskDistributionChart />
            <LawyerPerformanceChart />
            <ClientActivityChart />
            <OverdueSLAChart />
            <ContractLifecycleChart />
          </>}
        </div>
        <button
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowMore(v => !v)}
        >
          {showMore ? '간략히 보기' : '더 많은 분석 보기'}
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TopLawyersTable />
          <UserFinancialsPanel />
        </div>
        <AnalyticsExportPanel />
      </main>
    </div>
  );
} 