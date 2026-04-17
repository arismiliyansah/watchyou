import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json([], { status: 200 });
  }

  const userId = (session.user as { id: string }).id;
  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    orderBy: { addedAt: "desc" },
  });

  return NextResponse.json(watchlist);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { tmdbId, mediaType, title, posterPath } = await request.json();

  if (!tmdbId || !mediaType || !title) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const item = await prisma.watchlist.create({
      data: {
        userId,
        tmdbId,
        mediaType,
        title,
        posterPath: posterPath || null,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    // Likely a duplicate
    return NextResponse.json(
      { error: "Already in watchlist" },
      { status: 409 }
    );
  }
}
