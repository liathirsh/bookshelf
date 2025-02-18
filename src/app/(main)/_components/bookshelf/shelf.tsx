"use client"

import { useShelfBooks } from '@/hooks/useShelves';
import { Book } from '@/types/book';
import { AddBook } from '../books/addBook';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { BookItem } from '../books/bookItem';

interface ShelfProps {
    status: "currentlyReading" | "wantToRead" | "read";
    heading: string;
    userId: string;
    variant?: 'default' | 'dashboard';
}

const Shelf = ({ status, heading, userId, variant = 'default' }: ShelfProps) => {
    const router = useRouter();
    const { data, isLoading, error } = useShelfBooks(userId, status);

    const handleBookClick = (book: Book) => {
        if(!book.id) {
            console.error('Book has no ID');
            return;
        }
        router.push(`/books/${book.id}`)
    }

    if (error) {
        return (
            <div className="max-2-4xl mx-auto px-6 py-10">
                <p className="text-lg text-red-600">
                    {error instanceof Error ? error.message : "An error occurred"}
                </p>
            </div>
        )
    }

    return (
        <div className={`flex flex-col h-full bg-white rounded-2xl p-6 ${
            variant === 'dashboard' ? 'shadow-sm' : ''
        }`}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 antialiased">{heading}</h2>
            
            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="h-full overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-20">
                            <Spinner />
                        </div>
                    ) : !data?.books || data.books.length === 0 ? (
                        <div className="text-center py-2">
                            <p className="text-gray-500">No books yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {data.books.map((book) => (
                                <BookItem
                                    key={book.id}
                                    book={book}
                                    currentStatus={status}
                                    userId={userId}
                                    onBookClick={handleBookClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <AddBook
                    status={status}
                    onBookAdded={() => {}}
                />
            </div>
        </div>
    );
}

export default Shelf;