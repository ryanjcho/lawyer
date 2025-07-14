import LawyerPerformanceChart from './LawyerPerformanceChart';

type TeamPerformancePanelProps = { limit?: number };
export default function TeamPerformancePanel({ limit }: TeamPerformancePanelProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="font-bold text-black mb-4">팀 성과</div>
      <LawyerPerformanceChart />
    </div>
  );
} 