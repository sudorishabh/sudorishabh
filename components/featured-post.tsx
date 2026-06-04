import type { PostPreview } from "@/data/blog";
import { formatShortDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturedPost({ post }: { post: PostPreview }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-5 transition-colors hover:border-brand/40 hover:bg-muted/40 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="rounded-full bg-brand px-2 py-0.5 font-medium text-background">
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

      <h2 className="mt-3 text-balance text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
        {post.metadata.title}
      </h2>

      {post.metadata.summary && (
        <p className="mt-2 line-clamp-2 leading-snug text-muted-foreground">
          {post.metadata.summary}
        </p>
      )}

      {post.metadata.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs text-brand"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
        Read post
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
