"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/Toast";

interface WatchlistEntry {
  id: string;
  tmdbId: number;
  mediaType: string;
}

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data);
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, []);

  const isInWatchlist = useCallback(
    (tmdbId: number, mediaType: string) => {
      return items.some(
        (item) => item.tmdbId === tmdbId && item.mediaType === mediaType
      );
    },
    [items]
  );

  const toggle = useCallback(
    async (tmdbId: number, mediaType: string, title: string, posterPath: string | null) => {
      const existing = items.find(
        (item) => item.tmdbId === tmdbId && item.mediaType === mediaType
      );

      if (existing) {
        setItems((prev) => prev.filter((i) => i.id !== existing.id));
        toast(`Removed "${title}" from My List`, "info");
        await fetch(`/api/watchlist/${existing.id}`, { method: "DELETE" }).catch(() => {
          setItems((prev) => [...prev, existing]);
          toast("Failed to remove. Try again.", "error");
        });
      } else {
        const tempId = `temp-${Date.now()}`;
        const newItem = { id: tempId, tmdbId, mediaType };
        setItems((prev) => [...prev, newItem]);
        toast(`Added "${title}" to My List`, "success");

        try {
          const res = await fetch("/api/watchlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tmdbId, mediaType, title, posterPath }),
          });

          if (res.ok) {
            const created = await res.json();
            setItems((prev) =>
              prev.map((i) => (i.id === tempId ? { ...i, id: created.id } : i))
            );
          } else if (res.status === 401) {
            setItems((prev) => prev.filter((i) => i.id !== tempId));
            toast("Sign in to save your list", "error");
            window.location.href = "/login";
          } else {
            setItems((prev) => prev.filter((i) => i.id !== tempId));
            toast("Failed to add. Try again.", "error");
          }
        } catch {
          setItems((prev) => prev.filter((i) => i.id !== tempId));
          toast("Something went wrong", "error");
        }
      }
    },
    [items, toast]
  );

  return { items, isLoaded, isInWatchlist, toggle };
}
