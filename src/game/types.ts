/**
 * LUMEN CRASH — tipos da SIMULAÇÃO EDUCACIONAL.
 * Nenhum valor aqui representa dinheiro real: todos os saldos são créditos fictícios.
 */

export type GamePhase = "WAITING" | "COUNTDOWN" | "RUNNING" | "CRASH" | "RESULT";

export interface RoundRecord {
  id: number;
  multiplier: number;
}

export interface SimulatedPlayer {
  id: string;
  name: string;
  bet: number;
  /** null enquanto a rodada corre; number = sacou; "CRASH" = perdeu */
  cashedAt: number | null | "CRASH";
}

export interface PlayerBet {
  amount: number;
  cashedOutAt: number | null;
}
