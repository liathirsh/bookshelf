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