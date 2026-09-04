import type { CSSProperties } from "react";

type Wash = {
  colors: [string, string];
  position: string;
  opacity: number;
  duration: string;
  delay: string;
};

const washes: Wash[] = [
  {
    colors: ["244,63,94", "251,146,60"],
    position: "12% 8%",
    opacity: 0.9,
    duration: "24s",
    delay: "-5s",
  },
  {
    colors: ["56,189,248", "34,211,238"],
    position: "82% 14%",
    opacity: 0.85,
    duration: "31s",
    delay: "-13s",
  },
  {
    colors: ["167,139,250", "232,121,249"],
    position: "22% 78%",
    opacity: 0.85,
    duration: "28s",
    delay: "-19s",
  },
  {
    colors: ["52,211,153", "45,212,191"],
    position: "88% 82%",
    opacity: 0.8,
    duration: "36s",
    delay: "-8s",
  },
  {
    colors: ["251,191,36", "251,113,133"],
    position: "48% 4%",
    opacity: 0.75,
    duration: "22s",
    delay: "-16s",
  },
  {
    colors: ["129,140,248", "56,189,248"],
    position: "52% 96%",
    opacity: 0.8,
    duration: "34s",
    delay: "-25s",
  },
];

export default function BgGradientEffect() {
  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-neutral-950'>
      <div className='absolute inset-0 bg-neutral-950' />

      {washes.map((wash, i) => (
        <div
          key={i}
          className='ambient-wash absolute -inset-[15%]'
          style={
            {
              "--c1": wash.colors[0],
              "--c2": wash.colors[1],
              "--position": wash.position,
              "--opacity": wash.opacity,
              "--duration": wash.duration,
              "--delay": wash.delay,
            } as CSSProperties
          }
        />
      ))}

      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.3)_100%)]' />
    </div>
  );
}
