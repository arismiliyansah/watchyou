import { TMDB_BASE_URL, TMDB_API_KEY, REVALIDATE } from "./tmdb-config";
import type {
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetails,
  TMDBTVDetails,
  TMDBPaginatedResponse,
  TMDBGenre,
  TMDBSearchResult,
} from "@/types/tmdb";

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  revalidate: number = REVALIDATE.popular
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ─── Trending ────────────────────────────────────────

export async function getTrending(
  mediaType: "all" | "movie" | "tv" = "all",
  timeWindow: "day" | "week" = "week"
) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie | TMDBTVShow>>(
    `/trending/${mediaType}/${timeWindow}`,
    {},
    REVALIDATE.trending
  );
}

// ─── Movies ──────────────────────────────────────────

export async function getPopularMovies(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>("/movie/popular", {
    page: page.toString(),
  });
}

export async function getTopRatedMovies(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>("/movie/top_rated", {
    page: page.toString(),
  });
}

export async function getUpcomingMovies(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>("/movie/upcoming", {
    page: page.toString(),
  });
}

export async function getNowPlayingMovies(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>("/movie/now_playing", {
    page: page.toString(),
  });
}

export async function getMovieDetails(id: number) {
  return tmdbFetch<TMDBMovieDetails>(
    `/movie/${id}`,
    { append_to_response: "videos,credits,similar,recommendations,images" },
    REVALIDATE.details
  );
}

// ─── TV Shows ────────────────────────────────────────

export async function getPopularTV(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>("/tv/popular", {
    page: page.toString(),
  });
}

export async function getTopRatedTV(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>("/tv/top_rated", {
    page: page.toString(),
  });
}

export async function getAiringTodayTV(page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>("/tv/airing_today", {
    page: page.toString(),
  });
}

export async function getTVDetails(id: number) {
  return tmdbFetch<TMDBTVDetails>(
    `/tv/${id}`,
    { append_to_response: "videos,credits,similar,recommendations,images" },
    REVALIDATE.details
  );
}

// ─── Discover ────────────────────────────────────────

export interface DiscoverFilters {
  page?: number;
  with_genres?: string;
  sort_by?: string;
  "vote_average.gte"?: string;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "first_air_date.gte"?: string;
  "first_air_date.lte"?: string;
}

export async function discoverMovies(filters: DiscoverFilters = {}) {
  const params: Record<string, string> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) params[key] = value.toString();
  });
  return tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
    "/discover/movie",
    params,
    REVALIDATE.popular
  );
}

export async function discoverTV(filters: DiscoverFilters = {}) {
  const params: Record<string, string> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) params[key] = value.toString();
  });
  return tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>(
    "/discover/tv",
    params,
    REVALIDATE.popular
  );
}

// ─── Search ──────────────────────────────────────────

export async function searchMulti(query: string, page: number = 1) {
  return tmdbFetch<TMDBPaginatedResponse<TMDBSearchResult>>(
    "/search/multi",
    { query, page: page.toString() },
    REVALIDATE.search
  );
}

// ─── Genres ──────────────────────────────────────────

export async function getMovieGenres() {
  const data = await tmdbFetch<{ genres: TMDBGenre[] }>(
    "/genre/movie/list",
    {},
    REVALIDATE.genres
  );
  return data.genres;
}

export async function getTVGenres() {
  const data = await tmdbFetch<{ genres: TMDBGenre[] }>(
    "/genre/tv/list",
    {},
    REVALIDATE.genres
  );
  return data.genres;
}
