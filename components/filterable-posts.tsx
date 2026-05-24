"use client";

import { PostList } from "@/components/post-list";
import type { PostPreview, TagSummary } from "@/data/blog";
import { tagPillClass } from "@/lib/utils";
import { useState } from "react";

export function FilterablePosts({
  posts,
  tags,
}: {
  posts: PostPreview[];
  tags: TagSummary[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? posts.filter((post) => post.metadata.tags.includes(active))
    : posts;

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
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
      )}

      <PostList
        posts={filtered}
        emptyMessage={
          active ? `No posts tagged "${active}" yet.` : "No posts yet — check back soon."
        }
      />
    </div>
  );
}
