import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebaseAdmin";

export const getAuthenticatedUser = async () => {

const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sessionToken")?.value || "";

    if(!sessionCookie) {
        return redirect("/login");
    }

    const decodedToken = await auth
        .verifySessionCookie(sessionCookie, true)
        .catch(() => null);
    
    if (!decodedToken) {
        return redirect("/login")
    }

    return decodedToken;
}

export default getAuthenticatedUser;