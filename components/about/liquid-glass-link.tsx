"use client";

import LiquidGlass from "liquid-glass-react";
import { useEffect, useRef, useState } from "react";

/*
  The page's one true refraction effect -- everything else is CSS glass. Kept
  for the primary call to action only: liquid-glass-react renders an SVG
  displacement map per instance and re-renders it on every pointer move, so a
  page full of them would cost far more than it looks like it should.

  Generalised from the old AboutMeBtn, which hard-coded its label and had no
  click behaviour at all.
*/

const SHAPE =
  "px-7 py-3 text-sm font-medium tracking-wide text-nowrap md:text-base";

type LiquidGlassLinkProps = {
  href: string;
  children: string;
};

export default function LiquidGlassLink({
  href,
  children,
}: LiquidGlassLinkProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Track the pointer across the whole page so the glass still reacts as the
  // cursor approaches, instead of only while it is over the button itself.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({ x: e.clientX, y: e.clientY });
      setMouseOffset({
        x: ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 100,
        y: ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className='relative w-fit'>
      {/* Sizes the wrapper so the absolutely positioned glass has a box to
          centre on while the link stays in the page flow. */}
      <span
        aria-hidden
        className={`block invisible ${SHAPE}`}>
        {children}
      </span>
      <LiquidGlass
        elasticity={0.3}
        cornerRadius={999}
        padding='0px'
        globalMousePos={mousePos}
        mouseOffset={mouseOffset}
        style={{ position: "absolute", top: "50%", left: "50%" }}>
        <a
          href={href}
          className={`block rounded-full text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${SHAPE}`}>
          {children}
        </a>
      </LiquidGlass>
    </div>
  );
}
