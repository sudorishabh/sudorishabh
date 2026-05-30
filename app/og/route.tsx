import { DATA } from "@/data/resume";
import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) || DATA.name;
  const domain = DATA.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #ededed 2%, transparent 0%), radial-gradient(circle at 75px 75px, #ededed 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#737373" }}>
          {domain}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            color: "#0a0a0a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#737373" }}>
          {DATA.name}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
