"use client";

import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/about/section-heading";
import { GlassSurface } from "@/components/ui/glass";
import { fadeInUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Project = {
  name: string;
  blurb: string;
  tags: string[];
  href: string;
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
        "group relative rounded-lg px-3 py-4 first:pt-0 last:pb-0",
        "transition-colors duration-300",
        "hover:bg-white/[0.03] focus-within:bg-white/[0.03]",
      )}>
      <div className='flex items-start justify-between gap-4'>
        <h3
          className={cn(
            "font-medium text-neutral-100",
            project.featured ? "text-base" : "text-sm",
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
        <ArrowUpRight className='mt-0.5 size-3.5 shrink-0 text-neutral-600 transition-[color,transform] duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white' />
      </div>

      {/* Rows get the whole column, so the blurb is capped for readability. */}
      <p
        className={cn(
          "mt-1.5 max-w-[56ch] leading-relaxed text-neutral-400",
          project.featured ? "text-[13px]" : "text-xs",
        )}>
        {project.blurb}
      </p>

      {/* Bare words: at this size a pill's border outweighs the word inside. */}
      <p className='mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-600'>
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
        <GlassSurface
          density='thick'
          className='mt-7 rounded-2xl p-6 md:p-8'>
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
