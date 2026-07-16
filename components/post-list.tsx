import BlurFade from "@/components/magicui/blur-fade";
import type { PostPreview } from "@/data/blog";
import { formatShortDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function PostList({
  posts,
  startDelay = BLUR_FADE_DELAY * 2,
  emptyMessage = "No posts yet — check back soon.",
}: {
  posts: PostPreview[];
  startDelay?: number;
  emptyMessage?: string;
}) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-0.5">
      {posts.map((post, id) => (
        <BlurFade key={post.slug} delay={startDelay + id * 0.05}>
          <Link
            href={`/blog/${post.slug}`}
            className="group -mx-4 grid grid-cols-[4.5rem_1fr] gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-muted/40 sm:grid-cols-[6.5rem_1fr]"
          >
            <div className="pt-0.5 text-right">
              <time
                dateTime={post.metadata.publishedAt}
                className="block text-xs tabular-nums text-muted-foreground"
              >
                {formatShortDate(post.metadata.publishedAt)}
              </time>
              <span className="mt-0.5 block text-[11px] text-muted-foreground/70">
                {post.readingTime} min
              </span>
            </div>

            <div className="min-w-0 border-l border-border/60 pl-4 transition-colors group-hover:border-brand/50">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-medium leading-snug tracking-tight transition-colors group-hover:text-brand">
                  {post.metadata.title}
                </h2>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 -translate-x-1 text-brand opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>

              {post.metadata.summary && (
                <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {post.metadata.summary}
                </p>
              )}

              {post.metadata.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] text-brand"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
