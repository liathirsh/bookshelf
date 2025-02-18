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
    userStatuses?: Record<string, string>;
    reviews?: Review[];
    reviewsCount?: number;
}

export interface UserBook {
    bookId: string;
    status: string;
    lastUpdated: string;
}

export interface Review {
    id: string;
    bookId: string;
    userId: string;
    userName: string;
    userPhotoURL?: string;
    rating: number;
    content: string;
    createdAt: string;
    likes: number;
}