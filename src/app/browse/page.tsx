import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContentGrid } from "@/components/content/ContentGrid";
import { FilterBar } from "@/components/content/FilterBar";
import type { TMDBContent } from "@/types/tmdb";
import {
  discoverMovies,
  discoverTV,
  getMovieGenres,
  getTVGenres,
} from "@/lib/tmdb";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    genre?: string;
    sort?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: "Browse",
};

async function BrowseContent({
  searchParams,
}: {
  searchParams: {
    type?: string;
    genre?: string;
    sort?: string;
    page?: string;
  };
}) {
  const type = searchParams.type || "movie";
  const genre = searchParams.genre || "";
  const sort = searchParams.sort || "popularity.desc";
  const page = Number(searchParams.page) || 1;

  const filters = {
    page,
    sort_by: sort,
    ...(genre && { with_genres: genre }),
    ...(sort === "vote_average.desc" && { "vote_average.gte": "7", "vote_count.gte": "200" }),
  };

  const [data, genres] = await Promise.all([
    type === "tv" ? discoverTV(filters) : discoverMovies(filters),
    type === "tv" ? getTVGenres() : getMovieGenres(),
  ]);

  // Tag items with media_type for ContentCard
  const items = data.results.map((item) => ({
    ...item,
    media_type: type === "tv" ? "tv" as const : "movie" as const,
  })) as TMDBContent[];

  return (
    <>
      <FilterBar genres={genres} />
      <ContentGrid items={items} />

      {/* Simple pagination */}
      {data.total_pages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {page > 1 && (
            <a
              href={`/browse?type=${type}&genre=${genre}&sort=${sort}&page=${page - 1}`}
              className="px-5 py-2.5 rounded-full border border-border/30 text-sm text-text-secondary hover:border-primary/30 hover:text-text-primary transition-all duration-500"
            >
              Previous
            </a>
          )}
          <span className="px-5 py-2.5 text-sm text-text-tertiary">
            Page {page} of {Math.min(data.total_pages, 500)}
          </span>
          {page < Math.min(data.total_pages, 500) && (
            <a
              href={`/browse?type=${type}&genre=${genre}&sort=${sort}&page=${page + 1}`}
              className="px-5 py-2.5 rounded-full border border-border/30 text-sm text-text-secondary hover:border-primary/30 hover:text-text-primary transition-all duration-500"
            >
              Next
            </a>
          )}
        </div>
      )}
    </>
  );
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-8">
            Browse
          </h1>

          <Suspense
            fallback={<ContentGrid items={[]} isLoading />}
          >
            <BrowseContent searchParams={resolvedParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </>
  );
}
