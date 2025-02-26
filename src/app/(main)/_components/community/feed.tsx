"use client"

import { useEffect, useState } from "react";
import { getAllBooks } from "@/services/bookService";
import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import BookSkeleton from "../books/bookSkeleton";

const placeholderImage = "/images/heropic.png";

const Feed = () => {
    const [randomBooks, setRandomBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRandomBooks = async () => {
            try {
                const allBooks = await getAllBooks();
                const shuffled = allBooks.sort(() => 0.5 - Math.random());
                setRandomBooks(shuffled.slice(0, 5));
            } catch (error) {
                console.error("Error loading random books:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadRandomBooks();
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-4 px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Discover New Books
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground">Click on any book to read reviews and add your own!</p>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                    {[...Array(5)].map((_, index) => (
                        <BookSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
                Discover New Books
            </h2>
            <h3 className="text-lg font-semibold">Click on any book to read reviews and add your own!</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {randomBooks.map((book) => (
                    <Link href={`/books/${book.id}`} key={book.id} className="group">
                        <div className="flex flex-col space-y-2">
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                                <Image
                                    src={book.imageUrl || placeholderImage}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div className="bg-card p-2 rounded-md shadow-sm h-[4.5rem] flex flex-col justify-center">
                                <h3 className="font-medium leading-tight line-clamp-1 text-base">{book.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Feed;