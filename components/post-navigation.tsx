import type { Post } from "@/data/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    <nav className="mt-8 grid gap-4 sm:grid-cols-2">
      {older ? (
        <Link
          href={`/blog/${older.slug}`}
          className="group flex flex-col gap-2 rounded-xl border border-border/60 p-4 transition-colors hover:border-foreground/30 hover:bg-muted/40"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="size-3" /> Older
          </span>
          <span className="line-clamp-2 text-sm font-medium tracking-tight group-hover:underline">
            {older.metadata.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {newer ? (
        <Link
          href={`/blog/${newer.slug}`}
          className="group flex flex-col items-end gap-2 rounded-xl border border-border/60 p-4 text-right transition-colors hover:border-foreground/30 hover:bg-muted/40"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Newer <ArrowRight className="size-3" />
          </span>
          <span className="line-clamp-2 text-sm font-medium tracking-tight group-hover:underline">
            {newer.metadata.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
