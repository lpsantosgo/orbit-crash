import { useMemo } from "react";
import type { GamePhase } from "@/game/types";

interface Props {
  curve: { x: number; y: number }[];
  phase: GamePhase;
}

const W = 1000;
const H = 520;
const PAD_X = 34;
const PAD_Y = 34;

/** Traço da trajetória + nave "Lumen Shard" (elemento visual original). */
export function CrashCurve({ curve, phase }: Props) {
  const crashed = phase === "CRASH" || phase === "RESULT";

  const { path, area, tip, angle } = useMemo(() => {
    const last = curve[curve.length - 1] ?? { x: 0, y: 1 };
    const xMax = Math.max(4200, last.x * 1.06);
    const yMax = Math.max(1.9, last.y * 1.12);

    const sx = (x: number) => PAD_X + (x / xMax) * (W - PAD_X * 2);
    const sy = (y: number) => H - PAD_Y - ((y - 1) / (yMax - 1)) * (H - PAD_Y * 2);

    const pts = curve.map((p) => [sx(p.x), sy(p.y)] as const);
    const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const end = pts[pts.length - 1] ?? [PAD_X, H - PAD_Y];
    const prev = pts[Math.max(0, pts.length - 8)] ?? end;
    const deg = (Math.atan2(end[1] - prev[1], end[0] - prev[0]) * 180) / Math.PI;

    return {
      path: d,
      area: pts.length > 1 ? `${d} L${end[0].toFixed(1)},${H - PAD_Y} L${PAD_X},${H - PAD_Y} Z` : "",
      tip: end,
      angle: Number.isFinite(deg) ? deg : 0,
    };
  }, [curve]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lc-stroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--neon-soft)" />
          <stop offset="100%" stopColor={crashed ? "var(--crash)" : "var(--neon)"} />
        </linearGradient>
        <linearGradient id="lc-area" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={crashed ? "var(--crash)" : "var(--neon)"}
            stopOpacity="0.32"
          />
          <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
        </linearGradient>
        <filter id="lc-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {area && <path d={area} fill="url(#lc-area)" />}
      <path
        d={path}
        fill="none"
        stroke="url(#lc-stroke)"
        strokeWidth={5}
        strokeLinecap="round"
        filter="url(#lc-glow)"
      />

      {curve.length > 1 && (
        <g transform={`translate(${tip[0]} ${tip[1]}) rotate(${angle})`} filter="url(#lc-glow)">
          {crashed ? (
            <g>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <rect
                  key={a}
                  x={0}
                  y={-2}
                  width={26}
                  height={4}
                  rx={2}
                  transform={`rotate(${a})`}
                  fill="var(--crash)"
                  opacity={0.85}
                />
              ))}
              <circle r={9} fill="var(--crash)" />
            </g>
          ) : (
            <g>
              <path d="M-26 -7 L-40 0 L-26 7 Z" fill="var(--neon-soft)" opacity={0.55} />
              <path d="M22 0 L-14 -13 L-6 0 L-14 13 Z" fill="var(--neon)" />
              <circle cx={2} cy={0} r={3.2} fill="var(--primary-foreground)" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
