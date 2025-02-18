"use client"

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Book } from '@/types/book';
import { SearchForBook } from '@/app/(main)/_components/books/searchForBook';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAllBooks } from '@/hooks/useBooks';

const placeholderImage = "/romantasylogo.png";
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
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-6">Browse</h1>
        <SearchForBook 
          placeholder="Search by title, author, or genre" 
          onBookSelected={handleBookSelected} 
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600">{error.toString()}</p>
      ) : (
        genres.map((genre) => (
          <div key={genre.genre} className="space-y-6">
            <h2 className="text-2xl font-semibold">{genre.genre}</h2>
            <div className="relative">
              <div className="flex overflow-x-auto gap-6 pb-4 -mx-2 px-2 snap-x">
                {genre.books.map((book) => (
                  <div
                    key={book.id}
                    className="flex-none w-[180px] cursor-pointer transition-transform hover:scale-105 snap-start"
                    onClick={() => handleBookSelected(book)}
                  >
                    <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-md mb-4">
                      <Image
                        src={book.imageUrl || placeholderImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    </div>
                    <h3 className="font-medium text-base line-clamp-1 mb-1">{book.title}</h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BrowsePage;