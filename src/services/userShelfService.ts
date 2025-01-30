import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { userShelvesCollection } from "../lib/firestore/collections";
import { UserShelfEntry } from "@/types/user";

export const addBookToUserShelf = async (
    userId: string, 
    bookId: string, 
    status: UserShelfEntry["status"]
    ) => {
        const shelfDoc = doc(userShelvesCollection(userId), bookId);
        const shelfEntry: UserShelfEntry = {
            bookId, 
            status,
            addedAt: Date.now(),
    };
        await setDoc(shelfDoc, shelfEntry)
}; 


export const getUserShelves = async(
    userId: string,
    status?: "currentlyReading" | "wantToRead" | "read"
): Promise<UserShelfEntry[]> => {
    let q;
    if(status) {
        q = query(
            userShelvesCollection(userId),
            where("status", '==', status)
        );
    } else {
        q = query(userShelvesCollection(userId))
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as UserShelfEntry)
}