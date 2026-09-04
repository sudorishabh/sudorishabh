import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import BackgroundWaves from "./components/BgGradientEffect";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
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
    <html lang='en'>
      <body
        className={`${display.variable} ${sans.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}>
        <BackgroundWaves />
        {children}
      </body>
    </html>
  );
}
