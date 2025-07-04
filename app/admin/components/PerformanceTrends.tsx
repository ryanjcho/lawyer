export default function PerformanceTrends() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="font-bold text-black mb-4">성과 추이</div>
      <div className="mb-2">주간 검토 완료: 8, 10, 12, 9, 14</div>
      <div className="mb-2">평균 검토 시간(일): 4 → 3.5 → 3 → 2.8 → 2.5</div>
      <pre className="text-xs text-black">[8]▁▂▃▂▅[14]</pre>
    </div>
  );
} 