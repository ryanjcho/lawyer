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
              <span className="text-2xl font-bold text-indigo-400">OhKContract</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              계약서 검토부터 분쟁 예방까지,<br/>
              실제 변호사가 직접 제공하는<br/>
              온라인 법률 서비스입니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-indigo-300">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/upload" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  계약서 업로드
                </Link>
              </li>
              <li>
                <Link href="/generate" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  계약서 초안 생성
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
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">법률 트렌드 구독</h3>
            <p className="text-gray-300 mb-4">
              최신 계약법 동향과 법률 리스크 예방 팁을 받아보세요.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                구독
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© {new Date().getFullYear()} OhKContract. All rights reserved.</span>
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
              <span>Made with ❤️ in Korea</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 