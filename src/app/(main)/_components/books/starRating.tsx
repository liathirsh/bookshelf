import { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
    averageRating: number;
    userRating: number;
    onRatingChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ averageRating, userRating, onRatingChange }) => {
    const [hover, setHover] = useState<number | null>(null);

    const handleRating = async (newRating: number) => {
        await onRatingChange(newRating);
    }

    const renderStar = (position: number) => {
        const starValue = hover ?? userRating ?? averageRating;
        if (starValue >= position) {
            return <FaStar className="text-yellow-400" />
        } else if (starValue > position -1) {
            return <FaStarHalfAlt className="text-yellow-400" />
        } else {
            return <FaStar className="text-gray-300" />
        }
    }

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <span 
                    key={star}
                    className="cursor-pointer"
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                >
                    {renderStar(star)}
                </span>
            ))}
        </div>
    )
}

export default StarRating;