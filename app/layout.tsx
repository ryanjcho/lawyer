import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'AI 계약서 검토 서비스',
  description: '인공지능 기반 계약서 검토 서비스로 법률 리스크를 사전에 예방하세요.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <ErrorBoundary>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
