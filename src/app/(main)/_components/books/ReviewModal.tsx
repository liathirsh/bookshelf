import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './starRating';
import { useCreateReview } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';

interface ReviewModalProps {
    bookId: string;
    isOpen: boolean;
    onClose: () => void;
}

export function ReviewModal({ bookId, isOpen, onClose }: ReviewModalProps) {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const { mutate: createReview, isPending } = useCreateReview();

    const handleSubmit = () => {
        if (!content || !rating || !user) return;

        const review = {
            bookId,
            userId: user.uid,
            userName: user.displayName ?? 'Anonymous',
            userPhotoURL: user.photoURL || null,
            content,
            rating
        };

        createReview(review, {
            onSuccess: () => {
                setContent('');
                setRating(0);
                onClose()
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Rating
                        </label>
                        <StarRating
                            averageRating={0}
                            userRating={rating}
                            onRatingChange={setRating}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Review
                        </label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your review here..."
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!content || !rating || isPending}
                        >
                            {isPending ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 