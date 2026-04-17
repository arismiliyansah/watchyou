"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, getImageUrl } from "@/lib/utils";
import type { TMDBSeason } from "@/types/tmdb";

interface SeasonSelectorProps {
  seasons: TMDBSeason[];
}

export function SeasonSelector({ seasons }: SeasonSelectorProps) {
  const validSeasons = seasons.filter((s) => s.season_number > 0);
  const [selectedSeason, setSelectedSeason] = useState(
    validSeasons[0]?.season_number ?? 1
  );

  const current = validSeasons.find((s) => s.season_number === selectedSeason);

  if (!validSeasons.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-sm font-semibold tracking-wider uppercase text-text-secondary mb-6">
        Seasons
      </h2>

      {/* Season pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        {validSeasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setSelectedSeason(season.season_number)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-500",
              selectedSeason === season.season_number
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-white/5 text-text-secondary border border-transparent hover:bg-white/10 hover:text-text-primary"
            )}
          >
            Season {season.season_number}
          </button>
        ))}
      </div>

      {/* Selected Season Info */}
      {current && (
        <div className="flex gap-6 p-5 rounded-2xl bg-surface border border-border/30 animate-fade-in">
          {current.poster_path && (
            <div className="hidden sm:block shrink-0 w-32 aspect-[2/3] rounded-xl overflow-hidden">
              <Image
                src={getImageUrl(current.poster_path, "w300")}
                alt={current.name}
                width={128}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {current.name}
            </h3>
            <p className="text-sm text-text-tertiary mb-3">
              {current.episode_count} Episodes
              {current.air_date && ` · ${new Date(current.air_date).getFullYear()}`}
            </p>
            {current.overview && (
              <p className="text-sm text-text-secondary leading-relaxed">
                {current.overview}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
