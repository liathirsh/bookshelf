import { doc, updateDoc, setDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { reviewsCollection, userReviewsCollection } from "@/lib/firestore/collections";
import { Review } from "@/types/review";

export const createReview = async(review: Review): Promise<string> => {
    const globalReviewDocRef = doc(reviewsCollection);
    const reviewId = globalReviewDocRef.id;

    const newReview = {
        ...review,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: review.userId,
        bookId: review.bookId
    }

    await setDoc(globalReviewDocRef, newReview);

    const userReviewDocRef = doc(userReviewsCollection(review.userId),reviewId);
    await setDoc(userReviewDocRef, newReview);

    return reviewId;

}

export const updateReview = async (userId: string, reviewId: string, updateFields: Partial<Review>) => {
    const updatedData = {
        ...updateFields,
        updatedAt: serverTimestamp()
    };

    const globalReviewDocRef = doc(reviewsCollection, reviewId);
    await updateDoc(globalReviewDocRef, updatedData);

    const userReviewDocRef = doc(userReviewsCollection(userId), reviewId);
    await updateDoc(userReviewDocRef, updatedData);

    return true
}

export const listReviewsForBook = async(bookId: string): Promise<Review[]> => {
    const q = query(reviewsCollection, where("bookId", "==", bookId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map (doc => doc.data() as Review);
}

export const listUserReviews = async(userId: string): Promise<Review[]> => {
    const userReviewsRef = userReviewsCollection(userId);
    const snapshot = await getDocs(userReviewsRef);
    return snapshot.docs.map(doc => doc.data() as Review)
}