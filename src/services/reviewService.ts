import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Review } from '@/types/review';
import { doc, runTransaction } from 'firebase/firestore';
import { booksCollection } from '@/lib/firestore/collections';

const reviewsCollection = collection(db, 'reviews');

export const createReview = async (review: Omit<Review, 'id'>) => {
    try {
        const bookRef = doc(booksCollection, review.bookId);
        
        return await runTransaction(db, async (transaction) => {
            const bookDoc = await transaction.get(bookRef);
            if (!bookDoc.exists()) {
                throw new Error('Book not found');
            }

            const bookData = bookDoc.data();
            const ratings = bookData.ratings || {};
            ratings[review.userId] = review.rating;

            const ratingValues = Object.values(ratings) as number[];
            const averageRating = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;

            transaction.update(bookRef, {
                ratings,
                averageRating: Number(averageRating.toFixed(2)),
                ratingsCount: ratingValues.length,
                updatedAt: new Date().toISOString()
            });

            const reviewRef = doc(reviewsCollection);
            transaction.set(reviewRef, review);
            
            return {
                id: reviewRef.id,
                ...review
            };
        });
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const listReviewsForBook = async (bookId: string): Promise<Review[]> => {
    try {
        const q = query(
            reviewsCollection,
            where('bookId', '==', bookId),
            orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Review));
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const listUserReviews = async (userId: string): Promise<Review[]> => {
    try {
        const q = query(
            reviewsCollection,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Review));
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        throw error;
    }
};

export const getBookReviews = async (bookId: string) => {
    try {
        const q = query(
            reviewsCollection,
            where('bookId', '==', bookId),
            orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Review));
    } catch (error) {
        console.error('Error fetching book reviews:', error);
        throw error;
    }
};