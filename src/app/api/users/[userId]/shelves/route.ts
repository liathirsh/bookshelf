import { getUserShelves } from "@/services/userShelfService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
): Promise<Response> {
  const { userId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const shelves = await getUserShelves(userId);
    return new Response(JSON.stringify(shelves), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching shelves:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch shelves" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
