"use client";

import type { ComponentPropsWithoutRef, PointerEvent } from "react";
import { useCallback } from "react";
import { glass, type GlassOptions } from "@/lib/glass";

type GlassSurfaceProps = ComponentPropsWithoutRef<"div"> & GlassOptions;

/*
  A glass panel that reports the cursor's position within itself as --mx/--my,
  which `.glass-spotlight` reads to place its highlight. The listener sits on
  the panel rather than the window because each surface only needs coordinates
  while it is actually hovered -- one global handler would have to re-measure
  every panel on the page on every pointer move.

  To make a whole card clickable, keep this as the wrapper and stretch a link
  inside it (see ProjectCard). Wrapping it in a bare <a> instead would fold all
  the card's text into one accessible name.
*/
export function GlassSurface({
  density,
  edge,
  grain,
  spotlight = true,
  className,
  ...props
}: GlassSurfaceProps) {
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!spotlight) return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty(
        "--mx",
        `${((event.clientX - rect.left) / rect.width) * 100}%`,
      );
      event.currentTarget.style.setProperty(
        "--my",
        `${((event.clientY - rect.top) / rect.height) * 100}%`,
      );
    },
    [spotlight],
  );

  return (
    <div
      onPointerMove={handlePointerMove}
      className={glass({ density, edge, grain, spotlight }, className)}
      {...props}
    />
  );
}
