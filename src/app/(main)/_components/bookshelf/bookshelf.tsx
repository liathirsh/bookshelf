"use client";

import Shelf from "./shelf";

interface BookshelfProps {
    userId: string;
}

const Bookshelf = ({ userId }: BookshelfProps) => {
    return (
        <div className="flex-1 bg-gray-50/50 px-4 py-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center tracking-tight">
                My Bookshelf
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <section className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <Shelf status="currentlyReading" heading="Currently Reading" userId={userId} />
                </section>

                <section className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <Shelf status="wantToRead" heading="Want To Read" userId={userId} />
                </section>

                <section className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <Shelf status="read" heading="Read" userId={userId} />
                </section>
            </div>
        </div>
    )
}

export default Bookshelf;
