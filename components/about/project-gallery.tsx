"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GalleryImage = { src: string; alt: string };

/*
  A horizontal swipe strip, built on CSS scroll snapping rather than a
  carousel library. Native overflow scrolling already gives us touch
  swiping, trackpad gestures, arrow keys and momentum for free, and it
  degrades to a plain scrollable row if JS never arrives -- the dots are the
  only part that needs React.

  Deliberately not a whole-card link: an interactive strip inside a stretched
  link would have every gesture and dot press swallowed by the overlay, so
  the section links its title instead.
*/
export default function ProjectGallery({
  images,
  label,
  sizes,
}: {
  images: GalleryImage[];
  /** Names the region for screen readers, e.g. the project it belongs to. */
  label: string;
  sizes: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  /* Slides are exactly one frame wide, so the index is just a division. */
  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollTo({
        left: index * el.clientWidth,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const many = images.length > 1;

  return (
    <div>
      {/*
        Framed and held back so the screenshots read as sitting *inside* the
        pane: a hairline ring for thickness and muted colour at rest that
        comes up to full when the card is hovered. At full strength they
        compete with the photograph behind the page.
      */}
      <div
        ref={trackRef}
        onScroll={many ? handleScroll : undefined}
        /* Focusable so the strip can be scrolled from the keyboard. */
        tabIndex={many ? 0 : -1}
        role={many ? "region" : undefined}
        aria-label={many ? `${label} — screenshots` : undefined}
        className={cn(
          "relative flex aspect-video overflow-hidden rounded-xl ring-1 ring-white/10",
          "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
          many && "snap-x snap-mandatory overflow-x-auto",
          /* The dots are the position indicator; a scrollbar across the
             bottom of a screenshot is just a second, uglier one. */
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}>
        {images.map((image) => (
          <div
            key={image.src}
            className='relative h-full w-full shrink-0 snap-center'>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className='object-cover opacity-90 saturate-[0.85] transition-[opacity,filter] duration-500 group-hover:opacity-100 group-hover:saturate-100'
            />
            {/* Seats the image against the text below instead of a hard edge. */}
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-linear-to-t from-neutral-950/40 to-transparent to-60%'
            />
          </div>
        ))}
      </div>

      {many && (
        <div className='mt-2.5 flex items-center gap-1.5'>
          {images.map((image, i) => (
            <button
              key={image.src}
              type='button'
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn(
                "h-1 rounded-full transition-[width,background-color] duration-300",
                "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
                i === active
                  ? "w-4 bg-white/70"
                  : "w-1 bg-white/25 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
