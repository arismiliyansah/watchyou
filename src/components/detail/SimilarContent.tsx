import { ContentCarousel } from "@/components/content/ContentCarousel";
import type { TMDBContent } from "@/types/tmdb";

interface SimilarContentProps {
  title?: string;
  items: TMDBContent[];
}

export function SimilarContent({
  title = "More Like This",
  items,
}: SimilarContentProps) {
  if (!items.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-sm font-semibold tracking-wider uppercase text-text-secondary mb-6">
        {title}
      </h2>
      <ContentCarousel items={items} />
    </section>
  );
}
