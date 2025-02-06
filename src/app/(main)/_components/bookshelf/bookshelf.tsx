"use client";

import Shelf from "./shelf";

interface BookshelfProps {
    userId: string;
}

const Bookshelf = ({ userId }: BookshelfProps) => {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center tracking-wide">
                My Bookshelf
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <Shelf status="currentlyReading" heading="Currently Reading" userId={userId} />
                </section>

                <section className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <Shelf status="wantToRead" heading="Want To Read" userId={userId} />
                </section>

                <section className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <Shelf status="read" heading="Read" userId={userId} />
                </section>
            </div>
        </div>
    )
}

export default Bookshelf;
