export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import Bookshelf from "../../_components/bookshelf/bookshelf";
import { getAuthenticatedUser } from "@/lib/auth";

const BooksPage = async () => {

    const decodedToken = await getAuthenticatedUser();

    if (!decodedToken) {
        redirect("/login");
        return null;
    }

    return (
            <div>
                <Bookshelf userId={decodedToken.uid} />
            </div>
    )
};


export default BooksPage;