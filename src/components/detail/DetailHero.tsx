"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Check, Star } from "lucide-react";
import { getBackdropUrl, getImageUrl, formatRating, formatRuntime, formatYear, cn } from "@/lib/utils";
import { useWatchlistContext } from "@/components/WatchlistProvider";
import { GenrePills } from "@/components/content/GenrePills";

interface DetailHeroProps {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  tagline?: string;
  overview: string;
  backdropPath: string | null;
  posterPath: string | null;
  voteAverage: number;
  releaseDate: string;
  runtime?: number;
  seasonCount?: number;
  genres: { id: number; name: string }[];
}

export function DetailHero({
  tmdbId,
  mediaType,
  title,
  tagline,
  overview,
  backdropPath,
  posterPath,
  voteAverage,
  releaseDate,
  runtime,
  seasonCount,
  genres,
}: DetailHeroProps) {
  const { isInWatchlist, toggle } = useWatchlistContext();
  const inList = isInWatchlist(tmdbId, mediaType);

  const handleToggleList = () => {
    toggle(tmdbId, mediaType, title, posterPath);
  };

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh]">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(backdropPath, "original")}
          alt={title}
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 gradient-left opacity-50" />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-8 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-end md:items-end">
          {/* Poster */}
          <div className="hidden md:block shrink-0 w-64 lg:w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-border/30">
            <Image
              src={getImageUrl(posterPath, "w500")}
              alt={title}
              width={288}
              height={432}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex-1 max-w-2xl animate-fade-up">
            {tagline && (
              <p className="text-sm text-primary font-medium tracking-wide mb-3">
                {tagline}
              </p>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight mb-4">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-4">
              {voteAverage > 0 && (
                <span className="flex items-center gap-1.5 text-accent-warm font-semibold">
                  <Star size={14} className="fill-accent-warm" />
                  {formatRating(voteAverage)}
                </span>
              )}
              {releaseDate && <span>{formatYear(releaseDate)}</span>}
              {runtime && runtime > 0 && (
                <span className="text-text-tertiary">{formatRuntime(runtime)}</span>
              )}
              {seasonCount && (
                <span className="text-text-tertiary">
                  {seasonCount} Season{seasonCount > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <GenrePills genres={genres} className="mb-5" />

            <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-xl">
              {overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/watch/${tmdbId}?type=${mediaType}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-background font-semibold text-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
              >
                <Play size={16} fill="currentColor" />
                Watch Now
              </Link>
              <button
                onClick={handleToggleList}
                className={cn(
                  "inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-500",
                  inList
                    ? "bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 glow-violet"
                    : "border border-white/20 hover:border-primary/50 text-text-primary hover:bg-white/5 hover:glow-violet"
                )}
              >
                {inList ? <Check size={16} /> : <Plus size={16} />}
                {inList ? "In My List" : "Add to List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
