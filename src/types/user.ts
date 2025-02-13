import { Timestamp } from "firebase/firestore";

export type UserProfile = {
    displayName: string;
    photoURL?: string;
    createdAt: Timestamp;
    bio?: string;
    favoriteGenres?: string[];
}

export interface UserShelfEntry {
    bookId: string;
    status: "currentlyReading" | "wantToRead" | "read";
    addedAt: number;
}
