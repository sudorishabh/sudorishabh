import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type PostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  image?: string;
  author?: string;
  draft: boolean;
};

export type TocItem = {
  level: number;
  text: string;
  slug: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  /** Rendered HTML of the post body. */
  source: string;
  /** Table of contents built from h2/h3 headings. */
  toc: TocItem[];
  /** Estimated reading time, in whole minutes. */
  readingTime: number;
  wordCount: number;
};

/**
 * The subset of a post needed to render a list row. Excludes the heavy
 * rendered `source`/`toc` so list pages don't ship full post HTML to the
 * client (a full `Post` is assignable to this).
 */
export type PostPreview = {
  slug: string;
  readingTime: number;
  metadata: Pick<PostMetadata, "title" | "publishedAt" | "summary" | "tags">;
};

const POSTS_DIR = path.join(process.cwd(), "content");

/** Turn heading/tag text into a URL-safe slug (mirrors components/mdx.tsx). */
export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function normalizeTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/** Recursively collect the visible text of a hast node. */
function getNodeText(node: any): string {
  if (node.type === "text") return node.value ?? "";
  if (Array.isArray(node.children)) {
    return node.children.map(getNodeText).join("");
  }
  return "";
}

/**
 * Custom rehype plugin: assigns an `id` to every heading and collects h2/h3
 * headings into `toc` so we can render a table of contents. Dependency-free so
 * we get IDs + TOC in a single pass over the tree.
 */
function rehypeHeadings(toc: TocItem[]) {
  return (tree: any) => {
    const seen = new Map<string, number>();

    const walk = (node: any) => {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        const level = Number(node.tagName[1]);
        const text = getNodeText(node).trim();
        let slug = slugify(text);
        // Guarantee unique ids when two headings share a title.
        if (seen.has(slug)) {
          const n = (seen.get(slug) ?? 0) + 1;
          seen.set(slug, n);
          slug = `${slug}-${n}`;
        } else {
          seen.set(slug, 0);
        }
        node.properties = node.properties || {};
        if (!node.properties.id) node.properties.id = slug;
        if (level >= 2 && level <= 3 && text) {
          toc.push({ level, text, slug });
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };

    walk(tree);
  };
}

async function markdownToHTML(markdown: string) {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(() => rehypeHeadings(toc))
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), toc };
}

function computeReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return { wordCount: words, minutes: Math.max(1, Math.round(words / 200)) };
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(raw);
  const { html, toc } = await markdownToHTML(rawContent);
  const { wordCount, minutes } = computeReadingTime(rawContent);

  const metadata: PostMetadata = {
    title: data.title ?? slug,
    publishedAt: data.publishedAt ?? "",
    summary: data.summary ?? "",
    tags: normalizeTags(data.tags),
    image: data.image,
    author: data.author,
    draft: Boolean(data.draft),
  };

  return {
    slug,
    metadata,
    source: html,
    toc,
    readingTime: minutes,
    wordCount,
  };
}

/**
 * All publishable posts, newest first. Drafts are visible in development but
 * hidden from production builds.
 */
export async function getBlogPosts(): Promise<Post[]> {
  const files = getMDXFiles(POSTS_DIR);
  const posts = await Promise.all(
    files.map((file) => getPost(path.basename(file, path.extname(file)))),
  );

  const isDev = process.env.NODE_ENV === "development";

  return posts
    .filter((post): post is Post => post !== null)
    .filter((post) => isDev || !post.metadata.draft)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );
}

export type TagSummary = { tag: string; slug: string; count: number };

/** Every tag used across published posts, most-used first. */
export async function getAllTags(): Promise<TagSummary[]> {
  const posts = await getBlogPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.metadata.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: slugify(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Published posts that carry the given tag (matched by slug). */
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) =>
    post.metadata.tags.some((tag) => slugify(tag) === tagSlug),
  );
}

/** The chronologically adjacent posts, for prev/next navigation. */
export async function getPostNeighbors(
  slug: string,
): Promise<{ older: Post | null; newer: Post | null }> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { older: null, newer: null };

  // posts are sorted newest-first, so the previous index is the newer post.
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
