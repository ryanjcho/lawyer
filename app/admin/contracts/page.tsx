"use client";
import Sidebar from '../components/Sidebar';
import ContractsTable from '../components/ContractsTable';
import KPISection from '../analytics/components/KPISection';
import ContractVolumeChart from '../analytics/components/ContractVolumeChart';
import OverdueContractsTable from '../analytics/components/OverdueContractsTable';
import RiskDistributionChart from '../analytics/components/RiskDistributionChart';
import NotificationCenter from '../components/NotificationCenter';
import ImportExport from '../components/ImportExport';

export default function AdminContractsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-black">계약 관리</h1>
          <ContractsTable />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <NotificationCenter />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <ImportExport />
          </div>
        </div>
      </main>
    </div>
  );
} 