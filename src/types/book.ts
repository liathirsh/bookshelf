import { Timestamp } from "firebase/firestore";

export interface Book {
    id: string;
    title: string;
    author: string;
    description?: string;
    thumbnail?: string;
    genre: string[];
    coverImage: string;
    averateRating?: number;
    ratingsCount?: number;
    createdAt: Timestamp;
}