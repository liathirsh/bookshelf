import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview, listReviewsForBook, listUserReviews } from '@/services/reviewService';

export function useBookReviews(bookId: string) {
    return useQuery({
        queryKey: ['reviews', 'book', bookId],
        queryFn: () => listReviewsForBook(bookId),
        enabled: !!bookId,
    });
}

export function useUserReviews(userId: string) {
    return useQuery({
        queryKey: ['reviews', 'user', userId],
        queryFn: () => listUserReviews(userId),
        enabled: !!userId,
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createReview,
        onSuccess: (_, newReview) => {
            queryClient.invalidateQueries({ 
                queryKey: ['reviews', 'book', newReview.bookId] 
            });
            queryClient.invalidateQueries({ 
                queryKey: ['reviews', 'user', newReview.userId] 
            });
        },
    });
} 