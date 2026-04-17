import { Skeleton } from "@/components/ui/Skeleton";

export function ContentCardSkeleton() {
  return (
    <div className="aspect-[2/3] rounded-xl overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
