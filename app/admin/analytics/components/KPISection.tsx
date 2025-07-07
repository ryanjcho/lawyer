"use client";

import { contracts } from '../mock/contracts';
import { revenue } from '../mock/revenue';

function getKPIs() {
  const totalContracts = contracts.length;
  const reviewed = contracts.filter(c => c.type === 'review').length;
  const drafted = contracts.filter(c => c.type === 'draft').length;
  const avgReviewTime = (
    contracts
      .filter(c => c.completedAt && c.createdAt)
      .map(c => (new Date(c.completedAt).getTime() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      .reduce((a, b) => a + b, 0) /
    contracts.filter(c => c.completedAt && c.createdAt).length
  ).toFixed(1);
  const overdue = contracts.filter(c => c.status === 'overdue').length;
  const highRisk = contracts.filter(c => c.risk === 'high').length;
  const slaTotal = contracts.length;
  const slaViolated = contracts.filter(c => c.slaViolated).length;
  const slaCompliance = slaTotal ? (((slaTotal - slaViolated) / slaTotal) * 100).toFixed(1) : '100';
  const revenueThisPeriod = revenue[revenue.length - 1]?.value || 0;

  return [
    { label: '총 계약', value: totalContracts },
    { label: '검토', value: reviewed },
    { label: '작성', value: drafted },
    { label: '평균 검토/작성 시간(일)', value: avgReviewTime },
    { label: '연체', value: overdue },
    { label: '고위험', value: highRisk },
    { label: '이번 달 수익', value: `₩${revenueThisPeriod.toLocaleString()}` },
    { label: 'SLA 준수율', value: `${slaCompliance}%` },
  ];
}

export default function KPISection() {
  const kpis = getKPIs();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <div className="text-2xl font-bold text-blue-700 mb-2">{kpi.value}</div>
          <div className="text-black text-sm font-medium">{kpi.label}</div>
        </div>
      ))}
    </div>
  );
} 