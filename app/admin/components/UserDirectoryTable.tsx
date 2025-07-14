"use client";
import { useState, useMemo, useEffect } from 'react';
import { FaEye, FaEdit, FaUserCheck, FaComments, FaHistory, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';
import seedrandom from 'seedrandom';

const rng = seedrandom('users-seed');

// Enhanced mock data generation
const generateMockUsers = (count = 100) => {
  const companies = [
    'Acme Corporation', 'Beta LLC', 'Gamma Industries', 'Delta Partners', 'Epsilon Ltd',
    'Zeta Solutions', 'Eta Technologies', 'Theta Systems', 'Iota Networks', 'Kappa Corp',
    'Lambda Labs', 'Mu Enterprises', 'Nu Ventures', 'Xi Holdings', 'Omicron Group'
  ];
  
  const roles = ['USER', 'ADMIN', 'LAWYER'];
  const statuses = ['active', 'inactive', 'suspended'];
  const specializations = [
    'Corporate Law', 'Intellectual Property', 'Employment Law', 'Contract Law',
    'Tax Law', 'Real Estate Law', 'Technology Law', 'International Law'
  ];

  const baseDate = new Date('2024-07-07T09:00:00+09:00'); // Fixed base date
  return Array.from({ length: count }, (_, i) => {
    const isLawyer = rng() < 0.2;
    const role = isLawyer ? 'LAWYER' : rng() < 0.1 ? 'ADMIN' : 'USER';
    const status = statuses[Math.floor(rng() * statuses.length)];
    const lastLogin = new Date(baseDate.getTime() - Math.floor(rng() * 30 * 24 * 60 * 60 * 1000));
    
    return {
      id: `U-${String(i + 1).padStart(3, '0')}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      company: companies[Math.floor(rng() * companies.length)],
      role,
      status,
      lastLogin: lastLogin.toISOString(),
      contractsAnalyzed: Math.floor(rng() * 50),
      specialization: isLawyer ? specializations[Math.floor(rng() * specializations.length)] : null,
      phone: `010-${String(Math.floor(rng() * 9000) + 1000)}-${String(Math.floor(rng() * 9000) + 1000)}`,
      createdAt: new Date(baseDate.getTime() - Math.floor(rng() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      isVerified: rng() > 0.1,
      hasActiveSubscription: rng() > 0.2
    };
  });
};

const roleMap = {
  'USER': { label: '사용자', color: 'bg-blue-100 text-blue-800', icon: '👤' },
  'ADMIN': { label: '관리자', color: 'bg-purple-100 text-purple-800', icon: '👑' },
  'LAWYER': { label: '변호사', color: 'bg-green-100 text-green-800', icon: '⚖️' }
};

const statusMap = {
  'active': { label: '활성', color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="inline mr-1" /> },
  'inactive': { label: '비활성', color: 'bg-gray-100 text-gray-800', icon: <FaClock className="inline mr-1" /> },
  'suspended': { label: '정지', color: 'bg-red-100 text-red-800', icon: <FaExclamationTriangle className="inline mr-1" /> }
};

// Add UserType interface
interface UserType {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: string;
  lastLogin: string;
  contractsAnalyzed: number;
  specialization: string | null;
  phone: string;
  createdAt: string;
  isVerified: boolean;
  hasActiveSubscription: boolean;
}

const mockUsers = generateMockUsers();

export default function UserDirectoryTable() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastLogin');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selectedRows, setSelectedRows] = useState(new Set());

  useEffect(() => {
    // setUsers(generateMockUsers()); // Remove this line to avoid re-randomizing on mount
  }, []);

  // Enhanced filtering and sorting
  const filteredUsers = useMemo(() => {
    if (users.length === 0) return [];
    let filtered = users.filter(user => {
      const matchesSearch = !search || 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.company.toLowerCase().includes(search.toLowerCase()) ||
        (user.specialization && user.specialization.toLowerCase().includes(search.toLowerCase()));
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Enhanced sorting
    filtered = filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'lastLogin':
          aVal = new Date(a.lastLogin).getTime();
          bVal = new Date(b.lastLogin).getTime();
          break;
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        case 'contractsAnalyzed':
          aVal = a.contractsAnalyzed;
          bVal = b.contractsAnalyzed;
          break;
        case 'name':
          aVal = a.name.localeCompare(b.name);
          bVal = b.name.localeCompare(a.name);
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }
      
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [users, search, roleFilter, statusFilter, sortBy, sortDir]);

  // Safely compute selectedUsers
  const selectedUsers = users.filter(u => selectedRows.has(u.id));

  const handleSort = (key) => {
    setSortBy(key);
    setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleRowSelect = (userId) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(filteredUsers.map(u => u.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Seoul'
    });
  };

  const getDaysSinceLastLogin = (lastLogin) => {
    const days = Math.floor((Date.now() - new Date(lastLogin).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    return `${Math.floor(days / 30)}개월 전`;
  };

  if (users.length === 0) {
    return <div className="py-12 text-center text-gray-400">사용자가 없습니다.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      {/* Enhanced Search & Filters */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="이름, 이메일, 회사, 전문분야 검색..."
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10 mt-1">
              {filteredUsers.slice(0, 5).map(user => (
                <div key={user.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email} • {user.company}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4">
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="all">전체 역할</option>
            {Object.entries(roleMap).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>

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

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedRows.size > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-black">전체 선택</span>
          </label>
        </div>

        {/* Quick Actions */}
        {selectedRows.size > 0 && (
          <div className="border-t pt-4">
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                일괄 이메일 발송
              </button>
              <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                상태 변경
              </button>
              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                CSV 내보내기
              </button>
            </div>
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
                  checked={selectedRows.size === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded focus:ring-2 focus:ring-blue-500"
                />
              </th>
              <th 
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('name')}
              >
                사용자 {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-3 font-semibold">이메일</th>
              <th className="py-3 px-3 font-semibold">회사</th>
              <th className="py-3 px-3 font-semibold">역할</th>
              <th className="py-3 px-3 font-semibold">상태</th>
              <th 
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('lastLogin')}
              >
                최근 로그인 {sortBy === 'lastLogin' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="py-3 px-3 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSort('contractsAnalyzed')}
              >
                계약 수 {sortBy === 'contractsAnalyzed' && (sortDir === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-3 px-3 font-semibold">작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-400">
                  검색 조건에 맞는 사용자가 없습니다.
                </td>
              </tr>
            ) : filteredUsers.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-b transition-colors ${
                  selectedRows.has(user.id) ? 'bg-blue-100' : 
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-50 cursor-pointer`}
              >
                <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(user.id)}
                    onChange={() => handleRowSelect(user.id)}
                    className="rounded focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-black">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-black">{user.email}</td>
                <td className="py-3 px-3 text-black">{user.company}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleMap[user.role].color}`}>
                    {roleMap[user.role].icon} {roleMap[user.role].label}
                  </span>
                  {user.specialization && (
                    <div className="text-xs text-gray-500 mt-1">{user.specialization}</div>
                  )}
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[user.status].color}`}>
                    {statusMap[user.status].icon}
                    {statusMap[user.status].label}
                  </span>
                  {!user.isVerified && (
                    <div className="text-xs text-red-500 mt-1">미인증</div>
                  )}
                </td>
                <td className="py-3 px-3 text-black">
                  <div>{formatDate(user.lastLogin)}</div>
                  <div className="text-xs text-gray-500">{getDaysSinceLastLogin(user.lastLogin)}</div>
                </td>
                <td className="py-3 px-3 text-black">
                  <div className="font-medium">{user.contractsAnalyzed}</div>
                  <div className="text-xs text-gray-500">계약 분석</div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex space-x-2 items-center">
                    <FaEye size={16} className="text-blue-600 hover:text-blue-800" />
                    <FaEdit size={16} className="text-green-600 hover:text-green-800" />
                    <FaUserCheck size={16} className="text-indigo-600 hover:text-indigo-800" />
                    <FaComments size={16} className="text-yellow-600 hover:text-yellow-800" />
                    <FaHistory size={16} className="text-gray-600 hover:text-gray-800" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Summary */}
      <div className="mt-4 text-sm text-gray-600">
        총 {filteredUsers.length}명 사용자 중 {selectedRows.size}명 선택됨
      </div>
    </div>
  );
} 