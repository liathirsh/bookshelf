
export interface Book {
    id: string;
    title: string;
    author: string;
    description?: string;
    thumbnail?: string;
    genre: string[];
    coverImage: string;
    averageRating?: number;
    ratingsCount?: number;
    createdAt: Date;
}

export interface UserBook {
    bookId: string;
    status: string;
    lastUpdated: string;
}