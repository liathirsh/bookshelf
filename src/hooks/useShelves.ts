import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserShelves, addBookToUserShelf } from '@/services/userShelfService';
import { getBook } from '@/services/bookService';
import { Book } from '@/types/book';
import { UserShelfEntry } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';

const DEFAULT_COVER = "/images/heropic.png";

export function useShelfBooks(
    userId: string,
    status: "currentlyReading" | "wantToRead" | "read"
) {
    const { user } = useAuth();

    return useQuery({
        queryKey: ['shelves', userId, status],
        queryFn: async () => {
            if (!user) {
                throw new Error("Please sign in to view your shelves");
            }
            
            try {
                const shelfEntries = await getUserShelves(userId, status);
                const booksPromises = shelfEntries.map(entry => getBook(entry.bookId));
                const books = (await Promise.all(booksPromises))
                    .filter((book): book is Book => book !== null)
                    .map(book => ({
                        ...book,
                        imageUrl: book.imageUrl || DEFAULT_COVER
                    }));
                return { books };
            } catch (error) {
                const e = error as { code?: string; message?: string };
                throw new Error(
                    e?.code === 'permission-denied' || 
                    (e?.message && e.message.includes('permission-denied'))
                    ? "Unable to access book data. Please make sure you're signed in."
                    : "An error occurred while fetching your books. Please try again later."
                );
            }
        },
        enabled: !!userId && !!status && !!user,
        retry: false,
    });
}

export function useShelves() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, bookId, status }: { 
            userId: string; 
            bookId: string; 
            status: UserShelfEntry["status"]; 
        }) => addBookToUserShelf(userId, bookId, status),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ 
                queryKey: ['shelves', userId]
            });
        }
    });
} 