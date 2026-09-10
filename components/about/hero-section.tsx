import type { CSSProperties } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import LiquidGlassLink from "@/components/about/liquid-glass-link";
import NameTitle from "@/components/about/NameTitle";
import PicsSection from "@/components/about/pics-section";
import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";

const facts = [
  { icon: <MapPin className='size-3' />, value: "India · remote" },
  { value: "5+ yrs shipping" },
  { value: "TypeScript · React · Node" },
];

export default function HeroSection() {
  return (
    <section
      id='top'
      className='scroll-mt-24'>
      <PicsSection />
      <NameTitle />

      <div
        className='animate-reveal mt-9 flex flex-wrap items-center justify-center gap-3'
        style={{ "--reveal-delay": "320ms" } as CSSProperties}>
        <LiquidGlassLink href='#contact'>Get in touch</LiquidGlassLink>

        <a
          href='#projects'
          className={glass(
            { density: "thin", grain: false, spotlight: true },
            cn(
              "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-neutral-200",
              "transition-colors duration-300 hover:text-white",
              "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
              "md:text-base",
            ),
          )}>
          See my work
          <ArrowDown className='size-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0' />
        </a>
      </div>

      {/*
        Three flat facts under the buttons. On glass they'd compete with the
        call to action, so they stay as plain dotted text.
      */}
      <ul
        className='animate-reveal mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] text-neutral-500'
        style={{ "--reveal-delay": "400ms" } as CSSProperties}>
        {facts.map((fact, i) => (
          <li
            key={fact.value}
            className='flex items-center gap-3'>
            {i > 0 && (
              <span
                aria-hidden='true'
                className='size-0.5 rounded-full bg-neutral-700'
              />
            )}
            <span className='inline-flex items-center gap-1.5'>
              {fact.icon}
              {fact.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
