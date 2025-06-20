import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const ADMIN_PATHS = ['/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin and its subroutes
  if (ADMIN_PATHS.some((path) => pathname.startsWith(path))) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token || token.role !== 'ADMIN') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Simple rate limiting for API routes (without Redis for now)
  if (pathname.startsWith('/api/')) {
    // TODO: Implement proper rate limiting that's compatible with Edge Runtime
    // For now, we'll skip rate limiting in middleware and handle it in API routes
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
} 