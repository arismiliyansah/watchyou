import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-r from-surface via-surface-hover to-surface bg-[length:400%_100%] animate-shimmer",
        className
      )}
    />
  );
}
