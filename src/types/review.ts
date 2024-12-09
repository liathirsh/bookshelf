export interface Review {
    userId: string;
    bookId: string;
    rating: number;
    reviewText: string;
    createdAt: number;
    updatedAt?: number;
}