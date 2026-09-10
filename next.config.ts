import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },

  /*
    The site is a single page served at /about. A config-level redirect sends
    the bare domain there as a real HTTP 307, before any React renders --
    `redirect()` inside a statically prerendered app/page.tsx only produced an
    empty shell that never navigated.

    Flip `permanent` to true once the structure has settled; a 308 gets cached
    hard by browsers, which is painful to undo.
  */
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/about",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
