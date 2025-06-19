import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const ADMIN_PATHS = ['/admin']

// TODO: Replace with Redis or persistent store in production
const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 1000;
const ipStore = new Map<string, { count: number; start: number }>();

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

  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const entry = ipStore.get(ip) || { count: 0, start: now };
    if (now - entry.start > WINDOW_MS) {
      entry.count = 1;
      entry.start = now;
    } else {
      entry.count++;
    }
    ipStore.set(ip, entry);
    if (entry.count > RATE_LIMIT) {
      return new NextResponse('Too many requests', { status: 429 });
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
} 