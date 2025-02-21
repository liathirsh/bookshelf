"use client"

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Book } from '@/types/book';
import { SearchForBook } from '@/app/(main)/_components/books/searchForBook';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAllBooks } from '@/hooks/useBooks';

const placeholderImage = "/images/romantasylogo.png";
const FEATURED_BOOKS = ["Epic Fantasy", "Historical", "Romantic"];

const BrowsePage = () => {
  const { data: allBooks, isLoading, error } = useAllBooks();
  const [genres, setGenres] = useState<{ genre: string; books: Book[] }[]>([]);
  const router = useRouter();
  const booksPerGenre = 5;

  useEffect(() => {
    if (!allBooks) return;
    
    const groupedByGenre = allBooks.reduce(
      (acc: Record<string, { genre: string; books: Book[] }>, book: Book) => {
        const bookGenres = book.genre.length > 0 ? book.genre : ["Unknown"];
        bookGenres.forEach((genre) => {
          if (!acc[genre]) {
            acc[genre] = { genre, books: [] };
          }
          acc[genre].books.push(book);
        });
        return acc;
      },
      {}
    );

    const filteredGenres = Object.values(groupedByGenre)
      .filter((genreObj) => FEATURED_BOOKS.includes(genreObj.genre))
      .map((genreObj) => ({
        ...genreObj,
        books: genreObj.books.slice(0, booksPerGenre),
      }));

    setGenres(filteredGenres);
  }, [allBooks]);

  function handleBookSelected(book: Book) {
    router.push(`/books/${book.id}`);
  }

  return (
    <div className="flex-1 px-3 py-3 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-5">

        <section>
          <div className="bg-white rounded-md shadow p-3">
            <h1 className="text-xl font-bold mb-3">Browse</h1>
            <SearchForBook 
              placeholder="Search by title, author, or genre" 
              onBookSelected={handleBookSelected} 
            />
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error.toString()}
          </div>
        ) : (
          <div className="space-y-5">
            {genres.map((genre) => (
              <section key={genre.genre}>
                <div className="bg-white rounded-md shadow p-3">
                  <h2 className="text-lg font-semibold mb-3">{genre.genre}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {genre.books.map((book) => (
                      <div
                        key={book.id}
                        className="cursor-pointer"
                        onClick={() => handleBookSelected(book)}
                      >
                        <div className="aspect-[2/3] relative rounded overflow-hidden bg-gray-100 mb-1">
                          <Image
                            src={book.imageUrl || placeholderImage}
                            alt={book.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 150px"
                          />
                        </div>
                        <h3 className="font-medium text-sm line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {book.author}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
