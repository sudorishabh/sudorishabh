import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";
import { navSections, socialLinks } from "@/lib/site";

/*
  A single floating pill instead of a full-width bar: the page is one column of
  content over a live gradient, and a bar edge-to-edge would cut that backdrop
  in half. Sticky rather than fixed so it participates in the document flow and
  the hero doesn't need a matching top offset to clear it.
*/
export default function SiteNav() {
  return (
    <div className='sticky top-0 z-50 flex justify-center px-4 pt-4 md:pt-6'>
      <nav
        aria-label='Main'
        className={glass(
          { density: "thin", grain: false },
          "animate-reveal flex items-center gap-1 rounded-full p-1.5 pl-4",
        )}>
        <a
          href='#top'
          className='mr-1 hidden text-xs font-medium tracking-tight text-neutral-200 transition-colors hover:text-white sm:block'>
          rishabh
          <span className='text-neutral-500'>.negi</span>
        </a>

        <span
          aria-hidden='true'
          className='mr-1 hidden h-4 w-px bg-white/10 sm:block'
        />

        {navSections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className='rounded-full px-3 py-1.5 text-xs text-neutral-400 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
            {section.label}
          </a>
        ))}

        <span
          aria-hidden='true'
          className='mx-1 h-4 w-px bg-white/10'
        />

        <div className='flex items-center gap-0.5'>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target='_blank'
              rel='noreferrer'
              aria-label={link.label}
              className={cn(
                "grid size-8 place-items-center rounded-full text-neutral-400",
                "transition-colors duration-300 hover:bg-white/10 hover:text-white",
                "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
              )}>
              <span className='size-4'>{link.icon}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
