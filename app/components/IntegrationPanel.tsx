'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  CalendarIcon, 
  EnvelopeIcon, 
  DocumentTextIcon,
  CloudArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  LinkIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'deadline' | 'meeting' | 'reminder';
  contractId: string;
  participants: string[];
  isSynced: boolean;
  calendarProvider: 'google' | 'outlook' | 'apple';
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  triggers: string[];
  isActive: boolean;
}

interface DocumentSync {
  id: string;
  fileName: string;
  fileType: string;
  syncStatus: 'synced' | 'pending' | 'failed';
  lastSync: string;
  provider: 'google_drive' | 'dropbox' | 'onedrive';
  contractId: string;
}

interface IntegrationSettings {
  calendar: {
    google: boolean;
    outlook: boolean;
    apple: boolean;
  };
  email: {
    gmail: boolean;
    outlook: boolean;
    custom: boolean;
  };
  storage: {
    google_drive: boolean;
    dropbox: boolean;
    onedrive: boolean;
  };
}

interface Props {
  contractId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function IntegrationPanel({ contractId, isOpen, onClose }: Props) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'calendar' | 'email' | 'documents' | 'settings'>('calendar');
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [documentSyncs, setDocumentSyncs] = useState<DocumentSync[]>([]);
  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    calendar: { google: false, outlook: false, apple: false },
    email: { gmail: false, outlook: false, custom: false },
    storage: { google_drive: false, dropbox: false, onedrive: false }
  });

  const loadIntegrationData = useCallback(async () => {
    // Mock calendar events
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: '계약서 검토 마감일',
        description: '계약서 #12345 검토 완료 필요',
        startDate: '2024-01-20T09:00:00',
        endDate: '2024-01-20T17:00:00',
        type: 'deadline',
        contractId,
        participants: ['김변호사', '홍길동'],
        isSynced: true,
        calendarProvider: 'google'
      },
      {
        id: '2',
        title: '계약서 협의 미팅',
        description: '제5조 지급 조건 협의',
        startDate: '2024-01-18T14:00:00',
        endDate: '2024-01-18T15:00:00',
        type: 'meeting',
        contractId,
        participants: ['김변호사', '홍길동'],
        isSynced: true,
        calendarProvider: 'outlook'
      },
      {
        id: '3',
        title: '계약서 갱신 알림',
        description: '계약서 #12345 갱신 기한 30일 전',
        startDate: '2024-02-15T09:00:00',
        endDate: '2024-02-15T09:30:00',
        type: 'reminder',
        contractId,
        participants: ['김변호사'],
        isSynced: false,
        calendarProvider: 'apple'
      }
    ];

    // Mock email templates
    const mockTemplates: EmailTemplate[] = [
      {
        id: '1',
        name: '분석 완료 알림',
        subject: '[LawScan] 계약서 분석이 완료되었습니다',
        body: '안녕하세요, {client_name}님\n\n{contract_title} 분석이 완료되었습니다.\n\n우리의 독자적인 데이터베이스 모델을 통해 {risk_count}개의 리스크 요소를 발견했습니다.\n\n자세한 내용은 대시보드에서 확인하실 수 있습니다.',
        triggers: ['analysis_complete'],
        isActive: true
      },
      {
        id: '2',
        name: '마감일 알림',
        subject: '[LawScan] 계약서 검토 마감일이 다가왔습니다',
        body: '안녕하세요, {client_name}님\n\n{contract_title} 검토 마감일이 {deadline_date}로 다가왔습니다.\n\n우리의 데이터베이스 분석 결과를 바탕으로 한 검토를 완료해주세요.',
        triggers: ['deadline_approaching'],
        isActive: true
      },
      {
        id: '3',
        name: '변호사 배정 알림',
        subject: '[LawScan] 담당 변호사가 배정되었습니다',
        body: '안녕하세요, {client_name}님\n\n{contract_title}에 {attorney_name} 변호사가 배정되었습니다.\n\n변호사와의 상담을 통해 계약서 검토를 진행하실 수 있습니다.',
        triggers: ['attorney_assigned'],
        isActive: true
      }
    ];

    // Mock document syncs
    const mockSyncs: DocumentSync[] = [
      {
        id: '1',
        fileName: '계약서_12345_v1.pdf',
        fileType: 'pdf',
        syncStatus: 'synced',
        lastSync: '2024-01-15 14:30',
        provider: 'google_drive',
        contractId
      },
      {
        id: '2',
        fileName: '분석보고서_12345.docx',
        fileType: 'docx',
        syncStatus: 'pending',
        lastSync: '2024-01-15 15:00',
        provider: 'dropbox',
        contractId
      },
      {
        id: '3',
        fileName: '위험평가_12345.xlsx',
        fileType: 'xlsx',
        syncStatus: 'failed',
        lastSync: '2024-01-15 13:45',
        provider: 'onedrive',
        contractId
      }
    ];

    setCalendarEvents(mockEvents);
    setEmailTemplates(mockTemplates);
    setDocumentSyncs(mockSyncs);
  }, [contractId]);

  useEffect(() => {
    if (isOpen && contractId) {
      loadIntegrationData();
    }
  }, [isOpen, contractId, loadIntegrationData]);

  const syncToCalendar = (eventId: string) => {
    setCalendarEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, isSynced: true } : event
      )
    );
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'meeting': return <UserGroupIcon className="w-5 h-5 text-blue-500" />;
      case 'reminder': return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default: return <CalendarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
      case 'google_drive':
        return <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>;
      case 'outlook':
      case 'onedrive':
        return <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>;
      case 'dropbox':
        return <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">D</div>;
      case 'apple':
        return <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs font-bold">A</div>;
      default:
        return <CloudArrowUpIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <LinkIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">통합 관리</h2>
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
            { id: 'calendar', label: '캘린더', icon: CalendarIcon },
            { id: 'email', label: '이메일', icon: EnvelopeIcon },
            { id: 'documents', label: '문서 동기화', icon: DocumentTextIcon },
            { id: 'settings', label: '설정', icon: CogIcon }
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
          {activeTab === 'calendar' && (
            <div className="h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">캘린더 이벤트</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  새 이벤트 추가
                </button>
              </div>

              <div className="space-y-4">
                {calendarEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getEventTypeIcon(event.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              event.isSynced ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {event.isSynced ? '동기화됨' : '동기화 대기'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>시작: {new Date(event.startDate).toLocaleString('ko-KR')}</span>
                            <span>종료: {new Date(event.endDate).toLocaleString('ko-KR')}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">참여자:</span>
                            {event.participants.map((participant, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {participant}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getProviderIcon(event.calendarProvider)}
                        {!event.isSynced && (
                          <button
                            onClick={() => syncToCalendar(event.id)}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200 transition-colors"
                          >
                            동기화
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">이메일 템플릿</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  새 템플릿 추가
                </button>
              </div>

              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          template.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {template.isActive ? '활성' : '비활성'}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <CogIcon className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <p className="text-sm text-gray-700 line-clamp-3">{template.body}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">트리거:</span>
                      {template.triggers.map((trigger, index) => (
                        <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">문서 동기화</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  새 동기화 설정
                </button>
              </div>

              <div className="space-y-4">
                {documentSyncs.map((sync) => (
                  <div key={sync.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getProviderIcon(sync.provider)}
                        <div>
                          <h4 className="font-semibold text-gray-900">{sync.fileName}</h4>
                          <p className="text-sm text-gray-600">마지막 동기화: {sync.lastSync}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSyncStatusColor(sync.syncStatus)}`}>
                          {sync.syncStatus === 'synced' ? '동기화됨' :
                           sync.syncStatus === 'pending' ? '대기 중' : '실패'}
                        </span>
                        {sync.syncStatus === 'failed' && (
                          <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors">
                            재시도
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="h-full overflow-y-auto p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">통합 설정</h3>

              <div className="space-y-6">
                {/* Calendar Settings */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">캘린더 연동</h4>
                  <div className="space-y-3">
                    {Object.entries(integrationSettings.calendar).map(([provider, isConnected]) => (
                      <div key={provider} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getProviderIcon(provider)}
                          <span className="font-medium text-gray-900">
                            {provider === 'google' ? '구글 캘린더' :
                             provider === 'outlook' ? '아웃룩 캘린더' :
                             provider === 'apple' ? '애플 캘린더' : provider}
                          </span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isConnected
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {isConnected ? '연결 해제' : '연결'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Settings */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">이메일 연동</h4>
                  <div className="space-y-3">
                    {Object.entries(integrationSettings.email).map(([provider, isConnected]) => (
                      <div key={provider} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getProviderIcon(provider)}
                          <span className="font-medium text-gray-900">
                            {provider === 'gmail' ? 'Gmail' :
                             provider === 'outlook' ? 'Outlook' :
                             provider === 'custom' ? '사용자 정의 SMTP' : provider}
                          </span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isConnected
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {isConnected ? '연결 해제' : '연결'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storage Settings */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">저장소 연동</h4>
                  <div className="space-y-3">
                    {Object.entries(integrationSettings.storage).map(([provider, isConnected]) => (
                      <div key={provider} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getProviderIcon(provider)}
                          <span className="font-medium text-gray-900">
                            {provider === 'google_drive' ? '구글 드라이브' :
                             provider === 'dropbox' ? 'Dropbox' :
                             provider === 'onedrive' ? '원드라이브' : provider}
                          </span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isConnected
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {isConnected ? '연결 해제' : '연결'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 