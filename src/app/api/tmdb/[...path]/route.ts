import { NextRequest, NextResponse } from "next/server";
import { TMDB_BASE_URL, TMDB_API_KEY } from "@/lib/tmdb-config";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const tmdbPath = path.join("/");
  const searchParams = request.nextUrl.searchParams;

  const url = new URL(`${TMDB_BASE_URL}/${tmdbPath}`);
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `TMDB API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch from TMDB" },
      { status: 500 }
    );
  }
}
