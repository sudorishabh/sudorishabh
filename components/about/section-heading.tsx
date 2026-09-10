import type { ReactNode } from "react";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/*
  Shared by every section so the eyebrow/title rhythm stays identical. Both
  section files used to keep their own byte-identical copy of this.
*/
export default function SectionHeading({
  icon,
  label,
  title,
}: {
  icon: ReactNode;
  label: string;
  title: string;
}) {
  return (
    <div className='flex items-center gap-4'>
      <div>
        <p className='flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase'>
          {icon}
          {label}
        </p>
        <h2
          className={cn(
            instrumentSerif.className,
            "mt-1.5 text-3xl tracking-[-0.01em] text-neutral-50 md:text-4xl",
          )}>
          {title}
        </h2>
      </div>

      {/* Rule that runs from the title out to the column edge and fades. */}
      <span
        aria-hidden='true'
        className='mt-6 h-px flex-1 bg-linear-to-r from-white/15 to-transparent'
      />
    </div>
  );
}
