"use client"

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Book } from '@/types/book';
import { getAllBooks } from '@/services/bookService';
import { SearchForBook } from '@/app/(main)/_components/books/searchForBook';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const placeholderImage = "/romantasylogo.png";
const FEATURED_BOOKS = ["Epic Fantasy", "Historical", "Romantic"];

const BrowsePage = () => {
  const [genres, setGenres] = useState<{ genre: string; books: Book[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const booksPerGenre = 5;

  useEffect(() => {
    async function loadBooks() {
      try {
        const allBooks = await getAllBooks();
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
        console.log(filteredGenres)
      } catch (e) {
        console.error("Error fetching books", e);
        setError("Failed to load books");
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  function handleBookSelected(book: Book) {
    router.push(`/books/${book.id}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Browse</h1>
      <SearchForBook placeholder="Search by title, author, or genre" onBookSelected={handleBookSelected} />

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        genres.map((genre) => (
          <div key={genre.genre} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{genre.genre}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {genre.books.map((book) => (
                <div
                  key={book.id}
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleBookSelected(book)}
                >
                  <Image
                    src={book.imageUrl || placeholderImage}
                    alt={book.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                    className="w-full h-64 object-cover rounded-lg shadow-md mb-2"
                  />
                  <h3 className="font-medium text-lg">{book.title}</h3>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BrowsePage;