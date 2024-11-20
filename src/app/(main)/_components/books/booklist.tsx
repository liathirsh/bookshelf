
import { Book } from "@/types/book";
import BookCard from "./bookcard";

function BookList({ books }: { books: Book[] }) {
    return (
      <div>
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    );
  }

export default BookList;