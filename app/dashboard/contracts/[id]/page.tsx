'use client';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock data (same as in ContractsTab)
const mockClient = {
  name: '이준호',
  email: 'junho.lee@email.com',
  phone: '010-1234-5678',
};
const mockLawyer = {
  name: '홍길동',
  email: 'hong.lawyer@lawkit.com',
  phone: '02-555-1234',
  firm: '로킷 법률사무소',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};
const mockPayment = {
  amount: 250000,
  status: '결제 완료',
  date: '2024-06-28',
  method: '신용카드',
  receiptUrl: '#',
};
const mockMessages = [
  { id: 1, sender: '홍길동', content: '계약서 초안 검토를 시작하겠습니다.', date: '2024-06-29 10:12' },
  { id: 2, sender: '이준호', content: '감사합니다. 일정 내에 부탁드립니다.', date: '2024-06-29 10:15' },
];
const mockTimeline = [
  { label: '견적 요청', date: '2024-06-25', done: true },
  { label: '견적 발송', date: '2024-06-26', done: true },
  { label: '결제 완료', date: '2024-06-28', done: true },
  { label: '계약서 업로드', date: '2024-06-29', done: true },
  { label: '검토 시작', date: '2024-06-30', done: false },
  { label: '검토 완료', date: '', done: false },
];
const mockTags = ['NDA', '긴급', 'IT', '영문'];
const mockPriority = '높음';
const mockDescription = '미국 파트너사와의 NDA 계약서 검토 요청. 주요 조항: 비밀유지, 관할법원, 손해배상.';
const mockContract = {
  id: '1024',
  name: 'NDA_2024.pdf',
  type: '검토',
  status: '견적 결제 완료',
  lastUpdated: '2024-06-29',
  lawyer: '홍길동',
  keyDates: '2024-07-01',
  fileUrl: '/files/NDA_2024.pdf',
  urgent: false,
};
const typeColors = {
  '검토': 'bg-purple-100 text-purple-800',
  '작성': 'bg-gray-200 text-gray-800',
};
const statusColors = {
  '견적 결제 완료': 'bg-blue-100 text-blue-800',
  '진행 중': 'bg-blue-100 text-blue-800',
  '검토 대기': 'bg-yellow-100 text-yellow-800',
  '업로드 완료': 'bg-indigo-100 text-indigo-800',
  '최종 완료': 'bg-green-100 text-green-800',
};

export default function ContractDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // In real app, fetch contract by params.id
  const contract = { ...mockContract, id: params.id };
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-indigo-600 text-sm font-semibold flex items-center gap-1 border px-3 py-1 rounded bg-white shadow-sm">
            ← 계약 목록으로
          </button>
          <h1 className="text-3xl font-extrabold text-black flex-1">계약 상세 정보</h1>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[contract.status]}`}>{contract.status}</span>
        </div>

        {/* Overview Section */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">계약 개요</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-sm text-gray-800 space-y-2">
              <div><b>계약 ID:</b> {contract.id}</div>
              <div><b>계약명:</b> {contract.name}</div>
              <div><b>구분:</b> <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeColors[contract.type]}`}>{contract.type}</span></div>
              <div><b>설명:</b> {mockDescription}</div>
              <div><b>견적 금액:</b> {mockPayment.amount.toLocaleString()}원</div>
              <div><b>결제 상태:</b> {mockPayment.status}</div>
              <div><b>결제일:</b> {mockPayment.date}</div>
              <div><b>요청자:</b> {mockClient.name} ({mockClient.email}, {mockClient.phone})</div>
              <div><b>최종 수정일:</b> {contract.lastUpdated}</div>
              <div><b>주요 일정:</b> {contract.keyDates}</div>
              <div><b>우선순위:</b> <span className="text-red-600 font-bold">{mockPriority}</span></div>
              <div><b>태그:</b> {mockTags.map(tag => <span key={tag} className="inline-block bg-gray-200 text-gray-700 rounded px-2 py-0.5 text-xs mr-1">{tag}</span>)}</div>
            </div>
            {/* Lawyer Info */}
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center border border-gray-200">
              <img src={mockLawyer.avatar} alt="Lawyer" className="w-16 h-16 rounded-full border mb-2" />
              <div className="font-bold text-black text-lg mb-1">{mockLawyer.name}</div>
              <div className="text-xs text-gray-600 mb-2">{mockLawyer.firm}</div>
              <div className="text-xs text-gray-700 mb-1"><b>Email:</b> {mockLawyer.email}</div>
              <div className="text-xs text-gray-700"><b>전화번호:</b> {mockLawyer.phone}</div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">진행 현황</h2>
          <div className="flex items-center gap-2 mb-2 overflow-x-auto">
            {mockTimeline.map((step, idx) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex flex-col items-center ${step.done ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${step.done ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>{step.done ? '✔️' : idx + 1}</div>
                  <div className="text-xs mt-1">{step.label}</div>
                  <div className="text-[10px] text-gray-400">{step.date}</div>
                </div>
                {idx < mockTimeline.length - 1 && <div className={`w-8 h-0.5 ${mockTimeline[idx+1].done ? 'bg-green-400' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>
        </section>

        {/* File Section */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">계약서 파일</h2>
          {contract.fileUrl ? (
            <div className="flex items-center gap-4">
              <a href={contract.fileUrl} download className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm">{contract.name}</a>
              <span className="text-xs text-gray-500">업로드: 2024-06-29</span>
              <span className="text-xs text-gray-500">크기: 1.2MB</span>
            </div>
          ) : (
            <div>
              <input type="file" className="block mb-2" disabled />
              <div className="text-xs text-gray-400">(UI만, 업로드 비활성화)</div>
            </div>
          )}
        </section>

        {/* Payment Section */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">결제 정보</h2>
          <div className="text-sm text-gray-800 space-y-1">
            <div><b>결제 금액:</b> {mockPayment.amount.toLocaleString()}원</div>
            <div><b>결제 수단:</b> {mockPayment.method}</div>
            <div><b>결제 상태:</b> {mockPayment.status}</div>
            <div><b>결제일:</b> {mockPayment.date}</div>
            <div><b>영수증:</b> <a href={mockPayment.receiptUrl} className="text-indigo-600 underline">다운로드</a></div>
          </div>
        </section>

        {/* Messages Section */}
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">최근 메시지/알림</h2>
          <ul className="text-xs text-gray-700 space-y-1 mb-2">
            {mockMessages.map(msg => (
              <li key={msg.id} className="border-b py-1"><b>{msg.sender}:</b> {msg.content} <span className="text-gray-400 ml-2">{msg.date}</span></li>
            ))}
          </ul>
          <div className="mt-2">
            <input type="text" className="border rounded px-2 py-1 text-xs w-3/4" placeholder="메시지 남기기 (UI만)" disabled />
            <button className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold" disabled>전송</button>
          </div>
        </section>
      </div>
    </div>
  );
} 