import { cn } from "@/lib/utils";

/*
  The glass material itself lives in globals.css (`.glass` and friends); this
  is the typed front door to it, so callers pick a density instead of
  hand-tuning blur and tint per surface and drifting out of sync.

  Deliberately not a "use client" module: server components need to *call*
  this, and every export of a client module reaches them as an uncallable
  reference proxy. The interactive half is <GlassSurface> in components/ui.
*/

export type GlassDensity = "thin" | "regular" | "thick";

export type GlassOptions = {
  /** thin = floating chrome, regular = cards, thick = large reading panels. */
  density?: GlassDensity;
  /** Bright specular arc across the top lip. Skip it on very small chips. */
  edge?: boolean;
  /** Fine grain -- worth it on anything wider than a chip. */
  grain?: boolean;
  /** Pointer-tracked highlight. Needs <GlassSurface> to feed it coordinates. */
  spotlight?: boolean;
};

const densityClass: Record<GlassDensity, string> = {
  thin: "glass-thin",
  regular: "",
  thick: "glass-thick",
};

/** Builds the class list for a glass surface. */
export function glass(
  {
    density = "regular",
    edge = true,
    grain = true,
    spotlight = false,
  }: GlassOptions = {},
  className?: string,
) {
  return cn(
    "glass",
    densityClass[density],
    edge && "glass-edge",
    grain && "glass-grain",
    spotlight && "glass-spotlight",
    className,
  );
}
