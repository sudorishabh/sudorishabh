import { Layers } from "lucide-react";
import SectionScrim from "@/components/about/section-scrim";
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

  The groups are named for what they produce, not for where they sit in an
  architecture diagram. "Front end / Back end / Infra" sorts tools by tier,
  which is a fact about the tools; "Product interfaces / Systems / Shipping"
  sorts them by what someone gets if they hire me, which is the only reading
  that belongs on this page. Same twelve names, answering a better question.
*/
const stack = [
  {
    label: "Product interfaces",
    items: ["TypeScript", "React", "Next.js", "Tailwind", "Framer Motion"],
  },
  { label: "Systems", items: ["Node", "PostgreSQL", "Prisma", "tRPC"] },
  { label: "Shipping", items: ["Docker", "AWS", "Vercel"] },
];

export default function StackSection() {
  return (
    <section
      id='stack'
      className='relative scroll-mt-28 pt-12 md:pt-16'>
      {/* The quietest band on the page: small type, and nothing to look at. */}
      <SectionScrim opacity={0.58} />

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
            className='flex flex-col gap-1.5 py-3.5 sm:flex-row sm:items-baseline sm:gap-6'>
            {/*
              The capability is the subject of the row and the tools are its
              evidence, so the label leads on weight and colour. Inverted --
              a dim 10px label beside sm-sized tool names -- the row read as
              a list of keywords that happened to have a category on it.
            */}
            <dt className='w-36 shrink-0 text-[11px] font-medium tracking-[0.12em] text-neutral-100 uppercase'>
              {group.label}
            </dt>
            <dd className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-neutral-300'>
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
