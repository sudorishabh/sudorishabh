"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiDocker,
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { glass } from "@/lib/glass";
import { instrumentSerif } from "@/lib/fonts";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
  Orbit math: each icon sits at a fixed `radius` along its own local x-axis.
  The wrapping div rotates around its top-left corner (transform-origin 0 0,
  planted at the stage's center), so animating that rotation sweeps the icon
  along a true circular arc instead of interpolating x/y in a straight line.
  A second, counter-rotating layer cancels the spin so the glyph itself stays
  upright throughout the flight.
*/

type TechIcon = {
  name: string;
  icon: IconType;
  color: string;
  radius: number;
  angle: number;
  size: number;
};

const CLUSTER_ANGLE = -90;

const icons: TechIcon[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", radius: 148, angle: -196, size: 22 },
  { name: "React", icon: SiReact, color: "#61DAFB", radius: 118, angle: -175, size: 20 },
  { name: "Next.js", icon: SiNextdotjs, color: "#EDEDED", radius: 88, angle: -156, size: 18 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", radius: 148, angle: -138, size: 22 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", radius: 118, angle: -118, size: 20 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", radius: 88, angle: -97, size: 18 },
  { name: "Prisma", icon: SiPrisma, color: "#F0F0F0", radius: 148, angle: -78, size: 22 },
  { name: "tRPC", icon: SiTrpc, color: "#398CCB", radius: 118, angle: -58, size: 20 },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF", radius: 88, angle: -38, size: 18 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", radius: 148, angle: -18, size: 22 },
  { name: "AWS", icon: FaAws, color: "#FF9900", radius: 118, angle: 0, size: 20 },
  { name: "Vercel", icon: SiVercel, color: "#F0F0F0", radius: 88, angle: 14, size: 18 },
];

export default function StackMarquee() {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label='Skills and tools'
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((value) => !value)}
      className={glass(
        { density: "regular" },
        "relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 sm:min-h-[380px] md:min-h-[420px]",
      )}>
      <motion.div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0'
        initial={false}
        animate={{ backgroundColor: active ? "rgba(0,0,0,0.38)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      <div
        aria-hidden='true'
        className='pointer-events-none absolute top-1/2 left-1/2 h-0 w-0 scale-[0.62] sm:scale-[0.8] md:scale-100'>
        {icons.map((item, i) => {
          const Icon = item.icon;
          const restAngle = reduceMotion ? item.angle : CLUSTER_ANGLE;
          const rotateTransition = {
            duration: 0.9,
            ease: EASE,
            delay: active ? i * 0.035 : 0,
          };

          return (
            <motion.div
              key={item.name}
              className='absolute top-0 left-0'
              style={{ originX: 0, originY: 0 }}
              initial={false}
              animate={{ rotate: active ? item.angle : restAngle }}
              transition={rotateTransition}>
              <motion.div
                initial={false}
                animate={{ rotate: active ? -item.angle : -restAngle }}
                transition={rotateTransition}>
                <div
                  style={{ transform: `translateX(${item.radius}px) translate(-50%, -50%)` }}>
                  <motion.div
                    className='grid size-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.06] backdrop-blur-sm'
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                      delay: active ? i * 0.035 + 0.08 : 0,
                    }}>
                    <Icon
                      style={{ color: item.color }}
                      size={item.size}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className='relative flex flex-col items-center'>
        <p className='text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase'>
          Tech stack
        </p>
        <h2
          className={cn(
            instrumentSerif.className,
            "mt-1 text-4xl text-neutral-50 md:text-5xl",
          )}>
          Skills
        </h2>
        <motion.p
          className='mt-3 text-xs text-neutral-500'
          initial={false}
          animate={{ opacity: active ? 0 : 1 }}
          transition={{ duration: 0.3, ease: EASE }}>
          Hover to explore the stack
        </motion.p>
      </div>
    </section>
  );
}
