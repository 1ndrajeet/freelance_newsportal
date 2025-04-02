import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip the login page from the check
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    const isAuthenticated = request.cookies.get('isAdmin')?.value === 'true'

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 