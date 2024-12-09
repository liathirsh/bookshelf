import { NextRequest, NextResponse } from "next/server";
import { getDocs, query } from "firebase/firestore";
import { userShelvesCollection } from "@/lib/firestore/collections";

export async function GET(req: NextRequest, {params }: {params: { userId: string } }) {
    const q = query(userShelvesCollection(params.userId));
    const snapshot = await getDocs(q);
    const shelves = snapshot.docs.map(doc => doc.data());
    return NextResponse.json(shelves);

}