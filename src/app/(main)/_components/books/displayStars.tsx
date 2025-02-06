import { FaStar, FaStarHalf } from 'react-icons/fa';

interface DisplayStarsProp {
    rating: number;
    showNumber?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const DisplayStars = ({ rating, showNumber = false, size = 'md' }: DisplayStarsProp) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const sizeClass = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-7 h-8"
    }[size];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`star-${i}`} className={`${sizeClass} text-yellow-400 fill-current`} />);
    }
    if (hasHalfStar) {
        stars.push(<FaStarHalf key="half-star" className={`${sizeClass} text-yellow-400 fill-current`} />);
    }

    const emptystars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptystars; i++) {
        stars.push(
            <FaStar
                key={`empty-${i}`}
                className={`${sizeClass} text-gray-300 fill-current`}
            />
        )
    };

    return (
        <div className="flex items-center gap-2">
            {showNumber && (
                <>
                    <span className="text-2xl font-bold text-yellow-500">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">/5</span>
                </>
            )}
            <div className="flex items-center gap-1">
                {stars}
            </div>
        </div>
    );
};