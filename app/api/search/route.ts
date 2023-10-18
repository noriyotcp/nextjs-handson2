import { searchPhotos } from "@/lib/unsplash";

export async function POST(request: Request) {
  const { query }: { query: unknown } = await request.json();

  if (!query || typeof query !== "string") {
    const response = new Response("no query", { status: 400 });
    return response;
  }

  const searchPhotoResponse = await searchPhotos(query);
  return new Response(JSON.stringify(searchPhotoResponse), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
