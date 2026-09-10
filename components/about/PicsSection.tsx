"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/*
  A hand of photos, fanned and overlapping at rest. Hovering (or tapping, for
  touch) spreads them into an even row so every picture is visible at once.

  Positions are expressed as percentages of the container's own width, not as
  translateX offsets, so the spread always lands exactly edge-to-edge inside
  the box at any viewport size -- no breakpoint-specific math, no overflow.
*/

const photos = [
  { seed: "sudorishabh-01", rotate: -10 },
  { seed: "sudorishabh-02", rotate: -6 },
  { seed: "sudorishabh-03", rotate: -2 },
  { seed: "sudorishabh-04", rotate: 3 },
  { seed: "sudorishabh-05", rotate: 7 },
  { seed: "sudorishabh-06", rotate: 11 },
];

const GAP_PCT = 2.5;
const CARD_PCT = (100 - (photos.length - 1) * GAP_PCT) / photos.length;
const STEP_PCT = CARD_PCT + GAP_PCT;
const CLOSED_LEFT_PCT = 50 - CARD_PCT / 2;
const MID = (photos.length - 1) / 2;

export default function PicsSection() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned;

  return (
    <div
      className='animate-reveal mx-auto flex flex-col items-center'
      style={{ "--reveal-delay": "160ms" } as CSSProperties}>
      <button
        type='button'
        aria-pressed={open}
        aria-label={open ? "Collapse photo stack" : "Expand photo stack"}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPinned((v) => !v)}
        className='relative h-44 w-full max-w-md cursor-pointer focus-visible:outline-none md:h-52'>
        {photos.map((photo, i) => {
          const offset = i - MID;
          return (
            <div
              key={photo.seed}
              aria-hidden='true'
              style={{
                left: open ? `${i * STEP_PCT}%` : `${CLOSED_LEFT_PCT}%`,
                width: `${CARD_PCT}%`,
                zIndex: open ? i : 10 - Math.abs(offset),
                transform: open
                  ? "translateY(-50%) rotate(0deg)"
                  : `translateY(calc(-50% + ${Math.abs(offset) * 5}px)) translateX(${offset * 7}px) rotate(${photo.rotate}deg)`,
              }}
              className={cn(
                "absolute top-1/2 aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-xl",
                "transition-[left,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              )}>
              <Image
                src={`https://picsum.photos/seed/${photo.seed}/480/600`}
                alt=''
                fill
                sizes='160px'
                className='object-cover'
              />
            </div>
          );
        })}
      </button>

      <p
        className={cn(
          "mt-3 text-[11px] text-neutral-500 transition-opacity duration-300",
          open && "opacity-0",
        )}>
        Hover or tap to spread
      </p>
    </div>
  );
}
