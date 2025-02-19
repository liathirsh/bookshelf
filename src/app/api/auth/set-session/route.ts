import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
    try {
        console.log('Starting set-session request');

        const body = await req.json();
        console.log('Request body:', { ...body, idToken: body.idToken ? '[REDACTED]' : undefined });

        const { idToken } = body;
        if (!idToken) {
            console.error('No idToken provided in request');
            return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
        }

        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            console.log('ID token verified successfully for user:', decodedToken.uid);
        } catch (verifyError) {
            console.error('ID token verification failed:', verifyError);
            return NextResponse.json({ 
                error: 'Invalid ID token',
                details: verifyError instanceof Error ? verifyError.message : 'Unknown error'
            }, { status: 401 });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        try {
            const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
            const response = NextResponse.json({ status: 'success' });

            console.log('Setting cookie with options:', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiresIn / 1000,
                path: '/',
            });

            response.cookies.set('sessionToken', sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiresIn / 1000,
                path: '/',
            });

            return response;
        } catch (cookieError) {
            // Log the full error for debugging
            console.error('Failed to create session cookie. Full error:', cookieError);
            return NextResponse.json({ 
                error: 'Failed to create session',
                details: cookieError instanceof Error ? cookieError.message : 'Unknown error'
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Unexpected error in set-session. Full error:', error);
        return NextResponse.json({ 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}