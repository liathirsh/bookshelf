import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
    const sessionCookie = req.cookies.get('sessionToken')?.value ?? '';
    console.log('Session Cookie:', sessionCookie)

    if (!sessionCookie) {
        console.error('No session Cookie found')
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await auth.verifySessionCookie(sessionCookie, true);
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        console.log("Session cookie retrieved", decodedToken.uid)
        return NextResponse.next()
    } catch (error) {
        console.error('Session verification failed', error);
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/books/:path*','/dashboard/:path*'],
    runtime: 'nodejs'
};