"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerOverlayProps {
  backHref: string;
  title: string;
}

export function PlayerOverlay({ backHref, title }: PlayerOverlayProps) {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 2000);
    };

    // Hide after initial delay
    timeoutRef.current = setTimeout(() => setVisible(false), 2000);

    window.addEventListener("mousemove", show);
    window.addEventListener("touchstart", show);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", show);
      window.removeEventListener("touchstart", show);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
    >
      <Link
        href={backHref}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-primary hover:bg-white/10 transition-all duration-500 border border-border/30"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <h1 className="text-sm font-medium text-text-secondary truncate max-w-xs md:max-w-md">
        {title}
      </h1>

      {/* Spacer to balance layout */}
      <div className="w-[72px]" />
    </div>
  );
}
