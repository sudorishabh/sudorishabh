"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Writing" },
  { href: "/#projects", label: "Projects" },
];

export function SiteHeader() {
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Avatar className="size-7 border">
            <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
            <AvatarFallback className="text-[10px]">
              {DATA.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium tracking-tight">
            {DATA.name}
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <span className="hidden h-4 w-px bg-border sm:block" />

          <div className="hidden items-center gap-3 sm:flex">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground transition-colors hover:text-brand"
              >
                <social.icon className="size-4" />
              </Link>
            ))}
          </div>

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
