'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Bars3Icon, XMarkIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import Notifications from './Notifications'

const navLinks = [
  { href: '/services', label: '서비스', ariaLabel: '서비스 페이지로 이동' },
  { href: '/industries', label: '산업별 솔루션', ariaLabel: '산업별 솔루션 페이지로 이동' },
  { href: '/pricing', label: '요금제', ariaLabel: '요금제 페이지로 이동' },
  { href: '/about', label: '회사소개', ariaLabel: '회사소개 페이지로 이동' },
  { href: '/resources', label: '리소스', ariaLabel: '법무 리소스 페이지로 이동' },
  { href: '/security', label: '보안', ariaLabel: '보안 페이지로 이동' },
  { href: '/faq', label: 'FAQ & 지원', ariaLabel: '자주 묻는 질문 및 고객지원 페이지로 이동' },
  { href: '/contact', label: '문의하기', ariaLabel: '문의하기 페이지로 이동' },
]

export default function Navbar() {
  const { data: session, status } = useSession()
  console.log('Navbar useSession status:', status, 'session:', session)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <nav className="bg-white shadow-sm" role="navigation" aria-label="메인 네비게이션">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-2xl font-bold text-indigo-600">LawScan</span>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </nav>
    )
  }

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
            {session && session.user ? (
              <>
                {/* Notifications */}
                <Notifications />
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {session.user.name && session.user.name.length > 0 ? session.user.name.charAt(0) : 'U'}
                      </span>
                    </div>
                    <span className="ml-2 text-gray-700">{session.user.name || 'User'}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          대시보드
                        </Link>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          프로필
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          로그아웃
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
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
                  <UserPlusIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  회원가입
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            {session && (
              <div className="mr-2">
                <Notifications />
              </div>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">메뉴 열기</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
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
            {session && session.user ? (
              <div className="space-y-1">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                  <p className="text-sm text-gray-500">{session.user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus:text-indigo-600 focus:bg-gray-50"
                  role="menuitem"
                >
                  대시보드
                </Link>
                <Link
                  href="/profile"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus:text-indigo-600 focus:bg-gray-50"
                  role="menuitem"
                >
                  프로필
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 focus:outline-none focus:text-indigo-600 focus:bg-gray-50"
                  role="menuitem"
                >
                  로그아웃
                </button>
              </div>
            ) : (
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
                    <UserPlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    회원가입
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  )
} 