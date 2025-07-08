import { useState } from 'react';

export default function BulkUserActions() {
  const [action, setAction] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAction = (type) => {
    setAction(type);
    setShowConfirm(true);
  };

  const confirmAction = async () => {
    setShowConfirm(false);
    setInProgress(true);
    setResult(null);
    // Mock async action
    await new Promise(res => setTimeout(res, 1200));
    setInProgress(false);
    setResult(`${action} 작업이 완료되었습니다.`);
    setAction(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-wrap gap-4 items-center relative">
      <div className="flex items-center gap-3">
        <input type="checkbox" className="scale-110 accent-blue-600" />
        <span className="text-gray-900 font-semibold">전체 선택</span>
        <span className="text-sm text-gray-500">(선택된 사용자: 0명)</span>
      </div>
      <button className="bg-blue-600 text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition" onClick={() => handleAction('역할 변경')}>역할 변경</button>
      <button className="bg-red-600 text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition" onClick={() => handleAction('비활성화')}>비활성화</button>
      <button className="bg-indigo-600 text-white py-2 px-5 rounded-lg font-semibold shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition" onClick={() => handleAction('메시지 보내기')}>메시지 보내기</button>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative border border-gray-200">
            <div className="font-bold text-xl mb-4">{action} 확인</div>
            <div className="mb-4 text-base">선택한 사용자에게 &lsquo;{action}&rsquo; 작업을 진행하시겠습니까?</div>
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold" onClick={() => setShowConfirm(false)}>취소</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold" onClick={confirmAction}>확인</button>
            </div>
          </div>
        </div>
      )}
      {inProgress && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-blue-50 text-blue-700 px-4 py-2 rounded shadow font-semibold">작업 진행 중...</div>
      )}
      {result && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-green-50 text-green-700 px-4 py-2 rounded shadow font-semibold">{result}</div>
      )}
    </div>
  );
} 