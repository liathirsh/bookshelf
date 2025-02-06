import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { userShelvesCollection } from "../lib/firestore/collections";
import { UserShelfEntry } from "@/types/user";

export const addBookToUserShelf = async (
    userId: string, 
    bookId: string, 
    status: UserShelfEntry["status"]
) => {
    try {
        const shelfDoc = doc(userShelvesCollection(userId), bookId);
        const shelfEntry: UserShelfEntry = {
            bookId, 
            status,
            addedAt: Date.now(),
        };
        await setDoc(shelfDoc, shelfEntry);
    } catch (error) {
        console.error('Error adding book to shelf:', error);
        throw error;
    }
}; 

export const getUserShelves = async(
    userId: string,
    status?: "currentlyReading" | "wantToRead" | "read"
): Promise<UserShelfEntry[]> => {
    try {
        const baseQuery = userShelvesCollection(userId);
        const q = status
            ? query(baseQuery, where("status", '==', status))
            : query(baseQuery);

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            ...doc.data() as UserShelfEntry,
            id: doc.id
        }));
    } catch (error) {
        console.error('Error fetching user shelves:', error);
        throw error;
    }
}