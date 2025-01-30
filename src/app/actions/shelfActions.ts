'use server';

import { getUserShelves } from "@/services/userShelfService";
import { getBook } from "@/services/bookService";
import { Book } from "@/types/book";
import { UserShelfEntry } from "@/types/user";

export type ShelfState = {
    books: Book[];
    error?: string;
}

export async function fetchShelfBooks(
    userId: string,
    status: "currentlyReading" | "wantToRead" | "read",
): Promise<ShelfState> {
    try {
        const shelfEntries = await getUserShelves(userId, status);
        const booksPromises = shelfEntries.map(async (entry: UserShelfEntry) => {
            const bookData = await getBook(entry.bookId);
            return bookData;
        })

        const books = (await Promise.all(booksPromises)).filter((book): book is Book => book !== null);

        return { books };        
    } catch (error) {
        return {
            books: [],
            error: `Ahh! There is an error: ${error}`,
        }
    }
}