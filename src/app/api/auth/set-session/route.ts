import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin'

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        if (!idToken) {
            return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        try {
            const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
            const response = NextResponse.json({ status: 'success' });

            response.cookies.set('sessionToken', sessionCookie, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: expiresIn / 1000,
                path: '/',
            });

            return response;
        } catch (error: unknown) {
            return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
        }
    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}