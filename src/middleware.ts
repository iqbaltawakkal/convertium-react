import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/'];

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    // Skip middleware for public routes
    if (PUBLIC_ROUTES.includes(pathname)) {
        console.log(pathname)
        const token = request.cookies.get('auth_token')?.value;
        if (token) return NextResponse.redirect(new URL('/dashboard', request.url));
        else if (pathname === '/') return NextResponse.redirect(new URL('/login', request.url));
        else return NextResponse.next();
    } else if (pathname === '/dashboard') {
        console.log(pathname)
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', ...PUBLIC_ROUTES], // Apply middleware to all routes under /dashboard
};