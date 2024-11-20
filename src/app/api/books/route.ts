import { NextResponse } from "next/server";

const GOOGLE_BOOKS_API_URL='https://www.googleapis.com/books/v1/volumes';

export async function GET(request:Request){
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || 'popular books';

    const res = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${query}`);
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch books' }, {status: 500 })
    
    const data = await res.json();
    console.log(NextResponse.json(data))
    return NextResponse.json(data);

}