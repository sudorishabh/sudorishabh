import type { Metadata } from "next";
import ContactSection from "@/components/about/contact-section";
import HeroSection from "@/components/about/hero-section";
import PageBackground from "@/components/about/page-background";
import ProjectSection from "@/components/about/projects-section";
import SiteNav from "@/components/about/site-nav";
import StackSection from "@/components/about/stack-section";

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
const column = "mx-auto w-full max-w-3xl px-5 pt-24 pb-24 md:pt-28";

/*
  Hero straight into the work. There used to be a "Skills" pill between the
  two, holding the hero cluster open by another ~100px before anything a
  reader could evaluate arrived; the stack it stood for now sits below the
  projects instead of delaying them.

  `ExperienceSection` is deliberately not mounted: its three entries are
  descriptions of skills ("Frontend & product", "Backend & infra") rather
  than a history, so between the projects and the stack list it said a third
  version of the same thing. It stays in the tree for when there are real
  roles and dates to put in it.
*/
export default function AboutPage() {
  return (
    <main className='relative z-10 min-h-dvh'>
      <PageBackground />
      <SiteNav />

      <div className={column}>
        <HeroSection />
        <ProjectSection />
        <StackSection />
        <ContactSection />
      </div>
    </main>
  );
}
