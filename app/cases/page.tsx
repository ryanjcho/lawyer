'use client'

import { Navbar } from '../components/Navbar'

interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  result: string;
}

const cases: Case[] = [
  {
    id: '1',
    title: '임대차 계약 검토',
    description: '상업용 부동산 임대차 계약 검토 및 위험 요소 분석',
    category: '부동산',
    result: '계약 조건 개선 및 위험 요소 제거',
  },
  {
    id: '2',
    title: '고용 계약 검토',
    description: 'IT 기업 고용 계약 검토 및 법적 보호 강화',
    category: '고용',
    result: '근로자 보호 조항 추가 및 불공정 조항 수정',
  },
  {
    id: '3',
    title: '서비스 계약 검토',
    description: '소프트웨어 개발 서비스 계약 검토',
    category: '서비스',
    result: '지적재산권 보호 조항 강화 및 납기일 조정',
  },
];

export default function Cases() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 계약 검토 사례
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            AI 계약 검토 서비스를 통해 개선된 실제 사례들을 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {caseItem.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {caseItem.title}
                </h3>
                <p className="text-gray-600 mb-4">{caseItem.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm font-medium text-gray-900">
                    개선 결과
                  </div>
                  <p className="text-gray-600 mt-1">{caseItem.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI 계약 검토 서비스로 시작하세요
          </h2>
          <p className="text-gray-600 mb-8">
            지금 바로 AI 계약 검토 서비스를 이용하여 계약의 위험 요소를
            제거하세요.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            요금제 보기
          </a>
        </div>
      </main>
    </div>
  );
} 