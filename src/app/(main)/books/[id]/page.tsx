"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getBook } from '@/services/bookService';
import { Book } from '@/types/book';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const fantasyLogo = "/romantasylogo.png"

export default function BookPage() {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const params = useParams();
    const bookId = params.id as string;

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const bookData = await getBook(bookId)
                if(bookData) {
                    setBook(bookData)
                } else {
                    setError('Book not found')
                }
            } catch(error) {
                console.error(error)
                setError('Error fetching book')                    
            } finally {
                setLoading(false)
            }
        };
        fetchBook();
    }, [bookId])

    if(loading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                <Card>
                    <CardContent className="md:flex gap-6 p-6">
                        <div className="md:w-1/3">
                            <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                        </div>
                        <div className="md:w-2/3">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if(error || !book) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                <Card>
                    <CardContent className='p-6'>
                        <div className='text-center text-red-600'>
                            <h1 className="text-2xl font-bold mb-2">
                                {error || "Book not found"}
                            </h1>
                            <p> Sorry, we can&apos;t find the book you&apos;re looking for! </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <Card>
                <CardContent className="md:flex gap-6 p-6">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <Image
                            src={book.imageUrl || fantasyLogo}
                            width={300}
                            height={400}
                            alt={`Cover of ${book.title}`}
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <h2 className="text-xl text-gray-600 mb-4"> by {book.author}</h2>

                        <div className="prose max-w-none mb-6">
                            <p className="text-gray-700">{book.description}</p>
                        </div>
                      
                    {book.genre && book.genre.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {book.genre.map((genre) => (
                                <span 
                                    key={genre} 
                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    </div>
    )
}
