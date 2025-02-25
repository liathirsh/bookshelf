import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

const PUBLIC_PATHS = [
    '/login',
    '/sign-up',
    '/api/auth/set-session',
    '/api/auth/logout',
    '/_next',
    '/favicon.ico',
    '/images',
];

const isPublicPath = (path: string) => {
    return PUBLIC_PATHS.some(publicPath => 
        path.startsWith(publicPath) || 
        path.includes('_next') ||
        path.includes('favicon.ico')
    );
};

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/books/:path*',
        '/api/(?!auth).*',
    ],
};

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    
    if (isPublicPath(path)) {
        return NextResponse.next();
    }

    const sessionCookie = req.cookies.get('sessionToken')?.value;

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await auth.verifySessionCookie(sessionCookie);
        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('sessionToken');
        return response;
    }
}