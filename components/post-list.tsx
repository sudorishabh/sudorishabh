import BlurFade from "@/components/magicui/blur-fade";
import type { Post } from "@/data/blog";
import { formatShortDate } from "@/lib/utils";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export function PostList({
  posts,
  startDelay = BLUR_FADE_DELAY * 2,
  emptyMessage = "No posts yet — check back soon.",
}: {
  posts: Post[];
  startDelay?: number;
  emptyMessage?: string;
}) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border/50">
      {posts.map((post, id) => (
        <BlurFade key={post.slug} delay={startDelay + id * 0.05}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-1.5 py-5 transition-opacity"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium tracking-tight underline-offset-4 group-hover:underline">
                {post.metadata.title}
              </h2>
              <time
                dateTime={post.metadata.publishedAt}
                className="shrink-0 text-xs tabular-nums text-muted-foreground"
              >
                {formatShortDate(post.metadata.publishedAt)}
              </time>
            </div>

            {post.metadata.summary && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {post.metadata.summary}
              </p>
            )}

            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span>{post.readingTime} min read</span>
              {post.metadata.tags.length > 0 && (
                <>
                  <span aria-hidden className="text-border">
                    &middot;
                  </span>
                  <span className="flex flex-wrap gap-x-2">
                    {post.metadata.tags.map((tag) => (
                      <span key={tag} className="text-muted-foreground/70">
                        #{tag}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>
          </Link>
        </BlurFade>
      ))}
    </div>
  );
}
