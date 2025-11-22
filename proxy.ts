import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define paths to protect or redirect from
const protectedRoutes = ['/dashboard', '/onboarding'];
const authRoutes = ['/login', '/signup'];

export function proxy(request: NextRequest) {
    // 2. Get the token from cookies
    const token = request.cookies.get('user_token')?.value;

    const { pathname } = request.nextUrl;

    // 3. Redirect LOGGED-IN users away from Login/Signup
    if (token && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 4. Redirect GUESTS away from Dashboard/Profile
    if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 5. Allow request to proceed if no rules matched
    return NextResponse.next();
}

// 6. Configure which paths the middleware runs on (optional but recommended for performance)
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/onboarding/',
        '/login',
        '/signup'
    ],
};