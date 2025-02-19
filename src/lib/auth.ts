import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebaseAdmin";
import { ServerAuthUser } from "@/types/auth";

export async function getAuthenticatedUser(): Promise<ServerAuthUser> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionToken")?.value;

    if (!sessionCookie) {
        redirect("/login");
    }

    try {
        const decodedToken = await auth.verifySessionCookie(sessionCookie, true);
        return decodedToken;
    } catch (error) {
        console.error('Session verification failed:', error);
        redirect("/login");
    }
}

export default getAuthenticatedUser;