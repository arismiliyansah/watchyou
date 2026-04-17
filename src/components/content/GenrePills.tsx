import { cn } from "@/lib/utils";

interface GenrePillsProps {
  genres: { id: number; name: string }[];
  className?: string;
}

export function GenrePills({ genres, className }: GenrePillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-text-secondary hover:bg-white/15 hover:text-text-primary transition-all duration-300 cursor-default"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}
