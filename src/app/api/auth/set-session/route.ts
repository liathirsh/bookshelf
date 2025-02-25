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

        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            
            try {
                const userRecord = await auth.getUserByEmail(decodedToken.email || '');
                if (userRecord.uid !== decodedToken.uid) {
                    return NextResponse.json({ 
                        success: false,
                        error: 'Email already in use'
                    }, { status: 409 });
                }
            } catch (error) {
                alert(`Email already in use, ${error}`);
            }

            const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

            const response = NextResponse.json({ 
                success: true,
                uid: decodedToken.uid
            });
            
            response.cookies.set('sessionToken', sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: expiresIn / 1000,
                path: '/',
            });

            return response;
        } catch (error) {
            return NextResponse.json({ 
                success: false,
                error: console.error(error)
            }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ 
            success: false,
            error: console.error(error)
        }, { status: 500 });
    }
}