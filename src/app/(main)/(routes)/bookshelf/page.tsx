"use client";

import { MainNavbar } from "@/app/(main)/_components/mainnavbar";

const BookShelfPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            <MainNavbar />
            <div className="flex flex-col items-center justify-center text-center md:justify-start gap-y-8 flex-1 px-6 pb-10">
              Book
            </div>
          
        </div>
    )
}

export default BookShelfPage;