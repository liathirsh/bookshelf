import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();

        if (!idToken) {
            return NextResponse.json({ error: 'ID token is required'}, { status: 400 });
        }

        const expiresIn = 60 * 60 * 24 * 5* 1000;

        const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn });

        const response = NextResponse.json({ message: 'Session cookie set' })
        response.cookies.set('sessionToken', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expiresIn/1000,
            path: '/'
        })
        return response;
    } catch (error) {
        console.error('Error setting session cookie:', error);
        return NextResponse.json({ error: 'Failed to set session cookie'}, { status: 500});
    }
}