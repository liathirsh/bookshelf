import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShelves } from '@/hooks/useShelves';
import { ChevronDown } from "lucide-react";

interface ShelfButtonProps {
    bookId: string;
    userId: string;
    currentStatus?: "currentlyReading" | "wantToRead" | "read";
    variant?: "default" | "ghost";
    showIcon?: boolean;
}

export function ShelfButton({ bookId, userId, currentStatus, variant = "default", showIcon = false }: ShelfButtonProps) {
    const { mutate: updateBookShelf } = useShelves();

    const handleShelfUpdate = (newStatus: "currentlyReading" | "wantToRead" | "read") => {
        if (!bookId || !userId) return;
        
        updateBookShelf(
            {
                userId,
                bookId,
                status: newStatus,
            },
            {
                onSuccess: () => {
                    toast.success(`Book ${currentStatus ? 'moved to' : 'added to'} ${newStatus} shelf`);
                },
                onError: (error) => {
                    console.error('Error updating shelf:', error);
                    toast.error("Error updating shelf. Please try again");
                }
            }
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} className={showIcon ? "h-8 w-8 p-0" : undefined}>
                    {showIcon ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                        'Add to Shelf'
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {(!currentStatus || currentStatus !== "currentlyReading") && (
                    <DropdownMenuItem onClick={() => handleShelfUpdate("currentlyReading")}>
                        {currentStatus ? 'Move to' : 'Add to'} Currently Reading
                    </DropdownMenuItem>
                )}
                {(!currentStatus || currentStatus !== "wantToRead") && (
                    <DropdownMenuItem onClick={() => handleShelfUpdate("wantToRead")}>
                        {currentStatus ? 'Move to' : 'Add to'} Want to Read
                    </DropdownMenuItem>
                )}
                {(!currentStatus || currentStatus !== "read") && (
                    <DropdownMenuItem onClick={() => handleShelfUpdate("read")}>
                        {currentStatus ? 'Move to' : 'Add to'} Read
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
} 