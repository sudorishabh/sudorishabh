import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ContactSection from "@/components/about/contact-section";
import ExperienceSection from "@/components/about/experience-section";
import HeroSection from "@/components/about/hero-section";
import PageBackground from "@/components/about/page-background";
import ProjectSection from "@/components/about/projects-section";
import SiteNav from "@/components/about/site-nav";
import StackMarquee from "@/components/about/stack-marquee";

export const metadata: Metadata = {
  title: "Rishabh Negi — Software engineer",
  description: "What I build and where I've been.",
};

/*
  Top padding clears the fixed nav (`site-nav.tsx`), whose pill bottoms out at
  ~60px, rising to ~68px once its own `md:pt-6` kicks in. Without it the photo
  stack starts at y=0 and the nav sits on top of its first row. The values
  match the hero's `scroll-mt-24`, so an anchor jump to #top lands where the
  page already rests.
*/
const column = "mx-auto w-full max-w-3xl px-5 pt-24 md:pt-28";

export default function AboutPage() {
  return (
    <main className='relative z-10 min-h-dvh'>
      <PageBackground />
      <SiteNav />

      <div className={column}>
        <HeroSection />

        <div
          className='animate-reveal mt-12'
          style={{ "--reveal-delay": "480ms" } as CSSProperties}>
          <StackMarquee />
        </div>

        <div className='pt-10'>
          <ProjectSection />
        </div>

        <ExperienceSection />
        <ContactSection />

        <div className='h-24' />
      </div>
    </main>
  );
}
