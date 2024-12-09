import { Timestamp } from "firebase/firestore";

export type Post = {
    bookId: string;
    title: string;
    body: string;
    authorId: string;
    createdAt: Timestamp;
    UpdatedAt?: number;
    upvoteCount?: number;
    downvoteCount?: number;
};