"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Film } from "lucide-react";
import { getBackdropUrl } from "@/lib/utils";

interface VideoPlayerProps {
  videoKey?: string | null;
  title: string;
  backdropPath: string | null;
}

export function VideoPlayer({
  videoKey,
  title,
  backdropPath,
}: VideoPlayerProps) {
  const youtubeRef = useRef<HTMLDivElement>(null);
  const plyrInstance = useRef<unknown>(null);

  useEffect(() => {
    if (!videoKey || !youtubeRef.current) return;

    let destroyed = false;

    import("plyr").then(({ default: Plyr }) => {
      if (destroyed || !youtubeRef.current) return;

      import("plyr/dist/plyr.css");

      plyrInstance.current = new Plyr(youtubeRef.current, {
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
        keyboard: { focused: true, global: true },
      });
    });

    return () => {
      destroyed = true;
      if (plyrInstance.current) {
        (plyrInstance.current as { destroy: () => void }).destroy();
      }
    };
  }, [videoKey]);

  // No video available
  if (!videoKey) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-border/20">
        {backdropPath && (
          <>
            <Image
              src={getBackdropUrl(backdropPath, "w1280")}
              alt={title}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        <div className="relative text-center">
          <Film size={48} className="text-text-tertiary mx-auto mb-4" />
          <p className="text-lg font-medium text-text-secondary mb-1">
            Content Not Available
          </p>
          <p className="text-sm text-text-tertiary">
            No video available for &quot;{title}&quot; yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="plyr-wrapper relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
      <div
        ref={youtubeRef}
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoKey}
      />
    </div>
  );
}
