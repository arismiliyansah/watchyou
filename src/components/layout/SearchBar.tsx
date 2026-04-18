"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SearchBar({ isOpen, onToggle }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (isOpen) {
      // Small delay to let animation start before focusing
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, router]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggle();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onToggle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onToggle();
    }
  };

  return (
    <>
      {/* Search icon trigger */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-all duration-500"
        aria-label="Search"
      >
        <Search size={16} className="text-text-secondary" />
      </button>

      {/* Full-width overlay */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
        style={{
          transitionDuration: "400ms",
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={onToggle}
        />

        {/* Search bar */}
        <div className="relative px-6 md:px-8 py-6">
          <form
            onSubmit={handleSubmit}
            className="max-w-[800px] mx-auto flex items-center gap-3 px-6 py-4 rounded-full glass-strong border border-border/50"
          >
            <Search size={20} className="text-text-tertiary shrink-0" />

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies & series..."
              className="flex-1 bg-transparent text-lg text-text-primary placeholder:text-text-tertiary outline-none border-none shadow-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors duration-300"
                aria-label="Clear search"
              >
                <X size={16} className="text-text-tertiary" />
              </button>
            )}

            {query.trim().length >= 2 && (
              <button
                type="submit"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors duration-300"
                aria-label="Submit search"
              >
                <ArrowRight size={16} className="text-primary" />
              </button>
            )}

            <button
              type="button"
              onClick={onToggle}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors duration-300"
              aria-label="Close search"
            >
              <X size={18} className="text-text-secondary" />
            </button>
          </form>

          <p className="text-center mt-3 text-xs text-text-tertiary">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-border/30 text-[10px] font-mono">ESC</kbd> to close
          </p>
        </div>
      </div>
    </>
  );
}
