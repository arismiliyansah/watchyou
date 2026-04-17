"use client";

import { createContext, useContext } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";

type WatchlistContextType = ReturnType<typeof useWatchlist>;

const WatchlistContext = createContext<WatchlistContextType | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const watchlist = useWatchlist();
  return (
    <WatchlistContext.Provider value={watchlist}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlistContext must be used within WatchlistProvider");
  return ctx;
}
