"use client";

import { useState, useEffect } from 'react';
import { FaFileAlt, FaCheckCircle, FaClock, FaMoneyBillWave, FaExclamationTriangle, FaBullseye, FaFireAlt, FaPenFancy } from 'react-icons/fa';
import { generateMockContracts } from '../mock/contracts';
import { generateMockRevenue } from '../mock/revenue';
const mockContracts = generateMockContracts();
const mockRevenue = generateMockRevenue();

interface ContractType {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  lastUpdated: string;
  lawyer: string;
  keyDate: string;
  urgent: boolean;
  riskLevel: string;
  value: number;
  tags: string[];
  clientContact: string;
  estimatedCompletion: string;
  slaDeadline: string;
  createdAt: string;
  completedAt: string | null;
  slaViolated: boolean;
  risk: string;
}

export default function KPISection() {
  const [contracts, setContracts] = useState<ContractType[] | null>(null);
  const [revenue, setRevenue] = useState<{ month: string; value: number }[] | null>(null);

  useEffect(() => {
    setContracts(mockContracts);
    setRevenue(mockRevenue);
  }, []);

  if (!contracts || !revenue) {
    return <div className="py-12 text-center text-gray-400">로딩 중...</div>;
  }

  function getKPIs(contracts: ContractType[], revenue: { month: string; value: number }[]) {
    const totalContracts = contracts.length;
    const reviewed = contracts.filter(c => c.type === 'review').length;
    const drafted = contracts.filter(c => c.type === 'draft').length;
    const completedContracts = contracts.filter(c => c.completedAt && c.createdAt);
    const avgReviewTime = completedContracts.length > 0
      ? (completedContracts.map(c => (new Date(c.completedAt!).getTime() - new Date(c.createdAt!).getTime()) / (1000 * 60 * 60 * 24)).reduce((a, b) => a + b, 0) / completedContracts.length).toFixed(1)
      : '-';
    const overdue = contracts.filter(c => c.status === 'overdue').length;
    const highRisk = contracts.filter(c => c.risk === 'high').length;
    const slaTotal = contracts.length;
    const slaViolated = contracts.filter(c => c.slaViolated).length;
    const slaCompliance = slaTotal ? (((slaTotal - slaViolated) / slaTotal) * 100).toFixed(1) : '100';
    const revenueThisPeriod = revenue[revenue.length - 1]?.value || 0;

    return [
      { label: '총 계약', value: totalContracts, trend: '+12%', trendDirection: 'up', icon: <FaFileAlt className="text-blue-600" />, color: 'blue' },
      { label: '검토 완료', value: reviewed, trend: '+8%', trendDirection: 'up', icon: <FaCheckCircle className="text-green-600" />, color: 'green' },
      { label: '평균 검토 시간', value: avgReviewTime !== '-' ? `${avgReviewTime}일` : '-', trend: '-15%', trendDirection: 'down', icon: <FaClock className="text-purple-600" />, color: 'purple' },
      { label: '이번 달 수익', value: `₩${revenueThisPeriod.toLocaleString()}`, trend: '+23%', trendDirection: 'up', icon: <FaMoneyBillWave className="text-yellow-600" />, color: 'yellow' },
      { label: '연체 계약', value: overdue, trend: '-5%', trendDirection: 'down', icon: <FaExclamationTriangle className="text-red-600" />, color: 'red' },
      { label: 'SLA 준수율', value: `${slaCompliance}%`, trend: '+2%', trendDirection: 'up', icon: <FaBullseye className="text-indigo-600" />, color: 'indigo' },
      { label: '고위험 계약', value: highRisk, trend: '-12%', trendDirection: 'down', icon: <FaFireAlt className="text-orange-600" />, color: 'orange' },
      { label: '작성 완료', value: drafted, trend: '+18%', trendDirection: 'up', icon: <FaPenFancy className="text-teal-600" />, color: 'teal' },
    ];
  }

  const kpis = getKPIs(contracts, revenue);

  const getColorClasses = (color: string, direction: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      red: 'bg-red-50 text-red-700 border-red-200',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      teal: 'bg-teal-50 text-teal-700 border-teal-200',
    };

    const trendColorMap = {
      up: 'text-green-600',
      down: 'text-red-600',
    };

    return {
      card: colorMap[color] || colorMap.blue,
      trend: trendColorMap[direction] || 'text-gray-600'
    };
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const colors = getColorClasses(kpi.color, kpi.trendDirection);
        return (
          <div key={kpi.label} className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{kpi.icon}</div>
              <div className={`flex items-center text-sm font-medium ${colors.trend}`}>
                {kpi.trendDirection === 'up' ? (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L12 13z" clipRule="evenodd" />
                  </svg>
                )}
                {kpi.trend}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</div>
            <div className="text-sm font-medium text-gray-600">{kpi.label}</div>
          </div>
        );
      })}
    </div>
  );
} 