'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  ChatBubbleLeftRightIcon, 
  UserGroupIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: 'client' | 'attorney' | 'admin';
  content: string;
  timestamp: string;
  contractId: string;
  clauseReference?: string;
  isPrivate: boolean;
  replies: Comment[];
}

interface CollaborationSession {
  id: string;
  contractId: string;
  participants: {
    userId: string;
    name: string;
    role: 'client' | 'attorney' | 'admin';
    isOnline: boolean;
    lastSeen: string;
  }[];
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  lastActivity: string;
}

interface ApprovalWorkflow {
  id: string;
  contractId: string;
  steps: {
    id: string;
    name: string;
    assignedTo: string;
    status: 'pending' | 'approved' | 'rejected' | 'in_review';
    comments: string;
    timestamp: string;
  }[];
  currentStep: number;
  overallStatus: 'in_progress' | 'completed' | 'blocked';
}

interface Props {
  contractId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborationPanel({ contractId, isOpen, onClose }: Props) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'comments' | 'participants' | 'workflow'>('comments');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedClause, setSelectedClause] = useState('');
  const [isPrivateComment, setIsPrivateComment] = useState(false);
  const [collaborationSession, setCollaborationSession] = useState<CollaborationSession | null>(null);
  const [approvalWorkflow, setApprovalWorkflow] = useState<ApprovalWorkflow | null>(null);
  const [showPrivateComments, setShowPrivateComments] = useState(false);

  const loadCollaborationData = useCallback(async () => {
    // Mock data for demonstration
    const mockComments: Comment[] = [
      {
        id: '1',
        userId: 'attorney1',
        userName: '김변호사',
        userRole: 'attorney',
        content: '제5조의 지급 조건이 모호합니다. 구체적인 기한을 명시하는 것이 좋겠습니다.',
        timestamp: '2024-01-15 14:30',
        contractId,
        clauseReference: '제5조',
        isPrivate: false,
        replies: []
      },
      {
        id: '2',
        userId: 'client1',
        userName: '홍길동',
        userRole: 'client',
        content: '네, 이해했습니다. 어떤 구체적인 기한을 제안하시나요?',
        timestamp: '2024-01-15 15:00',
        contractId,
        clauseReference: '제5조',
        isPrivate: false,
        replies: []
      },
      {
        id: '3',
        userId: 'attorney1',
        userName: '김변호사',
        userRole: 'attorney',
        content: '내부 검토 중입니다. 곧 상세한 제안을 드리겠습니다.',
        timestamp: '2024-01-15 15:30',
        contractId,
        clauseReference: '제5조',
        isPrivate: true,
        replies: []
      }
    ];

    const mockSession: CollaborationSession = {
      id: 'session1',
      contractId,
      participants: [
        {
          userId: 'client1',
          name: '홍길동',
          role: 'client',
          isOnline: true,
          lastSeen: '2024-01-15 15:30'
        },
        {
          userId: 'attorney1',
          name: '김변호사',
          role: 'attorney',
          isOnline: true,
          lastSeen: '2024-01-15 15:30'
        }
      ],
      status: 'active',
      createdAt: '2024-01-15 10:00',
      lastActivity: '2024-01-15 15:30'
    };

    const mockWorkflow: ApprovalWorkflow = {
      id: 'workflow1',
      contractId,
      steps: [
        {
          id: 'step1',
          name: '초기 검토',
          assignedTo: '김변호사',
          status: 'approved',
          comments: '기본 구조 검토 완료',
          timestamp: '2024-01-15 11:00'
        },
        {
          id: 'step2',
          name: '고객 검토',
          assignedTo: '홍길동',
          status: 'in_review',
          comments: '검토 중',
          timestamp: '2024-01-15 14:00'
        },
        {
          id: 'step3',
          name: '최종 승인',
          assignedTo: '김변호사',
          status: 'pending',
          comments: '',
          timestamp: ''
        }
      ],
      currentStep: 1,
      overallStatus: 'in_progress'
    };

    setComments(mockComments);
    setCollaborationSession(mockSession);
    setApprovalWorkflow(mockWorkflow);
  }, [contractId]);

  useEffect(() => {
    if (isOpen && contractId) {
      loadCollaborationData();
    }
  }, [isOpen, contractId, loadCollaborationData]);

  const addComment = () => {
    if (!newComment.trim() || !session?.user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: session.user.id,
      userName: session.user.name || '알 수 없음',
      userRole: session.user.role as 'client' | 'attorney' | 'admin' || 'client',
      content: newComment,
      timestamp: new Date().toISOString(),
      contractId,
      clauseReference: selectedClause || undefined,
      isPrivate: isPrivateComment,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
    setSelectedClause('');
    setIsPrivateComment(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'attorney': return 'text-blue-600 bg-blue-100';
      case 'client': return 'text-green-600 bg-green-100';
      case 'admin': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'in_review': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">협업 공간</h2>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              실시간
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="sr-only">닫기</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'comments', label: '댓글', icon: ChatBubbleLeftRightIcon },
            { id: 'participants', label: '참여자', icon: UserGroupIcon },
            { id: 'workflow', label: '승인 워크플로우', icon: CheckCircleIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'comments' && (
            <div className="h-full flex flex-col">
              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {comments
                    .filter(comment => !comment.isPrivate || showPrivateComments)
                    .map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-bold ${getRoleColor(comment.userRole)}`}>
                            {comment.userRole === 'attorney' ? '변호사' : comment.userRole === 'client' ? '고객' : '관리자'}
                          </div>
                          {comment.isPrivate && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <EyeSlashIcon className="w-4 h-4" />
                              비공개
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{comment.userName}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          
                          {comment.clauseReference && (
                            <div className="mb-2">
                              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                {comment.clauseReference} 참조
                              </span>
                            </div>
                          )}
                          
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Comment Input */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={() => setShowPrivateComments(!showPrivateComments)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    {showPrivateComments ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    비공개 댓글 {showPrivateComments ? '숨기기' : '보기'}
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="조항 참조 (선택사항)"
                      value={selectedClause}
                      onChange={(e) => setSelectedClause(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 text-sm"
                    />
                    <textarea
                      placeholder="댓글을 입력하세요..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={isPrivateComment}
                        onChange={(e) => setIsPrivateComment(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      비공개 댓글
                    </label>
                    <button
                      onClick={addComment}
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                      전송
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'participants' && collaborationSession && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">참여자 목록</h3>
                  <div className="space-y-3">
                    {collaborationSession.participants.map((participant) => (
                      <div key={participant.userId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{participant.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRoleColor(participant.role)}`}>
                              {participant.role === 'attorney' ? '변호사' : participant.role === 'client' ? '고객' : '관리자'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {participant.isOnline ? '온라인' : `마지막 접속: ${participant.lastSeen}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">세션 정보</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900">세션 상태</div>
                      <div className="text-sm text-blue-700">{collaborationSession.status}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-900">시작 시간</div>
                      <div className="text-sm text-green-700">{collaborationSession.createdAt}</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm font-medium text-purple-900">마지막 활동</div>
                      <div className="text-sm text-purple-700">{collaborationSession.lastActivity}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && approvalWorkflow && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">승인 워크플로우</h3>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  approvalWorkflow.overallStatus === 'completed' ? 'bg-green-100 text-green-700' :
                  approvalWorkflow.overallStatus === 'blocked' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {approvalWorkflow.overallStatus === 'completed' ? '완료' :
                   approvalWorkflow.overallStatus === 'blocked' ? '차단됨' : '진행 중'}
                </div>
              </div>

              <div className="space-y-4">
                {approvalWorkflow.steps.map((step, index) => (
                  <div key={step.id} className={`p-4 rounded-lg border-2 ${
                    index === approvalWorkflow.currentStep ? 'border-indigo-500 bg-indigo-50' :
                    index < approvalWorkflow.currentStep ? 'border-green-500 bg-green-50' :
                    'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === approvalWorkflow.currentStep ? 'bg-indigo-500 text-white' :
                          index < approvalWorkflow.currentStep ? 'bg-green-500 text-white' :
                          'bg-gray-300 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{step.name}</div>
                          <div className="text-sm text-gray-600">담당: {step.assignedTo}</div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(step.status)}`}>
                        {step.status === 'approved' ? '승인됨' :
                         step.status === 'rejected' ? '거부됨' :
                         step.status === 'in_review' ? '검토 중' : '대기 중'}
                      </div>
                    </div>
                    
                    {step.comments && (
                      <div className="text-sm text-gray-600 mt-2">
                        <strong>코멘트:</strong> {step.comments}
                      </div>
                    )}
                    
                    {step.timestamp && (
                      <div className="text-xs text-gray-500 mt-2">
                        {step.timestamp}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 