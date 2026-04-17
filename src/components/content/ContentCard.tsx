"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Plus, Check, Star } from "lucide-react";
import { cn, getImageUrl, formatYear, formatRating } from "@/lib/utils";
import { useWatchlistContext } from "@/components/WatchlistProvider";
import type { TMDBContent } from "@/types/tmdb";
import { getContentTitle, getContentDate, isMovie } from "@/types/tmdb";

interface ContentCardProps {
  content: TMDBContent;
  priority?: boolean;
  className?: string;
}

export function ContentCard({
  content,
  priority = false,
  className,
}: ContentCardProps) {
  const router = useRouter();
  const { isInWatchlist, toggle } = useWatchlistContext();

  const title = getContentTitle(content);
  const date = getContentDate(content);
  const mediaType = isMovie(content) ? "movie" : "tv";
  const href = `/${mediaType === "movie" ? "movie" : "series"}/${content.id}`;
  const inList = isInWatchlist(content.id, mediaType);

  const handleAddToList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(content.id, mediaType, title, content.poster_path);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/watch/${content.id}?type=${mediaType}`);
  };

  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-[2/3] rounded-xl overflow-hidden",
        "transition-all duration-500",
        "hover:scale-105 hover:z-10",
        className
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
    >
      {/* Poster */}
      <Image
        src={getImageUrl(content.poster_path, "w500")}
        alt={title}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
        className="object-cover transition-transform duration-700"
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzBmMGYxNCIvPjwvc3ZnPg=="
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-500" />

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/30 group-hover:glow-violet transition-all duration-500" />

      {/* Hover info overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 gradient-card">
        <h3 className="text-sm font-semibold text-text-primary leading-tight line-clamp-2 mb-1.5">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          {content.vote_average > 0 && (
            <span className="flex items-center gap-1">
              <Star size={10} className="text-accent-warm fill-accent-warm" />
              {formatRating(content.vote_average)}
            </span>
          )}
          {date && <span>{formatYear(date)}</span>}
          <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase tracking-wider">
            {mediaType === "movie" ? "Movie" : "Series"}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={handlePlay}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white text-background transition-all duration-300 hover:scale-110"
            aria-label="Play"
          >
            <Play size={14} fill="currentColor" />
          </button>
          <button
            onClick={handleAddToList}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110",
              inList
                ? "bg-primary/30 border border-primary/50 text-primary"
                : "border border-white/30 hover:border-primary/50 text-text-primary"
            )}
            aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
          >
            {inList ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </div>
    </Link>
  );
}
