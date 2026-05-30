import BlurFade from "@/components/magicui/blur-fade";
import { PostNavigation } from "@/components/post-navigation";
import { TableOfContents } from "@/components/table-of-contents";
import { getBlogPosts, getPost, getPostNeighbors, slugify } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
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

      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to blog
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <h1 className="title text-2xl font-medium tracking-tighter text-balance">
          {post.metadata.title}
        </h1>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mt-3 mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
          <span aria-hidden className="text-border">
            &middot;
          </span>
          <span>{post.readingTime} min read</span>
          {post.metadata.tags.length > 0 && (
            <>
              <span aria-hidden className="text-border">
                &middot;
              </span>
              <span className="flex flex-wrap gap-x-2">
                {post.metadata.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${slugify(tag)}`}
                    className="text-muted-foreground/70 transition-colors hover:text-foreground"
                  >
                    #{tag}
                  </Link>
                ))}
              </span>
            </>
          )}
        </div>
      </BlurFade>

      {post.toc.length >= 2 && (
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <TableOfContents items={post.toc} />
        </BlurFade>
      )}

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <article
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.source }}
        />
      </BlurFade>

      <PostNavigation older={older} newer={newer} />
    </section>
  );
}
