export type ProjectCoverVariant = "attention" | "recursive";

const GRID_COLS = 12;
const GRID_ROWS = 6;
const VIEW_W = 320;
const VIEW_H = 160;
const CELL = VIEW_W / GRID_COLS;

// Mimics a real self-attention heatmap: each row's focus drifts diagonally
// across the columns, plus a soft "attention sink" at the first token.
function attentionCells() {
  const cells: { x: number; y: number; opacity: number }[] = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const center = (r / (GRID_ROWS - 1)) * (GRID_COLS - 1);
    for (let c = 0; c < GRID_COLS; c++) {
      const focus = Math.exp(-((c - center) ** 2) / (2 * 1.6 ** 2));
      const sink = 0.12 * Math.exp(-(c ** 2) / 2);
      const opacity = Math.min(0.62, 0.05 + 0.55 * focus + sink);
      cells.push({ x: c * CELL, y: r * CELL, opacity });
    }
  }
  return cells;
}

function AttentionCover() {
  return (
    <div className="relative h-40 w-full overflow-hidden bg-muted/30">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        {attentionCells().map((cell, i) => (
          <rect
            key={i}
            x={cell.x + 1.5}
            y={cell.y + 1.5}
            width={CELL - 3}
            height={CELL - 3}
            rx={2}
            className="fill-brand"
            style={{ opacity: cell.opacity }}
          />
        ))}
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[10%] bg-gradient-to-r from-transparent via-brand/50 to-transparent blur-[6px] motion-safe:animate-[attn-scan_5s_ease-in-out_infinite] group-hover:[animation-duration:1.8s]"
      />
    </div>
  );
}

// Six self-similar frames counter-rotating at different speeds: a Droste-style
// recursion, standing in for a model that folds back through its own layers.
const RECURSION_LEVELS = [
  {
    size: 148,
    opacity: 0.16,
    base: "motion-safe:animate-[recur-spin-cw_42s_linear_infinite]",
    hover: "group-hover:[animation-duration:16s]",
  },
  {
    size: 126,
    opacity: 0.26,
    base: "motion-safe:animate-[recur-spin-ccw_37s_linear_infinite]",
    hover: "group-hover:[animation-duration:14s]",
  },
  {
    size: 104,
    opacity: 0.36,
    base: "motion-safe:animate-[recur-spin-cw_32s_linear_infinite]",
    hover: "group-hover:[animation-duration:12s]",
  },
  {
    size: 82,
    opacity: 0.46,
    base: "motion-safe:animate-[recur-spin-ccw_27s_linear_infinite]",
    hover: "group-hover:[animation-duration:10s]",
  },
  {
    size: 60,
    opacity: 0.56,
    base: "motion-safe:animate-[recur-spin-cw_22s_linear_infinite]",
    hover: "group-hover:[animation-duration:8s]",
  },
] as const;

function RecursiveCover() {
  const center = VIEW_W / 2;
  return (
    <div className="relative h-40 w-full overflow-hidden bg-muted/30">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-full w-full"
        aria-hidden
      >
        {RECURSION_LEVELS.map((level, i) => (
          <rect
            key={i}
            x={center - level.size / 2}
            y={VIEW_H / 2 - level.size / 2}
            width={level.size}
            height={level.size}
            rx={level.size * 0.12}
            className={`fill-none stroke-brand ${level.base} ${level.hover}`}
            strokeWidth={1.5}
            style={{ opacity: level.opacity, transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        ))}
        <circle
          cx={center}
          cy={VIEW_H / 2}
          r={4}
          className="fill-brand motion-safe:animate-[recur-pulse_6s_ease-in-out_infinite] group-hover:[animation-duration:2.2s]"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
      </svg>
    </div>
  );
}

export function ProjectCover({ variant }: { variant: ProjectCoverVariant }) {
  return variant === "attention" ? <AttentionCover /> : <RecursiveCover />;
}
