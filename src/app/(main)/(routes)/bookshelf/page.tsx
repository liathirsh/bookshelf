import { redirect } from "next/navigation";
import Bookshelf from "../../_components/bookshelf/bookshelf";
import { getAuthenticatedUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

const BookshelfRoute = async () => {
    
    const decodedToken = await getAuthenticatedUser();

    if (!decodedToken) {
        redirect("/login");
        return null;
    }

    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center text-center md:justify-start gap-y-8 flex-1 px-6 pb-10">
              <Bookshelf userId={decodedToken.uid}/>
            </div> 
        </div>
    )
}

export default BookshelfRoute;