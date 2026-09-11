import type { CSSProperties } from "react";
import { instrumentSerif } from "@/lib/fonts";
import { glass } from "@/lib/glass";
import { cn } from "@/lib/utils";

/*
  The name block. It previously carried its own unused copy of the social
  links array -- those now live in lib/site and are rendered once by the nav
  and once by the footer.
*/
export default function NameTitle() {
  return (
    <div className='relative z-20 flex flex-col items-center'>
      {/* <span
        className={glass(
          { density: "thin", edge: false, grain: false },
          "animate-reveal mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-wide text-neutral-300",
        )}
        style={{ "--reveal-delay": "80ms" } as CSSProperties}>
        <span className='relative grid size-1.5 place-items-center'>
          <span className='absolute size-1.5 animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none' />
          <span className='size-1.5 rounded-full bg-emerald-400' />
        </span>
        Open to new work
      </span> */}

      <h1
        className={cn(
          instrumentSerif.className,
          "display-name animate-reveal text-center text-6xl leading-[0.92] tracking-[-0.03em] md:text-7xl",
        )}
        style={{ "--reveal-delay": "160ms" } as CSSProperties}>
        Rishabh Negi
      </h1>

      {/*
        The positioning statement, and the one line on the page that has to
        earn its place in ten seconds. It used to read "software engineer
        building things on the web", which describes several million people.
        Naming both halves of the work -- and where they end -- is the whole
        point; the stack itself is the metadata row's job, not this line's.
      */}
      <p
        className='animate-reveal mt-5 max-w-lg text-center text-base leading-relaxed text-balance text-neutral-200 md:text-lg'
        style={{ "--reveal-delay": "240ms" } as CSSProperties}>
        I build fast product interfaces and the systems behind them — from the
        first pixel to the query plan.
      </p>
    </div>
  );
}
