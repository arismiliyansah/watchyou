import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const preferences = await prisma.userPreferences.findUnique({
    where: { userId },
  });

  return NextResponse.json(
    preferences || { favoriteGenres: null, language: "en" }
  );
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { favoriteGenres, language } = await request.json();

  const preferences = await prisma.userPreferences.upsert({
    where: { userId },
    update: { favoriteGenres, language },
    create: { userId, favoriteGenres, language },
  });

  return NextResponse.json(preferences);
}
