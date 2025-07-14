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
              <span className="text-2xl font-bold text-indigo-400">로킷</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              데이터 기반, 신속, 전문 변호사 직접 검토<br/>
              온라인으로 쉽고 빠른 계약서 서비스
            </p>
            <div className="flex space-x-3 mt-2">
              <a href="https://www.linkedin.com/company/ohkims" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-indigo-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg></a>
              <a href="https://pf.kakao.com/_xgCzjxb" target="_blank" rel="noopener" aria-label="KakaoTalk" className="hover:text-yellow-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 5.797 2 10.111c0 2.697 1.963 5.06 5.01 6.47-.207.73-.746 2.626-.855 3.04-.133.51.187.507.396.37.162-.104 2.57-1.68 3.617-2.37.57.08 1.16.123 1.832.123 5.523 0 10-3.797 10-8.111C22 5.797 17.523 2 12 2z"/></svg></a>
              <a href="https://www.youtube.com/@ohkims" target="_blank" rel="noopener" aria-label="YouTube" className="hover:text-red-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a href="https://www.instagram.com/ohkims_law" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-pink-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/></svg></a>
              <a href="https://blog.naver.com/ohkims" target="_blank" rel="noopener" aria-label="Naver Blog" className="hover:text-green-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/></svg></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-indigo-300">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  솔루션/차별점
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
                <Link href="/blog" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                  블로그
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
          <div className="max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-300">법률 인사이트 뉴스레터</h3>
            <p className="text-gray-300 mb-4">
              최신 계약법 동향, 실무 팁, 리스크 예방 전략 등<br/>
              실질적인 법률 인사이트를 정기적으로 받아보실 수 있습니다.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="이메일 주소 입력"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              <span>© {new Date().getFullYear()} 로킷. All rights reserved.</span>
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