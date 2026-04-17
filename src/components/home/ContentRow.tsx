import Link from "next/link";
import { ContentCarousel } from "@/components/content/ContentCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { TMDBContent } from "@/types/tmdb";

interface ContentRowProps {
  title: string;
  href?: string;
  items: TMDBContent[];
}

export function ContentRow({ title, href, items }: ContentRowProps) {
  if (!items.length) return null;

  return (
    <ScrollReveal>
      <section className="py-8 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <h2 className="text-sm md:text-base font-semibold tracking-wider uppercase text-text-secondary">
              {title}
            </h2>
            {href && (
              <Link
                href={href}
                className="text-xs font-medium text-text-tertiary hover:text-primary transition-colors duration-500 tracking-wide uppercase"
              >
                See All
              </Link>
            )}
          </div>

          {/* Carousel */}
          <ContentCarousel items={items} />
        </div>
      </section>
    </ScrollReveal>
  );
}
