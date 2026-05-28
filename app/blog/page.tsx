import BlurFade from "@/components/magicui/blur-fade";
import { FilterablePosts } from "@/components/filterable-posts";
import { getAllTags, getSearchIndex } from "@/data/blog";
import { Rss } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "Notes on AI, machine learning, and building software.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getSearchIndex(), getAllTags()]);

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-2 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-medium tracking-tighter">blog</h1>
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Rss className="size-3.5" />
            RSS
          </a>
        </div>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <p className="mb-8 text-sm text-muted-foreground">
          Notes on AI, machine learning, and building software.
        </p>
      </BlurFade>

      <FilterablePosts posts={posts} tags={tags} />
    </section>
  );
}
