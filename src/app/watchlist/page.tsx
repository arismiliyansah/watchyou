"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContentGrid } from "@/components/content/ContentGrid";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import type { TMDBContent } from "@/types/tmdb";

interface WatchlistEntry {
  id: string;
  tmdbId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
}

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const res = await fetch("/api/watchlist");
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch {
        // Not logged in or error
      } finally {
        setIsLoading(false);
      }
    }
    fetchWatchlist();
  }, []);

  // Convert watchlist entries to TMDBContent format for ContentGrid
  const contentItems = items.map((item) => ({
    id: item.tmdbId,
    poster_path: item.posterPath,
    backdrop_path: null,
    vote_average: 0,
    vote_count: 0,
    genre_ids: [] as number[],
    original_language: "",
    popularity: 0,
    overview: "",
    ...(item.mediaType === "movie"
      ? { title: item.title, release_date: "", adult: false, media_type: "movie" as const }
      : { name: item.title, first_air_date: "", origin_country: [] as string[], media_type: "tv" as const }),
  })) as TMDBContent[];

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-8">
            My List
          </h1>

          {isLoading ? (
            <ContentGrid items={[]} isLoading />
          ) : items.length > 0 ? (
            <ContentGrid items={contentItems} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-surface border border-border/30 flex items-center justify-center mb-6">
                <Bookmark size={32} className="text-text-tertiary" />
              </div>
              <p className="text-text-secondary text-lg mb-2">
                Your list is empty
              </p>
              <p className="text-text-tertiary text-sm mb-6">
                Save movies and series to watch later.
              </p>
              <Link
                href="/browse"
                className="px-6 py-3 rounded-full bg-primary/90 hover:bg-primary text-white text-sm font-medium transition-all duration-500 hover:glow-violet"
              >
                Browse Content
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
