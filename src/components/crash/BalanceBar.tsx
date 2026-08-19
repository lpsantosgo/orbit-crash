import { PlusCircle, Zap } from "lucide-react";
import { formatCredits } from "@/lib/format";

export function BalanceBar({ balance, onAddCredits }: { balance: number; onAddCredits: () => void }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
          style={{ background: "var(--gradient-neon)", boxShadow: "var(--shadow-neon)" }}
        >
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg font-black tracking-[0.2em] sm:text-xl">
            LUMEN <span className="neon-text">CRASH</span>
          </h1>
          <p className="truncate text-[0.65rem] tracking-[0.16em] text-muted-foreground">
            SIMULAÇÃO · CRÉDITOS VIRTUAIS
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
        <button
          type="button"
          onClick={onAddCredits}
          className="flex h-14 items-center gap-2 rounded-2xl border border-primary/40 bg-primary/12 px-3 text-xs font-bold tracking-wide text-primary transition-all hover:bg-primary/20 active:scale-95 sm:px-4"
        >
          <PlusCircle className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">ADICIONAR CRÉDITOS</span>
          <span className="sm:hidden">CRÉDITOS</span>
        </button>
      </div>
    </header>
  );
}
