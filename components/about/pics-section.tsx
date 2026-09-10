"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const photos = [
  { seed: "sudorishabh-01", rotate: -10, openRotate: -3, openX: -4, openY: 7 },
  { seed: "sudorishabh-02", rotate: -6, openRotate: 2, openX: 3, openY: -9 },
  { seed: "sudorishabh-03", rotate: -2, openRotate: -5, openX: -3, openY: 4 },
  { seed: "sudorishabh-04", rotate: 3, openRotate: 4, openX: 5, openY: -6 },
  { seed: "sudorishabh-05", rotate: 7, openRotate: -3, openX: -5, openY: 8 },
  { seed: "sudorishabh-06", rotate: 11, openRotate: 3, openX: 2, openY: -4 },
];

const MID = (photos.length - 1) / 2;
const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.7,
} as const;

export default function PicsSection() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const reduceMotion = useReducedMotion();
  const open = hovered || pinned;

  return (
    <div
      className='animate-reveal mx-auto flex flex-col items-center'
      style={{ "--reveal-delay": "160ms" } as CSSProperties}>
      <motion.button
        type='button'
        aria-pressed={open}
        aria-label={open ? "Collapse photo stack" : "Expand photo stack"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPinned((v) => !v)}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "relative flex h-44 w-full max-w-md cursor-pointer items-center rounded-3xl md:h-52",
          "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
          open ? "justify-between" : "justify-center",
        )}>
        {photos.map((photo, i) => {
          const offset = i - MID;
          const distanceFromEdge = open ? i : photos.length - 1 - i;
          return (
            <motion.div
              key={photo.seed}
              layout
              aria-hidden='true'
              animate={{
                x: open ? photo.openX : offset * 7,
                y: open ? photo.openY : Math.abs(offset) * 5,
                rotate: open ? photo.openRotate : photo.rotate,
              }}
              whileHover={open ? { y: photo.openY - 6 } : undefined}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { ...SPRING, delay: distanceFromEdge * 0.035 }
              }
              style={{ zIndex: open ? i : 10 - Math.abs(offset) }}
              className={cn(
                "aspect-4/5 w-[15%] shrink-0 overflow-hidden rounded-[11px]  border-2 border-white bg-neutral-900 shadow-xl",
                open ? "relative" : "absolute inset-0 m-auto",
              )}>
              <Image
                src={`https://picsum.photos/seed/${photo.seed}/480/600`}
                alt=''
                fill
                sizes='160px'
                className='rounded-[10px] object-cover'
              />
            </motion.div>
          );
        })}
      </motion.button>
    </div>
  );
}
