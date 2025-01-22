"use client";

import BookCard from '../books/bookcard';
import { UserBook } from '@/types/book';
import { Book } from '@/types/book';

interface CurrentReadingClientProps {
    currentlyReading: (UserBook & { bookDetails: Book | null})[];
}

export default function CurrentReadingClient({ currentlyReading = []}: CurrentReadingClientProps) {    
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 pb-2 border-gray-300"> Currently Reading</h1>
            {currentlyReading.length === 0 ? (
                <p className="text-lg text-gray-600 text-center"> Add some books to your shelf! </p>
            ): (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {currentlyReading.map((book) => (
                <li key={book.bookId}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                    {book.bookDetails ? (
                        <BookCard book={book.bookDetails} />
                    ) : (
                        <p className="text-red-500 text-sm font-medium text-center"> Hmm... can&apos;t find your books. Try again!</p>
                    )}
                </li>
               ))}
            </ul>
            )}
        </div>
    );
}