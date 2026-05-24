import BlurFade from "@/components/magicui/blur-fade";
import { FilterablePosts } from "@/components/filterable-posts";
import { getAllTags, getBlogPosts, type PostPreview } from "@/data/blog";

export const metadata = {
  title: "Blog",
  description: "Notes on AI, machine learning, and building software.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getBlogPosts(), getAllTags()]);

  // Strip the heavy rendered source/toc before handing posts to the client.
  const previews: PostPreview[] = posts.map((post) => ({
    slug: post.slug,
    readingTime: post.readingTime,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      tags: post.metadata.tags,
    },
  }));

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-2 text-2xl font-medium tracking-tighter">blog</h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <p className="mb-8 text-sm text-muted-foreground">
          Notes on AI, machine learning, and building software.
        </p>
      </BlurFade>

      <FilterablePosts posts={previews} tags={tags} />
    </section>
  );
}
