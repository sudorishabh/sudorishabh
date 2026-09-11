import Image from "next/image";

type PageBackgroundProps = {
  src?: string;
  opacity?: number;
  position?: string;
};

/*
  The painting is the page's one piece of art direction, and it was winning
  fights it shouldn't: at `contrast-[1.05]` under a 0.45 scrim its brights sat
  close enough to the body greys that text had to be read rather than scanned.
  It now arrives held back -- desaturated, dimmed, softened -- under a heavier
  scrim, so it reads as ground instead of as a second subject. Still the first
  thing you notice; no longer the thing you keep noticing.
*/
export default function PageBackground({
  src = "/image-from-rawpixel-id-3868942-jpeg.jpg",
  opacity,
  position = "center",
}: PageBackgroundProps) {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-5 overflow-hidden'>
      {/*
        `scale-105` pays for the blur: a blurred `object-cover` layer samples
        past its own edge and feathers the viewport border, so the layer is
        oversized and the soft edge cropped off. Phones get the heavier blur --
        there the text column spans the full width, so every line sits over the
        busiest part of the canvas rather than over the calm centre.
      */}
      <Image
        src={src}
        alt=''
        fill
        priority
        sizes='100vw'
        className='scale-105 object-cover blur-[3px] brightness-[0.82] contrast-[0.92] saturate-[0.7] md:blur-[1.5px]'
        style={{ opacity, objectPosition: position }}
      />

      {/* Vertical fade: solid ground at the top and bottom edges. */}
      <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.9)_0%,rgba(10,10,10,0.68)_28%,rgba(10,10,10,0.68)_70%,rgba(10,10,10,0.9)_100%)]' />

      {/* Vignette: pulls the eye to the center column. */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(10,10,10,0.55)_100%)]' />

      {/* One extra scrim below `md`, where there is no calm centre to sit in. */}
      <div className='absolute inset-0 bg-neutral-950/25 md:hidden' />
    </div>
  );
}
