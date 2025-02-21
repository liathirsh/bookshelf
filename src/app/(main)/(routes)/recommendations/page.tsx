import { InfiniteBackground } from "../../_components/background";
import Recommendations from "../../_components/books/recommendations";
import Image from 'next/image';

const RecommendationsPage = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <InfiniteBackground />
            
            <div className="py-4 px-6">
                <section className="flex items-center gap-4 max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-4">
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
