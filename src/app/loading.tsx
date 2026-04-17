import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="relative w-full h-screen max-h-[900px]">
        <Skeleton className="w-full h-full rounded-none" />

        {/* Content overlay skeleton */}
        <div className="absolute bottom-32 left-0 px-6 md:px-8 max-w-[1400px] mx-auto w-full">
          <Skeleton className="w-24 h-6 rounded-full mb-4" />
          <Skeleton className="w-96 h-16 mb-4" />
          <Skeleton className="w-32 h-5 mb-4" />
          <Skeleton className="w-[500px] h-12 mb-8" />
          <div className="flex gap-4">
            <Skeleton className="w-36 h-12 rounded-full" />
            <Skeleton className="w-36 h-12 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content Row Skeletons */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="py-8 md:py-10 max-w-[1400px] mx-auto px-6 md:px-8">
          <Skeleton className="w-40 h-5 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, j) => (
              <Skeleton key={j} className="aspect-[2/3] rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
