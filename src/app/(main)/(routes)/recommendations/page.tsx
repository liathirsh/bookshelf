import Recommendations from "../../_components/books/recommendations";

const RecommendationsPage = () => {
    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold mb-6 center mt-6">Find Your Next Read</h1>
            <Recommendations />
        </div>
    );
};

export default RecommendationsPage;
