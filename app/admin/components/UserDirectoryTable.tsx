import { useState } from 'react';
import React, { useRef } from 'react';

// Helper for avatar color
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
}

function Avatar({ name, email }: { name: string; email: string }) {
  const initials = name ? name[0] : email[0];
  const bg = stringToColor(email);
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold mr-2" style={{ background: bg }}>
      {initials}
    </span>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold`} style={{ background: color, color: '#fff' }}>
      {text}
    </span>
  );
}

type User = {
  name: string;
  role: string;
  status: string;
  email: string;
  lastLogin: string;
  onboarding?: string;
};

const allUsers: User[] = [
  { name: '홍길동', role: '변호사', status: '활성', email: 'hong@example.com', lastLogin: '2024-06-25' },
  { name: '김철수', role: '고객', status: '비활성', email: 'kim@example.com', lastLogin: '2024-06-20' },
  { name: '이영희', role: '관리자', status: '활성', email: 'lee@example.com', lastLogin: '2024-06-24' },
];

const roles = ['전체', '변호사', '고객', '관리자'];
const statuses = ['전체', '활성', '비활성'];
const segments = [
  { label: '전체', value: 'all' },
  { label: '변호사', value: '변호사' },
  { label: '고객', value: '고객' },
  { label: '관리자', value: '관리자' },
  { label: '비활성', value: '비활성' },
];

export default function UserDirectoryTable() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('전체');
  const [status, setStatus] = useState('전체');
  const [segment, setSegment] = useState('all');
  const [users, setUsers] = useState<User[]>(allUsers);
  const [detailUser, setDetailUser] = useState<User | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('고객');
  const [inviteName, setInviteName] = useState('');
  const [inviteError, setInviteError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState('');

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name.includes(search) ||
      u.email.includes(search);
    const matchesRole = role === '전체' || u.role === role;
    const matchesStatus = status === '전체' || u.status === status;
    const matchesSegment =
      segment === 'all' ||
      (segment === '비활성' ? u.status === '비활성' : u.role === segment);
    return matchesSearch && matchesRole && matchesStatus && matchesSegment;
  });

  const handleRoleChange = (email, newRole) => {
    setUsers(users => users.map(u => u.email === email ? { ...u, role: newRole } : u));
  };

  const handleInvite = () => {
    setInviteEmail('');
    setInviteRole('고객');
    setInviteName('');
    setInviteError('');
    setShowInvite(true);
  };

  const submitInvite = () => {
    if (!inviteEmail || !inviteEmail.includes('@')) {
      setInviteError('유효한 이메일을 입력하세요.');
      return;
    }
    if (users.some(u => u.email === inviteEmail)) {
      setInviteError('이미 등록된 이메일입니다.');
      return;
    }
    setUsers([
      ...users,
      {
        name: inviteName || inviteEmail.split('@')[0],
        role: inviteRole,
        status: '초대됨',
        email: inviteEmail,
        lastLogin: '-',
        onboarding: '대기',
      },
    ]);
    setShowInvite(false);
  };

  const resendInvite = (email) => {
    // Mock resend logic
    alert(`${email}로 초대 메일을 재전송했습니다.`);
  };

  // CSV Export
  const exportCSV = () => {
    const header = ['이름', '역할', '상태', '이메일', '최근 로그인', '온보딩'];
    const rows = users.map(u => [u.name, u.role, u.status, u.email, u.lastLogin, u.onboarding || '-']);
    const csvContent = [header, ...rows].map(r => r.map(x => `"${x ?? ''}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Import
  const handleImportClick = () => {
    setImportError('');
    setImportSuccess('');
    fileInputRef.current?.click();
  };

  const handleImport = (e) => {
    setImportError('');
    setImportSuccess('');
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt.target) return;
      const text = (evt.target as FileReader).result;
      if (typeof text !== 'string') return;
      try {
        const lines = text.split(/\r?\n/).filter(Boolean);
        const [header, ...rows] = lines;
        const idx = {
          name: header.indexOf('이름'),
          role: header.indexOf('역할'),
          status: header.indexOf('상태'),
          email: header.indexOf('이메일'),
          lastLogin: header.indexOf('최근 로그인'),
          onboarding: header.indexOf('온보딩'),
        };
        if (Object.values(idx).some(i => i === -1)) throw new Error('CSV 헤더가 올바르지 않습니다.');
        const imported = rows.map(row => {
          const cols = row.split(',').map(x => x.replace(/^"|"$/g, ''));
          return {
            name: cols[idx.name],
            role: cols[idx.role],
            status: cols[idx.status],
            email: cols[idx.email],
            lastLogin: cols[idx.lastLogin],
            onboarding: cols[idx.onboarding],
          };
        });
        setUsers(prev => [...prev, ...imported.filter(u => !prev.some(p => p.email === u.email))]);
        setImportSuccess('사용자 CSV를 성공적으로 가져왔습니다.');
      } catch (err) {
        setImportError('CSV 파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 overflow-x-auto border border-gray-100">
      <div className="flex flex-wrap gap-3 mb-6 items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
        <input
          type="text"
          placeholder="이름, 이메일 검색..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-56 focus:ring-2 focus:ring-blue-200 transition"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex gap-2 ml-4 flex-wrap">
          {segments.map(seg => (
            <button
              key={seg.value}
              className={`px-4 py-1 rounded-full text-sm font-semibold border transition ${segment === seg.value ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50'}`}
              onClick={() => setSegment(seg.value)}
            >
              {seg.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto flex-wrap">
          <button
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-green-700 focus:ring-2 focus:ring-green-300 transition"
            onClick={handleInvite}
          >
            사용자 초대
          </button>
          <button
            className="bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 transition"
            onClick={exportCSV}
          >
            CSV 내보내기
          </button>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
            onClick={handleImportClick}
          >
            CSV 가져오기
          </button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImport}
          />
        </div>
      </div>
      {importError && <div className="text-red-600 mb-2 text-sm font-semibold">{importError}</div>}
      {importSuccess && <div className="text-green-600 mb-2 text-sm font-semibold">{importSuccess}</div>}
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
        <table className="min-w-full text-base">
          <thead>
            <tr className="text-left text-black border-b bg-gray-50">
              <th className="py-3 px-4 font-bold text-black">이름</th>
              <th className="py-3 px-4 font-bold text-black">역할</th>
              <th className="py-3 px-4 font-bold text-black">상태</th>
              <th className="py-3 px-4 font-bold text-black">이메일</th>
              <th className="py-3 px-4 font-bold text-black">최근 로그인</th>
              <th className="py-3 px-4 font-bold text-black">온보딩</th>
              <th className="py-3 px-4 font-bold text-black">작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, idx) => (
              <tr key={u.email} className={`transition ${idx % 2 === 0 ? 'bg-blue-50/40' : 'bg-white'} hover:bg-blue-100/60`}>
                <td className="py-3 px-4 text-black font-semibold flex items-center">
                  <Avatar name={u.name} email={u.email} />
                  {u.name}
                </td>
                <td className="py-3 px-4 text-black">
                  <Badge text={u.role} color={u.role === '관리자' ? '#6366f1' : u.role === '변호사' ? '#10b981' : '#3b82f6'} />
                </td>
                <td className="py-3 px-4 text-black">
                  <Badge text={u.status} color={u.status === '활성' ? '#10b981' : u.status === '비활성' ? '#f59e42' : '#6366f1'} />
                </td>
                <td className="py-3 px-4 text-black">{u.email}</td>
                <td className="py-3 px-4 text-black">{u.lastLogin}</td>
                <td className="py-3 px-4 text-black">{u.status === '초대됨' ? (u.onboarding || '대기') : '-'}</td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:underline mr-2 font-semibold focus:underline" onClick={() => setDetailUser(u)}>상세</button>
                  <button className="text-green-600 hover:underline font-semibold focus:underline" disabled={u.status === '초대됨'}>수정</button>
                  {u.status === '초대됨' && (
                    <button className="ml-2 text-indigo-600 hover:underline font-semibold focus:underline" onClick={() => resendInvite(u.email)}>초대 재전송</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {detailUser && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setDetailUser(null)}>&times;</button>
            <div className="font-bold text-lg mb-2">{detailUser.name} 상세 정보</div>
            <div className="mb-2"><span className="font-semibold">역할:</span> {detailUser.role}</div>
            <div className="mb-2"><span className="font-semibold">상태:</span> {detailUser.status}</div>
            <div className="mb-2"><span className="font-semibold">이메일:</span> {detailUser.email}</div>
            <div className="mb-2"><span className="font-semibold">최근 로그인:</span> {detailUser.lastLogin}</div>
            <div className="mt-4">
              <div className="font-semibold mb-1">최근 활동 (모의):</div>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                <li>계약 초안 업로드 (2024-06-25)</li>
                <li>AI 검토 요청 (2024-06-24)</li>
                <li>계약 승인 (2024-06-23)</li>
              </ul>
            </div>
            <div className="mt-4">
              <div className="font-semibold mb-1">재무 정보 (모의):</div>
              <ul className="list-disc ml-5 text-sm text-gray-700">
                <li>총 결제: ₩10,000,000</li>
                <li>미수금: ₩1,000,000</li>
                <li>연체: ₩500,000</li>
              </ul>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">권한 변경</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">비활성화</button>
            </div>
          </div>
        </div>
      )}
      {showInvite && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowInvite(false)}>&times;</button>
            <div className="font-bold text-lg mb-4">사용자 초대</div>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">이메일</label>
              <input
                type="email"
                className="border rounded px-3 py-2 w-full"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">이름 (선택)</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-full"
                value={inviteName}
                onChange={e => setInviteName(e.target.value)}
                placeholder="이름 입력 (선택)"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">역할</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value)}
              >
                {roles.filter(r => r !== '전체').map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            {inviteError && <div className="text-red-600 mb-2 text-sm">{inviteError}</div>}
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setShowInvite(false)}>취소</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={submitInvite}>초대</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 