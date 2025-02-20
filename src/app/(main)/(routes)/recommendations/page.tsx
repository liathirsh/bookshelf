import Recommendations from "../../_components/books/recommendations";
import Image from 'next/image';

const RecommendationsPage = () => {
    return (
        <div className="flex-1 px-4 py-8 md:p-12">
            <div className="max-w-7xl mx-auto">
                <section className="flex flex-col">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Image
                                src="/images/robot.png"
                                alt="AI Assistant"
                                width={80}
                                height={80}
                                className="object-contain rounded-xl"
                            />
                            <h1 className="text-3xl font-bold">Find Your Next Read</h1>
                        </div>
                        <Recommendations />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecommendationsPage;
