import { auth } from "@/lib/firebaseAdmin";
import { userShelvesCollection } from "@/lib/firestore/collections";
import { getDocs, query, where } from "firebase/firestore";
import { getBook } from "@/services/bookService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CurrentReadingClient from "./CurrentReadingClient";
import { UserBook } from "@/types/book";
import { Book } from "@/types/book";

interface FetchResult {
    success: boolean;
    errorMessage?: string;
    currentlyReading?: (UserBook & { bookDetails: Book | null })[];
}

export default async function CurrentReadingWrapper() {
    const sessionCookie = (await cookies()).get('sessionToken')?.value ?? '';

    if (!sessionCookie) {
        console.error('No session cookie found');
        return redirect('/login')
    }

    const result = await fetchCurrentlyReading(sessionCookie)

    if (!result.success) {
        console.log("Error fetching books being currently read:", result.errorMessage);
        return <p>{result.errorMessage || "Failed to load the books you're currently reading"}</p>
    }

    return <CurrentReadingClient currentlyReading={result.currentlyReading || []} />
}

async function fetchCurrentlyReading(sessionCookie: string): Promise<FetchResult>{
    const decodedToken = await auth
       .verifySessionCookie(sessionCookie, true)
       .catch(()=> null);

    if (!decodedToken) {
        return {success: false, errorMessage: "You've been logged out. Sign in again to see your bookshelf"}
    }

    const userId = decodedToken.uid;

    const shelvesRef = userShelvesCollection(userId);
    
    const q = query(shelvesRef, where("status", "==", "currentlyReading"));
        const querySnapshot = await getDocs(q).catch((error) => {
        console.error("Firestore query failed:", error.message);
        return null;
    });

    if (!querySnapshot) {
        return { success: false, errorMessage: "Failed to fetch data from Firestore"}
    }

    if (querySnapshot.empty) {
        return { success: true, currentlyReading: [] }
    }

    const currentlyReadingDetails = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
            const bookId = doc.id;
            const bookDetails = await getBook(bookId).catch(() => null);

            return {...doc.data(), bookId, bookDetails } as UserBook & { bookDetails: Book | null }
        })
    )

    return { 
        success: true,
        currentlyReading: currentlyReadingDetails,
    }
}