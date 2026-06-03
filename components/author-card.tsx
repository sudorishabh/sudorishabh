import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";

export function AuthorCard() {
  const socials = Object.values(DATA.contact.social).filter(
    (social) => social.navbar,
  );

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-muted/20 p-6 sm:flex-row">
      <Avatar className="size-14 border">
        <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
        <AvatarFallback>{DATA.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Written by
        </p>
        <h3 className="mt-0.5 text-base font-semibold tracking-tight">
          {DATA.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {DATA.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <social.icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
