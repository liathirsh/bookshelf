import { Timestamp } from "firebase/firestore";

export type Comment = {
    postId: string;
    authorId: string;
    body: string;
    createdAt: Timestamp;
    updatedAt?: number;
}