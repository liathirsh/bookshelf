import { ProtectedRoute } from "../../_components/auth/protected-route";

const BooksPage = () => {
    return (
        <ProtectedRoute>
            <div>
                Books
            </div>
        </ProtectedRoute>
    )
}

export default BooksPage;