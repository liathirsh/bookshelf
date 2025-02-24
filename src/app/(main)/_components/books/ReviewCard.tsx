import { Review } from '@/types/review';
import { DisplayStars } from './displayStars';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                    <Image 
                        src={review.userPhotoURL || '/images/robot.png'} 
                        alt={review.userName} 
                        width={48} 
                        height={48} 
                    />
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{review.userName}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <DisplayStars rating={review.rating} />
                    </div>
                    <p className="mt-2 text-gray-700">{review.content}</p>
                </div>
            </div>
        </div>
    );
} 