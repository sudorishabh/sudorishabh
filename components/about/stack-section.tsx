import { Layers } from "lucide-react";
import { glass } from "@/lib/glass";

/*
  What replaced the "Skills" pill. That pill was a real interaction, but the
  thing it interacted with was decoration: hovering it dimmed the entire
  viewport and flung twelve brand-coloured logos across the page, which meant
  the stack -- the part a reader actually wants -- was information *hidden
  behind* an effect, and twelve saturated glyphs competing with the work when
  it wasn't. The same facts now sit in the open, grouped, in one pane.

  Deliberately a server component: the pill needed framer-motion, react-icons,
  a body portal and a full-screen backdrop-filter layer to say less than this.

  It sits *below* the projects on purpose. A stack list is a claim; the work
  above it is the evidence, and claims go after evidence.
*/
const stack = [
  {
    label: "Front end",
    items: ["TypeScript", "React", "Next.js", "Tailwind", "Framer Motion"],
  },
  { label: "Back end", items: ["Node", "PostgreSQL", "Prisma", "tRPC"] },
  { label: "Infra", items: ["Docker", "AWS", "Vercel"] },
];

export default function StackSection() {
  return (
    <section
      id='stack'
      className='scroll-mt-28 pt-14 md:pt-20'>
      {/*
        The eyebrow alone, without the serif title its siblings carry: this
        is a supporting detail, not one of the page's arguments.
      */}
      <h2 className='flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] text-neutral-400 uppercase'>
        <Layers className='size-3' />
        Stack
      </h2>

      <dl
        className={glass(
          { density: "thin" },
          "mt-4 divide-y divide-white/[0.07] rounded-2xl px-5",
        )}>
        {stack.map((group) => (
          <div
            key={group.label}
            className='flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6'>
            <dt className='w-20 shrink-0 text-[10px] tracking-[0.14em] text-neutral-400 uppercase'>
              {group.label}
            </dt>
            <dd className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-neutral-200'>
              {group.items.map((item, i) => (
                <span
                  key={item}
                  className='flex items-center gap-2.5'>
                  {i > 0 && (
                    <span
                      aria-hidden='true'
                      className='size-0.5 rounded-full bg-neutral-500'
                    />
                  )}
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
