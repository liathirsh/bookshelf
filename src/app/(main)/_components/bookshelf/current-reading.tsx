"use client";

import { useEffect, useState } from "react";
import dummyData from "@/lib/dummy-data.json"
import { Book } from "@/types/book";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import BookCard from "../books/bookcard";

interface UserBooks {
    bookId: string;
    status: string;
    lastUpdated: string;
  }
  
  interface UserData {
    name: string;
    email: string;
    userBooks: Record<string, UserBooks>;
  }
  
  interface DummyData {
    users: Record<string, UserData>;
    books: Record<string, Book>;
}

const Data = dummyData as unknown as DummyData;

const CurrentReading: React.FC = () => {
    const { user, loading } = useAuth();
    const[currentlyReading, setCurrentlyReading] = useState<UserBooks[]>([]);

    useEffect(() => {
        if(user) {
            console.log("User UID:", user.uid)
            const userData = Data.users[user.uid as keyof typeof Data.users];
            console.log("User Data:", userData)

            if(userData){
                const userBooks = userData.userBooks;
                const currentlyReadingBooks: UserBooks[] = Object.keys(userBooks)
                    .filter((bookId) => userBooks[bookId].status === 'currently reading')
                    .map((bookId) => ({
                        bookId,
                        status: userBooks[bookId].status,
                        lastUpdated: userBooks[bookId].lastUpdated
                    }));
                setCurrentlyReading(currentlyReadingBooks);
            }
        }
    }, [user]);

    if(loading){
        return <Spinner />
    }

    if (!user) {
        return <div> Please sign in to see more </div>
    }

    return (
        <div>
            <h1> Currently Reading </h1>
            { currentlyReading.length > 0 ? (
                <ul>
                    {currentlyReading.map((book) => {
                        const bookDetails = Data.books[book.bookId];
                        return (
                            <li key={book.bookId}>
                                <BookCard book={bookDetails} />
                            </li>
                        )
                    })}
                </ul>
            ): (
                <p> No books are being currently read. </p>
            )}
        </div>
    )
}

export default CurrentReading;