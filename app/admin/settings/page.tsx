"use client";
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import { FaUserCircle, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash, FaCopy, FaSyncAlt, FaGoogle, FaMicrosoft, FaCloud, FaFileSignature, FaTrashAlt, FaRegQuestionCircle, FaMobileAlt, FaDesktop } from 'react-icons/fa';
import Image from 'next/image';

export default function AdminSettingsPage() {
  // Profile & Security
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [adminName, setAdminName] = useState('김대표');
  const [adminEmail, setAdminEmail] = useState('admin@lawfirm.com');
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [twoFA, setTwoFA] = useState(true);
  const [sessions] = useState([
    { id: 1, device: 'MacBook Pro', type: 'desktop', location: '서울, 대한민국', browser: 'Chrome', lastActive: '2024-07-07 09:00', current: true },
    { id: 2, device: 'iPhone 15', type: 'mobile', location: '서울, 대한민국', browser: 'Safari', lastActive: '2024-07-06 22:15', current: false },
    { id: 3, device: 'Windows PC', type: 'desktop', location: '부산, 대한민국', browser: 'Edge', lastActive: '2024-07-05 18:30', current: false },
  ]);

  // Preferences
  const [language, setLanguage] = useState('ko-KR');
  const [timezone, setTimezone] = useState('Asia/Seoul');
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [editingPrefs, setEditingPrefs] = useState(false);

  // Organization
  const [companyName, setCompanyName] = useState('로앤컴퍼니');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string | null>(null);
  const [complianceContact, setComplianceContact] = useState('compliance@lawfirm.com');
  const [defaultReviewPeriod, setDefaultReviewPeriod] = useState(7);
  const [editingOrg, setEditingOrg] = useState(false);

  // Integrations
  const [integrations, setIntegrations] = useState([
    { id: 'calendar', name: 'Google Calendar', icon: <FaGoogle className="text-red-500" />, status: 'connected', lastSync: '2024-07-07 08:55' },
    { id: 'email', name: 'Outlook', icon: <FaMicrosoft className="text-blue-700" />, status: 'disconnected', lastSync: null },
    { id: 'storage', name: 'Google Drive', icon: <FaCloud className="text-blue-400" />, status: 'connected', lastSync: '2024-07-06 21:00' },
    { id: 'esign', name: 'DocuSign', icon: <FaFileSignature className="text-yellow-600" />, status: 'connected', lastSync: '2024-07-05 17:30' },
  ]);
  const [apiKey, setApiKey] = useState('sk-xxxx-xxxx-xxxx');
  const [apiKeyMasked, setApiKeyMasked] = useState(true);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  // Data & Privacy
  const [dataExporting, setDataExporting] = useState(false);
  const [dataExported, setDataExported] = useState(false);
  const [dataRetention, setDataRetention] = useState(365);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Support
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Avatar preview
  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  }
  // Company logo preview
  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setCompanyLogo(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setCompanyLogoUrl(url);
    }
  }
  // API key copy
  function handleCopyApiKey() {
    navigator.clipboard.writeText(apiKey);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 1500);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">설정</h1>
        <div className="space-y-10 max-w-4xl mx-auto w-full">
          {/* Profile & Security */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="프로필" width={80} height={80} className="w-20 h-20 rounded-full object-cover border-2 border-blue-200" />
                ) : (
                  <FaUserCircle className="w-20 h-20 text-gray-300" />
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer shadow-lg hover:bg-blue-700 transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  <FaSyncAlt size={16} />
                </label>
              </div>
              <div className="flex-1">
                {editingProfile ? (
                  <>
                    <input type="text" value={adminName} onChange={e => setAdminName(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black mb-2" />
                    <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black" />
                  </>
                ) : (
                  <>
                    <div className="text-lg font-semibold text-gray-900">{adminName}</div>
                    <div className="text-gray-600">{adminEmail}</div>
                  </>
                )}
              </div>
              <div>
                {editingProfile ? (
                  <>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 mr-2" onClick={() => setEditingProfile(false)}>저장</button>
                    <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setEditingProfile(false)}>취소</button>
                  </>
                ) : (
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setEditingProfile(true)}>프로필 편집</button>
                )}
              </div>
            </div>
            <div className="border-t pt-6 mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">비밀번호 변경</label>
                <div className="flex gap-2 items-center">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="새 비밀번호" className="border rounded-lg px-3 py-2 w-48 text-black" />
                  <input type={showPassword ? 'text' : 'password'} value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="비밀번호 확인" className="border rounded-lg px-3 py-2 w-48 text-black" />
                  <button type="button" className="text-gray-400 hover:text-blue-600" onClick={() => setShowPassword(v => !v)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">변경</button>
                </div>
                <div className="text-xs text-gray-500 mt-1">8자 이상, 영문/숫자/특수문자 포함</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium flex items-center gap-1">2단계 인증(2FA) <FaRegQuestionCircle className="text-gray-400" title="계정 보안을 위해 2FA를 권장합니다." /></span>
                <button
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${twoFA ? 'bg-blue-600' : 'bg-gray-300'}`}
                  onClick={() => setTwoFA(v => !v)}
                  aria-pressed={twoFA}
                >
                  <span className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${twoFA ? 'translate-x-6' : ''}`}></span>
                </button>
                <span className={`ml-2 text-xs font-medium ${twoFA ? 'text-blue-600' : 'text-gray-400'}`}>{twoFA ? '활성화됨' : '비활성화'}</span>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">활성 세션/기기 관리</label>
                <div className="divide-y divide-gray-200 rounded-lg border bg-gray-50">
                  {sessions.map(s => (
                    <div key={s.id} className="flex items-center gap-3 p-3 text-sm">
                      {s.type === 'mobile' ? <FaMobileAlt className="text-blue-400" /> : <FaDesktop className="text-gray-400" />}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{s.device} {s.current && <span className="ml-1 text-xs text-blue-600">(현재 기기)</span>}</div>
                        <div className="text-gray-500">{s.browser} · {s.location} · 마지막 활동: {s.lastActive}</div>
                      </div>
                      {!s.current && <button className="text-red-500 hover:underline text-xs flex items-center gap-1"><FaTrashAlt /> 로그아웃</button>}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">의심스러운 세션이 있다면 즉시 로그아웃하세요.</div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">환경설정</h2>
              <span className="text-xs text-gray-500">개인화 및 알림 환경을 설정하세요.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">언어</label>
                <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black">
                  <option value="ko-KR">한국어</option>
                  <option value="en-US">English</option>
                </select>
                <div className="text-xs text-gray-500 mt-1">플랫폼 기본 언어를 선택하세요.</div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">시간대</label>
                <select value={timezone} onChange={e => setTimezone(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black">
                  <option value="Asia/Seoul">Asia/Seoul (KST)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                </select>
                <div className="text-xs text-gray-500 mt-1">모든 날짜/시간이 이 시간대를 기준으로 표시됩니다.</div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">테마</label>
                <select value={theme} onChange={e => setTheme(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black">
                  <option value="light">라이트</option>
                  <option value="dark">다크</option>
                </select>
                <div className="text-xs text-gray-500 mt-1">밝은/어두운 모드를 선택하세요.</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="block text-gray-700 font-medium mb-1">알림 수신 설정</span>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} className="rounded" />
                  <span className="text-black">이메일 알림</span> <span className="text-xs text-gray-400">(계약 만료, 시스템 알림 등)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={smsNotifications} onChange={e => setSmsNotifications(e.target.checked)} className="rounded" />
                  <span className="text-black">SMS 알림</span> <span className="text-xs text-gray-400">(긴급 알림)</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">저장</button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">취소</button>
            </div>
          </section>

          {/* Organization */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">조직 정보</h2>
              <span className="text-xs text-gray-500">회사/로펌의 기본 정보를 관리하세요.</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">회사/로펌 이름</label>
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">로고 업로드</label>
                <div className="flex items-center gap-4">
                  {companyLogoUrl ? (
                    <Image src={companyLogoUrl} alt="로고 미리보기" width={64} height={64} className="w-16 h-16 rounded bg-gray-100 object-contain border" />
                  ) : (
                    <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-gray-300 border"><FaCloud size={32} /></div>
                  )}
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="block text-black" />
                </div>
                <div className="text-xs text-gray-500 mt-1">최대 2MB, PNG/JPG 권장</div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">법적/컴플라이언스 연락처</label>
                <input type="email" value={complianceContact} onChange={e => setComplianceContact(e.target.value)} className="border rounded-lg px-3 py-2 w-full text-black" />
                <div className="text-xs text-gray-500 mt-1">법적 문의 및 컴플라이언스 관련 연락처</div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">기본 검토 기간(일)</label>
                <input type="number" min={1} value={defaultReviewPeriod} onChange={e => setDefaultReviewPeriod(Number(e.target.value))} className="border rounded-lg px-3 py-2 w-32 text-black" />
                <span className="ml-2 text-sm text-gray-500">계약 검토 요청 시 기본 기한</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">저장</button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">취소</button>
            </div>
          </section>

          {/* Integrations */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">외부 연동</h2>
              <span className="text-xs text-gray-500">외부 서비스와의 연동 상태를 확인하고 관리하세요.</span>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {integrations.map(integ => (
                <div key={integ.id} className="flex items-center gap-4 p-4 rounded-lg border bg-gray-50">
                  <div className="text-2xl">{integ.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      {integ.name}
                      {integ.status === 'connected' ? <FaCheckCircle className="text-green-500" title="연결됨" /> : <FaExclamationCircle className="text-gray-400" title="미연결" />}
                    </div>
                    <div className="text-xs text-gray-500">{integ.status === 'connected' ? `마지막 동기화: ${integ.lastSync}` : '연결되지 않음'}</div>
                  </div>
                  {integ.status === 'connected' ? (
                    <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">연결 해제</button>
                  ) : (
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">연결</button>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">API 키 관리</label>
              <div className="flex items-center gap-2">
                <input type={apiKeyMasked ? 'password' : 'text'} value={apiKey} readOnly className="border rounded-lg px-3 py-2 w-full text-black bg-gray-100" />
                <button className="text-gray-400 hover:text-blue-600" onClick={() => setApiKeyMasked(v => !v)}>{apiKeyMasked ? <FaEye /> : <FaEyeSlash />}</button>
                <button className="text-gray-400 hover:text-blue-600" onClick={handleCopyApiKey}><FaCopy /> {apiKeyCopied && <span className="ml-1 text-xs text-green-600">복사됨!</span>}</button>
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center whitespace-nowrap"><FaSyncAlt className="inline mr-1" />재발급</button>
              </div>
              <div className="text-xs text-gray-500 mt-1">API 키는 외부 시스템 연동에 사용됩니다. 안전하게 보관하세요.</div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">웹훅/알림 연동</label>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">설정</button>
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">데이터 및 개인정보</h2>
              <span className="text-xs text-gray-500">데이터 내보내기, 계정 삭제, 보존 정책을 관리하세요.</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">계정 데이터 내보내기</label>
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => { setDataExporting(true); setTimeout(() => { setDataExporting(false); setDataExported(true); setTimeout(() => setDataExported(false), 2000); }, 2000); }}
                  disabled={dataExporting}
                >
                  {dataExporting ? '내보내는 중...' : dataExported ? '내보내기 완료!' : '내보내기'}
                </button>
                <div className="text-xs text-gray-500 mt-1">개인정보 및 활동 내역을 다운로드할 수 있습니다.</div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">계정 삭제 요청</label>
                <button
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  계정 삭제
                </button>
                <div className="text-xs text-gray-500 mt-1">계정 삭제 시 모든 데이터가 영구적으로 삭제됩니다.</div>
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                      <h3 className="text-lg font-bold mb-4 text-red-700 flex items-center gap-2"><FaExclamationCircle /> 계정 삭제 확인</h3>
                      <p className="mb-6 text-gray-700">정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
                      <div className="flex gap-2">
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700" onClick={() => setShowDeleteConfirm(false)}>삭제</button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setShowDeleteConfirm(false)}>취소</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">데이터 보존 정책(일)</label>
                <input type="number" min={30} value={dataRetention} onChange={e => setDataRetention(Number(e.target.value))} className="border rounded-lg px-3 py-2 w-32 text-black" />
                <span className="ml-2 text-sm text-gray-500">(30일 이상 권장)</span>
                <div className="text-xs text-gray-500 mt-1">데이터 보존 기간이 지난 정보는 자동 삭제됩니다.</div>
              </div>
            </div>
          </section>

          {/* Support */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full">
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">지원 및 피드백</h2>
              <span className="text-xs text-gray-500">문의, 피드백, 도움말을 확인하세요.</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">고객 지원 문의</label>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700" onClick={() => setShowSupportModal(true)}>문의하기</button>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">기능 요청/피드백 제출</label>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setShowFeedbackModal(true)}>피드백 보내기</button>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">도움말/문서 바로가기</label>
                <a href="/admin/help" className="text-blue-600 hover:underline flex items-center gap-1"><FaRegQuestionCircle /> 도움말 보기</a>
              </div>
            </div>
            {/* Support Modal */}
            {showSupportModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                  <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center gap-2">고객 지원 문의</h3>
                  <input type="email" placeholder="이메일" className="border rounded-lg px-3 py-2 w-full mb-3 text-black" />
                  <textarea placeholder="문의 내용을 입력하세요" className="border rounded-lg px-3 py-2 w-full mb-3 text-black" rows={4}></textarea>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">보내기</button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setShowSupportModal(false)}>취소</button>
                  </div>
                </div>
              </div>
            )}
            {/* Feedback Modal */}
            {showFeedbackModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">피드백 보내기</h3>
                  <textarea placeholder="피드백을 입력하세요" className="border rounded-lg px-3 py-2 w-full mb-3 text-black" rows={4}></textarea>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">보내기</button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200" onClick={() => setShowFeedbackModal(false)}>취소</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
} 