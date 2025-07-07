"use client";
import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import { 
  FaDownload, 
  FaUpload, 
  FaUserCheck, 
  FaComments, 
  FaHistory, 
  FaClock, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaEdit, 
  FaShare, 
  FaBell, 
  FaCalendarAlt, 
  FaUser, 
  FaBuilding, 
  FaFileAlt,
  FaEye,
  FaTrash,
  FaCopy,
  FaPrint,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';
import { HiOutlineDocumentText, HiOutlinePencilAlt, HiOutlineCurrencyDollar } from 'react-icons/hi';
import Link from 'next/link';

const statusMap = {
  'awaiting_ai': { label: 'AI 검토 대기', color: 'bg-yellow-100 text-yellow-800', icon: <FaClock className="text-yellow-600" /> },
  'ai_complete': { label: 'AI 검토 완료', color: 'bg-blue-100 text-blue-800', icon: <FaCheckCircle className="text-blue-600" /> },
  'lawyer_review': { label: '변호사 검토 중', color: 'bg-indigo-100 text-indigo-800', icon: <FaUserCheck className="text-indigo-600" /> },
  'drafting': { label: '작성 중', color: 'bg-purple-100 text-purple-800', icon: <HiOutlinePencilAlt className="text-purple-600" /> },
  'needs_info': { label: '추가 정보 필요', color: 'bg-red-100 text-red-800', icon: <FaExclamationTriangle className="text-red-600" /> },
  'complete': { label: '완료', color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="text-green-600" /> },
};

const typeMap = {
  'review': { label: '검토', icon: <HiOutlineDocumentText className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' },
  'draft': { label: '작성', icon: <HiOutlinePencilAlt className="text-purple-500" />, color: 'bg-purple-100 text-purple-800' },
  'negotiation': { label: '협상', icon: <HiOutlineCurrencyDollar className="text-green-500" />, color: 'bg-green-100 text-green-800' },
};

const priorityMap = {
  'high': { label: '높음', color: 'bg-red-100 text-red-800' },
  'medium': { label: '보통', color: 'bg-yellow-100 text-yellow-800' },
  'low': { label: '낮음', color: 'bg-green-100 text-green-800' },
};

const mockCase = {
  id: 'C-2024-002',
  name: 'MSA - Beta LLC',
  client: 'Beta LLC',
  type: 'draft',
  status: 'ai_complete',
  priority: 'medium',
  lastUpdated: '2024-06-30',
  lawyer: 'John Doe',
  keyDate: '2024-07-10',
  value: '₩500,000,000',
  industry: 'Technology',
  contractType: 'Master Service Agreement',
  files: [
    { 
      name: 'Original_MSA_Beta.pdf', 
      url: '#', 
      type: 'original',
      size: '2.4 MB',
      uploaded: '2024-06-29',
      version: '1.0'
    },
    { 
      name: 'Draft_v1_Beta_MSA.pdf', 
      url: '#', 
      type: 'draft',
      size: '3.1 MB',
      uploaded: '2024-06-30',
      version: '1.1'
    },
    { 
      name: 'Beta_LLC_Requirements.pdf', 
      url: '#', 
      type: 'requirements',
      size: '1.8 MB',
      uploaded: '2024-06-28',
      version: '1.0'
    }
  ],
  aiReview: {
    summary: 'AI 검토 결과: 주요 위험 없음. 표준 조항 모두 포함. 3개 조항에서 개선 권장사항 발견.',
    risks: ['관할 법원 조항 불명확', '지적재산권 조항 보완 필요'],
    suggestions: [
      '서명란 위치 확인 필요',
      '관할 법원 조항 추가 권장',
      '지적재산권 조항 세분화',
      '분쟁해결 절차 명확화'
    ],
    score: 85,
    reviewedAt: '2024-06-30 14:30'
  },
  timeline: [
    { date: '2024-06-30 14:30', action: 'AI 검토 완료', by: '시스템', status: 'completed' },
    { date: '2024-06-30 10:15', action: '변호사 검토 시작', by: 'John Doe', status: 'completed' },
    { date: '2024-06-29 16:45', action: '계약 업로드', by: 'Beta LLC', status: 'completed' },
    { date: '2024-06-28 09:30', action: '프로젝트 생성', by: 'Admin', status: 'completed' }
  ],
  comments: [
    { 
      id: 1,
      author: 'John Doe', 
      role: '변호사',
      text: 'AI 검토 결과를 확인했습니다. 관할 법원 조항과 지적재산권 조항에 대한 추가 검토가 필요합니다. 클라이언트와 논의 후 수정하겠습니다.', 
      date: '2024-06-30 15:00',
      type: 'internal',
      parentId: null,
      resolved: false
    },
    { 
      id: 2,
      author: 'Beta LLC', 
      role: '클라이언트',
      text: '초안 검토 부탁드립니다. 특히 서비스 범위와 지불 조건에 대해 확인하고 싶습니다.', 
      date: '2024-06-29 17:30',
      type: 'client',
      parentId: null,
      resolved: false
    },
    { 
      id: 3,
      author: 'Admin', 
      role: '관리자',
      text: '프로젝트가 성공적으로 생성되었습니다. AI 검토를 시작합니다.', 
      date: '2024-06-28 09:35',
      type: 'system',
      parentId: null,
      resolved: false
    }
  ],
  clientInfo: {
    name: 'Beta LLC',
    contact: '김철수',
    email: 'kim@betallc.com',
    phone: '+82-2-1234-5678',
    address: '서울특별시 강남구 테헤란로 123',
    website: 'www.betallc.com',
    industry: 'Technology',
    size: '50-200명',
    founded: '2018'
  },
  nextActions: [
    { action: '클라이언트 피드백 수집', due: '2024-07-02', assigned: 'John Doe', priority: 'high' },
    { action: '관할 법원 조항 수정', due: '2024-07-03', assigned: 'John Doe', priority: 'medium' },
    { action: '최종 검토 및 승인', due: '2024-07-05', assigned: 'Beta LLC', priority: 'high' }
  ]
};

type UploadedFile = { name: string; url: string; type: string; size: string; uploaded: string; version: string };

export default function AdminContractDetail() {
  const params = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(mockCase.comments);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(mockCase.files);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState<number | null>(null); // file index
  const [compareSelection, setCompareSelection] = useState<number[]>([]); // indices of files to compare
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nextActions, setNextActions] = useState(mockCase.nextActions.map(a => ({ ...a, completed: false })));
  const [newAction, setNewAction] = useState({ action: '', due: '', assigned: '', priority: 'medium', completed: false });
  const [editIdx, setEditIdx] = useState(null);
  const [editAction, setEditAction] = useState({ action: '', due: '', assigned: '', priority: 'medium', completed: false });
  const [replyTo, setReplyTo] = useState(null); // comment id to reply to
  const [mentionList, setMentionList] = useState([]); // mock: list of users to mention
  const [showMentions, setShowMentions] = useState(false);
  const [notification, setNotification] = useState('');
  const [approvals, setApprovals] = useState([
    { name: 'John Doe', role: '변호사', status: 'pending', signed: false },
    { name: 'Beta LLC', role: '클라이언트', status: 'pending', signed: false }
  ]);
  const [signatureNotification, setSignatureNotification] = useState('');

  // Add new action
  const handleAddAction = () => {
    if (!newAction.action.trim()) return;
    setNextActions([
      ...nextActions,
      { ...newAction, priority: newAction.priority || 'medium', completed: false }
    ]);
    setNewAction({ action: '', due: '', assigned: '', priority: 'medium', completed: false });
  };

  // Edit action
  const handleEditAction = (idx) => {
    setEditIdx(idx);
    setEditAction({ ...nextActions[idx] });
  };
  const handleSaveEdit = () => {
    setNextActions(nextActions.map((a, i) => i === editIdx ? { ...editAction, completed: a.completed } : a));
    setEditIdx(null);
  };
  const handleCancelEdit = () => {
    setEditIdx(null);
  };

  // Mark as complete
  const handleCompleteAction = (idx) => {
    setNextActions(nextActions.map((a, i) => i === idx ? { ...a, completed: true } : a));
  };
  // Delete action
  const handleDeleteAction = (idx) => {
    setNextActions(nextActions.filter((_, i) => i !== idx));
  };

  // Add or reply to comment
  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: 'Admin',
        role: '관리자',
        text: comment,
        date: new Date().toISOString(),
        type: replyTo ? 'reply' : 'internal',
        parentId: replyTo ?? null,
        resolved: false
      };
      setComments([newComment, ...comments]);
      setComment('');
      setReplyTo(null);
      setNotification('댓글이 등록되었습니다.');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  // Resolve comment
  const handleResolveComment = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, resolved: true } : c));
    setNotification('댓글이 해결됨으로 표시되었습니다.');
    setTimeout(() => setNotification(''), 2000);
  };

  // Archive comment (mock: remove from list)
  const handleArchiveComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
    setNotification('댓글이 보관되었습니다.');
    setTimeout(() => setNotification(''), 2000);
  };

  // Start reply
  const handleReply = (id) => {
    setReplyTo(id);
  };

  // Simple @mention logic (mock)
  const handleMention = (user) => {
    setComment(comment + `@${user} `);
    setShowMentions(false);
  };

  const getProgressPercentage = () => {
    const statusOrder = ['awaiting_ai', 'ai_complete', 'lawyer_review', 'drafting', 'complete'];
    const currentIndex = statusOrder.indexOf(mockCase.status);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  // File upload handler (mock)
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files) as File[];
    const newFiles = files.map((file, idx) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: 'draft',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded: new Date().toISOString().slice(0, 10),
      version: (uploadedFiles.length + idx + 1).toFixed(1)
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  // Drag-and-drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    const newFiles = files.map((file, idx) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: 'draft',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploaded: new Date().toISOString().slice(0, 10),
      version: (uploadedFiles.length + idx + 1).toFixed(1)
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  // Download handler (mock)
  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  // Preview handler
  const handlePreview = (file) => {
    setPreviewFile(file);
  };

  // Copy handler (mock: copy file name)
  const handleCopy = (file) => {
    navigator.clipboard.writeText(file.name);
    alert('파일명이 복사되었습니다.');
  };

  // Delete handler
  const handleDelete = (idx) => {
    if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
      setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx));
    }
  };

  // Upload new version (mock: just adds as new file)
  const handleUploadNewVersion = (idx) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Version history (mock: show all files with same name)
  const getVersionHistory = (file) => {
    return uploadedFiles.filter(f => f.name.split('_v')[0] === file.name.split('_v')[0]);
  };

  // Compare selection
  const handleCompareSelect = (idx) => {
    setCompareSelection(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      if (prev.length === 2) return [prev[1], idx];
      return [...prev, idx];
    });
  };

  // Approve contract
  const handleApprove = (idx) => {
    setApprovals(approvals.map((a, i) => i === idx ? { ...a, status: 'approved' } : a));
    setSignatureNotification('승인되었습니다.');
    setTimeout(() => setSignatureNotification(''), 2000);
  };
  // Reject contract
  const handleReject = (idx) => {
    setApprovals(approvals.map((a, i) => i === idx ? { ...a, status: 'rejected' } : a));
    setSignatureNotification('반려되었습니다.');
    setTimeout(() => setSignatureNotification(''), 2000);
  };
  // Sign contract (mock e-signature)
  const handleSign = (idx) => {
    setApprovals(approvals.map((a, i) => i === idx ? { ...a, signed: true } : a));
    setSignatureNotification('전자서명이 완료되었습니다.');
    setTimeout(() => setSignatureNotification(''), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin/contracts" className="text-gray-400 hover:text-gray-600">
                  <FaEye className="h-5 w-5" />
                </Link>
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-900">{mockCase.name}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeMap[mockCase.type].color}`}>
                      {typeMap[mockCase.type].icon} {typeMap[mockCase.type].label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityMap[mockCase.priority].color}`}>
                      {priorityMap[mockCase.priority].label} 우선순위
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    계약 ID: {mockCase.id} • {mockCase.contractType} • {mockCase.industry}
                  </div>
                </div>
              </div>
              {/* Removed top right buttons: share, notification, AI/status */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">진행률</span>
            <span className="text-sm text-gray-500">{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HiOutlineCurrencyDollar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">계약 가치</p>
                    <p className="text-2xl font-bold text-gray-900">{mockCase.value}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaCalendarAlt className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">마감일</p>
                    <p className="text-2xl font-bold text-gray-900">{mockCase.keyDate}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FaUser className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">담당 변호사</p>
                    <p className="text-lg font-semibold text-gray-900">{mockCase.lawyer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Actions / Task Management Section (Jira-style list) */}
            <div className="bg-white rounded-lg border border-gray-200 mt-6">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaClock className="mr-2 text-yellow-600" />
                  다음 작업 및 워크플로우
                </h2>
              </div>
              <div className="p-6">
                {/* Add new action row */}
                <div className="mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left font-medium pb-2">작업 내용</th>
                        <th className="text-left font-medium pb-2">담당자</th>
                        <th className="text-left font-medium pb-2">마감일</th>
                        <th className="text-left font-medium pb-2">우선순위</th>
                        <th className="text-left font-medium pb-2">상태</th>
                        <th className="text-left font-medium pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                            placeholder="작업 내용"
                            value={newAction.action}
                            onChange={e => setNewAction({ ...newAction, action: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                            placeholder="담당자"
                            value={newAction.assigned}
                            onChange={e => setNewAction({ ...newAction, assigned: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                            value={newAction.due}
                            onChange={e => setNewAction({ ...newAction, due: e.target.value })}
                          />
                        </td>
                        <td>
                          <select
                            className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                            value={newAction.priority}
                            onChange={e => setNewAction({ ...newAction, priority: e.target.value })}
                          >
                            <option value="high">높음</option>
                            <option value="medium">보통</option>
                            <option value="low">낮음</option>
                          </select>
                        </td>
                        <td></td>
                        <td>
                          <button
                            className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700"
                            onClick={handleAddAction}
                          >
                            추가
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Task List Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="text-left font-medium py-2">작업 내용</th>
                        <th className="text-left font-medium py-2">담당자</th>
                        <th className="text-left font-medium py-2">마감일</th>
                        <th className="text-left font-medium py-2">우선순위</th>
                        <th className="text-left font-medium py-2">상태</th>
                        <th className="text-left font-medium py-2">작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nextActions.map((a, idx) => (
                        <tr key={idx} className={a.completed ? 'bg-green-50 text-black' : 'bg-white text-black'}>
                          <td className={`py-2 ${a.completed ? 'line-through' : ''}`}>{editIdx === idx ? (
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                              value={editAction.action}
                              onChange={e => setEditAction({ ...editAction, action: e.target.value })}
                            />
                          ) : a.action}</td>
                          <td className="py-2">{editIdx === idx ? (
                            <input
                              type="text"
                              className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                              value={editAction.assigned}
                              onChange={e => setEditAction({ ...editAction, assigned: e.target.value })}
                            />
                          ) : a.assigned}</td>
                          <td className="py-2">{editIdx === idx ? (
                            <input
                              type="date"
                              className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                              value={editAction.due}
                              onChange={e => setEditAction({ ...editAction, due: e.target.value })}
                            />
                          ) : a.due}</td>
                          <td className="py-2">
                            {editIdx === idx ? (
                              <select
                                className="border border-gray-300 rounded-md px-2 py-1 w-full text-black"
                                value={editAction.priority}
                                onChange={e => setEditAction({ ...editAction, priority: e.target.value })}
                              >
                                <option value="high">높음</option>
                                <option value="medium">보통</option>
                                <option value="low">낮음</option>
                              </select>
                            ) : (
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityMap[a.priority]?.color || 'bg-gray-200 text-gray-700'}`}>{priorityMap[a.priority]?.label || a.priority}</span>
                            )}
                          </td>
                          <td className="py-2">
                            {a.completed ? (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">완료</span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">진행중</span>
                            )}
                          </td>
                          <td className="py-2">
                            {editIdx === idx ? (
                              <>
                                <button className="px-2 py-1 bg-green-600 text-white rounded text-xs font-semibold mr-1" onClick={handleSaveEdit}>저장</button>
                                <button className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs font-semibold" onClick={handleCancelEdit}>취소</button>
                              </>
                            ) : (
                              <div className="flex gap-1">
                                {!a.completed && <button className="px-2 py-1 bg-green-600 text-white rounded text-xs font-semibold" onClick={() => handleCompleteAction(idx)}>완료</button>}
                                {!a.completed && <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold" onClick={() => handleEditAction(idx)}>수정</button>}
                                <button className="px-2 py-1 bg-red-600 text-white rounded text-xs font-semibold" onClick={() => handleDeleteAction(idx)}>삭제</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Progress Bar for Tasks */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-black">작업 진행률</span>
                    <span className="text-xs text-black">{Math.round((nextActions.filter(a => a.completed).length / (nextActions.length || 1)) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(nextActions.filter(a => a.completed).length / (nextActions.length || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Files Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              {/* File Card Header: 계약서 워크샾 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaFileAlt className="mr-2 text-indigo-600" />
                    계약 파일
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      <FaUpload className="mr-1" /> 파일 업로드
                    </button>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <FaFileAlt className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{file.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{file.size}</span>
                            <span>버전 {file.version}</span>
                            <span>{file.uploaded}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              file.type === 'original' ? 'bg-blue-100 text-blue-800' :
                              file.type === 'draft' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {file.type === 'original' ? '원본' :
                               file.type === 'draft' ? '초안' : '요구사항'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600" onClick={() => handleDownload(file)}>
                          <FaDownload />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600" onClick={() => handlePreview(file)}>
                          <FaEye />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600" onClick={() => handleCopy(file)}>
                          <FaCopy />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600" onClick={() => handleDelete(index)}>
                          <FaTrash />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600" onClick={() => setShowVersionHistory(index)}>
                          <FaHistory />
                        </button>
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          onChange={e => handleFileUpload(e)}
                        />
                        <button className="p-2 text-gray-400 hover:text-orange-600" onClick={() => handleCompareSelect(index)}>
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Version Comparison (Diff) Navigation */}
                <div className="mt-4 border-t pt-4">
                  {/* Section label for version comparison */}
                  <div className="mb-4 flex items-center">
                    <FaFileAlt className="mr-2 text-blue-600" />
                    <span className="text-base font-semibold text-gray-900">계약서 워크샾</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-center">
                    <span className="font-semibold text-sm text-black">비교 기준:</span>
                    <select className="border border-black rounded px-2 py-1 text-sm font-medium text-black bg-white focus:ring-1 focus:ring-black" style={{minWidth:'110px'}} value={compareSelection[0] ?? ''} onChange={e => setCompareSelection([parseInt(e.target.value), compareSelection[1]])}>
                      <option value="">선택</option>
                      {uploadedFiles.map((file, idx) => (
                        <option key={idx} value={idx}>{file.name} (버전 {file.version})</option>
                      ))}
                    </select>
                    <span className="font-semibold text-sm text-black ml-2">대상 버전:</span>
                    <select className="border border-black rounded px-2 py-1 text-sm font-medium text-black bg-white focus:ring-1 focus:ring-black" style={{minWidth:'110px'}} value={compareSelection[1] ?? ''} onChange={e => setCompareSelection([compareSelection[0], parseInt(e.target.value)])}>
                      <option value="">선택</option>
                      {uploadedFiles.map((file, idx) => (
                        <option key={idx} value={idx}>{file.name} (버전 {file.version})</option>
                      ))}
                    </select>
                    <button
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm shadow disabled:opacity-50 transition-colors border border-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none ml-2"
                      disabled={compareSelection.length !== 2 || compareSelection.some(i => typeof i !== 'number') || compareSelection[0] === compareSelection[1]}
                      onClick={() => {
                        if (compareSelection.length === 2 && compareSelection[0] !== undefined && compareSelection[1] !== undefined && compareSelection[0] !== compareSelection[1]) {
                          window.open(`/admin/contracts/${mockCase.id}/diff?left=${compareSelection[0]}&right=${compareSelection[1]}`, '_blank');
                        }
                      }}
                    >
                      선택한 버전 비교
                    </button>
                  </div>
                </div>
                {/* Version History Modal */}
                {showVersionHistory !== null && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
                      <div className="font-bold mb-2">버전 히스토리</div>
                      <ul className="mb-4">
                        {getVersionHistory(uploadedFiles[showVersionHistory]).map((f, i) => (
                          <li key={i} className="text-sm mb-1">{f.name} - {f.version} ({f.uploaded})</li>
                        ))}
                      </ul>
                      <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold" onClick={() => setShowVersionHistory(null)}>닫기</button>
                    </div>
                  </div>
                )}
                {/* File Preview Modal */}
                {previewFile && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-2xl max-h-[80vh] overflow-auto">
                      <div className="font-bold mb-2">파일 미리보기: {previewFile.name}</div>
                      {previewFile.name.endsWith('.pdf') ? (
                        <iframe src={previewFile.url} width="100%" height="500px" title="PDF Preview" />
                      ) : previewFile.name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img src={previewFile.url} alt="미리보기" className="max-w-full max-h-[60vh]" />
                      ) : (
                        <div className="text-gray-500">미리보기를 지원하지 않는 파일 형식입니다.</div>
                      )}
                      <button className="mt-4 px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold" onClick={() => setPreviewFile(null)}>닫기</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaComments className="mr-2 text-green-600" />
                  메시지 & 댓글
                </h2>
              </div>
              <div className="p-6">
                {notification && (
                  <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-semibold">
                    {notification}
                  </div>
                )}
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleAddComment();
                        if (e.key === '@') setShowMentions(true);
                      }}
                    />
                    <button 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                      onClick={handleAddComment}
                    >
                      {replyTo ? '답글 등록' : '등록'}
                    </button>
                  </div>
                  {/* Mention dropdown (mock) */}
                  {showMentions && (
                    <div className="absolute bg-white border border-gray-300 rounded shadow mt-1 z-10">
                      {['Beta LLC', 'Admin', 'John Doe'].map(user => (
                        <div key={user} className="px-3 py-1 hover:bg-indigo-100 cursor-pointer" onClick={() => handleMention(user)}>
                          @{user}
                        </div>
                      ))}
                    </div>
                  )}
                  {replyTo && (
                    <div className="mt-1 text-xs text-gray-500">답글 대상: #{replyTo} <button className="ml-2 text-red-500 underline" onClick={() => setReplyTo(null)}>취소</button></div>
                  )}
                </div>
                <div className="space-y-4">
                  {comments.filter(c => !c.parentId).map((comment) => (
                    <div key={comment.id} className={`p-4 rounded-lg border-l-4 ${
                      comment.type === 'client' ? 'border-blue-400 bg-blue-50' :
                      comment.type === 'internal' ? 'border-green-400 bg-green-50' :
                      'border-gray-400 bg-gray-50'
                    } ${comment.resolved ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded-full ${
                            comment.type === 'client' ? 'bg-blue-100' :
                            comment.type === 'internal' ? 'bg-green-100' :
                            'bg-gray-100'
                          }`}>
                            <FaUser className={`h-3 w-3 ${
                              comment.type === 'client' ? 'text-blue-600' :
                              comment.type === 'internal' ? 'text-green-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500 ml-2">({comment.role})</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="mt-2 text-gray-700">{comment.text}</p>
                      {/* Threaded replies */}
                      <div className="mt-2 flex gap-2 flex-wrap">
                        <button className="text-xs text-blue-600 underline" onClick={() => handleReply(comment.id)}>답글</button>
                        {!comment.resolved && <button className="text-xs text-green-600 underline" onClick={() => handleResolveComment(comment.id)}>해결</button>}
                        <button className="text-xs text-gray-500 underline" onClick={() => handleArchiveComment(comment.id)}>보관</button>
                      </div>
                      {/* Replies */}
                      <div className="ml-6 mt-2 space-y-2">
                        {comments.filter(r => r.parentId === comment.id).map(reply => (
                          <div key={reply.id} className="p-2 rounded bg-gray-100 border-l-2 border-indigo-300">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800 text-xs">{reply.author}</span>
                              <span className="text-xs text-gray-500">{reply.date}</span>
                            </div>
                            <div className="text-xs text-gray-700 mt-1">{reply.text}</div>
                            <div className="flex gap-2 mt-1">
                              {!reply.resolved && <button className="text-xs text-green-600 underline" onClick={() => handleResolveComment(reply.id)}>해결</button>}
                              <button className="text-xs text-gray-500 underline" onClick={() => handleArchiveComment(reply.id)}>보관</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaBuilding className="mr-2 text-blue-600" />
                  클라이언트 정보
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{mockCase.clientInfo.name}</h4>
                    <p className="text-sm text-gray-500">{mockCase.clientInfo.industry} • {mockCase.clientInfo.size}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <FaUser className="mr-2 text-gray-400" />
                      <span className="text-gray-700">{mockCase.clientInfo.contact}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaEnvelope className="mr-2 text-gray-400" />
                      <a href={`mailto:${mockCase.clientInfo.email}`} className="text-indigo-600 hover:text-indigo-800">
                        {mockCase.clientInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaPhone className="mr-2 text-gray-400" />
                      <a href={`tel:${mockCase.clientInfo.phone}`} className="text-gray-700">
                        {mockCase.clientInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      <span className="text-gray-700">{mockCase.clientInfo.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaGlobe className="mr-2 text-gray-400" />
                      <a href={`https://${mockCase.clientInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                        {mockCase.clientInfo.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 px-2 py-1 bg-indigo-600 text-white rounded text-xs font-medium hover:bg-indigo-700 flex items-center justify-center" style={{minWidth:'0'}}>
                      <FaEnvelope className="mr-1" />
                      이메일
                    </button>
                    <button className="flex-1 px-2 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700 flex items-center justify-center" style={{minWidth:'0'}}>
                      <FaPhone className="mr-1" />
                      전화
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaHistory className="mr-2 text-purple-600" />
                  타임라인
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockCase.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.action}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.by}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Approval & Signature Workflow Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaCheckCircle className="mr-2 text-green-600" />
                  승인 및 전자서명
                </h2>
              </div>
              <div className="p-6">
                {signatureNotification && (
                  <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded text-sm font-semibold">
                    {signatureNotification}
                  </div>
                )}
                <ul className="divide-y divide-gray-200">
                  {approvals.map((a, idx) => (
                    <li key={a.name} className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-2">
                      {/* Reviewer Info - name/role on top, status/signature below */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-row flex-wrap items-center gap-2 min-w-0">
                          <span className="font-bold text-gray-900 text-sm truncate max-w-[120px]">{a.name}</span>
                          <span className="text-xs text-gray-500 truncate max-w-[80px]">{a.role}</span>
                        </div>
                        <div className="flex flex-row flex-wrap items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold w-fit truncate max-w-[70px] ${
                            a.status === 'approved' ? 'bg-green-100 text-green-800' :
                            a.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {a.status === 'approved' ? '승인' : a.status === 'rejected' ? '반려' : '대기'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold w-fit truncate max-w-[90px] ${
                            a.signed ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {a.signed ? '전자서명 완료' : '미서명'}
                          </span>
                        </div>
                      </div>
                      {/* Action Buttons - compact and wrap if needed */}
                      <div className="flex flex-row flex-wrap gap-2 md:justify-end md:items-center min-w-[120px]">
                        {a.status === 'pending' && (
                          <>
                            <button className="px-2 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition-colors" onClick={() => handleApprove(idx)}>승인</button>
                            <button className="px-2 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors" onClick={() => handleReject(idx)}>반려</button>
                          </>
                        )}
                        {!a.signed && a.status === 'approved' && (
                          <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors" onClick={() => handleSign(idx)}>전자서명</button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
  );
} 