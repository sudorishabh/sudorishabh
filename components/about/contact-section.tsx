"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/about/section-heading";
import SectionScrim from "@/components/about/section-scrim";
import { GlassSurface } from "@/components/ui/glass";
import { socialLinks } from "@/lib/site";
import { instrumentSerif } from "@/lib/fonts";
import { fadeInUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
  The closing panel: one line of intent, then the links as full rows rather
  than icon buttons. The nav already has the icon-only version -- repeating it
  here would say the same thing twice and give the page nowhere to land.
*/

/*
  Email leads here, whatever order the nav uses. The nav can afford to show
  the profiles first; a section whose entire job is "how do I reach you"
  cannot put the address third.
*/
const contactLinks = [
  ...socialLinks.filter((link) => link.href.startsWith("mailto:")),
  ...socialLinks.filter((link) => !link.href.startsWith("mailto:")),
];

export default function ContactSection() {
  return (
    <section
      id='contact'
      className='relative scroll-mt-28 pt-20'>
      {/* Lightest of the three: the page should close on the painting, not
          on a dark rectangle. */}
      <SectionScrim opacity={0.22} />

      <SectionHeading
        icon={<Sparkles className='size-3' />}
        label='Contact'
        title='Say hello'
      />

      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={viewport}
        variants={fadeInUp}>
        {/*
          Same ground as a project card: the section scrim stays light here
          so the painting can come back up *around* the pane, which leaves
          the pane itself carrying the contrast for the address inside it.
          Atmosphere outside, stable surface within.
        */}
        <GlassSurface
          density='thick'
          reading
          className='mt-7 overflow-hidden rounded-2xl p-6 md:p-8'>
          <p
            className={cn(
              instrumentSerif.className,
              "max-w-md text-2xl leading-snug text-balance text-neutral-100 md:text-3xl",
            )}>
            Got something worth building? I read everything that lands.
          </p>

          {/*
            Rows tint on hover rather than only recolouring their icon and
            arrow -- at ~48px tall the whole row is the target, and nothing
            said so. The tint stays at 0.03 because it sits on an already
            thick pane; anything heavier turns the row into a second surface.
          */}
          <motion.ul
            className='mt-7 divide-y divide-white/[0.07] border-t border-white/[0.07]'
            variants={staggerContainer}>
            {contactLinks.map((link) => (
              <motion.li
                key={link.label}
                variants={staggerItem}>
                <a
                  href={link.href}
                  target={
                    link.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel='noreferrer'
                  className='group flex items-center gap-4 rounded-lg py-3.5 transition-colors duration-300 hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
                  <span className='size-4 shrink-0 text-neutral-400 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white'>
                    {link.icon}
                  </span>

                  {/*
                    Stacked on phones, one line from `sm` up. Side by side at
                    320px the label and the address together overran the row,
                    so the address -- the only part of it worth copying --
                    was the half that got truncated.
                  */}
                  <span className='flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-3'>
                    <span className='text-sm text-neutral-200'>
                      {link.label}
                    </span>
                    <span className='truncate text-xs text-neutral-400'>
                      {link.handle}
                    </span>
                  </span>

                  <ArrowUpRight className='ml-auto size-3.5 shrink-0 text-neutral-400 transition-[color,transform] duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white group-focus-visible:text-white motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0' />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </GlassSurface>
      </motion.div>

      {/*
        neutral-400, not 500: the page's greys were picked against a flat dark
        ground, and this line sits at the bottom edge where the backdrop's own
        fade is lightest.
      */}
      <footer className='mt-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-400'>
        <span>© {new Date().getFullYear()} Rishabh Negi</span>
        <span>Built with Next.js — glass hand-rolled in CSS</span>
      </footer>
    </section>
  );
}
