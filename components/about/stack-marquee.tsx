import { glass } from "@/lib/glass";

/*
  A slow ticker of the tools behind the work. Uses the `.animate-marquee`
  keyframe that was already in globals.css but had no caller: it translates by
  -50%, so the list is rendered twice and the seam lands off-screen. The
  duplicate is hidden from assistive tech -- it is the same content twice.

  The strip is masked at both edges rather than clipped, so items dissolve into
  the panel instead of being sliced by a hard border.
*/

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Node",
  "Postgres",
  "Prisma",
  "tRPC",
  "Framer Motion",
  "Docker",
  "AWS",
  "Vercel",
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className='flex shrink-0 items-center gap-3 pr-3'>
      {stack.map((item) => (
        <li
          key={item}
          className='rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs whitespace-nowrap text-neutral-400'>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function StackMarquee() {
  return (
    <section
      aria-label='Tools I work with'
      className={glass(
        { density: "regular" },
        "overflow-hidden rounded-2xl py-3",
      )}>
      <div
        className='flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'>
        <div className='animate-marquee flex shrink-0 items-center'>
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  );
}
