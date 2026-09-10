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

const icons: TechIcon[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", radius: 116, angle: -196, size: 18 },
  { name: "React", icon: SiReact, color: "#61DAFB", radius: 90, angle: -175, size: 17 },
  { name: "Next.js", icon: SiNextdotjs, color: "#EDEDED", radius: 64, angle: -156, size: 15 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", radius: 116, angle: -138, size: 18 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", radius: 90, angle: -118, size: 17 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", radius: 64, angle: -97, size: 15 },
  { name: "Prisma", icon: SiPrisma, color: "#F0F0F0", radius: 116, angle: -78, size: 18 },
  { name: "tRPC", icon: SiTrpc, color: "#398CCB", radius: 90, angle: -58, size: 17 },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF", radius: 64, angle: -38, size: 15 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", radius: 116, angle: -18, size: 18 },
  { name: "AWS", icon: FaAws, color: "#FF9900", radius: 90, angle: 0, size: 17 },
  { name: "Vercel", icon: SiVercel, color: "#F0F0F0", radius: 64, angle: 14, size: 15 },
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
