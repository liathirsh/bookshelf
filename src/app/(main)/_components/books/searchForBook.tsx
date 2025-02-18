import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import { Book } from '@/types/book';
import debounce from 'lodash/debounce';
import { Input } from '@/components/ui/input';
import { getAllBooks } from '@/services/bookService';

const placeholderImage = "/romantasylogo.png"

interface SearchForBookProps {
    onBookSelected?: (book: Book) => void;
    placeholder?: string;
}

const searchCache = new Map<string, Book[]>(); 

export function SearchForBook({ onBookSelected, placeholder = "Search for a book, author, or genre..." }: SearchForBookProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = useCallback(async (queryText: string) => {
        if(queryText.trim().length < 2) {
            setBooks([]);
            return;
        }
        
        const normalizedQuery = queryText.toLowerCase();
        if(searchCache.has(normalizedQuery)) {
            setBooks(searchCache.get(normalizedQuery) || []);
            return;
        }
        
        setIsLoading(true);
        setError(null);

        try {
            const allBooks = await getAllBooks();
            const filteredBooks = allBooks.filter(book => 
                book.title.toLowerCase().includes(normalizedQuery) ||
                book.author.toLowerCase().includes(normalizedQuery) ||
                (book.genre && book.genre.some(g => 
                    g.toLowerCase().includes(normalizedQuery)
                ))
            );
            
            searchCache.set(normalizedQuery, filteredBooks);
            setBooks(filteredBooks);
        } catch (error) {
            console.error("Error fetching books", error);
            setError("Failed to fetch books");
            setBooks([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const debouncedSearch = useMemo(()=> debounce(fetchBooks, 300), [fetchBooks])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    }

    return (
        <div className="relative space-y-2">
            <Input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full border border-gray-500 rounded-md"
            />
            {isLoading ? (
                <div className="flex justify-center items-center p-4">
                    <Spinner />
                </div>
            ) : (
                <>
                    {error && <p className="text-red-500">{error}</p>}
                    {books.length > 0 && (
                        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-auto">
                            {books.map((book) => (
                                <li 
                                    key={book.id}
                                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => onBookSelected?.(book)}
                                >
                                    <div className="flex-shrink-0 mr-3">
                                        <Image
                                            src={book.imageUrl || placeholderImage}
                                            alt={book.title}
                                            className="w-10 h-14 object-cover rounded"
                                            width={40}
                                            height={56}
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium">{book.title}</p>
                                        <p className="text-xs text-gray-500">{book.author}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>        
    )
}