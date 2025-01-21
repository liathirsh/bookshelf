"use client";

import BookCard from '../books/bookcard';
import { UserBook } from '@/types/book';
import { Book } from '@/types/book';

interface CurrentReadingClientProps {
    currentlyReading: (UserBook & { bookDetails: Book | null})[];
}

export default function CurrentReadingClient({ currentlyReading = []}: CurrentReadingClientProps) {    
    if (currentlyReading.length === 0) {
        return <p> Add some books to your shelf! </p>
    }

    return (
        <div>
            <h1> Currently Reading</h1>
            <ul>
                {currentlyReading.map((book) => (
                    <li key={book.bookId}>
                        {book.bookDetails ? <BookCard book={book.bookDetails} /> : <p> Hmm..can&apos;t find your books. Try again later!</p>}
                    </li>
                ))}
            </ul>
        </div>
    )
}