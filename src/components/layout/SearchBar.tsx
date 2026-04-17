"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
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
      inputRef.current?.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
    }
  }, [debouncedQuery, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onToggle();
    }
  };

  return (
    <div className="relative flex items-center">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div
          className={cn(
            "flex items-center overflow-hidden transition-all duration-500",
            "rounded-full border",
            isOpen
              ? "w-48 md:w-64 border-primary/30 bg-surface glow-violet"
              : "w-9 border-transparent"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
        >
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center justify-center w-9 h-9 shrink-0"
            aria-label="Search"
          >
            <Search size={16} className="text-text-secondary" />
          </button>

          {isOpen && (
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies & series..."
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none pr-2"
            />
          )}

          {isOpen && query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex items-center justify-center w-7 h-7 mr-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} className="text-text-tertiary" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
