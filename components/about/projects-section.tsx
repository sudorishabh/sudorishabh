import { ArrowUpRight, FolderGit2 } from "lucide-react";
import SectionHeading from "@/components/about/section-heading";
import { GlassSurface } from "@/components/ui/glass";
import { cn } from "@/lib/utils";

type Project = {
  name: string;
  blurb: string;
  /** Tints the tile and the card's corner bloom. RGB triplet, not a class. */
  accent: string;
  tags: string[];
  href: string;
  /** The lead card spans the grid and gets a larger tile. */
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "sudorishabh.com",
    blurb:
      "This site. Next.js and Tailwind over a live gradient field, with a glass layer that refracts it.",
    accent: "244,63,94",
    tags: ["Next.js", "Tailwind", "CSS"],
    href: "https://github.com/sudorishabh",
    featured: true,
  },
  {
    name: "Side experiments",
    blurb: "Small tools built fast, kept only if they earn their place.",
    accent: "56,189,248",
    tags: ["TypeScript", "Node"],
    href: "https://github.com/sudorishabh",
  },
  {
    name: "Open source",
    blurb: "Patches, tiny libraries, and the occasional issue triage.",
    accent: "167,139,250",
    tags: ["OSS"],
    href: "https://github.com/sudorishabh",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassSurface
      className={cn(
        "group flex h-full flex-col rounded-2xl p-5",
        "transition-[transform,border-color] duration-500 ease-out",
        "hover:-translate-y-1 hover:border-white/25",
        "focus-within:-translate-y-1 focus-within:border-white/25",
        "motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0",
        project.featured && "sm:flex-row sm:items-center sm:gap-6",
      )}>
      {/*
        A colour bloom bleeding in from the top-left corner. It sits under the
        blur rather than over it, so the card still reads as one pane of glass
        with something coloured behind it -- not as a tinted overlay.
      */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-60 transition-opacity duration-500 group-hover:opacity-100'
        style={{
          background: `radial-gradient(80% 60% at 0% 0%, rgba(${project.accent},0.18), transparent 70%)`,
        }}
      />

      <span
        aria-hidden='true'
        className={cn(
          "shrink-0 rounded-xl ring-1 ring-white/15",
          project.featured ? "size-14" : "size-9",
        )}
        style={{
          background: `linear-gradient(140deg, rgba(${project.accent},0.9), rgba(${project.accent},0.35))`,
        }}
      />

      <div
        className={cn(
          "mt-4 flex flex-1 flex-col",
          project.featured && "sm:mt-0",
        )}>
        <div className='flex items-start justify-between gap-3'>
          <h3 className='text-sm font-medium text-neutral-100'>
            {/*
              Stretched link: the whole card is the hit target, but only the
              title is the accessible link name.
            */}
            <a
              href={project.href}
              target='_blank'
              rel='noreferrer'
              className='rounded-sm after:absolute after:inset-0 after:content-[""] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
              {project.name}
            </a>
          </h3>
          <ArrowUpRight className='size-3.5 shrink-0 text-neutral-600 transition-[color,transform] duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white' />
        </div>

        <p className='mt-1.5 text-xs leading-relaxed text-neutral-400'>
          {project.blurb}
        </p>

        <ul className='mt-4 flex flex-wrap gap-1.5'>
          {project.tags.map((tag) => (
            <li
              key={tag}
              className='rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[10px] tracking-wide text-neutral-400'>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </GlassSurface>
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

      <ul className='mt-7 grid gap-4 sm:grid-cols-2'>
        {projects.map((project) => (
          <li
            key={project.name}
            className={cn(project.featured && "sm:col-span-2")}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
