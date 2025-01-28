import { doc, getDocs, query, setDoc } from "firebase/firestore";
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


export const getUserShelves = async(userId: string): Promise<UserShelfEntry[]> => {
        const q = query(userShelvesCollection(userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data() as UserShelfEntry);
  }