import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            console.error('No idToken provided');
            return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
        }

        try {
            await auth.verifyIdToken(idToken);
        } catch (error) {
            console.error('Token verification failed:', error);
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        try {
            const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
            const response = NextResponse.json({ status: 'success' });

            response.cookies.set('sessionToken', sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiresIn / 1000,
                path: '/',
            });

            return response;
        } catch (error) {
            console.error('Failed to create/set session cookie:', error);
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }
            return NextResponse.json({ 
                error: 'Failed to create session',
                message: error instanceof Error ? error.message : 'Unknown error'
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Unexpected error in set-session:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        return NextResponse.json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}