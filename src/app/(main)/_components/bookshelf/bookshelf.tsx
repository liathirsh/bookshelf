"use client";

import Shelf from "./shelf";

const Bookshelf = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center tracking-wide">
                My Bookshelf
            </h1>
            <div className="space-y-10">
                <section className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <Shelf status="currentlyReading" heading="Currently Reading" />
                </section>

                <section className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <Shelf status="wantToRead" heading="Want To Read" />
                </section>

                <section className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <Shelf status="read" heading="Read" />
                </section>
            </div>
        </div>
    )
}

export default Bookshelf;