
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebaseAdmin";
import Bookshelf from "../../_components/bookshelf/bookshelf";

const BookshelfRoute = async () => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionToken")?.value || "";

    if(!sessionCookie) {
        return redirect("/login");
    }

    const decodedToken = await auth
        .verifySessionCookie(sessionCookie, true)
        .catch(() => null);
    
    if (!decodedToken) {
        return redirect("/login")
    }

    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center text-center md:justify-start gap-y-8 flex-1 px-6 pb-10">
              <Bookshelf />
            </div> 
        </div>
    )
}

export default BookshelfRoute;