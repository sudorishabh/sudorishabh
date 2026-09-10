"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/*
  Honours prefers-reduced-motion for every framer-motion variant on the site.
  The CSS in globals.css already guards its own effects (`.animate-reveal`,
  `.animate-wash-drift`, the glass spotlight), but the scroll-triggered
  variants in lib/motion.ts are JS-driven and sat outside that -- so the
  sections still slid 14px for someone who had asked for less movement.

  `reducedMotion="user"` drops transform and layout animation while leaving
  opacity alone, which is the behaviour those variants want: the fade is the
  part that carries the reveal, the travel is the part that has to go.

  A client boundary because MotionConfig is context; the layout that renders
  it stays a server component, and the children passed through it do too.
*/
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
