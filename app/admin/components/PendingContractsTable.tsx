import { FaEye, FaUserPlus, FaCommentDots } from 'react-icons/fa';

const typeColors = {
  '검토': 'bg-purple-100 text-purple-800',
  '작성': 'bg-gray-200 text-gray-800',
};
const riskColors = {
  '낮음': 'bg-green-100 text-green-800',
  '중간': 'bg-yellow-100 text-yellow-800',
  '높음': 'bg-red-100 text-red-800',
};
const contracts = [
  { id: '1', name: 'NDA - Acme', client: 'Acme Corp', type: '검토', status: '진행 중', risk: '높음', due: '2024-07-01', lawyer: 'Jane Smith' },
  { id: '2', name: 'MSA - Beta', client: 'Beta LLC', type: '작성', status: '검토 대기', risk: '중간', due: '2024-07-10', lawyer: 'John Doe' },
  { id: '3', name: 'SLA - Gamma', client: 'Gamma Inc', type: '검토', status: '최종 완료', risk: '낮음', due: '2024-06-30', lawyer: 'Emily Lee' },
];

type PendingContractsTableProps = { limit?: number };
export default function PendingContractsTable({ limit }: PendingContractsTableProps) {
  const displayContracts = contracts.slice(0, limit ?? contracts.length);
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">검토/조치 필요 계약</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">진행률</span>
          <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-blue-500 h-3 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <span className="text-xs text-blue-700 font-bold ml-2">60%</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-16 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 64 16"><polyline points="0,12 8,8 16,10 24,6 32,8 40,4 48,6 56,2 64,4" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
        <span className="text-xs text-gray-400">최근 8주 추이</span>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">계약명</th>
            <th className="py-2 px-3 font-semibold text-black">고객사</th>
            <th className="py-2 px-3 font-semibold text-black">구분</th>
            <th className="py-2 px-3 font-semibold text-black">상태</th>
            <th className="py-2 px-3 font-semibold text-black">위험도</th>
            <th className="py-2 px-3 font-semibold text-black">마감일</th>
            <th className="py-2 px-3 font-semibold text-black">담당 변호사</th>
            <th className="py-2 px-3 font-semibold text-black">작업</th>
          </tr>
        </thead>
        <tbody>
          {displayContracts.map((c, idx) => (
            <tr key={c.id} className={`border-b ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
              <td className="py-2 px-3 text-black font-semibold flex items-center gap-2">
                {c.name}
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">검토</span>
              </td>
              <td className="py-2 px-3 text-black">{c.client}</td>
              <td className="py-2 px-3"><span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[c.type]}`}>{c.type}</span></td>
              <td className="py-2 px-3 text-black" title={c.status === '진행 중' ? '계약이 현재 진행 중입니다.' : c.status === '검토 대기' ? '검토가 필요합니다.' : '계약이 완료되었습니다.'}>{c.status}</td>
              <td className="py-2 px-3"><span className={`px-2 py-1 text-xs font-medium rounded-full ${riskColors[c.risk]}`} title={c.risk === '높음' ? '위험도가 높음' : c.risk === '중간' ? '위험도가 중간' : '위험도가 낮음'}>{c.risk}</span></td>
              <td className="py-2 px-3 text-black">{c.due}</td>
              <td className="py-2 px-3 text-black">{c.lawyer}</td>
              <td className="py-2 px-3 flex gap-2 items-center">
                <button title="계약 보기" className="text-blue-600 hover:text-blue-900"><FaEye size={16} /></button>
                <button title="담당자 할당" className="text-green-600 hover:text-green-900"><FaUserPlus size={16} /></button>
                <button title="댓글" className="text-gray-600 hover:text-gray-900"><FaCommentDots size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 