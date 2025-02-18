import { Book } from '@/types/book';
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
        <div className="flex items-start justify-between w-full py-2 group mt-1" onContextMenu={handleContextMenu}>
            <div className="flex items-start gap-3 flex-1" onClick={() => onBookClick(book)}>
                <div className="w-10 h-14 relative flex-shrink-0">
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
                <div className="flex-1 min-w-0">
                    <h3 className="text-emerald-700 font-medium text-sm leading-tight mb-1">
                        {book.title}
                    </h3>
                    <p className="text-gray-600 text-xs">
                        by {book.author}
                    </p>
                </div>
            </div>
            
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