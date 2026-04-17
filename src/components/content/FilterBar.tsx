"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { TMDBGenre } from "@/types/tmdb";

interface FilterBarProps {
  genres: TMDBGenre[];
}

export function FilterBar({ genres }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") || "movie";
  const currentGenre = searchParams.get("genre") || "";
  const currentSort = searchParams.get("sort") || "popularity.desc";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`/browse?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* Type Toggle */}
      <div className="flex rounded-full bg-surface border border-border/30 p-1">
        {["movie", "tv"].map((type) => (
          <button
            key={type}
            onClick={() => updateFilter("type", type)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-500",
              currentType === type
                ? "bg-primary/20 text-primary"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {type === "movie" ? "Movies" : "Series"}
          </button>
        ))}
      </div>

      {/* Genre Select */}
      <select
        value={currentGenre}
        onChange={(e) => updateFilter("genre", e.target.value)}
        className="px-4 py-2.5 rounded-full bg-surface border border-border/30 text-sm text-text-secondary appearance-none cursor-pointer hover:border-primary/30 transition-colors duration-500 pr-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239390a0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Sort Select */}
      <select
        value={currentSort}
        onChange={(e) => updateFilter("sort", e.target.value)}
        className="px-4 py-2.5 rounded-full bg-surface border border-border/30 text-sm text-text-secondary appearance-none cursor-pointer hover:border-primary/30 transition-colors duration-500 pr-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239390a0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="vote_average.desc">Top Rated</option>
        <option value="primary_release_date.desc">Newest</option>
        <option value="primary_release_date.asc">Oldest</option>
      </select>
    </div>
  );
}
