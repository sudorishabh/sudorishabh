import Image from "next/image";

type PageBackgroundProps = {
  /** Path under /public. */
  src?: string;
  /** How much of the painting shows through the dark ground. */
  opacity?: number;
  /** CSS object-position -- which part of the art stays in frame on crop. */
  position?: string;
};

/*
  A fixed, full-bleed art plate that sits between the ambient gradient washes
  (-z-10, painted by the root layout) and the page content (z-10). The image
  itself is never shown at full strength: the site is dark with near-white
  copy, so the painting is held down to a wash and then covered by two scrims
  -- a vertical fade that keeps the header and footer on almost-black, and a
  vignette that darkens the edges so the middle column stays the brightest
  thing on screen. Adjust `opacity` rather than removing the scrims; they are
  what keeps body text at a readable contrast ratio.
*/
export default function PageBackground({
  src = "/image-from-rawpixel-id-3868942-jpeg.jpg",
  opacity,
  position = "center",
}: PageBackgroundProps) {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-[5] overflow-hidden'>
      <Image
        src={src}
        alt=''
        fill
        priority
        sizes='100vw'
        className='object-cover contrast-[1.05]'
        style={{ opacity, objectPosition: position }}
      />

      {/* Vertical fade: solid ground at the top and bottom edges. */}
      <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.55)_28%,rgba(10,10,10,0.55)_70%,rgba(10,10,10,0.94)_100%)]' />

      {/* Vignette: pulls the eye to the center column. */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(10,10,10,0.6)_100%)]' />
    </div>
  );
}
