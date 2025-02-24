import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebaseAdmin";
import { ServerAuthUser } from "@/types/auth";

export async function getAuthenticatedUser(): Promise<ServerAuthUser | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("sessionToken")?.value;

        if (!sessionCookie) {
            return null;
        }

        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        return decodedToken;
    } catch (error) {
        console.error('Session verification failed:', error);
        return null;
    }
}

export async function requireAuth() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionToken")?.value;

    if (!sessionCookie) {
        redirect("/login");
    }
}

export default getAuthenticatedUser;