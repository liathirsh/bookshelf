"use client";

import Shelf from "./shelf";

interface BookshelfProps {
    userId: string;
}

const Bookshelf = ({ userId }: BookshelfProps) => {
    return (
        <div className="flex-1 px-4 py-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto h-[calc(100vh-8rem)]">
                <section className="flex flex-col h-full">
                    <Shelf status="currentlyReading" heading="Currently Reading" userId={userId} />
                </section>

                <section className="flex flex-col h-full">
                    <Shelf status="wantToRead" heading="Want To Read" userId={userId} />
                </section>

                <section className="flex flex-col h-full">
                    <Shelf status="read" heading="Read" userId={userId} />
                </section>
            </div>
        </div>
    );
}

export default Bookshelf;
