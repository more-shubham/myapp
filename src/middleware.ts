import { NextRequest, NextResponse } from 'next/server'

/**
 * Get session data from request cookies
 */
function getSessionFromRequest(request: NextRequest): { userId: string; loginTime: number } | null {
  const sessionCookie = request.cookies.get('session')
  
  if (!sessionCookie) {
    return null
  }
  
  try {
    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

/**
 * Check if the current path is an auth route
 */
function isAuthRoute(pathname: string): boolean {
  const authRoutes = ['/login', '/register', '/forgot-password']
  return authRoutes.includes(pathname)
}

/**
 * Check if the current path is a protected route
 */
function isProtectedRoute(pathname: string): boolean {
  // All routes under (app) are protected - basically everything except auth routes
  const publicRoutes = ['/login', '/register', '/forgot-password']
  return !publicRoutes.includes(pathname)
}

/**
 * Validate return URL to prevent open redirect attacks
 */
function isValidReturnUrl(url: string): boolean {
  try {
    // Only allow relative URLs that start with / 
    // and don't contain protocol or domain
    return url.startsWith('/') && !url.startsWith('//') && !url.includes('://') && url.length < 2048
  } catch {
    return false
  }
}

/**
 * Middleware function to handle authentication
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = getSessionFromRequest(request)
  const isLoggedIn = !!session
  
  // If user is logged in and trying to access auth routes, redirect to home
  if (isLoggedIn && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // If user is not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn && isProtectedRoute(pathname)) {
    const loginUrl = new URL('/login', request.url)
    
    // Add return URL as search parameter if it's not the root path and is valid
    if (pathname !== '/' && isValidReturnUrl(pathname)) {
      loginUrl.searchParams.set('returnUrl', pathname)
    }
    
    return NextResponse.redirect(loginUrl)
  }
  
  // Check if session is expired (optional security measure)
  if (isLoggedIn && session) {
    const sessionAge = Date.now() - session.loginTime
    const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    
    if (sessionAge > maxAge) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)',
  ],
}
