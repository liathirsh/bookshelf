import { Book } from "@/types/book";
import Image from "next/image";
import clsx from "clsx";

interface BookCardProps {
    book: Book;
    variant?: 'shelf' | 'dashboard' | 'default';
    children?: React.ReactNode;
    className?: string;
}

const BookCard = ({ book, variant = 'default', className }: BookCardProps) => {
    if (!book) return null;

    return (
        <div className={clsx(
            "relative",
            variant === 'dashboard' ? "flex items-center gap-4" : "",
            className
        )}>
            <div className={clsx(
                "relative",
                variant === 'dashboard' 
                    ? "h-16 w-12 flex-shrink-0" 
                    : "aspect-[2/3] w-full"
            )}>
                {book.imageUrl && (
                    <Image
                        src={book.imageUrl}
                        alt={`Cover of ${book.title}`}
                        className="object-cover rounded-md"
                        fill
                        sizes={variant === 'dashboard' ? "48px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                        priority={variant === 'dashboard'}
                    />
                )}
            </div>
            
            {variant === 'dashboard' && (
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{book.title || 'Untitled'}</h3>
                    <p className="text-gray-600 text-xs truncate">{book.author ? `by ${book.author}` : 'Unknown author'}</p>
                </div>
            )}
        </div>
    );
};

export default BookCard;