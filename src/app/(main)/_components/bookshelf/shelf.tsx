"use client"

import { useEffect, useActionState, startTransition } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { AddBook } from '../books/addBook';
import { Book } from '@/types/book';
import BookCard from '../books/bookcard';
import { Button } from '@/components/ui/button';
import { fetchShelfBooks, ShelfState } from '@/app/actions/shelfActions';

interface ShelfProps {
    status: "currentlyReading" | "read" | "wantToRead"
    heading?: string;
}

const initialState: ShelfState = {
    books: []
};

const Shelf = ( { status, heading }: ShelfProps) => {
    const { user } = useAuth();
    const router = useRouter();

    const [state, formAction] = useActionState(
        () => fetchShelfBooks(user?.uid || '', status),
        initialState
    )

    useEffect(() => {        
        if(user) {
            startTransition(() => {
                formAction();
            });
        }
    }, [user, status, formAction]);

    const handleBookAdded = () => {
        startTransition(() => {
            formAction();
        });
    }

    const handleBookClick = (book: Book) => {
        if(!book.id) {
            console.error('Book has no ID');
            return;
        }
        router.push(`/books/${book.id}`)
    }

    if (state.error) {
        return (
            <div className="max-2-4xl mx-auto px-6 py-10">
                <p className="text-lg text-red-600">
                    {state.error}
                </p>
            </div>
        )
    }


    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-300">
                {heading || 'My Shelf'}
            </h1>

            {state.books.length === 0 ? (
                <p className="text-lg text-gray-600 text-center">
                    No books yet! Add some books to your shelf!
                </p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.books.map((book) => (
                        <li
                            key={book.id}
                            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >   <Button 
                                variant="ghost"
                                className="w-full h-full"
                                onClick={() => handleBookClick(book)}
                            >
                                <BookCard book={book} />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
            <AddBook status={status} onBookAdded={handleBookAdded} />
        </div>
    )
}

export default Shelf;