import { Book } from "@/types/book";
import BookCard from "./bookcard";

function BookList({ books }: { books: Book[] }) {
    return (
      <div>
        {books.map((book) => (
          <BookCard 
            key={book.id} 
            book={book} 
            variant="shelf"
          />
        ))}
      </div>
    );
  }

export default BookList;