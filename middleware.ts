import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('sessionToken')?.value;
    
    if (req.nextUrl.pathname.startsWith('/api/auth') || 
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname === '/login' ||
        req.nextUrl.pathname === '/sign-up') {
        return NextResponse.next();
    }

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('X-User-ID', decodedToken.uid);

        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    } catch (error) {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('sessionToken');
        return response;
    }
}

export const config = {
    matcher: [
        '/books/:path*',
        '/dashboard/:path*',
        '/api/:path*',
        '/((?!api/auth|login|sign-up|_next/static|favicon.ico).*)',
    ],
    runtime: 'nodejs'
};