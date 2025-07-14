import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import { ErrorBoundary } from './components/ErrorBoundary'
import './globals.css'
import Providers from './providers'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Lawyer Admin',
  description: 'Admin dashboard for contract management',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="">
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
