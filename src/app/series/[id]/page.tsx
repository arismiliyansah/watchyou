import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DetailHero } from "@/components/detail/DetailHero";
import { CastList } from "@/components/detail/CastList";
import { SimilarContent } from "@/components/detail/SimilarContent";
import { SeasonSelector } from "@/components/detail/SeasonSelector";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getTVDetails } from "@/lib/tmdb";
import { getBackdropUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const series = await getTVDetails(Number(id));
    return {
      title: series.name,
      description: series.overview,
      openGraph: {
        title: series.name,
        description: series.overview,
        images: series.backdrop_path
          ? [getBackdropUrl(series.backdrop_path, "w1280")]
          : [],
      },
    };
  } catch {
    return { title: "Series Not Found" };
  }
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { id } = await params;
  let series;
  try {
    series = await getTVDetails(Number(id));
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <DetailHero
          tmdbId={series.id}
          mediaType="tv"
          title={series.name}
          tagline={series.tagline}
          overview={series.overview}
          backdropPath={series.backdrop_path}
          posterPath={series.poster_path}
          voteAverage={series.vote_average}
          releaseDate={series.first_air_date}
          seasonCount={series.number_of_seasons}
          genres={series.genres}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          {series.seasons && series.seasons.length > 0 && (
            <ScrollReveal>
              <SeasonSelector seasons={series.seasons} />
            </ScrollReveal>
          )}

          {series.credits?.cast && (
            <ScrollReveal>
              <CastList cast={series.credits.cast} />
            </ScrollReveal>
          )}

          {series.similar?.results && series.similar.results.length > 0 && (
            <ScrollReveal>
              <SimilarContent items={series.similar.results} />
            </ScrollReveal>
          )}

          {series.recommendations?.results &&
            series.recommendations.results.length > 0 && (
              <ScrollReveal>
                <SimilarContent
                  title="Recommended"
                  items={series.recommendations.results}
                />
              </ScrollReveal>
            )}
        </div>
      </main>

      <Footer />
    </>
  );
}
