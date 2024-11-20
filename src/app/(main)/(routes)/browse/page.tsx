import { ProtectedRoute } from "../../_components/auth/protected-route";

const BrowsePage = () => {
    return (
        <ProtectedRoute>
            <div>                
                BROWSE
            </div>
        </ProtectedRoute>
    )
}

export default BrowsePage;