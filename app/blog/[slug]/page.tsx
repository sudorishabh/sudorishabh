import BlurFade from "@/components/magicui/blur-fade";
import { PostHeader } from "@/components/post-header";
import { PostNavigation } from "@/components/post-navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { getBlogPosts, getPost, getPostNeighbors } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { older, newer } = await getPostNeighbors(slug);

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: post.metadata.author ?? DATA.name,
            },
          }),
        }}
      />

      <PostHeader post={post} />

      {post.toc.length >= 2 && (
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <TableOfContents items={post.toc} />
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 8}>
        <article
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.source }}
        />
      </BlurFade>

      <PostNavigation older={older} newer={newer} />
    </section>
  );
}
