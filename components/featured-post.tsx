import type { PostPreview } from "@/data/blog";
import { formatShortDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturedPost({ post }: { post: PostPreview }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-6 transition-colors hover:border-foreground/30 hover:bg-muted/40 sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">
          Latest
        </span>
        <time dateTime={post.metadata.publishedAt}>
          {formatShortDate(post.metadata.publishedAt)}
        </time>
        <span aria-hidden className="text-border">
          &middot;
        </span>
        <span>{post.readingTime} min read</span>
      </div>

      <h2 className="mt-4 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
        {post.metadata.title}
      </h2>

      {post.metadata.summary && (
        <p className="mt-3 line-clamp-3 leading-relaxed text-muted-foreground">
          {post.metadata.summary}
        </p>
      )}

      {post.metadata.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        Read post
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
