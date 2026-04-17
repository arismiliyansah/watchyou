import { ContentCard } from "./ContentCard";
import { ContentCardSkeleton } from "./ContentCardSkeleton";
import type { TMDBContent } from "@/types/tmdb";

interface ContentGridProps {
  items: TMDBContent[];
  isLoading?: boolean;
}

export function ContentGrid({ items, isLoading = false }: ContentGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
        {Array.from({ length: 18 }).map((_, i) => (
          <ContentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-text-secondary text-lg mb-2">No results found</p>
        <p className="text-text-tertiary text-sm">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
      {items.map((item) => (
        <ContentCard key={`${item.id}-${item.media_type}`} content={item} />
      ))}
    </div>
  );
}
