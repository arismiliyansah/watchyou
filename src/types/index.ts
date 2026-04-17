export interface WatchlistItem {
  id: string;
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string | null;
  addedAt: Date;
}

export interface WatchHistoryItem {
  id: string;
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string | null;
  watchedAt: Date;
}

export interface UserPreferences {
  favoriteGenres: number[];
  language: string;
}
