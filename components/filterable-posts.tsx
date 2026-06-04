"use client";

import { FeaturedPost } from "@/components/featured-post";
import BlurFade from "@/components/magicui/blur-fade";
import { PostList } from "@/components/post-list";
import type { SearchablePost, TagSummary } from "@/data/blog";
import { tagPillClass } from "@/lib/utils";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const BLUR_FADE_DELAY = 0.04;

export function FilterablePosts({
  posts,
  tags,
}: {
  posts: SearchablePost[];
  tags: TagSummary[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const isDefault = query.trim() === "" && active === null;

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      const matchesTag = !active || post.metadata.tags.includes(active);
      const matchesQuery = terms.every((term) => post.searchText.includes(term));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, active]);

  // In the default (unfiltered) view, the newest post is highlighted.
  const featured = isDefault && filtered.length > 0 ? filtered[0] : null;
  const listPosts = featured ? filtered.slice(1) : filtered;

  return (
    <div>
      {featured && (
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="mb-10">
            <FeaturedPost post={featured} />
          </div>
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="w-full rounded-lg border border-border bg-transparent py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          />
        </div>
      </BlurFade>

      {tags.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActive(null)}
              className={tagPillClass(active === null)}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag.slug}
                type="button"
                onClick={() => setActive(active === tag.tag ? null : tag.tag)}
                className={tagPillClass(active === tag.tag)}
              >
                {tag.tag}
                <span className="ml-1.5 opacity-60">{tag.count}</span>
              </button>
            ))}
          </div>
        </BlurFade>
      )}

      {!isDefault && (
        <p className="mb-6 text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
      )}

      {listPosts.length > 0 ? (
        <PostList posts={listPosts} />
      ) : (
        filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No posts match your search.
          </p>
        )
      )}
    </div>
  );
}
