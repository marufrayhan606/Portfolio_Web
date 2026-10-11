import { NextResponse } from "next/server";
import { resolvePublicImage } from "@/lib/server-image-resolver";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const result = resolvePublicImage("projects", slug);

  if (!result) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      "Content-Type": result.mimeType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
