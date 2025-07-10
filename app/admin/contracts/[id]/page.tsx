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
  FaTwitter,
  FaPlus,
  FaReply,
  FaCheck,
  FaArchive,
  FaAt,
  FaInfoCircle
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
  lawyer: '오성헌',
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
    { date: '2024-06-30 10:15', action: '변호사 검토 시작', by: '오성헌', status: 'completed' },
    { date: '2024-06-29 16:45', action: '계약 업로드', by: 'Beta LLC', status: 'completed' },
    { date: '2024-06-28 09:30', action: '프로젝트 생성', by: 'Admin', status: 'completed' }
  ],
  comments: [
    { 
      id: 1,
      author: '오성헌', 
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
    { action: '클라이언트 피드백 수집', due: '2024-07-02', assigned: '김용범', priority: 'high' },
    { action: '관할 법원 조항 수정', due: '2024-07-03', assigned: '엄태섭', priority: 'medium' },
    { action: '최종 검토 및 승인', due: '2024-07-05', assigned: '조진석', priority: 'high' }
  ],
  initialServices: [
    '계약 검토',
    '계약서 작성'
  ],
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
    { name: '오성헌', role: '변호사', status: 'pending', signed: false },
    { name: 'Beta LLC', role: '클라이언트', status: 'pending', signed: false }
  ]);
  const [signatureNotification, setSignatureNotification] = useState('');

  // Calculate days until deadline (matching contracts table format)
  const getDaysUntilDeadline = () => {
    const today = new Date();
    const deadline = new Date(mockCase.keyDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineLabel = () => {
    const daysLeft = getDaysUntilDeadline();
    if (daysLeft < 0) {
      return { label: '마감 지남', color: 'text-red-600' };
    } else if (daysLeft === 0) {
      return { label: '오늘 마감', color: 'text-red-600' };
    } else if (daysLeft === 1) {
      return { label: 'D-1', color: 'text-orange-600' };
    } else if (daysLeft <= 3) {
      return { label: `D-${daysLeft}`, color: 'text-orange-600' };
    } else if (daysLeft <= 7) {
      return { label: `D-${daysLeft}`, color: 'text-green-600' };
    } else {
      return { label: '1주+ 남음', color: 'text-blue-600' };
    }
  };

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link href="/admin/contracts" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaEye className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{mockCase.name}</h1>
                    <div className="flex items-center space-x-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${typeMap[mockCase.type].color} flex items-center`}>
                        {typeMap[mockCase.type].icon} {typeMap[mockCase.type].label}
                      </span>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${priorityMap[mockCase.priority].color}`}>
                        {priorityMap[mockCase.priority].label} 우선순위
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FaFileAlt className="mr-2 text-gray-400" />
                      계약 ID: {mockCase.id}
                    </span>
                    <span className="flex items-center">
                      <FaBuilding className="mr-2 text-gray-400" />
                      {mockCase.contractType}
                    </span>
                    <span className="flex items-center">
                      <FaGlobe className="mr-2 text-gray-400" />
                      {mockCase.industry}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  <FaShare className="mr-2" />
                  공유
                </button>
                <button className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <FaBell className="mr-2" />
                  알림
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Status Indicator */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className={`p-4 rounded-full shadow-sm ${
                  mockCase.status === 'awaiting_ai' ? 'bg-yellow-100' :
                  mockCase.status === 'ai_complete' ? 'bg-blue-100' :
                  mockCase.status === 'lawyer_review' ? 'bg-indigo-100' :
                  mockCase.status === 'drafting' ? 'bg-purple-100' :
                  mockCase.status === 'needs_info' ? 'bg-red-100' :
                  'bg-green-100'
                }`}>
                  {mockCase.status === 'awaiting_ai' ? <FaClock className="h-8 w-8 text-yellow-600" /> :
                   mockCase.status === 'ai_complete' ? <FaCheckCircle className="h-8 w-8 text-blue-600" /> :
                   mockCase.status === 'lawyer_review' ? <FaUserCheck className="h-8 w-8 text-indigo-600" /> :
                   mockCase.status === 'drafting' ? <HiOutlinePencilAlt className="h-8 w-8 text-purple-600" /> :
                   mockCase.status === 'needs_info' ? <FaExclamationTriangle className="h-8 w-8 text-red-600" /> :
                   <FaCheckCircle className="h-8 w-8 text-green-600" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {statusMap[mockCase.status]?.label || '상태 없음'}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {mockCase.status === 'awaiting_ai' ? 'AI가 계약서를 분석하고 있습니다' :
                     mockCase.status === 'ai_complete' ? 'AI 분석이 완료되었습니다. 변호사 검토를 기다립니다' :
                     mockCase.status === 'lawyer_review' ? '변호사가 계약서를 검토하고 있습니다' :
                     mockCase.status === 'drafting' ? '계약서 수정 작업이 진행 중입니다' :
                     mockCase.status === 'needs_info' ? '추가 정보가 필요합니다' :
                     '계약서 검토가 완료되었습니다'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">마지막 업데이트</div>
                <div className="text-lg font-semibold text-gray-900">{mockCase.lastUpdated}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <HiOutlineCurrencyDollar className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-medium text-gray-500 mb-1">고객 납부액</p>
                    <p className="text-xl font-bold text-gray-900">₩350,000,000</p>
                    <p className="text-xs text-gray-500">총 ₩500,000,000 중</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FaCalendarAlt className="h-7 w-7 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">마감일 현황</p>
                    <p className={`text-2xl font-bold ${getDeadlineLabel().color}`}>
                      {getDeadlineLabel().label}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FaUser className="h-7 w-7 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">담당 변호사</p>
                    <p className="text-xl font-semibold text-gray-900">{mockCase.lawyer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contract Files Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FaFileAlt className="mr-3 text-indigo-600" />
                    계약 파일
                  </h2>
                  <div className="flex gap-3">
                    <button
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      <FaUpload className="mr-2" /> 파일 업로드
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
              <div className="p-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-xl">
                          <FaFileAlt className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-1">{file.name}</h4>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <span className="flex items-center">
                              <FaDownload className="mr-1" />
                              {file.size}
                            </span>
                            <span className="flex items-center">
                              <FaHistory className="mr-1" />
                              v{file.version}
                            </span>
                            <span className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              {file.uploaded}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                      <div className="flex items-center space-x-3">
                        <button className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" onClick={() => handleDownload(file)}>
                          <FaDownload className="h-5 w-5" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => handlePreview(file)}>
                          <FaEye className="h-5 w-5" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => handleCopy(file)}>
                          <FaCopy className="h-5 w-5" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(index)}>
                          <FaTrash className="h-5 w-5" />
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

            {/* Client Service Selection Card */}
            <div className="bg-white rounded-lg border border-gray-200 mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaCheckCircle className="mr-2 text-indigo-600" />
                  클라이언트 서비스 선택
                </h2>
              </div>
              <div className="p-6">
                {/* Contract Information */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaFileAlt className="mr-2 text-gray-500" />
                    계약 정보
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">계약 유형</span>
                          <span className="text-sm font-medium text-gray-900">{mockCase.contractType}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">산업 분야</span>
                          <span className="text-sm font-medium text-gray-900">{mockCase.industry}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">계약 가치</span>
                          <span className="text-sm font-semibold text-gray-900">{mockCase.value}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">서비스 유형</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeMap[mockCase.type]?.color || 'bg-gray-100 text-gray-800'}`}>
                            {typeMap[mockCase.type]?.label || '기타'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">우선순위</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityMap[mockCase.priority]?.color || 'bg-gray-100 text-gray-800'}`}>
                            {priorityMap[mockCase.priority]?.label || '보통'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">마감일</span>
                          <span className="text-sm font-medium text-gray-900">{mockCase.keyDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Services */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaCheckCircle className="mr-2 text-gray-500" />
                    선택된 서비스
                  </h4>
                  <div className="space-y-4">
                    {/* Basic Services */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">기본 서비스</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200 flex items-center">
                          <FaCheckCircle className="mr-2 text-green-600" />
                          계약 검토
                        </span>
                        <span className="px-3 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200 flex items-center">
                          <FaCheckCircle className="mr-2 text-green-600" />
                          AI 분석
                        </span>
                      </div>
                    </div>
                    
                    {/* Additional Services */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">추가 서비스</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 flex items-center">
                          <FaCheckCircle className="mr-2 text-blue-600" />
                          법률 자문
                        </span>
                        <span className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 flex items-center">
                          <FaCheckCircle className="mr-2 text-blue-600" />
                          협상 지원
                        </span>
                        <span className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-500 border border-gray-200 flex items-center">
                          <FaTimesCircle className="mr-2 text-gray-400" />
                          계약서 작성
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <HiOutlineCurrencyDollar className="mr-2 text-gray-500" />
                    결제 상태
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">기본 서비스</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">결제 완료</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">추가 서비스</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">결제 대기</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-700">총 예상 금액</span>
                      <span className="text-lg font-semibold text-gray-900">₩2,500,000</span>
                    </div>
                  </div>
                </div>

                {/* Additional Service Request */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaPlus className="mr-2 text-gray-500" />
                    추가 서비스 요청
                  </h4>
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); /* handle submit here */ }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">요청 서비스</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">서비스 선택</option>
                        <option value="draft">계약서 작성</option>
                        <option value="negotiation">협상 지원</option>
                        <option value="consult">법률 자문 추가</option>
                        <option value="review">계약 검토 추가</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">상세 요청 내용</label>
                      <textarea 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                        rows={3} 
                        placeholder="상세 요청 내용을 입력하세요." 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">예상 금액 (₩)</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                        placeholder="예: 500000" 
                      />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                      요청 제출
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>

          {/* Enhanced Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Enhanced Client Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaBuilding className="mr-3 text-blue-600" />
                  클라이언트 정보
                </h3>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBuilding className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{mockCase.clientInfo.name}</h4>
                    <p className="text-sm text-gray-500">{mockCase.clientInfo.industry} • {mockCase.clientInfo.size}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaUser className="mr-3 text-gray-400" />
                      <span className="text-gray-700 font-medium">{mockCase.clientInfo.contact}</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaEnvelope className="mr-3 text-gray-400" />
                      <a href={`mailto:${mockCase.clientInfo.email}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {mockCase.clientInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaPhone className="mr-3 text-gray-400" />
                      <a href={`tel:${mockCase.clientInfo.phone}`} className="text-gray-700 font-medium">
                        {mockCase.clientInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaMapMarkerAlt className="mr-3 text-gray-400" />
                      <span className="text-gray-700 font-medium">{mockCase.clientInfo.address}</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FaGlobe className="mr-3 text-gray-400" />
                      <a href={`https://${mockCase.clientInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        {mockCase.clientInfo.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
                      <FaEnvelope className="mr-2" />
                      이메일
                    </button>
                    <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                      <FaPhone className="mr-2" />
                      전화
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaHistory className="mr-3 text-purple-600" />
                  타임라인
                </h3>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {mockCase.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">{item.action}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {item.date}
                          </span>
                          <span className="flex items-center">
                            <FaUser className="mr-1" />
                            {item.by}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Comments Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <FaComments className="mr-3 text-green-600" />
                  메시지 & 댓글
                </h3>
              </div>
              <div className="p-8">
                {notification && (
                  <div className="mb-6 px-6 py-4 bg-green-100 text-green-800 rounded-lg text-sm font-semibold">
                    {notification}
                  </div>
                )}
                <div className="mb-6">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleAddComment();
                        if (e.key === '@') setShowMentions(true);
                      }}
                    />
                    <button 
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      onClick={handleAddComment}
                    >
                      {replyTo ? '답글 등록' : '등록'}
                    </button>
                  </div>
                  {/* Enhanced Mention dropdown */}
                  {showMentions && (
                    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 w-64">
                      {['Beta LLC', 'Admin', '오성헌', '김용범', '엄태섭', '조진석'].map(user => (
                        <div key={user} className="px-4 py-3 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0" onClick={() => handleMention(user)}>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <FaUser className="h-4 w-4 text-indigo-600" />
                            </div>
                            <span className="font-medium text-gray-900">@{user}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {replyTo && (
                    <div className="mt-3 px-4 py-2 bg-indigo-50 text-indigo-800 rounded-lg text-sm">
                      답글 대상: #{replyTo} 
                      <button className="ml-3 text-red-500 underline font-medium" onClick={() => setReplyTo(null)}>
                        취소
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  {comments.filter(c => !c.parentId).map((comment) => (
                    <div key={comment.id} className={`p-6 rounded-xl border-l-4 ${
                      comment.type === 'client' ? 'border-blue-400 bg-blue-50' :
                      comment.type === 'internal' ? 'border-green-400 bg-green-50' :
                      'border-gray-400 bg-gray-50'
                    } ${comment.resolved ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            comment.type === 'client' ? 'bg-blue-100' :
                            comment.type === 'internal' ? 'bg-green-100' :
                            'bg-gray-100'
                          }`}>
                            <FaUser className={`h-4 w-4 ${
                              comment.type === 'client' ? 'text-blue-600' :
                              comment.type === 'internal' ? 'text-green-600' :
                              'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500 ml-2">({comment.role})</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{comment.text}</p>
                      {/* Enhanced action buttons */}
                      <div className="flex gap-4 flex-wrap">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center" onClick={() => handleReply(comment.id)}>
                          <FaReply className="mr-1" />
                          답글
                        </button>
                        {!comment.resolved && (
                          <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center" onClick={() => handleResolveComment(comment.id)}>
                            <FaCheck className="mr-1" />
                            해결
                          </button>
                        )}
                        <button className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center" onClick={() => handleArchiveComment(comment.id)}>
                          <FaArchive className="mr-1" />
                          보관
                        </button>
                      </div>
                      {/* Enhanced Replies */}
                      <div className="ml-8 mt-4 space-y-3">
                        {comments.filter(r => r.parentId === comment.id).map(reply => (
                          <div key={reply.id} className="p-4 rounded-lg bg-white border-l-2 border-indigo-300 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-800 text-sm">{reply.author}</span>
                              <span className="text-xs text-gray-500">{reply.date}</span>
                            </div>
                            <div className="text-sm text-gray-700 mb-3 leading-relaxed">{reply.text}</div>
                            <div className="flex gap-3">
                              {!reply.resolved && (
                                <button className="text-xs text-green-600 hover:text-green-800 font-medium" onClick={() => handleResolveComment(reply.id)}>
                                  해결
                                </button>
                              )}
                              <button className="text-xs text-gray-500 hover:text-gray-700 font-medium" onClick={() => handleArchiveComment(reply.id)}>
                                보관
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Remove Approval & Signature Workflow Section */}
          </div>
        </div>
      </div>
      </main>
  );
} 