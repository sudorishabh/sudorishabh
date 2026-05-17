import type { TocItem } from "@/data/blog";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;

  return (
    <details
      open
      className="group mb-10 rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
    >
      <summary className="flex cursor-pointer select-none list-none items-center justify-between text-sm font-medium tracking-tight text-foreground [&::-webkit-details-marker]:hidden">
        On this page
        <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.slug} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.slug}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
