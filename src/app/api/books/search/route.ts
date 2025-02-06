import { NextResponse } from "next/server";
import { getAllBooks } from '@/services/bookService';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const books = await getAllBooks();

        return NextResponse.json(books);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Failed to search books' }, { status: 500 });
    }
}