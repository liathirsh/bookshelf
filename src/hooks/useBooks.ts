import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBook, getAllBooks, updateBookRating } from '@/services/bookService';
import { Review } from '@/types/review';
import { listReviewsForBook, createReview } from '@/services/reviewService';
import { useAuth } from '@/hooks/useAuth';

export function useBook(bookId: string) {
    const { user } = useAuth();
    
    return useQuery({
        queryKey: ['book', bookId],
        queryFn: async () => {
            const book = await getBook(bookId);
            if (!book) return null;
        
            if (user && book.ratings) {
                book.userRating = book.ratings[user.uid] || 0;
            }
            
            return book;
        },
        enabled: !!bookId,
    });
}

export function useAllBooks() {
    return useQuery({
        queryKey: ['books'],
        queryFn: getAllBooks,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
}

export function useUpdateBookRating() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ bookId, userId, rating }: { 
            bookId: string, 
            userId: string, 
            rating: number 
        }) => updateBookRating(bookId, userId, rating),
        onSuccess: (_, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ['book', bookId] });
        },
    });
}

export function useShelfBooks(userId: string, status: string) {
    return useQuery({
        queryKey: ['shelves', userId, status],
        queryFn: async () => {
            const allBooks = await getAllBooks();
            return allBooks.filter(book => 
                book.userStatuses?.[userId] === status
            );
        },
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
        enabled: !!userId && !!status,
    });
}

export function useBookReviews(bookId: string) {
    return useQuery({
        queryKey: ['bookReviews', bookId],
        queryFn: () => listReviewsForBook(bookId),
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ 
            bookId, 
            userId,
            content, 
            rating,
            userName,
            userPhotoURL 
        }: { 
            bookId: string;
            userId: string;
            content: string; 
            rating: number;
            userName: string;
            userPhotoURL?: string;
        }) => {
            return createReview({
                bookId,
                userId,
                userName,
                userPhotoURL,
                content,
                rating,
                likes: 0,
                createdAt: new Date().toISOString()
            });
        },
        onSuccess: (_, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ['bookReviews', bookId] });
            queryClient.invalidateQueries({ queryKey: ['book', bookId] });
        },
    });
} 