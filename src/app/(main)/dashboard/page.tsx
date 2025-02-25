import { redirect } from "next/navigation";
import Shelf from "../_components/bookshelf/shelf";
import Feed from "../_components/community/feed";
import { cookies } from "next/headers";
import { auth } from "@/lib/firebaseAdmin";

async function verifySession(sessionCookie: string) {
    try {
        return await auth.verifySessionCookie(sessionCookie, true);
    } catch {
        return null;
    }
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionToken")?.value;

    if (!sessionCookie) {
        redirect("/login");
    }

    const decodedToken = await verifySession(sessionCookie);
    
    if (!decodedToken) {
        redirect("/login");
    }

    return (
        <div className="grid grid-cols-12 gap-6 p-8 h-full">
            <section className="col-span-12 lg:col-span-3 h-full">
                <div className="bg-white rounded-lg shadow-md p-6 h-full">
                    <Shelf status="currentlyReading" heading="Currently Reading" variant="dashboard" userId={decodedToken.uid} />
                </div>
            </section>
            <section className="col-span-12 lg:col-span-9 h-full">
                <div className="bg-white rounded-lg shadow-md p-6 h-full mb-10">
                    <Feed />
                </div>
            </section>
        </div>
    );
}

