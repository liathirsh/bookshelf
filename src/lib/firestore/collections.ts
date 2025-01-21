import { db } from "../firebase";
import { collection, doc } from "firebase/firestore";

export const usersCollection = collection(db, "users");

export const userDoc = (userId: string) => doc(db, `users/${userId}`);

export const userShelvesCollection = (userId: string) => 
    collection(db, `users/${userId}/shelves`);

export const userReviewsCollection = (userId: string) => 
    collection(db, `users/${userId}/reviews`);

export const booksCollection = collection(db, "books");

export const postsCollection = collection(db, "posts");

export const postCommentsCollection = (postId: string) =>
    collection(db, `posts/${postId}/comments`);

export const reviewsCollection = collection(db, "reviews");