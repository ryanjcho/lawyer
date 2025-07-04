import Sidebar from '../components/Sidebar';
import AnalyticsFilters from '../components/AnalyticsFilters';
import FinancialOverview from '../components/FinancialOverview';
import ContractVolumeChart from '../components/ContractVolumeChart';
import ReviewTurnaroundChart from '../components/ReviewTurnaroundChart';
import RiskDistributionChart from '../components/RiskDistributionChart';
import LawyerPerformanceChart from '../components/LawyerPerformanceChart';
import ClientActivityChart from '../components/ClientActivityChart';
import OverdueSLAChart from '../components/OverdueSLAChart';
import RevenueTrendsChart from '../components/RevenueTrendsChart';
import AnalyticsExportPanel from '../components/AnalyticsExportPanel';

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">분석</h1>
        <AnalyticsFilters />
        <FinancialOverview />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ContractVolumeChart />
          <ReviewTurnaroundChart />
          <RiskDistributionChart />
          <LawyerPerformanceChart />
          <ClientActivityChart />
          <OverdueSLAChart />
          <RevenueTrendsChart />
        </div>
        <AnalyticsExportPanel />
      </main>
    </div>
  );
} 