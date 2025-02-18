import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShelfButton } from './shelfButton';

interface BookItemProps {
    book: Book;
    currentStatus: "currentlyReading" | "wantToRead" | "read";
    userId: string;
    onBookClick: (book: Book) => void;
}

const DEFAULT_COVER = "/HeroPic.png";

export function BookItem({ book, currentStatus, userId, onBookClick }: BookItemProps) {

    const getCoverUrl = (book: Book) => {
        if (book.imageUrl) return book.imageUrl;
        if (book.volumeInfo?.imageLinks?.thumbnail) {
            return book.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=0');
        }
        if (book.thumbnail) return book.thumbnail;
        return DEFAULT_COVER;
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <div className="flex items-center gap-2 w-full group" onContextMenu={handleContextMenu}>
            <Button
                variant="ghost"
                className="flex-1 p-0 h-auto hover:bg-transparent"
                onClick={() => onBookClick(book)}
            >
                <div className="flex items-start gap-4 w-full">
                    <div className="w-12 h-16 relative flex-shrink-0">
                        <Image
                            src={getCoverUrl(book)}
                            alt={book.title}
                            fill
                            className="object-cover rounded-sm"
                            unoptimized={true}
                            onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = DEFAULT_COVER;
                            }}
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="text-emerald-700 hover:text-emerald-600 font-medium antialiased drop-shadow-sm">
                            {book.title}
                        </h3>
                        <p className="text-gray-700 text-sm antialiased drop-shadow-sm">
                            by <span className="text-gray-600">{book.author}</span>
                        </p>
                    </div>
                </div>
            </Button>
            
            <ShelfButton 
                bookId={book.id} 
                userId={userId}
                currentStatus={currentStatus}
                variant="ghost"
                showIcon
            />
        </div>
    );
} 