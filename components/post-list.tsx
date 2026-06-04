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
            className="group -mx-4 flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-muted/40"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="flex items-center gap-1 font-medium tracking-tight">
                {post.metadata.title}
                <ArrowUpRight className="size-3.5 shrink-0 -translate-y-px text-brand opacity-0 transition-opacity group-hover:opacity-100" />
              </h2>
              <time
                dateTime={post.metadata.publishedAt}
                className="shrink-0 text-xs tabular-nums text-muted-foreground"
              >
                {formatShortDate(post.metadata.publishedAt)}
              </time>
            </div>

            {post.metadata.summary && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {post.metadata.summary}
              </p>
            )}

            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{post.readingTime} min read</span>
              {post.metadata.tags.length > 0 && (
                <>
                  <span aria-hidden className="text-border">
                    &middot;
                  </span>
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand/10 px-2 py-0.5 text-[11px] text-brand"
                    >
                      #{tag}
                    </span>
                  ))}
                </>
              )}
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
