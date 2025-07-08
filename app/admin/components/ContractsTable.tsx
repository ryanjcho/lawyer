"use client";
import { FaEye, FaEdit, FaUserCheck, FaComments, FaHistory, FaExclamationTriangle, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useState, useMemo, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlinePencilAlt } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import seedrandom from 'seedrandom';

const rng = seedrandom('contracts-seed');

// Enhanced mock data with realistic scenarios
const generateMockContracts = (count = 50) => {
  const clients = [
    'Acme Corporation', 'Beta LLC', 'Gamma Industries', 'Delta Partners', 'Epsilon Ltd',
    'Zeta Solutions', 'Eta Technologies', 'Theta Systems', 'Iota Networks', 'Kappa Corp'
  ];
  const lawyers = [
    '오성헌', '김용범', '엄태섭', '조진석'
  ];
  const contractTypes = [
    'NDA', 'MSA', 'SLA', 'Consulting Agreement', 'IP Agreement',
    'Employment Contract', 'Service Agreement', 'License Agreement', 'Partnership Agreement', 'Vendor Contract'
  ];
  const statuses = ['awaiting_ai', 'ai_complete', 'lawyer_review', 'needs_info', 'complete'];
  const riskLevels = ['low', 'medium', 'high', 'critical'];
  const tags = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Real Estate', 'Education', 'Legal'];

  const now = new Date('2024-07-07T09:00:00+09:00'); // Fixed base date
  return Array.from({ length: count }, (_, i) => {
    const isUrgent = rng() < 0.15;
    const riskLevel = riskLevels[Math.floor(rng() * riskLevels.length)];
    const status = statuses[Math.floor(rng() * statuses.length)];
    const contractType = contractTypes[Math.floor(rng() * contractTypes.length)];
    const client = clients[Math.floor(rng() * clients.length)];
    const lawyer = lawyers[Math.floor(rng() * lawyers.length)];
    
    // Generate realistic dates
    const uploadedDate = new Date(now.getTime() - Math.floor(rng() * 30 * 24 * 60 * 60 * 1000));
    const lastUpdated = new Date(uploadedDate.getTime() + Math.floor(rng() * 7 * 24 * 60 * 60 * 1000));
    const keyDate = new Date(now.getTime() + Math.floor(rng() * 14 * 24 * 60 * 60 * 1000));
    
    return {
      id: `C-2024-${String(i + 1).padStart(3, '0')}`,
      name: `${contractType} - ${client}`,
      client,
      type: rng() > 0.5 ? 'review' : 'draft',
      status,
      lastUpdated: lastUpdated.toISOString(),
      lawyer,
      keyDate: keyDate.toISOString().split('T')[0],
      urgent: isUrgent,
      riskLevel,
      value: Math.floor(rng() * 10000000) + 1000000,
      tags: tags.slice(0, Math.floor(rng() * 3) + 1),
      clientContact: `${lawyer.toLowerCase().replace(' ', '.')}@${client.toLowerCase().replace(' ', '')}.com`,
      estimatedCompletion: new Date(keyDate.getTime() - Math.floor(rng() * 3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      slaDeadline: new Date(lastUpdated.getTime() + Math.floor((5 + rng() * 5) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    };
  });
};

const statusMap = {
  'awaiting_ai': { label: 'AI 검토 대기', color: 'bg-yellow-100 text-yellow-800', icon: <FaClock className="inline mr-1" /> },
  'ai_complete': { label: 'AI 검토 완료', color: 'bg-blue-100 text-blue-800', icon: <FaCheckCircle className="inline mr-1" /> },
  'lawyer_review': { label: '변호사 검토 중', color: 'bg-indigo-100 text-indigo-800', icon: <FaUserCheck className="inline mr-1" /> },
  'drafting': { label: '작성 중', color: 'bg-purple-100 text-purple-800', icon: <HiOutlinePencilAlt className="inline mr-1" /> },
  'needs_info': { label: '추가 정보 필요', color: 'bg-red-100 text-red-800', icon: <FaExclamationTriangle className="inline mr-1" /> },
  'complete': { label: '완료', color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="inline mr-1" /> },
};

const typeMap = {
  'review': { label: '검토', icon: <HiOutlineDocumentText className="inline mr-1 text-blue-500" /> },
  'draft': { label: '작성', icon: <HiOutlinePencilAlt className="inline mr-1 text-purple-500" /> },
};

const riskLevelMap = {
  'low': { label: '낮음', color: 'bg-green-100 text-green-800' },
  'medium': { label: '보통', color: 'bg-yellow-100 text-yellow-800' },
  'high': { label: '높음', color: 'bg-orange-100 text-orange-800' },
  'critical': { label: '위험', color: 'bg-red-100 text-red-800' },
};

// Status indicator component
const ContractStatusIndicator = ({ contract }) => {
  const statusSteps = [
    { key: 'awaiting_ai', label: 'AI 분석', icon: 'brain' },
    { key: 'ai_complete', label: 'AI 완료', icon: 'check' },
    { key: 'lawyer_review', label: '변호사 검토', icon: 'user-check' },
    { key: 'complete', label: '완료', icon: 'check-circle' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === contract.status);
  const isCompleted = contract.status === 'complete';

  return (
    <div className="flex items-center space-x-1">
      {statusSteps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            index <= currentStepIndex ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {index < currentStepIndex ? '✓' : step.icon === 'brain' ? '🧠' : step.icon === 'check' ? '✓' : step.icon === 'user-check' ? '👤' : '✓'}
          </div>
          {index < statusSteps.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 ${
              index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// Quick actions component
const QuickActions = ({ selectedContracts }) => {
  const actions = useMemo(() => {
    const actions: Array<{ label: string; action: string; icon: string; color: string }> = [];
    
    if (selectedContracts.length === 1) {
      actions.push({ label: '상세 보기', action: 'view', icon: 'eye', color: 'blue' });
      actions.push({ label: '변호사 배정', action: 'assign', icon: 'user', color: 'indigo' });
    }
    
    if (selectedContracts.length > 0) {
      actions.push({ label: '상태 변경', action: 'status', icon: 'edit', color: 'green' });
      actions.push({ label: '일괄 내보내기', action: 'export', icon: 'download', color: 'gray' });
    }
    
    if (selectedContracts.some(c => c.urgent)) {
      actions.push({ label: '긴급 처리', action: 'urgent', icon: 'alert', color: 'red' });
    }
    
    return actions;
  }, [selectedContracts]);

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      indigo: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
      green: 'bg-green-100 text-green-700 hover:bg-green-200',
      gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      red: 'bg-red-100 text-red-700 hover:bg-red-200'
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {actions.map(action => (
        <button
          key={action.action}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${getColorClasses(action.color)}`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

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
  createdAt?: string;
  completedAt?: string | null;
  slaViolated?: boolean;
  risk?: string;
}

type ContractsTableProps = { limit?: number };
const mockContracts = generateMockContracts();

export default function ContractsTable({ limit }: ContractsTableProps) {
  const [contracts, setContracts] = useState<ContractType[]>(mockContracts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [lawyerFilter, setLawyerFilter] = useState('all');
  const [urgentFilter, setUrgentFilter] = useState(false);
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const router = useRouter();

  useEffect(() => {
    // setContracts(generateMockContracts()); // Remove this line to avoid re-randomizing on mount
  }, []);

  // Enhanced filtering and sorting
  const filteredContracts = useMemo(() => {
    if (contracts.length === 0) return [];
    let filtered = contracts.filter(c => {
      const matchesSearch = !search || 
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.client.toLowerCase().includes(search.toLowerCase()) ||
        c.lawyer.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesRisk = riskFilter === 'all' || c.riskLevel === riskFilter;
      const matchesLawyer = lawyerFilter === 'all' || c.lawyer === lawyerFilter;
      const matchesUrgent = !urgentFilter || c.urgent;
      
      return matchesSearch && matchesStatus && matchesRisk && matchesLawyer && matchesUrgent;
    });

    // Enhanced sorting
    filtered = filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'lastUpdated':
          aVal = new Date(a.lastUpdated).getTime();
          bVal = new Date(b.lastUpdated).getTime();
          break;
        case 'keyDate':
          aVal = new Date(a.keyDate).getTime();
          bVal = new Date(b.keyDate).getTime();
          break;
        case 'value':
          aVal = a.value;
          bVal = b.value;
          break;
        case 'riskLevel':
          const riskOrder = { low: 1, medium: 2, high: 3, critical: 4 };
          aVal = riskOrder[a.riskLevel];
          bVal = riskOrder[b.riskLevel];
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }
      
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [contracts, search, statusFilter, riskFilter, lawyerFilter, urgentFilter, sortBy, sortDir]);

  // Safely compute selectedContracts and uniqueLawyers
  const selectedContracts = contracts.filter(c => selectedRows.has(c.id));
  const uniqueLawyers = Array.from(new Set(contracts.map(c => c.lawyer))).sort();

  if (contracts.length === 0) {
    return <div className="py-12 text-center text-gray-400">계약이 없습니다.</div>;
  }

  const handleSort = (key) => {
    setSortBy(key);
    setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleRowSelect = (contractId) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contractId)) {
        newSet.delete(contractId);
      } else {
        newSet.add(contractId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(filteredContracts.map(c => c.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Seoul'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      {/* Enhanced Search & Filters */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="계약 ID, 이름, 고객사, 변호사 검색..."
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10 mt-1">
              {filteredContracts.slice(0, 5).map(contract => (
                <div key={contract.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                  <div className="font-medium">{contract.name}</div>
                  <div className="text-sm text-gray-600">{contract.client} • {contract.lawyer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4">
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">전체 상태</option>
            {Object.entries(statusMap).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
          >
            <option value="all">전체 위험도</option>
            {Object.entries(riskLevelMap).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={lawyerFilter}
            onChange={e => setLawyerFilter(e.target.value)}
          >
            <option value="all">전체 변호사</option>
            {uniqueLawyers.map(lawyer => (
              <option key={lawyer} value={lawyer}>{lawyer}</option>
            ))}
          </select>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={urgentFilter}
              onChange={e => setUrgentFilter(e.target.checked)}
              className="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-black">긴급만</span>
          </label>
        </div>

        {/* Quick Actions */}
        {selectedRows.size > 0 && (
          <div className="border-t pt-4">
            <QuickActions selectedContracts={selectedContracts} />
          </div>
        )}
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left text-black border-b">
              <th className="py-3 px-3 font-semibold">
                <input
                  type="checkbox"
                  checked={selectedRows.size === filteredContracts.length && filteredContracts.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </th>
              <th 
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('id')}
              >
                ID {sortBy === 'id' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-3 font-semibold">계약명/구분</th>
              <th className="py-3 px-3 font-semibold">고객사</th>
              <th className="py-3 px-3 font-semibold text-center">상태</th>
              <th className="py-3 px-3 font-semibold">위험도</th>
              <th 
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('lastUpdated')}
              >
                최종 수정일 {sortBy === 'lastUpdated' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-3 font-semibold">담당 변호사</th>
              <th 
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('keyDate')}
              >
                주요 일정 {sortBy === 'keyDate' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-gray-400">
                  검색 조건에 맞는 계약이 없습니다.
                </td>
              </tr>
            ) : filteredContracts.slice(0, limit ?? filteredContracts.length).map((contract, idx) => (
              <tr
                key={contract.id}
                className={`border-b transition-colors ${
                  selectedRows.has(contract.id) ? 'bg-blue-100' : 
                  contract.urgent ? 'bg-red-50' : 
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 cursor-pointer`}
                onClick={() => window.open(`/admin/contracts/${contract.id}`, '_blank')}
              >
                <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(contract.id)}
                    onChange={() => handleRowSelect(contract.id)}
                    className="rounded focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-3 font-mono font-bold text-black">{contract.id}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center space-x-2">
                    {typeMap[contract.type].icon}
                    <span className="font-semibold text-black">{contract.name}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      {typeMap[contract.type].label}
                    </span>
                    {contract.urgent && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                        긴급
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {contract.tags.join(' • ')}
                  </div>
                </td>
                <td className="py-3 px-3 text-black">{contract.client}</td>
                <td className="py-3 px-3">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center w-full mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[contract.status].color} text-center w-max`}>
                        {statusMap[contract.status].icon}
                        {statusMap[contract.status].label}
                      </span>
                    </div>
                    <div className="flex justify-center mt-1 w-full">
                      <ContractStatusIndicator contract={contract} />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevelMap[contract.riskLevel].color}`}>
                    {riskLevelMap[contract.riskLevel].label}
                  </span>
                </td>
                <td className="py-3 px-3 text-black">{formatDate(contract.lastUpdated)}</td>
                <td className="py-3 px-3 text-black">{contract.lawyer}</td>
                <td className="py-3 px-3 text-black">{contract.keyDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        총 {filteredContracts.length}개 계약 중 {selectedRows.size}개 선택됨
      </div>
    </div>
  );
} 