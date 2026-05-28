import { getAllTags, getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = DATA.url;
  const [posts, tags] = await Promise.all([getBlogPosts(), getAllTags()]);

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt || undefined,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${site}/blog/tags/${tag.slug}`,
  }));

  return [
    { url: site },
    { url: `${site}/blog` },
    ...postEntries,
    ...tagEntries,
  ];
}
