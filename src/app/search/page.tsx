import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContentGrid } from "@/components/content/ContentGrid";
import { searchMulti } from "@/lib/tmdb";
import type { TMDBContent } from "@/types/tmdb";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: "Search",
};

async function SearchResults({ query }: { query: string }) {
  if (!query || query.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-text-secondary text-lg mb-2">
          Start typing to search
        </p>
        <p className="text-text-tertiary text-sm">
          Search for movies, TV series, and more.
        </p>
      </div>
    );
  }

  const data = await searchMulti(query);

  // Filter out people, keep only movies and TV shows
  const results = data.results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map((item) => ({
      ...item,
      // Normalize for TMDBContent
      ...(item.media_type === "movie"
        ? { title: item.title!, release_date: item.release_date || "" }
        : { name: item.name!, first_air_date: item.first_air_date || "" }),
      vote_average: item.vote_average || 0,
      vote_count: 0,
      genre_ids: item.genre_ids || [],
      original_language: "",
      popularity: 0,
      adult: false,
    })) as unknown as TMDBContent[];

  return (
    <>
      <p className="text-sm text-text-tertiary mb-6">
        {data.total_results} result{data.total_results !== 1 ? "s" : ""} for &quot;{query}&quot;
      </p>
      <ContentGrid items={results} />
    </>
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-8">
            {q ? `Search: "${q}"` : "Search"}
          </h1>

          <Suspense fallback={<ContentGrid items={[]} isLoading />}>
            <SearchResults query={q || ""} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
