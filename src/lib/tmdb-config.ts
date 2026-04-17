export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const TMDB_API_KEY = process.env.TMDB_API_KEY!;

export const IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w300",
    large: "w500",
    xlarge: "w780",
  },
  backdrop: {
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
  },
} as const;

export const REVALIDATE = {
  trending: 600,      // 10 minutes
  popular: 3600,      // 1 hour
  details: 3600,      // 1 hour
  genres: 86400,      // 24 hours
  search: 0,          // no cache
} as const;
