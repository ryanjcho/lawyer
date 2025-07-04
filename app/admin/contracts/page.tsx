import Sidebar from '../components/Sidebar';
import ContractsTable from '../components/ContractsTable';

export default function AdminContracts() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-black">계약 관리</h1>
        <ContractsTable />
      </main>
    </div>
  );
} 