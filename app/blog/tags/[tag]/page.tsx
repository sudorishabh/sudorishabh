import BlurFade from "@/components/magicui/blur-fade";
import { PostList } from "@/components/post-list";
import { getAllTags, getPostsByTag } from "@/data/blog";
import { tagPillClass } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata | undefined> {
  const { tag } = await params;
  const match = (await getAllTags()).find((t) => t.slug === tag);

  if (!match) return;

  return {
    title: `#${match.tag}`,
    description: `Posts tagged ${match.tag}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const [posts, tags] = await Promise.all([getPostsByTag(tag), getAllTags()]);
  const match = tags.find((t) => t.slug === tag);

  if (!match || posts.length === 0) {
    notFound();
  }

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; All posts
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <h1 className="mb-2 text-2xl font-medium tracking-tighter">
          #{match.tag}
        </h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
        <p className="mb-8 text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/blog/tags/${t.slug}`}
              className={tagPillClass(t.slug === tag)}
            >
              {t.tag}
              <span className="ml-1.5 opacity-60">{t.count}</span>
            </Link>
          ))}
        </div>
      </BlurFade>

      <PostList posts={posts} startDelay={BLUR_FADE_DELAY * 4} />
    </section>
  );
}
