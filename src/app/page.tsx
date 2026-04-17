import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/home/HeroBanner";
import { ContentRow } from "@/components/home/ContentRow";
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getPopularTV,
  getTopRatedTV,
} from "@/lib/tmdb";

export default async function HomePage() {
  const [trending, popularMovies, topRatedMovies, upcoming, popularTV, topRatedTV] =
    await Promise.all([
      getTrending("all", "week"),
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
      getPopularTV(),
      getTopRatedTV(),
    ]);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <HeroBanner items={trending.results} />

        {/* Content Rows */}
        <div className="-mt-20 relative z-10 space-y-2">
          <ContentRow
            title="Trending This Week"
            href="/browse?sort=trending"
            items={trending.results.slice(5)}
          />
          <ContentRow
            title="Popular Movies"
            href="/browse?type=movie"
            items={popularMovies.results}
          />
          <ContentRow
            title="Top Rated"
            href="/browse?sort=top_rated"
            items={topRatedMovies.results}
          />
          <ContentRow
            title="Coming Soon"
            href="/browse?sort=upcoming"
            items={upcoming.results}
          />
          <ContentRow
            title="Popular Series"
            href="/browse?type=tv"
            items={popularTV.results}
          />
          <ContentRow
            title="Top Rated Series"
            href="/browse?type=tv&sort=top_rated"
            items={topRatedTV.results}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
