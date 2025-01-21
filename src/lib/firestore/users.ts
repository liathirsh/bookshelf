import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export async function initializeUserShelves(userId: string) {
    const shelvesCollection = collection(db, `users/${userId}/shelves`)

    try {
        await setDoc(doc(shelvesCollection, "currentlyReading"), { books: [] });
        await setDoc(doc(shelvesCollection, "wantToRead"), { books: [] });
        await setDoc(doc(shelvesCollection, "read"), { books: [] });

        console.log("Shelves initialized successfully");
    } catch (error) {
        console.error("Error creating shelves:", error)
        throw error;
    }
}