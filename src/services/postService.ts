import { getDocs, addDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { postsCollection } from "@/lib/firestore/collections";
import { Post } from '@/types/post';


export async function getPostsForBook(bookId: string) {
    const q = query(postsCollection, 
        where("bookId", "==", bookId),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
}

export async function createPost(post: Omit<Post, "createdAt">): Promise<void>{
    await addDoc(postsCollection, {
        ...post,
        createdAt: serverTimestamp()
    })
}