"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrailerModalProps {
  videoKey: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TrailerModal({ videoKey, isOpen, onClose }: TrailerModalProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const plyrInstance = useRef<unknown>(null);

  useEffect(() => {
    if (!isOpen || !videoKey || !playerRef.current) return;

    let destroyed = false;

    import("plyr").then(({ default: Plyr }) => {
      if (destroyed || !playerRef.current) return;

      import("plyr/dist/plyr.css");

      plyrInstance.current = new Plyr(playerRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
        settings: ["quality", "speed"],
        autoplay: true,
        tooltips: { controls: true, seek: true },
        keyboard: { focused: true, global: false },
      });
    });

    return () => {
      destroyed = true;
      if (plyrInstance.current) {
        (plyrInstance.current as { destroy: () => void }).destroy();
      }
      plyrInstance.current = null;
    };
  }, [isOpen, videoKey]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoKey) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "animate-fade-in"
      )}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="plyr-wrapper relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden glass-strong border border-border/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Close trailer"
        >
          <X size={18} />
        </button>

        <div
          ref={playerRef}
          data-plyr-provider="youtube"
          data-plyr-embed-id={videoKey}
        />
      </div>
    </div>
  );
}
