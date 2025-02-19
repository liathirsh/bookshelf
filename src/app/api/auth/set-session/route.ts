import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            console.error('No idToken provided');
            return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        try {
            const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
            
            const decodedClaims = await auth.verifySessionCookie(sessionCookie);
            console.log('Session created for user:', decodedClaims.uid);

            const response = NextResponse.json({ status: 'success' });
            response.cookies.set('sessionToken', sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiresIn / 1000,
                path: '/',
            });

            return response;
        } catch (error: any) { 
            console.error('Session creation error:', {
                code: error?.code,
                message: error?.message
            });
            return NextResponse.json({ 
                error: 'Session creation failed',
                details: error?.message || 'Unknown error'
            }, { status: 401 });
        }
    } catch (error) {
        console.error('Request processing error:', error);
        return NextResponse.json({ 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}