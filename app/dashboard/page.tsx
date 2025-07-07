"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon as DocIcon,
} from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';
import ContractsTab from './components/ContractsTab';
import PieChart from './components/PieChart';

type Contract = {
  id: string
  fileName: string
  status: string
  uploadedAt: string
  analysisResult?: any
  riskLevel?: string
  assignedLawyerId?: string
  assignedLawyer?: {
    name: string
    email: string
  }
  user?: {
    name: string
    email: string
  }
}

type SectionKey = 'overview' | 'contracts' | 'messages' | 'billing';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'uploaded' | 'generated'>('all');
  const [activeSection, setActiveSection] = useState<SectionKey>('overview');

  useEffect(() => {
    if (status === 'loading') return;
    
    // For demo mode, don't redirect and don't fetch data
    if (!session?.user) {
      setLoading(false)
      return
    }
    
    fetchContracts()
  }, [session, status, router])

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/dashboard/contracts');
      if (response.ok) {
        const data = await response.json();
        setContracts(data.contracts || []);
      }
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100';
      case 'REVIEW':
        return 'text-yellow-600 bg-yellow-100';
      case 'PROCESSING':
        return 'text-blue-600 bg-blue-100';
      case 'FAILED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'LOW':
        return 'text-green-600 bg-green-100';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100';
      case 'HIGH':
        return 'text-orange-600 bg-orange-100';
      case 'CRITICAL':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Determine contract type based on analysis result or title
  const isGenerated = (contract: Contract) => {
    // Check if the contract title or analysis result indicates it's a generated contract
    return contract.fileName.toLowerCase().includes('generated') ||
           contract.fileName.toLowerCase().includes('draft') ||
           (contract.analysisResult && contract.analysisResult.isGenerated);
  };

  const filteredContracts = contracts.filter(c =>
    activeTab === 'all' ? true :
    activeTab === 'uploaded' ? !isGenerated(c) :
    activeTab === 'generated' ? isGenerated(c) : !isGenerated(c)
  );

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-4">대시보드를 보려면 로그인해주세요.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">대시보드</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 계약서</p>
                  <p className="text-2xl font-semibold text-gray-900">{contracts.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">완료된 계약서</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {contracts.filter(c => c.status === 'COMPLETED').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">검토 중</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {contracts.filter(c => c.status === 'REVIEW').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DocIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">생성된 계약서</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {contracts.filter(c => isGenerated(c)).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">계약서 상태 분포</h3>
              <PieChart data={[
                { label: '완료', value: contracts.filter(c => c.status === 'COMPLETED').length, color: '#10B981' },
                { label: '검토 중', value: contracts.filter(c => c.status === 'REVIEW').length, color: '#F59E0B' },
                { label: '처리 중', value: contracts.filter(c => c.status === 'PROCESSING').length, color: '#3B82F6' },
                { label: '실패', value: contracts.filter(c => c.status === 'FAILED').length, color: '#EF4444' },
              ]} />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">위험도 분포</h3>
              <PieChart data={[
                { label: '낮음', value: contracts.filter(c => c.riskLevel === 'LOW').length, color: '#10B981' },
                { label: '보통', value: contracts.filter(c => c.riskLevel === 'MEDIUM').length, color: '#F59E0B' },
                { label: '높음', value: contracts.filter(c => c.riskLevel === 'HIGH').length, color: '#F97316' },
                { label: '위험', value: contracts.filter(c => c.riskLevel === 'CRITICAL').length, color: '#EF4444' },
              ]} />
            </div>
          </div>

          {/* Contracts Tab */}
          <ContractsTab />
        </div>
      </main>
    </div>
  );
}
