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

type Project = {
  name: string;
  blurb: string;
  tags: string[];
  href: string;
  /** Wide UI screenshots, shown beside or above the name as a swipe strip. */
  images?: GalleryImage[];
  /** The lead project spans both columns and carries the serif name. */
  featured?: boolean;
};

/** Placeholder source, matching pics-section. Drop when real captures land. */
const SEED = (name: string) =>
  `https://picsum.photos/seed/sudorishabh-${name}/1200/675`;

const projects: Project[] = [
  {
    name: "sudorishabh.com",
    blurb:
      "This site. Next.js and Tailwind over a live gradient field, with a glass layer that refracts it.",
    tags: ["Next.js", "Tailwind", "CSS"],
    href: "https://github.com/sudorishabh",
    // Placeholders, as in pics-section. Swap for real 16:9 captures.
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
    blurb: "Small tools built fast, kept only if they earn their place.",
    tags: ["TypeScript", "Node"],
    href: "https://github.com/sudorishabh",
    images: [
      { src: SEED("tools-one"), alt: "Placeholder screenshot" },
      { src: SEED("tools-two"), alt: "Placeholder screenshot" },
    ],
  },
  {
    name: "Open source",
    blurb: "Patches, tiny libraries, and the occasional issue triage.",
    tags: ["OSS"],
    href: "https://github.com/sudorishabh",
    images: [{ src: SEED("oss-one"), alt: "Placeholder screenshot" }],
  },
];

/*
  Cards again, two to a row. The text-only version of this section was one
  pane of rows because three small panes holding two lines each had nothing
  to justify them over the page's photo backdrop; a card carrying a gallery
  does, so the panes come back.

  The lead card spans both columns and lays its gallery out beside the text
  rather than above it -- at full column width a 16:9 frame is ~380px tall,
  which would tower over the two cards beneath it.
*/
function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassSurface
      className={cn(
        "group flex h-full flex-col rounded-2xl p-4 sm:p-5",
        "transition-colors duration-500 hover:border-white/20",
        "focus-within:border-white/20",
        project.featured && "sm:flex-row sm:gap-6",
      )}>
      {project.images && (
        <div className={cn("mb-4", project.featured && "sm:mb-0 sm:w-3/5")}>
          <ProjectGallery
            images={project.images}
            label={project.name}
            /* Half-column frames are ~336px; the lead's is ~400px. Asking for
               672px here would fetch four times the pixels for both. */
            sizes={
              project.featured
                ? "(min-width: 640px) 400px, 100vw"
                : "(min-width: 640px) 336px, 100vw"
            }
          />
        </div>
      )}

      <div className='flex flex-1 flex-col'>
        {/*
          The name is the link, not the whole card. The gallery takes swipes
          and dot presses, and a stretched overlay would eat every one of
          them; two interactive regions cannot share one box.
        */}
        <h3
          className={cn(
            /*
              The lead project differs in kind, not degree: it is this site,
              so it gets the serif the section heading and the contact lead
              line already use. A size bump alone read as an accident.
            */
            project.featured
              ? cn(
                  instrumentSerif.className,
                  "text-xl tracking-[-0.01em] text-neutral-50 md:text-2xl",
                )
              : "text-sm font-medium text-neutral-100",
          )}>
          <a
            href={project.href}
            target='_blank'
            rel='noreferrer'
            className='group/link inline-flex items-baseline gap-1.5 rounded-sm focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
            {project.name}
            <ArrowUpRight
              className={cn(
                "size-3.5 shrink-0 self-center text-neutral-500",
                "transition-[color,transform] duration-300",
                "group-hover/link:-translate-y-px group-hover/link:translate-x-px",
                "group-hover/link:text-white",
                "motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0",
              )}
            />
          </a>
        </h3>

        <p
          className={cn(
            "max-w-[56ch] leading-relaxed text-neutral-400",
            project.featured ? "mt-2 text-sm" : "mt-1.5 text-xs",
          )}>
          {project.blurb}
        </p>

        {/*
          Pushed to the foot of the card so the stack lines up across the two
          columns however long the blurbs above it run.
        */}
        <p className='mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 text-[11px] text-neutral-500'>
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
      /* Deliberately half the `pt-20` that experience and contact carry: the
         stack marquee above is part of the hero cluster, not a section of its
         own, so the full gap read as a hole. */
      className='scroll-mt-28 pt-10'>
      <SectionHeading
        icon={<FolderGit2 className='size-3' />}
        label='Projects'
        title='What I build'
      />

      <motion.ul
        className='mt-7 grid gap-4 sm:grid-cols-2'
        initial='hidden'
        whileInView='show'
        viewport={viewport}
        variants={staggerContainer}>
        {projects.map((project) => (
          <motion.li
            key={project.name}
            variants={staggerItem}
            className={cn(project.featured && "sm:col-span-2")}>
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
