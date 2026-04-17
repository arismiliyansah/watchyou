import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import type { TMDBCastMember } from "@/types/tmdb";

interface CastListProps {
  cast: TMDBCastMember[];
}

export function CastList({ cast }: CastListProps) {
  const visibleCast = cast.slice(0, 12);

  if (!visibleCast.length) return null;

  return (
    <section className="py-10">
      <h2 className="text-sm font-semibold tracking-wider uppercase text-text-secondary mb-6">
        Cast
      </h2>
      <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visibleCast.map((member, index) => (
          <div
            key={`${member.id}-${index}`}
            className="flex-none w-28 group"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden mb-3 border border-border/30 group-hover:border-primary/30 transition-all duration-500 group-hover:glow-violet">
              <Image
                src={getImageUrl(member.profile_path, "w185")}
                alt={member.name}
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-xs font-medium text-text-primary text-center truncate">
              {member.name}
            </p>
            <p className="text-[11px] text-text-tertiary text-center truncate">
              {member.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
