"use client";
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export function Footer() {
  const { data: session } = useSession() || {};
  const isAdmin = session?.user?.role === 'ADMIN';
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-indigo-400">LawKit</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              프리미엄 계약서 작성 및 검토 서비스<br/>
              경력 변호사가 직접 제공하는 신뢰와 전문성
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-indigo-300">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contract" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  견적/의뢰 요청
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  산업별 솔루션
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  요금 안내
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  내 대시보드
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                    관리자 대시보드
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link href="/admin/auditlog" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                    감사 로그
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-indigo-300">회사</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  보안 및 개인정보
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  법률 자료실
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-indigo-300">지원</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <a href="mailto:support@ohkcontract.com" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  이메일 문의
                </a>
              </li>
              <li>
                <Link href="/review" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  서비스 후기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">법률 인사이트 뉴스레터</h3>
            <p className="text-gray-300 mb-4">
              최신 계약법 동향, 실무 팁, 리스크 예방 전략 등<br/>
              실질적인 법률 인사이트를 정기적으로 받아보실 수 있습니다.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="이메일 주소 입력"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                구독 신청
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">* 언제든 구독 해지하실 수 있습니다.</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© {new Date().getFullYear()} LawKit. All rights reserved.</span>
              <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                개인정보처리방침
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>대한변협 등록 법률사무소</span>
              <span>•</span>
              <span>Seoul, Korea</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 