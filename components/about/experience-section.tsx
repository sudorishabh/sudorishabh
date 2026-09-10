"use client";

import { BriefcaseBusiness } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/about/section-heading";
import { GlassSurface } from "@/components/ui/glass";
import { glass } from "@/lib/glass";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

const experience = [
  {
    role: "Software Engineer",
    org: "Building on the web",
    period: "Now",
    detail: "Product work end to end — interface, API, and the glue between.",
  },
  {
    role: "Frontend & product",
    org: "React, TypeScript, Next.js",
    period: "",
    detail: "Design systems, animation, and interfaces that stay fast.",
  },
  {
    role: "Backend & infra",
    org: "Node, Postgres, cloud",
    period: "",
    detail: "Schemas, jobs, deploys — the unglamorous half that has to work.",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id='experience'
      className='scroll-mt-28 pt-20'>
      <SectionHeading
        icon={<BriefcaseBusiness className='size-3' />}
        label='Experience'
        title="Where I've been"
      />

      {/*
        One thick pane holding the whole timeline, rather than a card per row.
        Three separate cards this small would read as a list of buttons; a
        single panel keeps it a chronology.
      */}
      <GlassSurface
        density='thick'
        className='mt-7 rounded-2xl p-6 md:p-8'>
        <motion.ol
          className='relative space-y-7'
          initial='hidden'
          whileInView='show'
          viewport={viewport}
          variants={staggerContainer}>
          {/* The spine, faded at both ends so it doesn't butt into the padding. */}
          <span
            aria-hidden='true'
            className='absolute top-1 bottom-1 left-[3px] w-px bg-linear-to-b from-transparent via-white/20 to-transparent'
          />

          {experience.map((item, i) => (
            <motion.li
              key={item.role}
              variants={staggerItem}
              className='relative pl-7'>
              <span
                aria-hidden='true'
                className='absolute top-1.5 left-0 grid size-[7px] place-items-center rounded-full bg-neutral-950 ring-1 ring-white/25'>
                {/* Only the current role gets a lit node. */}
                {i === 0 && (
                  <span className='size-[3px] rounded-full bg-emerald-400' />
                )}
              </span>

              <div className='flex flex-wrap items-baseline gap-x-2.5'>
                <p className='text-sm font-medium text-neutral-100'>
                  {item.role}
                </p>
                {item.period && (
                  <span
                    className={glass(
                      { density: "thin", edge: false, grain: false },
                      "rounded-full px-2 py-0.5 text-[10px] tracking-wide text-neutral-300",
                    )}>
                    {item.period}
                  </span>
                )}
              </div>

              <p className='mt-0.5 text-xs text-neutral-500'>{item.org}</p>
              <p className='mt-2 text-sm leading-relaxed text-neutral-400'>
                {item.detail}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </GlassSurface>
    </section>
  );
}
