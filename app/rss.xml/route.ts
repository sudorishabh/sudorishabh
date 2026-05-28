import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

// Prerender the feed at build time; it only changes when posts change.
export const dynamic = "force-static";

const BLOG_TITLE = `${DATA.name} — Blog`;
const BLOG_DESCRIPTION = "Notes on AI, machine learning, and building software.";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const site = DATA.url;
  const posts = await getBlogPosts();

  const items = posts
    .map((post) => {
      const url = `${site}/blog/${post.slug}`;
      const pubDate = post.metadata.publishedAt
        ? new Date(post.metadata.publishedAt).toUTCString()
        : "";
      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>${
        pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ""
      }
      <description>${escapeXml(post.metadata.summary)}</description>
${post.metadata.tags
  .map((tag) => `      <category>${escapeXml(tag)}</category>`)
  .join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_TITLE)}</title>
    <link>${site}/blog</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
