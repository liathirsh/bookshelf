import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

type SessionResult = 
    | string 
    | { success: false; error: string; details: string };

export async function POST(req: NextRequest) {
    const { idToken } = await req.json();
    if (!idToken) {
        return NextResponse.json({ 
            success: false, 
            error: 'ID token is required' 
        }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie: SessionResult = await auth.createSessionCookie(idToken, { expiresIn })
        .catch(error => ({
            success: false,
            error: 'Failed to create session',
            details: error instanceof Error ? error.message : 'Unknown error'
        }));

    if (typeof sessionCookie !== 'string') {
        return NextResponse.json(sessionCookie, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('sessionToken', sessionCookie, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: expiresIn / 1000,
        path: '/',
    });

    return response;
}