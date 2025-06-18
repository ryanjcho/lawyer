'use client';

import Link from 'next/link';

export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              리소스 센터
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              계약 검토와 관련된 최신 정보와 가이드를 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              추천 아티클
            </h2>
            <p className="text-xl text-gray-600">
              계약 검토와 관련된 최신 트렌드와 인사이트
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gray-200"></div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">2024.03.15</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  AI 기반 계약 검토의 미래
                </h3>
                <p className="text-gray-600 mb-4">
                  AI 기술이 계약 검토 프로세스를 어떻게 혁신하고 있는지 알아봅니다.
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700">
                  자세히 보기 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gray-200"></div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">2024.03.10</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  계약 리스크 관리 가이드
                </h3>
                <p className="text-gray-600 mb-4">
                  효과적인 계약 리스크 관리 방법과 전략을 소개합니다.
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700">
                  자세히 보기 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-48 bg-gray-200"></div>
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">2024.03.05</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  디지털 전환과 계약 관리
                </h3>
                <p className="text-gray-600 mb-4">
                  디지털 전환 시대의 계약 관리 트렌드와 대응 방안을 살펴봅니다.
                </p>
                <Link href="#" className="text-blue-600 hover:text-blue-700">
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides & Templates Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              가이드 & 템플릿
            </h2>
            <p className="text-xl text-gray-600">
              계약 검토와 관리를 위한 실용적인 자료
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">계약 검토 체크리스트</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 계약 검토 기본 가이드</li>
                <li>• 리스크 평가 체크리스트</li>
                <li>• 법적 검토 포인트</li>
                <li>• 협상 전략 가이드</li>
              </ul>
              <Link href="#" className="inline-block mt-4 text-blue-600 hover:text-blue-700">
                다운로드 →
              </Link>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">계약 템플릿</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 기술 라이선스 계약</li>
                <li>• 서비스 제공 계약</li>
                <li>• NDA 템플릿</li>
                <li>• MOU 템플릿</li>
              </ul>
              <Link href="#" className="inline-block mt-4 text-blue-600 hover:text-blue-700">
                다운로드 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Webinars & Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              웨비나 & 이벤트
            </h2>
            <p className="text-xl text-gray-600">
              계약 검토와 관련된 온라인 세미나와 이벤트
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-sm text-blue-600 mb-2">2024.04.15 14:00</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI 기반 계약 검토 시스템 도입 가이드
              </h3>
              <p className="text-gray-600 mb-4">
                AI 기반 계약 검토 시스템 도입 시 고려사항과 성공 사례를 공유합니다.
              </p>
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                등록하기 →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-sm text-blue-600 mb-2">2024.04.20 15:00</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                계약 리스크 관리 워크숍
              </h3>
              <p className="text-gray-600 mb-4">
                실전 계약 리스크 관리 방법과 사례를 함께 살펴봅니다.
              </p>
              <Link href="#" className="text-blue-600 hover:text-blue-700">
                등록하기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Updates Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              법규 업데이트
            </h2>
            <p className="text-xl text-gray-600">
              계약과 관련된 최신 법규 및 규제 동향
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">개인정보보호법</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 2024년 개정사항</li>
                <li>• 계약서 작성 가이드</li>
                <li>• 개인정보 처리방침</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">전자상거래법</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• 최신 개정사항</li>
                <li>• 전자계약 가이드</li>
                <li>• 소비자보호 규정</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">국제 규제</h3>
              <ul className="space-y-4 text-gray-600">
                <li>• GDPR 대응 가이드</li>
                <li>• 국제 계약 규정</li>
                <li>• 크로스보더 거래</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            더 많은 리소스를 확인하세요
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            정기적으로 업데이트되는 계약 검토 관련 콘텐츠를 제공합니다
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            뉴스레터 구독하기
          </Link>
        </div>
      </section>
    </div>
  );
} 