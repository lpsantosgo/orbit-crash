import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "./useAudio";
import type { GamePhase, PlayerBet, RoundRecord, SimulatedPlayer } from "./types";

/**
 * ================================================================
 *  SIMULAÇÃO EDUCACIONAL — LUMEN CRASH
 *  Toda a lógica abaixo é fictícia e roda 100% no navegador.
 *  Créditos virtuais, sem pagamentos, depósitos ou saques reais.
 *  Fluxo: WAITING -> COUNTDOWN -> RUNNING -> CRASH -> RESULT -> WAITING
 * ================================================================
 */

const WAITING_MS = 1600;
const COUNTDOWN_MS = 5000;
const CRASH_HOLD_MS = 3200;
const GROWTH = 0.00023; // velocidade de crescimento do multiplicador
const MAX_POINTS = 420;

const NAMES = [
  "Carlos",
  "Lucas",
  "Marcos",
  "Pedro",
  "Ana",
  "Julia",
  "Rafael",
  "Bianca",
  "Diego",
  "Helena",
];

const randomCrashPoint = () => {
  // Distribuição fictícia com cauda longa (apenas para demonstração)
  const u = Math.random();
  const raw = 0.97 / (1 - u * 0.985);
  return Math.min(120, Math.max(1, Math.round(raw * 100) / 100));
};

const multiplierAt = (elapsed: number) => Math.exp(GROWTH * elapsed);
const elapsedFor = (multiplier: number) => Math.log(multiplier) / GROWTH;

const buildPlayers = (): SimulatedPlayer[] => {
  const shuffled = [...NAMES].sort(() => Math.random() - 0.5).slice(0, 7);
  return shuffled.map((name, i) => ({
    id: `${name}-${i}`,
    name,
    bet: [10, 25, 50, 100, 150, 200, 500][Math.floor(Math.random() * 7)] ?? 50,
    cashedAt: null,
  }));
};

export interface CrashGameState {
  phase: GamePhase;
  multiplier: number;
  crashPoint: number;
  countdown: number;
  balance: number;
  bet: PlayerBet | null;
  pendingBet: boolean;
  betAmount: number;
  history: RoundRecord[];
  players: SimulatedPlayer[];
  curve: { x: number; y: number }[];
  lastWin: { multiplier: number; amount: number } | null;
  setBetAmount: (value: number) => void;
  placeBet: () => void;
  cashOut: () => void;
  addCredits: () => void;
}

export function useCrashGame(): CrashGameState {
  const [phase, setPhase] = useState<GamePhase>("WAITING");
  const [multiplier, setMultiplier] = useState(1);
  const [crashPoint, setCrashPoint] = useState(1);
  const [countdown, setCountdown] = useState(COUNTDOWN_MS);
  const [balance, setBalance] = useState(10000);
  const [betAmount, setBetAmountState] = useState(100);
  const [bet, setBet] = useState<PlayerBet | null>(null);
  const [pendingBet, setPendingBet] = useState(false);
  const [history, setHistory] = useState<RoundRecord[]>([
    { id: -1, multiplier: 1.24 },
    { id: -2, multiplier: 2.15 },
    { id: -3, multiplier: 1.03 },
    { id: -4, multiplier: 8.72 },
    { id: -5, multiplier: 3.41 },
    { id: -6, multiplier: 1.18 },
    { id: -7, multiplier: 12.45 },
    { id: -8, multiplier: 2.87 },
  ]);
  const [players, setPlayers] = useState<SimulatedPlayer[]>(buildPlayers);
  const [curve, setCurve] = useState<{ x: number; y: number }[]>([{ x: 0, y: 1 }]);
  const [lastWin, setLastWin] = useState<{ multiplier: number; amount: number } | null>(null);
  const { play } = useAudio();

  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const betRef = useRef(bet);
  betRef.current = bet;
  const roundId = useRef(1);
  const frame = useRef<number>(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const targets = useRef<Record<string, number>>({});

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  // ---- ciclo principal de rodadas (simulado) ----
  useEffect(() => {
    let cancelled = false;

    const startRound = () => {
      if (cancelled) return;
      const point = randomCrashPoint();
      const roster = buildPlayers();
      targets.current = Object.fromEntries(
        roster.map((p) => [p.id, Math.round((1.1 + Math.random() * 4.5) * 100) / 100]),
      );
      setCrashPoint(point);
      setPlayers(roster);
      setCurve([{ x: 0, y: 1 }]);
      setMultiplier(1);
      setLastWin(null);
      setPhase("COUNTDOWN");
      setCountdown(COUNTDOWN_MS);

      const cdStart = performance.now();
      const tick = () => {
        if (cancelled) return;
        const left = COUNTDOWN_MS - (performance.now() - cdStart);
        setCountdown(Math.max(0, left));
        if (left <= 0) {
          run(point);
          return;
        }
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    };

    const run = (point: number) => {
      // aposta pendente entra em jogo
      setPendingBet((pending) => {
        if (pending) setBet({ amount: betAmountRef.current, cashedOutAt: null });
        return false;
      });
      setPhase("RUNNING");
      play("launch");
      const start = performance.now();
      const duration = elapsedFor(point);

      const tick = () => {
        if (cancelled) return;
        const elapsed = performance.now() - start;
        if (elapsed >= duration) {
          setMultiplier(point);
          setCurve((c) => [...c, { x: duration, y: point }]);
          crash(point);
          return;
        }
        const value = multiplierAt(elapsed);
        setMultiplier(value);
        setCurve((c) => {
          const next = c.length >= MAX_POINTS ? c.slice(1) : c.slice();
          next.push({ x: elapsed, y: value });
          return next;
        });
        setPlayers((prev) =>
          prev.map((p) => {
            const target = targets.current[p.id] ?? Infinity;
            return p.cashedAt === null && target <= value && target < point
              ? { ...p, cashedAt: target }
              : p;
          }),
        );
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    };

    const crash = (point: number) => {
      setPhase("CRASH");
      play("crash");
      setPlayers((prev) => prev.map((p) => (p.cashedAt === null ? { ...p, cashedAt: "CRASH" } : p)));
      setHistory((h) => [{ id: roundId.current++, multiplier: point }, ...h].slice(0, 24));
      later(() => {
        if (cancelled) return;
        setPhase("RESULT");
        setBet(null);
        later(() => {
          if (cancelled) return;
          setPhase("WAITING");
          later(startRound, WAITING_MS);
        }, 400);
      }, CRASH_HOLD_MS);
    };

    later(startRound, WAITING_MS);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame.current);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [later]);

  const betAmountRef = useRef(betAmount);
  betAmountRef.current = betAmount;

  const setBetAmount = useCallback((value: number) => {
    setBetAmountState(Math.max(1, Math.min(100000, Math.round(value))));
  }, []);

  const placeBet = useCallback(() => {
    if (pendingBet || bet) return;
    if (betAmount > balance) return;
    setBalance((b) => b - betAmount);
    setPendingBet(true);
    setLastWin(null);
  }, [balance, bet, betAmount, pendingBet]);

  const cashOut = useCallback(() => {
    const active = betRef.current;
    if (!active || active.cashedOutAt !== null || phaseRef.current !== "RUNNING") return;
    const at = Math.round(multiplier * 100) / 100;
    const amount = Math.round(active.amount * at * 100) / 100;
    setBet({ ...active, cashedOutAt: at });
    setBalance((b) => b + amount);
    setLastWin({ multiplier: at, amount });
    play("win");
  }, [multiplier, play]);

  const addCredits = useCallback(() => setBalance((b) => b + 1000), []);

  return useMemo(
    () => ({
      phase,
      multiplier,
      crashPoint,
      countdown,
      balance,
      bet,
      pendingBet,
      betAmount,
      history,
      players,
      curve,
      lastWin,
      setBetAmount,
      placeBet,
      cashOut,
      addCredits,
    }),
    [
      phase,
      multiplier,
      crashPoint,
      countdown,
      balance,
      bet,
      pendingBet,
      betAmount,
      history,
      players,
      curve,
      lastWin,
      setBetAmount,
      placeBet,
      cashOut,
      addCredits,
    ],
  );
}
