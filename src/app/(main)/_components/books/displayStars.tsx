import { FaStar } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface DisplayStarsProp {
    rating: number;
    showNumber?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const DisplayStars = ({ rating, showNumber }: { rating: number, showNumber?: boolean }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={cn(
                            "w-5 h-5",
                            star <= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                        )}
                    />
                ))}
            </div>
            
            {showNumber && rating > 0 && (
                <span className="text-lg font-medium">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
};