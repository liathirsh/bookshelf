import { getDocs, query, where } from "firebase/firestore";
import { userShelvesCollection } from "@/lib/firestore/collections";

export async function getUserWantToReadBooks(userId: string) {
    const q = query(userShelvesCollection(userId), where("status", "==", "want-to-read"))
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}
