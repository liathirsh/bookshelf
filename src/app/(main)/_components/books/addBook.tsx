"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { SearchForBook } from './searchForBook';
import { UserShelfEntry } from '@/types/user';
import { Book } from '@/types/book';
import { useShelves } from '@/hooks/useShelves';

interface AddBookProps {
    status: "currentlyReading" | "wantToRead" | "read";
    onBookAdded?: (book: Book) => void;
}

export function AddBook({ status, onBookAdded }: AddBookProps) {
    const { user } = useAuth();
    const [showSearch, setShowSearch] = useState(false);
    const { mutate: addBookToShelf, isPending } = useShelves();

    function handleAddBook(book: Book) {
        if(!user) {
            alert("You must log in to add books");
            return;
        }

        addBookToShelf(
            {
                userId: user.uid,
                bookId: book.id,
                status: status as UserShelfEntry["status"]
            },
            {
                onSuccess: () => {
                    onBookAdded?.(book);
                    setShowSearch(false);
                },
                onError: (error) => {
                    console.error('Error adding book:', error);
                    alert("Error adding book to shelf. Please try again");
                }
            }
        );
    }

    return (
        <div className="relative">
            <Button
                onClick={() => setShowSearch(!showSearch)}
                disabled={isPending}
            >
                {isPending ? 'Adding...' : '+ Add Book'}
            </Button>

            {showSearch && (
                <div className="mt-4 space-y-2">
                    <SearchForBook onBookSelected={handleAddBook} />
                </div>
            )}
        </div>
    );
}
