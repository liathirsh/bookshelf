"use client"

import { useEffect, useState } from "react";
import { getAllBooks } from "@/services/bookService";
import { Book } from "@/types/book";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";

const placeholderImage = "/HeroPic.png";

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
        return <Spinner />;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
                Discover New Books
            </h2>
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