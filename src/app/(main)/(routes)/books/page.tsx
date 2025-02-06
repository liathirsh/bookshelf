
import Bookshelf from "../../_components/bookshelf/bookshelf";
import { getAuthenticatedUser } from "@/lib/auth";

const BooksPage = async () => {

    const decodedToken = await getAuthenticatedUser();
    return (
            <div>
                <Bookshelf userId={decodedToken.uid} />
            </div>
    )
};


export default BooksPage;