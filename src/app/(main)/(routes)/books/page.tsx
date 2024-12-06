import { ProtectedRoute } from "../../_components/auth/protected-route";
import Bookshelf from "../../_components/bookshelf/bookshelf";

const BooksPage = () => {
    return (
        <ProtectedRoute>
            <div>
                <Bookshelf />
            </div>
        </ProtectedRoute>
    )
}

export default BooksPage;