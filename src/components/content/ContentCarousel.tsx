"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentCard } from "./ContentCard";
import { ContentCardSkeleton } from "./ContentCardSkeleton";
import type { TMDBContent } from "@/types/tmdb";

interface ContentCarouselProps {
  items: TMDBContent[];
  isLoading?: boolean;
}

export function ContentCarousel({
  items,
  isLoading = false,
}: ContentCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 2,
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ContentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="group/carousel relative">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3 md:gap-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex-none w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] xl:w-[15.5%]"
            >
              <ContentCard content={item} priority={index < 6} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows — appear on section hover */}
      <button
        onClick={scrollPrev}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2",
          "w-10 h-10 rounded-full glass flex items-center justify-center",
          "border border-border/50 text-text-primary",
          "opacity-0 group-hover/carousel:opacity-100 transition-all duration-500",
          "hover:bg-white/10 hover:glow-violet hover:scale-110",
          "z-20"
        )}
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={scrollNext}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-2",
          "w-10 h-10 rounded-full glass flex items-center justify-center",
          "border border-border/50 text-text-primary",
          "opacity-0 group-hover/carousel:opacity-100 transition-all duration-500",
          "hover:bg-white/10 hover:glow-violet hover:scale-110",
          "z-20"
        )}
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
