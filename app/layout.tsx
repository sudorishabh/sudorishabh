import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import BackgroundWaves from "../components/BgGradientEffect";
import MotionProvider from "@/components/ui/motion-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "sudorishabh.com",
  description: "Rishabh's personal site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={cn("font-sans", geist.variable)}>
      <body
        className={`${display.variable} ${sans.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}>
        <BackgroundWaves />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
