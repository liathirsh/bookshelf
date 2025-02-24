import { Review, CreateReviewData } from '@/types/review';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBook, getAllBooks, updateBookRating } from '@/services/bookService';
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
        staleTime: 0,
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (review: CreateReviewData) => createReview(review),
        onMutate: async (newReview) => {
            await queryClient.cancelQueries({ 
                queryKey: ['bookReviews', newReview.bookId] 
            });

            const previousReviews = queryClient.getQueryData<Review[]>(
                ['bookReviews', newReview.bookId]
            );

            const optimisticReview: Review = {
                id: 'temp-id-' + new Date().getTime(),
                ...newReview,
                createdAt: new Date().toISOString(),
                likes: 0
            };

            queryClient.setQueryData<Review[]>(
                ['bookReviews', newReview.bookId],
                (old = []) => [optimisticReview, ...old]
            );

            return { previousReviews };
        },
        onError: (_, newReview, context) => {
            queryClient.setQueryData(
                ['bookReviews', newReview.bookId],
                context?.previousReviews
            );
        },
        onSettled: (_, __, newReview) => {
            queryClient.invalidateQueries({ 
                queryKey: ['bookReviews', newReview.bookId] 
            });
            queryClient.invalidateQueries({ 
                queryKey: ['book', newReview.bookId] 
            });
        },
    });
} 