import React from "react";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/sudorishabh",
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        className='h-5 w-5'>
        <path d='M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z' />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rishabh-negi",
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        className='h-5 w-5'>
        <path d='M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45Z' />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rishabhnegi175@gmail.com",
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.6}
        className='h-5 w-5'>
        <rect
          x='3'
          y='5'
          width='18'
          height='14'
          rx='2'
        />
        <path d='m3.5 6 8.5 7 8.5-7' />
      </svg>
    ),
  },
];

const chips = [
  "Projects",
  "Open Source",
  "Writing",
  "Notes",
  "Talks",
  "Now",
  "Resume",
];

const NameTitle = () => {
  return (
    <div>
      {" "}
      <div className='relative z-20  flex justify-center'>
        <div className='relative'>
          <h1
            className='display-name text-center text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl'
            data-text='Rishabh Negi'>
            Rishabh Negi
          </h1>
          <div className='absolute left-full top-1/2 ml-3 flex -translate-y-1/2 items-center gap-2'>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noreferrer'
                aria-label={link.label}
                className='rounded-full border border-neutral-700 p-2 text-neutral-300 transition-colors hover:border-neutral-400 hover:text-white'>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className='relative z-20 mx-auto mt-4 max-w-md text-center text-sm text-neutral-400 md:text-base'>
        Software engineer building things on the web.
      </p>
      <div className='relative z-20 mx-auto mt-6 flex justify-center'>
        <div className='w-72 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900/60 p-1.5'>
          <div className='mask-[linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] overflow-hidden'>
            <div className='animate-marquee flex w-max'>
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className='flex shrink-0 gap-2 pr-2'>
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className='shrink-0 rounded-full border border-neutral-700 px-4 py-1.5 text-sm whitespace-nowrap text-neutral-300'>
                      {chip}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameTitle;
