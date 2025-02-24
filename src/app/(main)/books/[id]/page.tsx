"use client"

import { useCallback, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { DisplayStars } from '@/app/(main)/_components/books/displayStars';
import StarRating from '@/app/(main)/_components/books/starRating';
import debounce from 'lodash/debounce';
import { useBook, useUpdateBookRating } from '@/hooks/useBooks';
import { ShelfButton } from '@/app/(main)/_components/books/shelfButton';
import { Separator } from '@/components/ui/separator';
import { ReviewModal } from '@/app/(main)/_components/books/ReviewModal';
import { ReviewCard } from '../../_components/books/ReviewCard';
import { InfiniteBackground } from '../../_components/background';
import { useBookReviews } from '@/hooks/useReviews';

const fantasyLogo = "/images/romantasylogo.png"

export default function BookPage() {
    const { user } = useAuth();
    const params = useParams();
    const bookId = params.id as string;

    const { data: book, isLoading: isBookLoading, error: bookError } = useBook(bookId);
    const { data: reviews } = useBookReviews(bookId);
    const { mutate: updateRating } = useUpdateBookRating();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const debouncedRatingUpdate = useCallback((rating: number) => {
        if (!user || !bookId) return;
        updateRating({ bookId, userId: user.uid, rating });
    }, [bookId, user, updateRating]);

    const handleRatingChange = debounce(debouncedRatingUpdate, 500);

    if(isBookLoading) {
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

    if(bookError || !book) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10">
                <Card>
                    <CardContent className='p-6'>
                        <div className='text-center text-red-600'>
                            <h1 className="text-2xl font-bold mb-2">
                                {bookError instanceof Error ? bookError.message : "Book not found"}
                            </h1>
                            <p> Sorry, we can&apos;t find the book you&apos;re looking for! </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <>
            <InfiniteBackground />
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
                            {user && (
                                <ShelfButton 
                                    bookId={bookId} 
                                    userId={user.uid}
                                    variant="default"
                                />
                            )}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Rating:</h3>
                                <div className="flex items-center gap-4">
                                    <DisplayStars rating={book.averageRating ?? 0} showNumber />
                                    <span className="text-sm text-gray-500">
                                        {!book.ratingsCount ? 
                                            "No ratings yet" : 
                                            `(${book.ratingsCount} ${book.ratingsCount === 1 ? 'rating' : 'ratings'})`
                                        }
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Your Rating:</h3>
                                    <StarRating
                                        averageRating={book.averageRating ?? 0}
                                        userRating={book.userRating ?? 0}
                                        onRatingChange={user ? handleRatingChange : () => {}}
                                    />
                                    {!user && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Sign in to rate this book
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-10">
                    <div className="bg-white/90 p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-4xl font-serif mb-8 [text-shadow:_0_1px_2px_rgb(255_255_255_/_80%)]">
                            Ratings & Reviews
                        </h2>
                        
                        {user && (
                            <div className="mb-8">
                                <Button 
                                    variant="ghost" 
                                    className="rounded-full px-6 py-2 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all shadow-md hover:shadow-lg"
                                    onClick={() => setIsReviewModalOpen(true)}
                                >
                                    Write a Review
                                </Button>
                            </div>
                        )}

                        <Separator className="my-6" />

                        <div className="space-y-6">
                            {reviews?.length ? (
                                reviews.map(review => (
                                    <ReviewCard key={review.id} review={review} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">
                                    No reviews yet. Be the first to review this book!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <ReviewModal
                    bookId={bookId}
                    isOpen={isReviewModalOpen}
                    onClose={() => setIsReviewModalOpen(false)}
                />
            </div>
        </>
    )
}