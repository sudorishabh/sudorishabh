import { redirect } from "next/navigation";

// The site is blog-only. The original portfolio home is preserved at
// app/_archive/portfolio-home.tsx. Send the root to the blog.
export default function Home() {
  redirect("/blog");
}
