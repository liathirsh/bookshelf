"use client"

import { useShelfBooks } from '@/hooks/useShelves';
import { Book } from '@/types/book';
import { AddBook } from '../books/addBook';
import BookCard from '../books/bookcard';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';

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
        <div className={clsx(
            'space-y-4 h-full flex flex-col',
            variant === 'dashboard' ? 'p-0' : ''
        )}>
            <h2 className="text-xl font-semibold text-gray-800">{heading}</h2>
            <div className={clsx(
                "grid gap-6 flex-grow",
                variant === 'dashboard'
                    ? "grid-cols-1"
                    : "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            )}>
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <Spinner />
                    </div>
                ) : !data?.books || data.books.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">
                            No books yet! Add some books to your shelf!
                        </p>
                    </div>
                ) : (
                    data.books.map((book) => (
                        <div key={book.id} className={clsx(
                            "group",
                            variant === 'dashboard'
                                ? "flex items-center space-x-4"
                                : ""
                        )}>
                            <Button
                                variant="ghost"
                                className="w-full h-full p-0 hover:scale-105 transition-transform duration-200"
                                onClick={() => handleBookClick(book)}
                            >
                                <BookCard
                                    book={book}
                                    variant={variant}
                                    className={variant === 'dashboard' ? "w-16" : "w-full"}
                                />
                            </Button>
                        </div>
                    ))
                )}
            </div>
            <div className={clsx(
                "mt-auto pt-4",
                variant === 'dashboard'
                    ? "flex items-center"
                    : "flex justify-center items-center"
            )}>
                <AddBook
                    status={status}
                    onBookAdded={() => {}}
                />
            </div>
        </div>
    )
}

export default Shelf;