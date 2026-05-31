"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Target = { mount: HTMLElement; lang: string; figure: HTMLElement };

/**
 * Decorates server-rendered code blocks (dangerouslySetInnerHTML) with a
 * language badge and copy button. Anchors the toolbar to the non-scrolling
 * <figure> wrapper so it stays put when the <pre> scrolls horizontally.
 */
export function CodeBlockEnhancements() {
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    const figures = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".article-content figure[data-rehype-pretty-code-figure]",
      ),
    );

    const created: Target[] = [];
    figures.forEach((figure) => {
      const lang =
        figure.querySelector("pre")?.getAttribute("data-language") ??
        figure.querySelector("code")?.getAttribute("data-language") ??
        "";
      const mount = document.createElement("div");
      mount.setAttribute("data-code-toolbar", "");
      figure.appendChild(mount);
      created.push({ mount, lang, figure });
    });

    setTargets(created);
    return () => created.forEach((t) => t.mount.remove());
  }, []);

  return (
    <>
      {targets.map((t, i) =>
        createPortal(<Toolbar lang={t.lang} figure={t.figure} />, t.mount, `cb-${i}`),
      )}
    </>
  );
}

function Toolbar({ lang, figure }: { lang: string; figure: HTMLElement }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const text = figure.querySelector("code")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="absolute right-2 top-2 flex items-center gap-2">
      {lang && lang !== "plaintext" && lang !== "text" && (
        <span className="select-none rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {lang}
        </span>
      )}
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="flex size-7 items-center justify-center rounded border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      >
        {copied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  );
}
