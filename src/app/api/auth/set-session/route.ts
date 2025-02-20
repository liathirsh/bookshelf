import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            return NextResponse.json({ 
                success: false, 
                error: 'ID token is required' 
            }, { status: 400 });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        // First verify the token
        let decodedToken;
        try {
            decodedToken = await auth.verifyIdToken(idToken);
            if (Date.now() >= decodedToken.exp * 1000) {
                return NextResponse.json({ 
                    success: false,
                    error: 'Token has expired'
                }, { status: 401 });
            }
        } catch (verifyError) {
            console.error('Token verification failed:', verifyError);
            return NextResponse.json({ 
                success: false,
                error: 'Invalid token',
                details: verifyError instanceof Error ? verifyError.message : 'Token verification failed'
            }, { status: 401 });
        }

        let sessionCookie;
        try {
            sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        } catch (cookieError) {
            console.error('Session cookie creation failed:', cookieError);
            return NextResponse.json({ 
                success: false,
                error: 'Failed to create session cookie',
                details: cookieError instanceof Error ? cookieError.message : 'Cookie creation failed'
            }, { status: 401 });
        }

        const response = NextResponse.json({ 
            success: true,
            user: {
                uid: decodedToken.uid,
                email: decodedToken.email,
            }
        });
        
        response.cookies.set('sessionToken', sessionCookie, {
            httpOnly: true,
            secure: true,
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