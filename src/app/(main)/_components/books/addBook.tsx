"use client";

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { addBookToUserShelf } from '@/services/userShelfService';
import { UserShelfEntry } from '@/types/user';
import { Book } from '@/types/book';
import debounce from "lodash/debounce" ;

interface AddBookProps {
    status: "wantToRead" | "currentlyReading" | "read";
}

const placeholderImage = "/romantasylogo.png"

export function AddBook( { status }: AddBookProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchBooks = useCallback(async (queryText: string) => {
        const searchCache = new Map<string, Book[]>();
        
        if(queryText.trim().length < 2) {
            setBooks([]);
            return;
        }

        if (searchCache.has(queryText)) {
            setBooks(searchCache.get(queryText)!)
            return;
        }

        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(`/api/books/search?q=${queryText}`);
            if (!response.ok) throw new Error("Failed to fetch books");

            const data: Book[] = await response.json();
            setBooks(data);
            
            searchCache.set(queryText, data);

        } catch(error) {
            console.error(error)
            setError("Error searching for books. Please try again")
        } finally {
            setIsLoading(false);
        }
    }, [])

    const debouncedSearch = useMemo(()=> debounce(fetchBooks, 300), [fetchBooks])

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        debouncedSearch(e.target.value);
    }

    async function handleAddBook(book: Book) {
        if(!user) {
            setError("You must log in to add books")
            return;
        }

        setIsLoading(true);
        setError(null);

        try { 
            await addBookToUserShelf(user.uid, book.id, status as UserShelfEntry["status"]);
            setShowSearch(false);
            setSearchQuery("")
            setBooks([]);
        } catch (error) {
            console.error(error)
            setError("Error adding book to shelf. Please try again")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative">
            <Button onClick={() => setShowSearch(!showSearch)}>+ Add Book</Button>

            {showSearch && (
                <div className="mt-4 space-y-2">
                    <Input
                        type="text"
                        placeholder="Search for a book"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md"
                    />
                    {isLoading ? (
                        <div className="flex justify-center items-center py-4">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {error && <p className="text-red-500">{error}</p> }
                            {books.length > 0 && (
                                <ul className="bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-auto">
                                    {books.map((book) => (
                                        <li
                                            key={book.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                            onClick={() => handleAddBook(book)}
                                        >
                                            <Image
                                                src={book.imageUrl || placeholderImage}
                                                alt={book.title}
                                                className="w-10 h-14 object-cover rounded"
                                                width={100}
                                                height={100}
                                            />
                                            <div>
                                                <p className="font-semibold">{book.title}</p>
                                                <p className="text-sm text-gray-500">{book.author}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
