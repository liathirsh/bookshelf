import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            console.error('Missing idToken');
            return NextResponse.json({ 
                success: false, 
                error: 'ID token is required' 
            }, { status: 400 });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        console.log('Verifying token...');
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log('Token verified for user:', decodedToken.uid);

        console.log('Creating session cookie...');
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({ success: true });
        response.cookies.set('sessionToken', sessionCookie, {
            httpOnly: true,
            secure: true, // Always use secure in production
            sameSite: 'lax',
            maxAge: expiresIn / 1000,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Set-session error:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });

        return NextResponse.json({ 
            success: false,
            error: 'Failed to create session',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 401 });
    }
}