import { FaEye, FaEdit } from 'react-icons/fa';

const statusColors = {
  '진행 중': 'bg-blue-100 text-blue-800',
  '검토 대기': 'bg-yellow-100 text-yellow-800',
  '최종 완료': 'bg-green-100 text-green-800',
};

const typeColors = {
  '검토': 'bg-purple-100 text-purple-800',
  '작성': 'bg-gray-200 text-gray-800',
};

const contracts = [
  { id: '1024', name: 'NDA - Acme', client: 'Acme Corp', type: '검토', status: '진행 중', lastModified: '2024-06-25', lawyer: 'Jane Smith', revisions: 3, value: '₩10,000', keyDates: '2024-07-01', actions: '보기/수정' },
  { id: '1019', name: 'MSA - Beta', client: 'Beta LLC', type: '작성', status: '검토 대기', lastModified: '2024-06-24', lawyer: 'John Doe', revisions: 2, value: '₩25,000', keyDates: '2024-07-10', actions: '보기/수정' },
  { id: '1012', name: 'SLA - Gamma', client: 'Gamma Inc', type: '검토', status: '최종 완료', lastModified: '2024-06-20', lawyer: 'Emily Lee', revisions: 1, value: '₩5,000', keyDates: '2024-06-30', actions: '보기/수정' },
];

export default function ContractsTable() {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="text-left text-black border-b">
            <th className="py-2 px-3 font-semibold text-black">계약 ID</th>
            <th className="py-2 px-3 font-semibold text-black">계약명</th>
            <th className="py-2 px-3 font-semibold text-black">고객사</th>
            <th className="py-2 px-3 font-semibold text-black">구분</th>
            <th className="py-2 px-3 font-semibold text-black">상태</th>
            <th className="py-2 px-3 font-semibold text-black">최종 수정일</th>
            <th className="py-2 px-3 font-semibold text-black">담당 변호사</th>
            <th className="py-2 px-3 font-semibold text-black">수정 횟수</th>
            <th className="py-2 px-3 font-semibold text-black">금액</th>
            <th className="py-2 px-3 font-semibold text-black">주요 일정</th>
            <th className="py-2 px-3 font-semibold text-black">작업</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c, idx) => (
            <tr
              key={c.id}
              className={`border-b transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}
            >
              <td className="py-2 px-3 font-mono font-bold text-black">{c.id}</td>
              <td className="py-2 px-3 font-semibold text-black">{c.name}</td>
              <td className="py-2 px-3 text-black">{c.client}</td>
              <td className="py-2 px-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[c.type] || 'bg-gray-100 text-gray-800'}`}>{c.type}</span>
              </td>
              <td className="py-2 px-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[c.status] || 'bg-gray-100 text-gray-800'}`}>{c.status}</span>
              </td>
              <td className="py-2 px-3 text-black">{c.lastModified}</td>
              <td className="py-2 px-3 text-black">{c.lawyer}</td>
              <td className="py-2 px-3 text-center text-black">{c.revisions}</td>
              <td className="py-2 px-3 text-black">{c.value}</td>
              <td className="py-2 px-3 text-black">{c.keyDates}</td>
              <td className="py-2 px-3 flex gap-3 items-center">
                <button title="계약 보기" className="text-blue-600 hover:text-blue-900"><FaEye size={16} /></button>
                <button title="계약 수정" className="text-green-600 hover:text-green-900"><FaEdit size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 