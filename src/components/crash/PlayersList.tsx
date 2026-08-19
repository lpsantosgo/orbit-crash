import { cn } from "@/lib/utils";
import { formatCredits, formatMultiplier } from "@/lib/format";
import type { SimulatedPlayer } from "@/game/types";

export function PlayersList({ players }: { players: SimulatedPlayer[] }) {
  return (
    <section className="glass-panel rounded-2xl p-4">
      <header className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[0.7rem] font-bold tracking-[0.22em] text-muted-foreground">
          JOGADORES
        </h2>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
          simulados
        </span>
      </header>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_auto_auto] gap-x-3 text-[0.65rem] font-semibold tracking-[0.14em] text-muted-foreground">
        <span>JOGADOR</span>
        <span className="text-right">APOSTA</span>
        <span className="text-right">MULT.</span>
        <span className="text-right">GANHO</span>
      </div>

      <ul className="mt-2 space-y-1">
        {players.map((p) => {
          const lost = p.cashedAt === "CRASH";
          const open = p.cashedAt === null;
          const win = typeof p.cashedAt === "number" ? p.bet * p.cashedAt : 0;
          return (
            <li
              key={p.id}
              className={cn(
                "grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-x-3 rounded-xl px-2 py-2 text-sm tabular-nums transition-colors",
                open && "bg-secondary/40",
                !open && !lost && "bg-primary/10",
                lost && "bg-crash/10",
              )}
            >
              <span className="truncate font-medium">{p.name}</span>
              <span className="text-right text-muted-foreground">{p.bet}</span>
              <span
                className={cn(
                  "text-right font-display font-bold",
                  open && "text-muted-foreground",
                  !open && !lost && "text-primary",
                  lost && "text-crash",
                )}
              >
                {open ? "—" : lost ? "CRASH" : formatMultiplier(p.cashedAt as number)}
              </span>
              <span
                className={cn(
                  "text-right font-semibold",
                  open && "text-muted-foreground",
                  !open && !lost && "text-primary",
                  lost && "text-crash",
                )}
              >
                {open ? "..." : lost ? `-${p.bet}` : `+${formatCredits(win)}`}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
