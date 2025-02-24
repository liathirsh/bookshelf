import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createReview, listReviewsForBook, listUserReviews } from '@/services/reviewService';
import { Review, CreateReviewData } from '@/types/review';

export function useBookReviews(bookId: string) {
    return useQuery({
        queryKey: ['reviews', 'book', bookId],
        queryFn: () => listReviewsForBook(bookId),
        staleTime: 0,
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
        mutationFn: async (review: CreateReviewData) => createReview(review),
        onMutate: async (newReview) => {
            await queryClient.cancelQueries({ 
                queryKey: ['reviews', 'book', newReview.bookId] 
            });

            const previousReviews = queryClient.getQueryData<Review[]>(
                ['reviews', 'book', newReview.bookId]
            );
            
            const optimisticReview: Review = {
                id: 'temp-id-' + new Date().getTime(),
                bookId: newReview.bookId,
                userId: newReview.userId,
                userName: newReview.userName,
                userPhotoURL: newReview.userPhotoURL,
                rating: newReview.rating,
                content: newReview.content,
                createdAt: new Date().toISOString(),
                likes: 0
            };
            
            queryClient.setQueryData<Review[]>(
                ['reviews', 'book', newReview.bookId],
                (old = []) => [optimisticReview, ...old]
            );

            return { previousReviews };
        },
        onError: (err, newReview, context) => {
            queryClient.setQueryData(
                ['reviews', 'book', newReview.bookId],
                context?.previousReviews
            );
        },
        onSettled: (data, error, newReview) => {
            queryClient.invalidateQueries({ 
                queryKey: ['reviews', 'book', newReview.bookId] 
            });
            queryClient.invalidateQueries({ 
                queryKey: ['reviews', 'user', newReview.userId] 
            });
            queryClient.invalidateQueries({
                queryKey: ['book', newReview.bookId]
            });
        },
    });
} 