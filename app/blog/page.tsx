import BlurFade from "@/components/magicui/blur-fade";
import { FilterablePosts } from "@/components/filterable-posts";
import { getAllTags, getSearchIndex } from "@/data/blog";
import { DATA } from "@/data/resume";
import { Rss } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Notes on AI, machine learning, and building software.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getSearchIndex(), getAllTags()]);
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  return (
    <section>
      <header className="mb-8">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {DATA.name}
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
          <h1 className="mt-2 text-balance bg-linear-to-br from-foreground via-foreground to-brand bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
            Writing
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="mt-3 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Notes on AI, machine learning, and building software — plus the
            occasional deep dive into the things I&apos;m learning.
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground transition-colors hover:text-brand"
                >
                  <social.icon className="size-4" />
                </Link>
              ))}
            </div>
            <span className="h-4 w-px bg-border" />
            <a
              href="/rss.xml"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-brand"
            >
              <Rss className="size-3.5" />
              RSS
            </a>
          </div>
        </BlurFade>
      </header>

      <FilterablePosts posts={posts} tags={tags} />
    </section>
  );
}
