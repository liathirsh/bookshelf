export interface Review {
    id: string;
    bookId: string;
    userId: string;
    userName: string;
    userPhotoURL: string | null;
    rating: number;
    content: string;
    createdAt: string;
    likes: number;
}

export type CreateReviewData = Omit<Review, 'id' | 'createdAt' | 'likes'>;