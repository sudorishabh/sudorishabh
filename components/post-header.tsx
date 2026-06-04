import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { slugify, type Post } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const DELAY = 0.04;

export function PostHeader({ post }: { post: Post }) {
  const author = post.metadata.author ?? DATA.name;

  return (
    <header className="mb-8">
      <BlurFade delay={DELAY}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Blog
        </Link>
      </BlurFade>

      {post.metadata.tags.length > 0 && (
        <BlurFade delay={DELAY * 2}>
          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1">
            {post.metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${slugify(tag)}`}
                className="text-xs font-medium uppercase tracking-wider text-brand/90 transition-colors hover:text-brand"
              >
                {tag}
              </Link>
            ))}
          </div>
        </BlurFade>
      )}

      <BlurFade delay={DELAY * 3}>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl">
          {post.metadata.title}
        </h1>
      </BlurFade>

      {post.metadata.summary && (
        <BlurFade delay={DELAY * 4}>
          <p className="mt-4 text-balance text-lg leading-relaxed text-muted-foreground">
            {post.metadata.summary}
          </p>
        </BlurFade>
      )}

      <BlurFade delay={DELAY * 5}>
        <div className="mt-6 flex items-center gap-3">
          <Avatar className="size-9 border">
            <AvatarImage src={DATA.avatarUrl} alt={author} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-foreground">{author}</span>
            <span className="text-xs text-muted-foreground">
              <time dateTime={post.metadata.publishedAt}>
                {formatDate(post.metadata.publishedAt)}
              </time>
              {" · "}
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </BlurFade>

      {post.metadata.image && (
        <BlurFade delay={DELAY * 6}>
          <div className="mt-8 overflow-hidden rounded-xl border border-border/60">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={630}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </BlurFade>
      )}

      <BlurFade delay={DELAY * 6.5}>
        <hr className="mt-8 border-border" />
      </BlurFade>
    </header>
  );
}
