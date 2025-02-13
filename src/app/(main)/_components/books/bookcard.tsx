import { Book } from "@/types/book";
import Image from "next/image";
import clsx from "clsx";

interface BookCardProps {
    book: Book;
    variant?: 'shelf' | 'dashboard' | 'default';
    className?: string;
}

const DEFAULT_COVER = "/HeroPic.png";

const BookCard = ({ book, variant = 'default', className }: BookCardProps) => {
    if (!book) return null;

    return (
        <div className={clsx(
            "relative w-full",
            variant === 'default' && "aspect-[2/3]",
            className
        )}>
            <Image
                src={book.imageUrl || DEFAULT_COVER}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover rounded-md"
                unoptimized={book.imageUrl?.includes('openlibrary.org')}
            />
        </div>
    );
};

export default BookCard;