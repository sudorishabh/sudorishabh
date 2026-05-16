import BlurFade from "@/components/magicui/blur-fade";
import { PostList } from "@/components/post-list";
import { getBlogPosts } from "@/data/blog";

export const metadata = {
  title: "Blog",
  description: "Notes on AI, machine learning, and building software.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

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

      <PostList posts={posts} />
    </section>
  );
}
