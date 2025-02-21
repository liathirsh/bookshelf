import { doc, getDoc, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import { serverTimestamp } from '../lib/firebase';
import { Book } from '../types/book';
import { booksCollection } from '../lib/firestore/collections';

export const addBook = async (book: Book) => {
    try { 
        const newBook = {
            ...book,
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(booksCollection, newBook);
        console.log("Book added with ID", docRef.id)
        return docRef.id
    } catch (error) {
        console.error("Error adding book:", error);
        throw error
    }
    
}

export const updateBook = async(bookId: string, updateFields: Partial<Book>) => {
    try { 
        const bookDocRef = doc(booksCollection, bookId);
        await updateDoc(bookDocRef, {
            ...updateFields,
            updatedAt: serverTimestamp()        
    });
        return true;
    } catch (error) {
        console.error("Error updating book", error);
        throw error;
    }
};

export const updateBookRating = async (bookId: string, userId: string, rating: number) => {
    try {
        const bookRef = doc(booksCollection, bookId);
        const bookSnap = await getDoc(bookRef);

        if(!bookSnap.exists()) {
            throw new Error('Book not found');
        }

        const bookData = bookSnap.data()
        const ratings = bookData.ratings || {};
        ratings[userId] = rating;

        const ratingValues = Object.values(ratings) as number[];
        const averageRating = ratingValues.reduce((a,b) => a + b, 0) / ratingValues.length;

        await updateDoc(bookRef, {
            ratings,
            averageRating: Number(averageRating.toFixed(2)),
            NumberOfRatings: ratingValues.length,
            updatedAt: serverTimestamp()
        });

        return {
            success: true,
            averageRating,
            numberOfRatings: ratingValues.length
        };

    } catch (error) {
        console.error('Error updating rating:', error);
        throw error;
    }

}

export const getBook = async (bookId: string): Promise<Book | null> => {
    try {
        const bookDocRef = doc(booksCollection, bookId);
        const snapshot = await getDoc(bookDocRef);
        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data()
            } as Book;
        }
        return null;
    } catch (error) {
        console.error("Error getting book", error);
        throw error;
    }
}

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const snapshot = await getDocs(booksCollection);
        const books: Book[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Book));
        return books;
    } catch (error) {
        console.error("Error getting all books", error);
        throw error;
    }
}

