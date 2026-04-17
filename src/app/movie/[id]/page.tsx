import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DetailHero } from "@/components/detail/DetailHero";
import { CastList } from "@/components/detail/CastList";
import { SimilarContent } from "@/components/detail/SimilarContent";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getMovieDetails } from "@/lib/tmdb";
import { getBackdropUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(Number(id));
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.backdrop_path
          ? [getBackdropUrl(movie.backdrop_path, "w1280")]
          : [],
      },
    };
  } catch {
    return { title: "Movie Not Found" };
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  let movie;
  try {
    movie = await getMovieDetails(Number(id));
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <DetailHero
          tmdbId={movie.id}
          mediaType="movie"
          title={movie.title}
          tagline={movie.tagline}
          overview={movie.overview}
          backdropPath={movie.backdrop_path}
          posterPath={movie.poster_path}
          voteAverage={movie.vote_average}
          releaseDate={movie.release_date}
          runtime={movie.runtime}
          genres={movie.genres}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-8">
          {movie.credits?.cast && (
            <ScrollReveal>
              <CastList cast={movie.credits.cast} />
            </ScrollReveal>
          )}

          {movie.similar?.results && movie.similar.results.length > 0 && (
            <ScrollReveal>
              <SimilarContent items={movie.similar.results} />
            </ScrollReveal>
          )}

          {movie.recommendations?.results &&
            movie.recommendations.results.length > 0 && (
              <ScrollReveal>
                <SimilarContent
                  title="Recommended"
                  items={movie.recommendations.results}
                />
              </ScrollReveal>
            )}
        </div>
      </main>

      <Footer />
    </>
  );
}
