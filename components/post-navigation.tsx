import type { Post } from "@/data/blog";
import Link from "next/link";

export function PostNavigation({
  older,
  newer,
}: {
  older: Post | null;
  newer: Post | null;
}) {
  if (!older && !newer) return null;

  return (
    <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-border/60 pt-8">
      <div>
        {older && (
          <Link
            href={`/blog/${older.slug}`}
            className="group flex flex-col gap-1"
          >
            <span className="text-xs text-muted-foreground">&larr; Older</span>
            <span className="text-sm font-medium tracking-tight group-hover:underline">
              {older.metadata.title}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {newer && (
          <Link
            href={`/blog/${newer.slug}`}
            className="group flex flex-col items-end gap-1"
          >
            <span className="text-xs text-muted-foreground">Newer &rarr;</span>
            <span className="text-sm font-medium tracking-tight group-hover:underline">
              {newer.metadata.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
