export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  popularity: number;
  media_type?: "movie";
}

export interface TMDBTVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  origin_country: string[];
  media_type?: "tv";
}

export type TMDBContent = TMDBMovie | TMDBTVShow;

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBImage {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  genres: TMDBGenre[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  videos?: { results: TMDBVideo[] };
  credits?: { cast: TMDBCastMember[]; crew: TMDBCrewMember[] };
  similar?: TMDBPaginatedResponse<TMDBMovie>;
  recommendations?: TMDBPaginatedResponse<TMDBMovie>;
  images?: { backdrops: TMDBImage[]; posters: TMDBImage[] };
}

export interface TMDBTVDetails extends TMDBTVShow {
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  tagline: string;
  status: string;
  homepage: string;
  genres: TMDBGenre[];
  created_by: { id: number; name: string; profile_path: string | null }[];
  seasons: TMDBSeason[];
  videos?: { results: TMDBVideo[] };
  credits?: { cast: TMDBCastMember[]; crew: TMDBCrewMember[] };
  similar?: TMDBPaginatedResponse<TMDBTVShow>;
  recommendations?: TMDBPaginatedResponse<TMDBTVShow>;
  images?: { backdrops: TMDBImage[]; posters: TMDBImage[] };
}

export interface TMDBSeason {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
  vote_average: number;
}

export interface TMDBSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  overview?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  profile_path?: string | null;
}

// Helper type guards
export function isMovie(content: TMDBContent): content is TMDBMovie {
  return "title" in content;
}

export function isTVShow(content: TMDBContent): content is TMDBTVShow {
  return "name" in content && !("title" in content);
}

export function getContentTitle(content: TMDBContent): string {
  return isMovie(content) ? content.title : content.name;
}

export function getContentDate(content: TMDBContent): string {
  return isMovie(content) ? content.release_date : content.first_air_date;
}
