import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCredits, formatMultiplier } from "@/lib/format";
import type { GamePhase, PlayerBet } from "@/game/types";

interface Props {
  phase: GamePhase;
  multiplier: number;
  betAmount: number;
  balance: number;
  bet: PlayerBet | null;
  pendingBet: boolean;
  setBetAmount: (v: number) => void;
  placeBet: () => void;
  cashOut: () => void;
}

const QUICK = [10, 25, 50, 100, 500];

export function BettingPanel({
  phase,
  multiplier,
  betAmount,
  balance,
  bet,
  pendingBet,
  setBetAmount,
  placeBet,
  cashOut,
}: Props) {
  const running = phase === "RUNNING";
  const active = bet && bet.cashedOutAt === null;
  const canCashOut = Boolean(active) && running;
  const locked = pendingBet || Boolean(bet);

  const label = canCashOut
    ? `SACAR ${formatMultiplier(multiplier)}`
    : pendingBet
      ? "AGUARDANDO RODADA"
      : bet?.cashedOutAt
        ? `SACOU EM ${formatMultiplier(bet.cashedOutAt)}`
        : bet
          ? "RODADA EM CURSO"
          : "APOSTAR";

  const disabled = (!canCashOut && locked) || (!locked && betAmount > balance);

  return (
    <section className="glass-panel rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[0.7rem] font-bold tracking-[0.22em] text-muted-foreground">
          SUA APOSTA
        </h2>
        <span className="text-xs text-muted-foreground">
          Ganho potencial:{" "}
          <b className="text-primary">{formatCredits(betAmount * (running ? multiplier : 1))}</b>
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setBetAmount(betAmount - 10)}
          disabled={locked}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary/70 text-foreground transition-all hover:bg-secondary active:scale-95 disabled:opacity-40"
          aria-label="Diminuir aposta"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="relative min-w-0 flex-1">
          <input
            type="number"
            inputMode="numeric"
            value={betAmount}
            disabled={locked}
            onChange={(e) => setBetAmount(Number(e.target.value) || 1)}
            className="h-12 w-full rounded-xl border border-border bg-background/60 px-4 pr-16 font-display text-lg font-bold tabular-nums outline-none transition-colors focus:border-primary/60 disabled:opacity-50"
          />
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[0.65rem] font-bold tracking-widest text-muted-foreground">
            CRÉDITOS
          </span>
        </div>

        <button
          type="button"
          onClick={() => setBetAmount(betAmount + 10)}
          disabled={locked}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary/70 text-foreground transition-all hover:bg-secondary active:scale-95 disabled:opacity-40"
          aria-label="Aumentar aposta"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-5 gap-2">
        {QUICK.map((v) => (
          <button
            key={v}
            type="button"
            disabled={locked}
            onClick={() => setBetAmount(v)}
            className={cn(
              "h-10 rounded-xl border text-sm font-bold tabular-nums transition-all active:scale-95 disabled:opacity-40",
              betAmount === v
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground",
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={canCashOut ? cashOut : placeBet}
        disabled={disabled}
        className={cn(
          "mt-3 h-16 w-full rounded-2xl font-display text-lg font-black tracking-wide tabular-nums transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
          canCashOut ? "text-[oklch(0.18_0.04_60)]" : "text-primary-foreground",
        )}
        style={{
          background: canCashOut ? "var(--gradient-gold)" : "var(--gradient-neon)",
          boxShadow: canCashOut ? "0 14px 40px -16px var(--gold)" : "var(--shadow-neon)",
        }}
      >
        {label}
      </button>

      <p className="mt-2 text-center text-[0.7rem] text-muted-foreground invisible">
        -
      </p>
    </section>
  );
}
