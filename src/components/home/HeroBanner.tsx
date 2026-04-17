"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { cn, getBackdropUrl, truncateText, formatYear } from "@/lib/utils";
import type { TMDBContent } from "@/types/tmdb";
import { getContentTitle, getContentDate, isMovie } from "@/types/tmdb";

interface HeroBannerProps {
  items: TMDBContent[];
}

export function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featured = items.slice(0, 5).filter((item) => item.backdrop_path);
  const current = featured[currentIndex];

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 500);
    },
    [currentIndex, isTransitioning]
  );

  // Auto-advance every 10 seconds
  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % featured.length;
      goToSlide(nextIndex);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, featured.length, goToSlide]);

  if (!current) return null;

  const title = getContentTitle(current);
  const date = getContentDate(current);
  const mediaType = isMovie(current) ? "movie" : "series";
  const detailHref = `/${mediaType}/${current.id}`;
  const watchHref = `/watch/${current.id}?type=${isMovie(current) ? "movie" : "tv"}`;

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Backdrop Image */}
      {featured.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms]",
            index === currentIndex && !isTransitioning
              ? "opacity-100"
              : "opacity-0"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
        >
          <Image
            src={getBackdropUrl(item.backdrop_path, "original")}
            alt={getContentTitle(item)}
            fill
            className="object-cover object-center"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 gradient-left opacity-60" />
      <div className="absolute inset-0 bg-background/20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-32 md:pb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full">
          <div
            className={cn(
              "max-w-2xl transition-all duration-700",
              isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            )}
            style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
          >
            {/* Media type badge */}
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium tracking-wider uppercase text-text-secondary mb-4">
              {mediaType}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.05] mb-4">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 text-sm text-text-secondary mb-4">
              {current.vote_average > 0 && (
                <span className="flex items-center gap-1 text-accent-warm font-medium">
                  ★ {current.vote_average.toFixed(1)}
                </span>
              )}
              {date && <span>{formatYear(date)}</span>}
            </div>

            {/* Overview */}
            <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
              {truncateText(current.overview || "", 180)}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href={watchHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-background font-semibold text-sm transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
              >
                <Play size={16} fill="currentColor" />
                Watch Now
              </Link>
              <Link
                href={detailHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-text-primary font-medium text-sm transition-all duration-500 hover:bg-white/5"
              >
                <Info size={16} />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      {featured.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {featured.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "rounded-full transition-all duration-500",
                index === currentIndex
                  ? "w-8 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
