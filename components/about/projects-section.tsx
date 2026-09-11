"use client";

import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import ProjectGallery, {
  type GalleryImage,
} from "@/components/about/project-gallery";
import SectionHeading from "@/components/about/section-heading";
import { GlassSurface } from "@/components/ui/glass";
import { instrumentSerif } from "@/lib/fonts";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
  Four fields, because a reader deciding whether to keep reading asks four
  things in this order: what is it, what was hard, what did you actually
  build, and does the stack match what I need. The old shape had one `blurb`
  doing all four jobs, which meant it did none of them -- "small tools built
  fast, kept only if they earn their place" is a sentence about taste, not
  about work.
*/
type Project = {
  name: string;
  /** One line: what the thing is, in plain words. */
  what: string;
  /** The engineering problem. Concrete, not "it had to be fast". */
  problem: string;
  /** What was built to solve it, and what that bought. */
  built: string;
  tags: string[];
  href: string;
  /** Wide UI screenshots, shown beside the text as a swipe strip. */
  images?: GalleryImage[];
  /** The lead project carries the serif name at a larger size. */
  featured?: boolean;
  /*
    Not ready to be read. A card whose Problem row says "TODO: name one" is
    worse than no card: it reads as an unfinished thought on the one page
    whose whole job is to show finished ones. Kept in the file rather than
    deleted, because the shape is right and only the facts are missing --
    fill in `problem` and `built`, drop this flag, and it ships.
  */
  draft?: boolean;
};

/** Placeholder source, matching pics-section. Drop when real captures land. */
const SEED = (name: string) =>
  `https://picsum.photos/seed/sudorishabh-${name}/1200/675`;

/*
  One project, deliberately. Entries two and three are shape without
  substance -- they name a category ("Side experiments", "Open source")
  rather than a thing that was built, and neither has the one detail that
  makes a reader believe it. They stay `draft` until they do; three cards
  where two are placeholders prove less than one that is real.
*/
const projects: Project[] = [
  {
    name: "sudorishabh.com",
    what: "This site. A glass design system over a painting, built as one material rather than a pile of effects.",
    problem:
      "Translucent panels over a photograph lose their edges, and they band visibly wherever the image shifts behind them.",
    built:
      "One CSS recipe in three densities: a lit vertical tint, a blur that lifts saturation so colour bleeds through instead of going grey, a specular top edge that fades at the shoulders, and grain to dither the banding. Every surface on the page is those four layers in that order, so no panel drifts out of sync with the rest.",
    tags: ["Next.js", "Tailwind v4", "CSS", "Server Components"],
    href: "https://github.com/sudorishabh",
    images: [
      { src: SEED("site-home"), alt: "The sudorishabh.com home page" },
      {
        src: SEED("site-about"),
        alt: "The about page over its photo backdrop",
      },
      {
        src: SEED("site-glass"),
        alt: "A glass panel refracting the gradient field",
      },
    ],
    featured: true,
  },
  {
    name: "Side experiments",
    what: "Small tools, built in a weekend and kept only if they get used.",
    problem: "TODO: name one, and say what was actually hard about it.",
    built: "TODO: what shipped, and what it bought.",
    tags: ["TypeScript", "Node"],
    href: "https://github.com/sudorishabh",
    draft: true,
  },
  {
    name: "Open source",
    what: "Patches, small libraries, and the occasional issue triage.",
    problem: "TODO: the most interesting patch, and the bug behind it.",
    built: "TODO: what landed, and where.",
    tags: ["OSS"],
    href: "https://github.com/sudorishabh",
    draft: true,
  },
];

/** What actually renders. Everything else is waiting on its facts. */
const published = projects.filter((project) => !project.draft);

/*
  One column of wide panes, not a two-up grid. The grid made the lead project
  a ~400px-tall billboard above two cramped half-width cards, and it asked the
  eye to scan in two directions at a width where only one of them survives on
  a phone. A single column reads the same way at every size, and the freed
  horizontal room is what pays for the rows below.
*/
function ProjectCard({ project }: { project: Project }) {
  const facts = [
    { label: "Problem", value: project.problem },
    { label: "Built", value: project.built },
  ];

  return (
    <GlassSurface
      className={cn(
        "group flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:gap-6 sm:p-5",
        "transition-colors duration-500 hover:border-white/20",
        "focus-within:border-white/20",
      )}>
      {project.images && (
        /* Beside the text from `sm` up, above it on phones. Held to 2/5 so a
           16:9 frame stays a reference rather than the subject. */
        <div className='shrink-0 sm:w-2/5'>
          <ProjectGallery
            images={project.images}
            label={project.name}
            sizes='(min-width: 640px) 320px, 100vw'
          />
        </div>
      )}

      <div className='flex min-w-0 flex-1 flex-col'>
        {/*
          The name is the link, not the whole card. The gallery takes swipes
          and dot presses, and a stretched overlay would eat every one of
          them; two interactive regions cannot share one box.
        */}
        <h3
          className={cn(
            project.featured
              ? cn(
                  instrumentSerif.className,
                  "text-xl tracking-[-0.01em] text-neutral-50 md:text-2xl",
                )
              : "text-base font-medium text-neutral-50",
          )}>
          <a
            href={project.href}
            target='_blank'
            rel='noreferrer'
            className='group/link inline-flex items-baseline gap-1.5 rounded-sm focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
            {project.name}
            <ArrowUpRight
              className={cn(
                "size-3.5 shrink-0 self-center text-neutral-400",
                "transition-[color,transform] duration-300",
                "group-hover/link:-translate-y-px group-hover/link:translate-x-px",
                "group-hover/link:text-white",
                "motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0",
              )}
            />
          </a>
        </h3>

        {/* What it is: the one line that has to land without the rest. */}
        <p className='mt-2 max-w-[62ch] text-sm leading-relaxed text-neutral-200'>
          {project.what}
        </p>

        {/*
          Labelled rows rather than more prose. The labels reuse the page's
          existing eyebrow treatment, so they cost no new visual vocabulary,
          and they let the detail be *skipped*: someone scanning three
          projects reads the names and the lines above them, someone who has
          stopped on one reads these.
        */}
        <dl className='mt-3.5 space-y-2 border-t border-white/[0.07] pt-3.5'>
          {facts.map((fact) => (
            <div
              key={fact.label}
              className='flex flex-col gap-0.5 sm:flex-row sm:gap-3'>
              <dt className='w-16 shrink-0 pt-px text-[10px] font-medium tracking-[0.14em] text-neutral-500 uppercase'>
                {fact.label}
              </dt>
              <dd className='max-w-[62ch] text-[13px] leading-relaxed text-neutral-400'>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className='mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 text-[11px] text-neutral-400'>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
      </div>
    </GlassSurface>
  );
}

export default function ProjectSection() {
  return (
    <section
      id='projects'
      /* Held under the `pt-20` a later section would take: this one follows
         the hero directly, and the gap between an introduction and the work
         that backs it is the last place to spend vertical space. */
      className='scroll-mt-28 pt-12 md:pt-16'>
      <SectionHeading
        icon={<FolderGit2 className='size-3' />}
        label='Projects'
        title='What I build'
      />

      <motion.ul
        className='mt-7 flex flex-col gap-4'
        initial='hidden'
        whileInView='show'
        viewport={viewport}
        variants={staggerContainer}>
        {published.map((project) => (
          <motion.li
            key={project.name}
            variants={staggerItem}>
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
