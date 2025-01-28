import { NextResponse } from "next/server";
import { collection, getDocs, query, where, limit, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const queryText = searchParams.get("q")

    if(!queryText) { 
        return new Response(JSON.stringify({ error: "Search query is required"}))
    }

    const booksRef = collection(db, "books");

    const q = query(
        booksRef,
        where("title", ">=", queryText),
        where("title", "<=", queryText + "\uf8ff"),
        orderBy("title"),
        limit(20)
    )

    const snapshot = await getDocs(q);
    const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    return NextResponse.json(books, { status: 200 })

}