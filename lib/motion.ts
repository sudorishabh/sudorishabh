import type { Variants } from "framer-motion";

/*
  Scroll-triggered counterpart to globals.css's `.animate-reveal`. That
  keyframe only ever fires above the fold (deliberately CSS-only, see
  hero-section.tsx), so anything further down the page currently pops in with
  no motion at all. These variants match its easing and displacement and get
  fed to framer-motion's `whileInView` instead, which only that lower content
  needs.
*/

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export const staggerItem: Variants = fadeInUp;

/** Once a section has revealed, don't replay it on every scroll pass. */
export const viewport = { once: true, margin: "-80px" } as const;
