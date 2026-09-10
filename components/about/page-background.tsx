import Image from "next/image";

type PageBackgroundProps = {
  src?: string;
  opacity?: number;
  position?: string;
};
export default function PageBackground({
  src = "/image-from-rawpixel-id-3868942-jpeg.jpg",
  opacity,
  position = "center",
}: PageBackgroundProps) {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-5 overflow-hidden'>
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
      <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.8)_0%,rgba(10,10,10,0.45)_28%,rgba(10,10,10,0.45)_70%,rgba(10,10,10,0.82)_100%)]' />

      {/* Vignette: pulls the eye to the center column. */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(10,10,10,0.5)_100%)]' />
    </div>
  );
}
