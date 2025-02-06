import { Book } from "@/types/book";
import BookCard from "./bookcard";
import Image from "next/image";

const placeholderImage = "/images/romantasylogo.png";

function BookList({ books }: { books: Book[] }) {
    return (
      <div>
        {books.map((book) => (
          <BookCard key={book.title} book={book} variant="shelf">
            <Image
                src={book.imageUrl || placeholderImage}
                alt={`Cover for ${book.title}`}
                width={230}
                height={345}
                className="object-cover rounded-md"
            />
          </BookCard>
        ))}
      </div>
    );
  }

export default BookList;