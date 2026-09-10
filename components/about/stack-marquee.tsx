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
  The icons render through a portal onto <body> with `position: fixed`,
  anchored to the trigger button's measured viewport rect. That keeps them out
  of the button's own layout (so they can't push or resize page content) and
  out of any ancestor's stacking context (so they can float over content above
  them -- a nested absolute layer would get trapped under any ancestor that
  establishes a containing block, e.g. via backdrop-filter or transform).

  Positions are plain offsets from the button's top centre: negative y is up,
  negative x is left. They are hand-placed rather than generated, because
  Math.random() would both reshuffle on every render and disagree between the
  server and client passes. Six sit either side of centre with near-identical
  mean spread (-183 / +177), and no two are closer than ~102px, which leaves
  a 65px+ gap between even the largest 34px glyphs.
*/

type TechIcon = {
  name: string;
  icon: IconType;
  color: string;
  x: number;
  y: number;
  size: number;
  delay: number;
};

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
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", x: -90, y: -95, size: 33, delay: 0.06 },
  { name: "React", icon: SiReact, color: "#61DAFB", x: 95, y: -85, size: 34, delay: 0.02 },
  { name: "Next.js", icon: SiNextdotjs, color: "#EDEDED", x: -215, y: -140, size: 33, delay: 0.15 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", x: 200, y: -150, size: 34, delay: 0.1 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", x: -330, y: -105, size: 32, delay: 0.24 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", x: 335, y: -120, size: 32, delay: 0.2 },
  { name: "Prisma", icon: SiPrisma, color: "#F0F0F0", x: -140, y: -230, size: 33, delay: 0.12 },
  { name: "tRPC", icon: SiTrpc, color: "#398CCB", x: 125, y: -235, size: 33, delay: 0.27 },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF", x: -270, y: -250, size: 32, delay: 0.18 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", x: 255, y: -265, size: 32, delay: 0.08 },
  { name: "AWS", icon: FaAws, color: "#FF9900", x: -55, y: -300, size: 33, delay: 0.22 },
  { name: "Vercel", icon: SiVercel, color: "#F0F0F0", x: 50, y: -305, size: 33, delay: 0.3 },
];

export default function StackMarquee() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useMounted();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const isActive = hovered || pinned;

  // Measured in the event handler rather than an effect, so the anchor lands
  // in the same render that flips the reveal on. Waiting for an effect would
  // mount the whole overlay already-open on the very first hover, skipping
  // its transition.
  const measure = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setAnchor({ x: rect.left + rect.width / 2, y: rect.top });
  };

  useEffect(() => {
    if (!isActive) return;

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [isActive]);

  const open = () => {
    measure();
    setHovered(true);
  };

  const toggleForTouch = () => {
    // Touch devices report a click without a persistent hover state, so give
    // them an explicit toggle instead of relying on mouseenter -- otherwise
    // the enter+click pair from a single tap cancel out.
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover)").matches
    ) {
      measure();
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
        createPortal(
          <>
            {/*
              Plain CSS rather than framer-motion: this needs the -webkit-
              prefixed backdrop-filter for Safari, and blur(0px) -> blur(8px)
              interpolates more reliably as a straight CSS transition.
            */}
            <div
              aria-hidden='true'
              className='pointer-events-none fixed inset-0 z-30 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
              style={{
                backgroundColor: isActive ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
                backdropFilter: isActive ? "blur(8px)" : "blur(0px)",
                WebkitBackdropFilter: isActive ? "blur(8px)" : "blur(0px)",
              }}
            />

            <div
              aria-hidden='true'
              className='pointer-events-none fixed z-40 h-0 w-0 scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100'
              style={{ left: anchor.x, top: anchor.y }}>
              {icons.map((item) => {
                const Icon = item.icon;
                // Reduced motion: sit at the final spot and only fade.
                const settled = isActive || reduceMotion;

                return (
                  <motion.div
                    key={item.name}
                    className='absolute top-0 left-0'
                    initial={false}
                    animate={{ x: settled ? item.x : 0, y: settled ? item.y : 0 }}
                    transition={{
                      duration: 0.75,
                      ease: EASE,
                      delay: isActive ? item.delay : 0,
                    }}>
                    <div style={{ transform: "translate(-50%, -50%)" }}>
                      <motion.div
                        className='drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]'
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.4,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: EASE,
                          delay: isActive ? item.delay + 0.05 : 0,
                        }}>
                        <Icon
                          style={{ color: item.color }}
                          size={item.size}
                        />
                      </motion.div>
                    </div>
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
