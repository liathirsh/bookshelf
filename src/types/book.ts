import { Timestamp } from 'firebase/firestore';

export interface Book {
    id: string;
    title: string;
    author: string;
    description?: string;
    thumbnail?: string;
    genre: string[];
    imageUrl?: string;
    olid?: string;
    volumeInfo?: {
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
    averageRating?: number;
    userRating?: number;
    ratingsCount?: number;
    updatedAt?: Timestamp;
    createdAt?: Timestamp;
    ratings?: Record<string, number>;
    coverId?: string;
}

export interface UserBook {
    bookId: string;
    status: string;
    lastUpdated: string;
}