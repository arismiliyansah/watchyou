"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-red-400">!</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-text-tertiary mb-8 leading-relaxed">
          We encountered an unexpected error. This might be temporary — try
          refreshing the page.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/90 hover:bg-primary text-white font-medium text-sm transition-all duration-500 hover:glow-violet hover:scale-105"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-border/30 text-sm text-text-secondary hover:text-text-primary hover:border-primary/30 transition-all duration-500"
          >
            Go Home
          </Link>
        </div>
        <p className="mt-10 text-[11px] text-text-tertiary">
          Built by{" "}
          <a
            href="https://crafyne.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary transition-colors"
          >
            Crafyne
          </a>
        </p>
      </div>
    </div>
  );
}
