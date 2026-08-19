import { cn } from "@/lib/utils";
import { formatCredits, formatMultiplier } from "@/lib/format";
import { CrashCurve } from "./CrashCurve";
import type { GamePhase } from "@/game/types";

interface Props {
  phase: GamePhase;
  multiplier: number;
  crashPoint: number;
  countdown: number;
  curve: { x: number; y: number }[];
  lastWin: { multiplier: number; amount: number } | null;
}

const STATUS: Record<GamePhase, string> = {
  WAITING: "AGUARDANDO PRÓXIMA RODADA",
  COUNTDOWN: "INICIANDO...",
  RUNNING: "RODADA EM ANDAMENTO",
  CRASH: "CRASH!",
  RESULT: "RODADA ENCERRADA",
};

export function GameBoard({ phase, multiplier, crashPoint, countdown, curve, lastWin }: Props) {
  const crashed = phase === "CRASH" || phase === "RESULT";
  const seconds = (countdown / 1000).toFixed(1);
  const progress = phase === "COUNTDOWN" ? 1 - countdown / 5000 : 0;

  return (
    <section
      className={cn(
        "glass-panel relative isolate overflow-hidden rounded-3xl",
        crashed && "animate-shake",
      )}
      style={{ boxShadow: crashed ? "var(--shadow-crash)" : "var(--shadow-neon)" }}
    >
      <div className="grid-backdrop absolute inset-0 opacity-60" aria-hidden="true" />
      
      {/* Fundo Espacial Realista e Animado */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Nebulosas Distantes */}
        <div className="nebula-cloud absolute -top-1/4 -left-1/4 h-full w-full opacity-10 animate-[nebula-pulse_15s_ease-in-out_infinite]" />
        <div className="nebula-cloud absolute -bottom-1/4 -right-1/4 h-full w-full opacity-10 animate-[nebula-pulse_20s_ease-in-out_infinite_reverse]" style={{ '--neon': 'oklch(0.6 0.2 280)' } as any} />
        
        {/* Camadas de Estrelas com Parallax Simulado */}
        <div 
          className={cn(
            "stars-layer absolute inset-[-1000px] opacity-40",
            phase === "RUNNING" && "animate-[star-move_40s_linear_infinite]"
          )}
        />
        <div 
          className={cn(
            "stars-layer absolute inset-[-1000px] opacity-20 scale-150",
            phase === "RUNNING" && "animate-[star-move_20s_linear_infinite]"
          )}
        />
      </div>

      <div className="relative flex items-center justify-between gap-3 px-4 pt-4 sm:px-6">
        <span className="font-display text-sm font-bold tracking-[0.4em] text-muted-foreground">
          CRASH
        </span>
        <span
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em]",
            crashed
              ? "border-crash/50 bg-crash/15 text-crash"
              : phase === "RUNNING"
                ? "border-primary/50 bg-primary/12 text-primary"
                : "border-border bg-secondary/60 text-muted-foreground",
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={cn(
                "absolute inset-0 animate-pulse-ring rounded-full",
                crashed ? "bg-crash" : "bg-primary",
              )}
            />
            <span className={cn("h-1.5 w-1.5 rounded-full", crashed ? "bg-crash" : "bg-primary")} />
          </span>
          {STATUS[phase]}
        </span>
      </div>

      <div className="relative h-[46vh] min-h-[260px] w-full sm:h-[400px]">
        <CrashCurve curve={curve} phase={phase} />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          {phase === "COUNTDOWN" ? (
            <div className="animate-pop-in flex flex-col items-center gap-4">
              <p className="font-display text-xs font-bold tracking-[0.3em] text-muted-foreground">
                PRÓXIMA RODADA EM
              </p>
              <p className="neon-text font-display text-6xl font-black tabular-nums sm:text-7xl">
                {seconds}s
              </p>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-secondary sm:w-56">
                <div
                  className="h-full rounded-full transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress * 100}%`, background: "var(--gradient-neon)" }}
                />
              </div>
            </div>
          ) : phase === "WAITING" ? (
            <p className="animate-pop-in font-display text-2xl font-bold tracking-[0.18em] text-muted-foreground">
              PREPARANDO...
            </p>
          ) : (
            <div className="animate-pop-in flex flex-col items-center">
              {crashed && (
                <p className="font-display text-xs font-black tracking-[0.34em] text-crash sm:text-sm">
                  CRASHED AT
                </p>
              )}
              <p
                className={cn(
                  "font-display text-[19vw] leading-[0.95] font-black tabular-nums sm:text-[7rem] lg:text-[8.5rem]",
                  crashed ? "crash-text" : "neon-text",
                )}
                style={{ transform: phase === "RUNNING" ? "scale(1)" : undefined }}
              >
                {formatMultiplier(crashed ? crashPoint : multiplier)}
              </p>
            </div>
          )}

          {lastWin && (
            <div className="animate-rise mt-2 rounded-2xl border border-primary/40 bg-primary/12 px-4 py-2">
              <p className="font-display text-sm font-bold text-primary">
                VOCÊ SACOU EM {formatMultiplier(lastWin.multiplier)}
              </p>
              <p className="text-xs text-foreground/80">
                +{formatCredits(lastWin.amount)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
