import { cn } from "@/lib/utils";
import { formatMultiplier } from "@/lib/format";
import type { RoundRecord } from "@/game/types";

const tone = (m: number) =>
  m >= 10
    ? "border-gold/40 text-gold bg-gold/10"
    : m >= 2
      ? "border-primary/40 text-primary bg-primary/10"
      : "border-crash/40 text-crash bg-crash/10";

export function RoundHistory({ history }: { history: RoundRecord[] }) {
  return (
    <section className="p-4 bg-transparent overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible no-scrollbar">
        {history.map((r) => (
          <span
            key={r.id}
            className={cn(
              "animate-slide-chip shrink-0 rounded-full border px-3 py-1.5 font-display text-sm font-bold tabular-nums",
              tone(r.multiplier),
            )}
          >
            {formatMultiplier(r.multiplier)}
          </span>
        ))}
      </div>
    </section>
  );
}
