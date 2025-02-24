import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
    if (!req.body) {
        return NextResponse.json({ 
            available: false, 
            error: 'Email is required' 
        }, { status: 400 });
    }

    try {
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json({ 
                available: false, 
                error: 'Email is required' 
            }, { status: 400 });
        }

        try {
            await auth.getUserByEmail(email);
            return NextResponse.json({ available: false });
        } catch {
            return NextResponse.json({ available: true });
        }
    } catch {
        return NextResponse.json({ 
            available: false,
            error: 'Failed to check email'
        }, { status: 500 });
    }
} 