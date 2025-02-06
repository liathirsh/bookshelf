import { Timestamp } from 'firebase/firestore';

export interface Book {
    id: string;
    title: string;
    author: string;
    description?: string;
    thumbnail?: string;
    genre: string[];
    imageUrl?: string;
    averageRating?: number;
    userRating?: number;
    ratingsCount?: number;
    updatedAt?: Timestamp;
    createdAt?: Timestamp;
    ratings?: Record<string, number>;
}

export interface UserBook {
    bookId: string;
    status: string;
    lastUpdated: string;
}