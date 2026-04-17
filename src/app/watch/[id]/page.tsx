import { notFound } from "next/navigation";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { PlayerOverlay } from "@/components/player/PlayerOverlay";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}

export const metadata = {
  title: "Watch",
};

export default async function WatchPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { type } = await searchParams;
  const mediaType = type === "tv" ? "tv" : "movie";

  let title = "";
  let videoKey: string | null = null;
  let backdropPath: string | null = null;

  try {
    if (mediaType === "tv") {
      const series = await getTVDetails(Number(id));
      title = series.name;
      backdropPath = series.backdrop_path;
      videoKey =
        series.videos?.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
        )?.key ||
        series.videos?.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        )?.key ||
        series.videos?.results.find((v) => v.site === "YouTube")?.key ||
        null;
    } else {
      const movie = await getMovieDetails(Number(id));
      title = movie.title;
      backdropPath = movie.backdrop_path;
      videoKey =
        movie.videos?.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
        )?.key ||
        movie.videos?.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        )?.key ||
        movie.videos?.results.find((v) => v.site === "YouTube")?.key ||
        null;
    }
  } catch {
    notFound();
  }

  const backHref = `/${mediaType === "tv" ? "series" : "movie"}/${id}`;

  return (
    <main className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      <PlayerOverlay backHref={backHref} title={title} />

      <div className="w-full max-w-7xl aspect-video">
        <VideoPlayer
          videoKey={videoKey}
          title={title}
          backdropPath={backdropPath}
        />
      </div>
    </main>
  );
}
