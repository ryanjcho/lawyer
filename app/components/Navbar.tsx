'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon, UserIcon, UserAddIcon } from '@heroicons/react/solid'

const navLinks = [
  { href: '/services', label: '서비스', ariaLabel: '서비스 페이지로 이동' },
  { href: '/demo', label: '데모', ariaLabel: '제품 데모 페이지로 이동' },
  { href: '/industries', label: '산업별 솔루션', ariaLabel: '산업별 솔루션 페이지로 이동' },
  { href: '/pricing', label: '요금제', ariaLabel: '요금제 페이지로 이동' },
  { href: '/about', label: '회사소개', ariaLabel: '회사소개 페이지로 이동' },
  { href: '/security', label: '보안', ariaLabel: '보안 페이지로 이동' },
  { href: '/faq', label: 'FAQ', ariaLabel: '자주 묻는 질문 페이지로 이동' },
  { href: '/support', label: '고객지원', ariaLabel: '고객지원 페이지로 이동' },
  { href: '/contact', label: '문의하기', ariaLabel: '문의하기 페이지로 이동' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  return (
    <nav className="bg-white shadow-sm" role="navigation" aria-label="메인 네비게이션">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center" aria-label="홈으로 이동">
              <span className="text-2xl font-bold text-indigo-600">LawScan</span>
            </Link>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {navLinks.map(({ href, label, ariaLabel }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
                  aria-label={ariaLabel}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
              aria-label="로그인"
            >
              <UserIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              로그인
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="회원가입"
            >
              <UserAddIcon className="h-5 w-5 mr-1" aria-hidden="true" />
              회원가입
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">메뉴 열기</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map(({ href, label, ariaLabel }) => (
            <Link
              key={href}
              href={href}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus:text-indigo-600 focus:bg-gray-50"
              role="menuitem"
              aria-label={ariaLabel}
            >
              {label}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                href="/login"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus:text-indigo-600 focus:bg-gray-50"
                role="menuitem"
                aria-label="로그인"
              >
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  로그인
                </div>
              </Link>
              <Link
                href="/register"
                className="block pl-3 pr-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                role="menuitem"
                aria-label="회원가입"
              >
                <div className="flex items-center">
                  <UserAddIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                  회원가입
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 