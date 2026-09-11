/*
  A full-bleed dark wash behind one section, so the painting can be loud in
  the hero and quiet where there is something to read.

  It has to live inside the section rather than in `PageBackground`, because
  that layer is `fixed`: it sits in viewport space and cannot know which
  section is currently in front of it. A scrim owned by the section travels
  with it.

  `w-screen` off `left-1/2` escapes the centred column -- a wash clipped to
  the 768px column would read as a panel edge running down both margins.
  `<main>` carries `overflow-x-clip` so that 100vw can never open a
  horizontal scrollbar.

  z-index: above `PageBackground` at -5, below the section's own content.
*/
export default function SectionScrim({ opacity }: { opacity: number }) {
  return (
    <span
      aria-hidden='true'
      className='pointer-events-none absolute inset-y-0 left-1/2 -z-1 w-screen -translate-x-1/2'
      /*
        Feathered at both ends. A flat rectangle of tint would draw two hard
        horizontal lines across the painting, which is a more distracting
        artefact than the brightness it was fixing.
      */
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent, rgba(10,10,10,${opacity}) 14%, rgba(10,10,10,${opacity}) 86%, transparent)`,
      }}
    />
  );
}
