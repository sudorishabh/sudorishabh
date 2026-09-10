"use client";

import Image from "next/image";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/about/section-heading";
import { GlassSurface } from "@/components/ui/glass";
import { instrumentSerif } from "@/lib/fonts";
import { fadeInUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Project = {
  name: string;
  blurb: string;
  tags: string[];
  href: string;
  /**
   * A wide UI screenshot, shown above the name. Meant for the lead row only:
   * one image is a focal point, three inside glass over a photographic
   * backdrop is a competition none of them win.
   */
  image?: { src: string; alt: string };
  /** The lead project sits first and carries the larger name. */
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "sudorishabh.com",
    blurb:
      "This site. Next.js and Tailwind over a live gradient field, with a glass layer that refracts it.",
    tags: ["Next.js", "Tailwind", "CSS"],
    href: "https://github.com/sudorishabh",
    // Placeholder, as in pics-section. Swap for a real 16:9 capture.
    image: {
      src: "https://picsum.photos/seed/sudorishabh-site/1200/675",
      alt: "The sudorishabh.com home page",
    },
    featured: true,
  },
  {
    name: "Side experiments",
    blurb: "Small tools built fast, kept only if they earn their place.",
    tags: ["TypeScript", "Node"],
    href: "https://github.com/sudorishabh",
  },
  {
    name: "Open source",
    blurb: "Patches, tiny libraries, and the occasional issue triage.",
    tags: ["OSS"],
    href: "https://github.com/sudorishabh",
  },
];

/*
  A row, not a card. Cards this size each need their own blur to separate from
  the photo behind the page, which turns the section into competing frosted
  rectangles with photo noise in the gaps; one pane holding rows separates
  once. Same reasoning as the experience timeline.
*/
function ProjectRow({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "group relative rounded-lg px-3 py-4",
        "transition-colors duration-300",
        "hover:bg-white/[0.03] focus-within:bg-white/[0.03]",
      )}>
      {project.image && (
        /*
          Framed and held back so the screenshot reads as sitting *inside* the
          pane: a hairline ring for thickness, a scrim at the foot to seat it
          against the row below, and muted colour at rest that comes up to
          full when the row is hovered. At full strength it competes with the
          photograph behind the page.
        */
        <div className='relative mb-4 aspect-video overflow-hidden rounded-xl ring-1 ring-white/10'>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes='(min-width: 768px) 672px, 100vw'
            className='object-cover opacity-90 saturate-[0.85] transition-[opacity,filter] duration-500 group-hover:opacity-100 group-hover:saturate-100'
          />
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-linear-to-t from-neutral-950/40 to-transparent to-60%'
          />
        </div>
      )}

      <div className='flex items-start justify-between gap-4'>
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
          {/*
            Stretched link: the whole row is the hit target, but only the name
            is the accessible link name.
          */}
          <a
            href={project.href}
            target='_blank'
            rel='noreferrer'
            className='rounded-sm after:absolute after:inset-0 after:content-[""] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
            {project.name}
          </a>
        </h3>
        <ArrowUpRight
          className={cn(
            "size-3.5 shrink-0 text-neutral-600",
            "transition-[color,transform] duration-300",
            "group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white",
            "motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0",
            project.featured ? "mt-2" : "mt-0.5",
          )}
        />
      </div>

      {/* Rows get the whole column, so the blurb is capped for readability. */}
      <p
        className={cn(
          "max-w-[56ch] leading-relaxed text-neutral-400",
          project.featured ? "mt-2 text-sm" : "mt-1.5 text-xs",
        )}>
        {project.blurb}
      </p>

      {/* Bare words: at this size a pill's border outweighs the word inside. */}
      <p className='mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-500'>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </p>
    </div>
  );
}

export default function ProjectSection() {
  return (
    <section
      id='projects'
      className='scroll-mt-28'>
      <SectionHeading
        icon={<FolderGit2 className='size-3' />}
        label='Projects'
        title='What I build'
      />

      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={viewport}
        variants={fadeInUp}>
        {/*
          Spotlight off, unlike the contact pane. Every row here is a link, so
          the row wash is the affordance -- it says which project you are about
          to open. A pointer-tracked blob on top of it gives the same surface a
          second, differently shaped hover state and softens the row boundary.
          The contact pane can keep its spotlight because its rows have no fill.
        */}
        <GlassSurface
          density='thick'
          spotlight={false}
          className='mt-7 rounded-2xl px-6 py-4 md:px-8 md:py-6'>
          {/* Negative inset so the dividers and the hover wash share one width. */}
          <motion.ul
            className='-mx-3 divide-y divide-white/[0.07]'
            variants={staggerContainer}>
            {projects.map((project) => (
              <motion.li
                key={project.name}
                variants={staggerItem}>
                <ProjectRow project={project} />
              </motion.li>
            ))}
          </motion.ul>
        </GlassSurface>
      </motion.div>
    </section>
  );
}
