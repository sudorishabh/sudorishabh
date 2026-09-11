import type { CSSProperties } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import NameTitle from "@/components/about/NameTitle";
import PicsSection from "@/components/about/pics-section";
import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";

const facts = [
  { icon: <MapPin className='size-3' />, value: "India · remote" },
  { value: "5+ yrs shipping" },
  { value: "TypeScript · React · Node" },
];

/*
  Reading order is the whole design here: name, what I do, who I am, then the
  way in. The metadata row used to sit *below* the buttons, which put a
  three-item list of trivia between the call to action and the work it leads
  to; and the elaborate treatment sat on "Get in touch", so the secondary
  action outranked the primary one.
*/
export default function HeroSection() {
  return (
    <section
      id='top'
      className='scroll-mt-24'>
      <PicsSection />
      <NameTitle />

      {/*
        Three flat facts. On glass they'd compete with the call to action
        below, so they stay as plain dotted text.
      */}
      <ul
        className='animate-reveal mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-neutral-300'
        style={{ "--reveal-delay": "320ms" } as CSSProperties}>
        {facts.map((fact, i) => (
          <li
            key={fact.value}
            className='flex items-center gap-3'>
            {i > 0 && (
              <span
                aria-hidden='true'
                className='size-0.5 rounded-full bg-neutral-400'
              />
            )}
            <span className='inline-flex items-center gap-1.5'>
              {fact.icon}
              {fact.value}
            </span>
          </li>
        ))}
      </ul>

      <div
        className='animate-reveal mt-8 flex flex-wrap items-center justify-center gap-3'
        style={{ "--reveal-delay": "400ms" } as CSSProperties}>
        {/*
          The page's only solid surface, and deliberately so: everything else
          is glass over a painting, so the one opaque object is unmistakably
          the thing to press. It needs no effect to out-rank its neighbour --
          it just has to be the highest contrast pair on the screen.
        */}
        <a
          href='#projects'
          className={cn(
            "group inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3",
            "text-sm font-medium text-neutral-950 md:text-base",
            "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)]",
            "transition-colors duration-300 hover:bg-white",
            /* Offset against the page ground, not the button: a white ring on
               a white pill is invisible. */
            "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none",
          )}>
          See my work
          <ArrowDown className='size-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0' />
        </a>

        <a
          href='#contact'
          className={glass(
            { density: "thin", grain: false, spotlight: true },
            cn(
              "inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-neutral-200",
              "transition-colors duration-300 hover:text-white",
              "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
              "md:text-base",
            ),
          )}>
          Get in touch
        </a>
      </div>
    </section>
  );
}
