import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/site";

export default function SiteNav() {
  return (
    <div className=' top-0 z-50 w-full fixed px-4 pt-4  md:pt-6'>
      <nav
        aria-label='Main'
        className='flex max-w-full items-center justify-between gap-2'>
        <a
          href='#top'
          className={glass(
            { density: "thin", grain: false },
            "animate-reveal items-center  rounded-full py-1.5 px-4 hidden text-lg font-medium tracking-tight text-neutral-200 transition-colors hover:text-white sm:block",
          )}>
          Sudo
          <span className='text-neutral-500'>Rishabh</span>
        </a>

        <div
          className={glass(
            { density: "thin", grain: false },
            "animate-reveal rounded-full py-2.5 px-4 text-sm font-medium tracking-tight text-neutral-200 transition-colors hover:text-white flex flex-row items-center gap-4",
          )}
          // className=''
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target='_blank'
              rel='noreferrer'
              aria-label={link.label}
              className={cn(
                "grid place-items-center rounded-full text-neutral-400",
                "transition-colors duration-300 hover:bg-white/10 hover:text-white",
                "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
              )}>
              <span className='size-6'>{link.icon}</span>
            </a>
          ))}
        </div>

        {/* {navSections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className='rounded-full px-3 py-1.5 text-xs text-neutral-400 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
            {section.label}
          </a>
        ))} */}

        {/* <span
          aria-hidden='true'
          className='mx-1 h-4 w-px bg-white/10'
        /> */}
      </nav>
    </div>
  );
}
