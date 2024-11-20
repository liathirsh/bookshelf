import { ProtectedRoute } from "../../_components/auth/protected-route";

const CommunityPage = () => {
    return (
        <ProtectedRoute>
            <div>
                COMMUNITY
            </div>
        </ProtectedRoute>
    )
}

export default CommunityPage;