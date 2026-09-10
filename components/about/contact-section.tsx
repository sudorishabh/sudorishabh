"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/about/section-heading";
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
export default function ContactSection() {
  return (
    <section
      id='contact'
      className='scroll-mt-28 pt-20'>
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
        <GlassSurface
          density='thick'
          className='mt-7 overflow-hidden rounded-2xl p-6 md:p-8'>
          <p
            className={cn(
              instrumentSerif.className,
              "max-w-md text-2xl leading-snug text-balance text-neutral-100 md:text-3xl",
            )}>
            Got something worth building? I read everything that lands.
          </p>

          <motion.ul
            className='mt-7 divide-y divide-white/[0.07] border-t border-white/[0.07]'
            variants={staggerContainer}>
            {socialLinks.map((link) => (
              <motion.li
                key={link.label}
                variants={staggerItem}>
                <a
                  href={link.href}
                  target={
                    link.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel='noreferrer'
                  className='group flex items-center gap-4 rounded-lg py-3.5 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'>
                  <span className='size-4 shrink-0 text-neutral-500 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white'>
                    {link.icon}
                  </span>
                  <span className='text-sm text-neutral-200'>
                    {link.label}
                  </span>
                  <span className='truncate text-xs text-neutral-500'>
                    {link.handle}
                  </span>
                  <ArrowUpRight className='ml-auto size-3.5 shrink-0 text-neutral-500 transition-[color,transform] duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white group-focus-visible:text-white' />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </GlassSurface>
      </motion.div>

      {/*
        neutral-500, not 600: over this page's photo backdrop 600 sits near
        2.5:1, under the 4.5:1 floor -- and the backdrop is lighter in places
        than the flat ground these greys were picked against.
      */}
      <footer className='mt-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-500'>
        <span>© {new Date().getFullYear()} Rishabh Negi</span>
        <span>Built with Next.js — glass hand-rolled in CSS</span>
      </footer>
    </section>
  );
}
