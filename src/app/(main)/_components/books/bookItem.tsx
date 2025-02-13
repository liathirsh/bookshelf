import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useShelves } from '@/hooks/useShelves';
import Image from 'next/image';

interface BookItemProps {
    book: Book;
    currentStatus: "currentlyReading" | "wantToRead" | "read";
    userId: string;
    onBookClick: (book: Book) => void;
}

const DEFAULT_COVER = "/HeroPic.png";

export function BookItem({ book, currentStatus, userId, onBookClick }: BookItemProps) {
    const { mutate: updateBookShelf } = useShelves();

    const handleMoveBook = (newStatus: BookItemProps['currentStatus']) => {
        if (!book.id) return;
        
        updateBookShelf(
            {
                userId,
                bookId: book.id,
                status: newStatus,
            },
            {
                onError: (error) => {
                    console.error('Error moving book:', error);
                    alert("Error moving book. Please try again");
                }
            }
        );
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <Button
                variant="ghost"
                className="flex-1 p-0 h-auto hover:bg-transparent focus:outline-none"
                onClick={() => onBookClick(book)}
            >
                <div className="flex items-start gap-4 w-full">
                    <div className="w-12 h-16 relative flex-shrink-0">
                        <Image
                            src={book.imageUrl || DEFAULT_COVER}
                            alt={book.title}
                            fill
                            className="object-cover rounded-sm"
                            unoptimized={book.imageUrl?.includes('openlibrary.org')}
                        />
                    </div>
                    <div className="flex-1 text-left font-[-apple-system,BlinkMacSystemFont,system-ui,'Segoe UI',Roboto]">
                        <h3 className="text-emerald-600 hover:text-emerald-500 font-bold tracking-normal">
                            {book.title}
                        </h3>
                        <p className="text-gray-600 text-sm tracking-normal">
                            by <span className="text-gray-500">{book.author}</span>
                        </p>
                    </div>
                </div>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {currentStatus !== "currentlyReading" && (
                        <DropdownMenuItem onClick={() => handleMoveBook("currentlyReading")}>
                            Move to Currently Reading
                        </DropdownMenuItem>
                    )}
                    {currentStatus !== "wantToRead" && (
                        <DropdownMenuItem onClick={() => handleMoveBook("wantToRead")}>
                            Move to Want to Read
                        </DropdownMenuItem>
                    )}
                    {currentStatus !== "read" && (
                        <DropdownMenuItem onClick={() => handleMoveBook("read")}>
                            Move to Read
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
} 