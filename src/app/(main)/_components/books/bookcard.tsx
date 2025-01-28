
import Image from "next/image";
import { Book } from "@/types/book";

interface BookCardProps {
    book: Book;
}

const placeholderImage = "/romantasylogo.png"

const BookCard = ( { book }: BookCardProps) => {

    return (
        <div className="flex gap-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0">
                <Image
                    src={book.imageUrl || placeholderImage } 
                    width={100}
                    height={100}
                    alt={book.description ?? "No description yet!"}
                    priority
                />
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
        </div>
        
        
    )
}

export default BookCard;