import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBook, getAllBooks, updateBookRating } from '@/services/bookService';

export function useBook(bookId: string) {
    return useQuery({
        queryKey: ['book', bookId],
        queryFn: () => getBook(bookId),
        enabled: !!bookId,
    });
}

export function useAllBooks() {
    return useQuery({
        queryKey: ['books'],
        queryFn: getAllBooks,
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