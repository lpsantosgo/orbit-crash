import { Rocket } from "lucide-react";
import { formatCredits } from "@/lib/format";

export function BalanceBar({ balance, onAddCredits }: { balance: number; onAddCredits: () => void }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
          style={{ background: "var(--gradient-neon)", boxShadow: "var(--shadow-neon)" }}
        >
          <Rocket className="h-5 w-5 text-primary-foreground fill-current" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg font-black tracking-[0.2em] sm:text-xl">
            GAME <span className="neon-text">CRASH</span>
          </h1>
          <p className="truncate text-[0.65rem] tracking-[0.16em] text-muted-foreground invisible">
            OFFICIAL
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end sm:gap-3">
        <div className="glass-panel min-w-0 flex-1 rounded-2xl px-4 py-2 text-right sm:flex-none">
          <p className="text-[0.6rem] font-bold tracking-[0.22em] text-muted-foreground">SALDO</p>
          <p className="font-display text-lg font-black tabular-nums sm:text-xl">
            {formatCredits(balance)}
          </p>
        </div>
        {/* Botão de adicionar créditos removido */}
      </div>
    </header>
  );
}
