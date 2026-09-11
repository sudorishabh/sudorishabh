import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/lib/site";

/*
  Contrast, not chrome. The three profile links used to sit at neutral-400 --
  which over this page's backdrop reads as a disabled control, so the only
  thing telling you they were links was hovering one. They now sit at
  neutral-300 with a slightly firmer pill edge, which is enough: an icon at
  full legibility inside a visible container reads as a button without
  needing a label, a divider, or a second surface.
*/
export default function SiteNav() {
  return (
    <div className='fixed top-0 z-50 w-full px-4 pt-4 md:pt-6'>
      <nav
        aria-label='Main'
        className='flex max-w-full items-center justify-between gap-2'>
        {/*
          Visible at every width. Hiding it below `sm` left `justify-between`
          with a single child, which pinned the social pill to the *left* on
          phones and the right everywhere else -- the nav appeared to swap
          sides across the breakpoint. At three links the two pills together
          are ~280px, so both fit even on a 320px viewport.
        */}
        <a
          href='#top'
          className={glass(
            { density: "thin", grain: false },
            cn(
              "animate-reveal rounded-full border-white/15 px-4 py-1.5",
              "text-lg font-medium tracking-tight text-neutral-100",
              "transition-colors hover:text-white",
              "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
            ),
          )}>
          Sudo
          {/* Was neutral-500: the quiet half of a wordmark still has to be read. */}
          <span className='text-neutral-400'>Rishabh</span>
        </a>

        {/*
          Both pills stand 40px tall by construction, not coincidence: the
          wordmark is `py-1.5` around a 28px line box, and this one is a
          uniform `p-1` around 32px rows. Sizing the rows explicitly means a
          later change to the glyph size can't drift the two pills apart.

          The container carries no text of its own, so the text and hover
          colours live on the rows below rather than here.
        */}
        <div
          className={glass(
            { density: "thin", grain: false },
            "animate-reveal flex items-center gap-1 rounded-full border-white/15 p-1",
          )}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel='noreferrer'
              aria-label={link.label}
              className={cn(
                /* A 32px box gives the hover fill room to read as a circle;
                   with no padding it used to paint flush to the glyph edge. */
                "grid size-8 place-items-center rounded-full text-neutral-300",
                "transition-colors duration-300 hover:bg-white/10 hover:text-white",
                "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
              )}>
              <span className='size-5'>{link.icon}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
