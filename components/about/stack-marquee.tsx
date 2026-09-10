"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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
import { EASE } from "@/lib/motion";

/*
  Orbit math: each icon sits at a fixed `radius` along its own local x-axis.
  The wrapping div rotates around its top-left corner (transform-origin 0 0,
  planted at the anchor point), so animating that rotation sweeps the icon
  along a true circular arc instead of interpolating x/y in a straight line.
  A second, counter-rotating layer cancels the spin so the glyph itself stays
  upright throughout the flight.

  The anchor itself is measured off the trigger button's viewport rect and
  the whole constellation is rendered through a portal onto <body> with
  `position: fixed`. That keeps it out of the button's own layout (so it
  can't push or resize page content) and out of any ancestor's stacking
  context (so it can float over content above it -- a plain nested absolute
  layer would get trapped under any ancestor establishing its own stacking
  context or containing block, e.g. via backdrop-filter or transform).
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
const ANCHOR_GAP = 40;

const noopSubscribe = () => () => {};

/** Hydration-safe "did this mount on the client" check, needed before a portal can target `document.body`. */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/*
  Angles are 12 evenly spaced points across a 200deg arc (-190 to 10), which
  is exactly centered on CLUSTER_ANGLE (-90, straight up) -- every icon has a
  mirror partner on the opposite side, so left/right stay balanced. Radii
  cycle through three rings (66/104/142, i.e. 38px apart) in step with the
  angle sequence, so any two angularly-adjacent icons also sit on different
  rings; combined with the ring spacing that keeps every pair at least ~10px
  apart edge-to-edge (chips are 36px), even the closest neighbors clear.
*/
const RING = { near: 66, mid: 104, far: 142 };

const icons: TechIcon[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", radius: RING.near, angle: -190, size: 15 },
  { name: "React", icon: SiReact, color: "#61DAFB", radius: RING.mid, angle: -171.8, size: 17 },
  { name: "Next.js", icon: SiNextdotjs, color: "#EDEDED", radius: RING.far, angle: -153.6, size: 18 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", radius: RING.near, angle: -135.5, size: 15 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", radius: RING.mid, angle: -117.3, size: 17 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", radius: RING.far, angle: -99.1, size: 18 },
  { name: "Prisma", icon: SiPrisma, color: "#F0F0F0", radius: RING.near, angle: -80.9, size: 15 },
  { name: "tRPC", icon: SiTrpc, color: "#398CCB", radius: RING.mid, angle: -62.7, size: 17 },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF", radius: RING.far, angle: -44.5, size: 18 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", radius: RING.near, angle: -26.4, size: 15 },
  { name: "AWS", icon: FaAws, color: "#FF9900", radius: RING.mid, angle: -8.2, size: 17 },
  { name: "Vercel", icon: SiVercel, color: "#F0F0F0", radius: RING.far, angle: 10, size: 18 },
];

export default function StackMarquee() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const isActive = hovered || pinned;

  useEffect(() => {
    if (!isActive) return;

    const updateAnchor = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      setAnchor({ x: rect.left + rect.width / 2, y: rect.top - ANCHOR_GAP });
    };

    updateAnchor();
    window.addEventListener("scroll", updateAnchor, { passive: true });
    window.addEventListener("resize", updateAnchor);
    return () => {
      window.removeEventListener("scroll", updateAnchor);
      window.removeEventListener("resize", updateAnchor);
    };
  }, [isActive]);

  const open = () => setHovered(true);

  const toggleForTouch = () => {
    // Touch devices report a click without a persistent hover state, so give
    // them an explicit toggle instead of relying on mouseenter -- otherwise
    // the enter+click pair from a single tap cancel out.
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
      setPinned((value) => !value);
    }
  };

  return (
    <div className='flex justify-center'>
      <button
        ref={buttonRef}
        type='button'
        onMouseEnter={open}
        onMouseLeave={() => setHovered(false)}
        onFocus={open}
        onBlur={() => setHovered(false)}
        onClick={toggleForTouch}
        className={glass(
          { density: "thin", grain: false, spotlight: true },
          "rounded-full px-5 py-2 text-sm font-medium text-neutral-200 transition-colors duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
        )}>
        Skills
      </button>

      {mounted &&
        anchor &&
        createPortal(
          <>
            <motion.div
              aria-hidden='true'
              className='pointer-events-none fixed inset-0 z-30'
              initial={false}
              animate={{ backgroundColor: isActive ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0)" }}
              transition={{ duration: 0.5, ease: EASE }}
            />

            <div
              aria-hidden='true'
              className='pointer-events-none fixed z-40 h-0 w-0 scale-[0.7] sm:scale-[0.85] md:scale-100'
              style={{ left: anchor.x, top: anchor.y }}>
              {icons.map((item, i) => {
                const Icon = item.icon;
                const restAngle = reduceMotion ? item.angle : CLUSTER_ANGLE;
                const rotateTransition = {
                  duration: 0.9,
                  ease: EASE,
                  delay: isActive ? i * 0.035 : 0,
                };

                return (
                  <motion.div
                    key={item.name}
                    className='absolute top-0 left-0'
                    style={{ originX: 0, originY: 0 }}
                    initial={false}
                    animate={{ rotate: isActive ? item.angle : restAngle }}
                    transition={rotateTransition}>
                    <motion.div
                      initial={false}
                      animate={{ rotate: isActive ? -item.angle : -restAngle }}
                      transition={rotateTransition}>
                      <div
                        style={{
                          transform: `translateX(${item.radius}px) translate(-50%, -50%)`,
                        }}>
                        <motion.div
                          className='grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.08] shadow-lg shadow-black/30 backdrop-blur-md'
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.4 }}
                          transition={{
                            duration: 0.45,
                            ease: EASE,
                            delay: isActive ? i * 0.035 + 0.08 : 0,
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
          </>,
          document.body,
        )}
    </div>
  );
}
