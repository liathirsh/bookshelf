import { doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { serverTimestamp } from '@/lib/firebase';
import { Book } from '@/types/book';
import { booksCollection } from '@/lib/firestore/collections';

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

export const getBook = async (bookId: string): Promise<Book | null> => {
    try{
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


