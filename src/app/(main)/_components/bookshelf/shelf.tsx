"use client"

import { useShelfBooks } from '@/hooks/useShelves';
import { Book } from '@/types/book';
import { AddBook } from '../books/addBook';
import BookCard from '../books/bookcard';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import Image from 'next/image';

interface ShelfProps {
    status: "currentlyReading" | "wantToRead" | "read";
    heading: string;
    userId: string;
    variant?: 'default' | 'dashboard';
}

const DEFAULT_COVER = "/HeroPic.png";

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
        <div className="flex flex-col h-full bg-white rounded-2xl p-6">
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
                                <Button
                                    key={book.id}
                                    variant="ghost"
                                    className="w-full p-0 h-auto hover:bg-transparent"
                                    onClick={() => handleBookClick(book)}
                                >
                                    <div className="flex items-start gap-4 w-full">
                                        <div className="w-12 h-16 relative flex-shrink-0">
                                            <Image
                                                src={book.imageUrl || DEFAULT_COVER}
                                                alt={book.title}
                                                fill
                                                className="object-cover rounded-sm"
                                                unoptimized={book.imageUrl?.includes('openlibrary.org')}
                                            />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className="text-emerald-700 hover:text-emerald-600 font-medium antialiased drop-shadow-sm">
                                                {book.title}
                                            </h3>
                                            <p className="text-gray-700 text-sm antialiased drop-shadow-sm">
                                                by <span className="text-gray-600">{book.author}</span>
                                            </p>
                                        </div>
                                    </div>
                                </Button>
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