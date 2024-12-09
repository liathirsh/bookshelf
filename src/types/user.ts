import { Timestamp } from "firebase/firestore";

export type UserProfile = {
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
    bio?: string;
    favoriteGenres?: string[];
}

export type UserShelfEntry = {
    bookId: string;
    status: "want-to-read" | "currently-reading" | "read";
    addedAt: number;
    lastReadAt?: number;
    readingProgress?: number;
}
