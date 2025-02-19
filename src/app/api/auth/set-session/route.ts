import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

type SessionResult = 
    | string 
    | { success: false; error: string; details: string };

export async function POST(req: NextRequest) {
    const { idToken } = await req.json();
    if (!idToken) {
        console.error('Missing idToken');
        return NextResponse.json({ 
            success: false, 
            error: 'ID token is required' 
        }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
        console.log('Attempting to create session cookie...');
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log('Token verified for user:', decodedToken.uid);

        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        console.log('Session cookie created successfully');

        const response = NextResponse.json({ success: true });
        
        response.cookies.set('sessionToken', sessionCookie, {
            httpOnly: true,
            secure: true,  
            sameSite: 'lax',
            maxAge: expiresIn / 1000,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Session creation failed:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        return NextResponse.json({ 
            success: false,
            error: 'Failed to create session',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 401 });
    }
}