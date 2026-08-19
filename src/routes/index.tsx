import { createFileRoute } from "@tanstack/react-router";
import { BalanceBar } from "@/components/crash/BalanceBar";
import { BettingPanel } from "@/components/crash/BettingPanel";
import { GameBoard } from "@/components/crash/GameBoard";
import { PlayersList } from "@/components/crash/PlayersList";
import { RoundHistory } from "@/components/crash/RoundHistory";
import { useCrashGame } from "@/game/useCrashGame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen Crash — Simulador de Crash Game com Créditos Virtuais" },
      {
        name: "description",
        content:
          "Lumen Crash é uma simulação educacional de crash game: multiplicador ao vivo, saque instantâneo e créditos virtuais. Sem dinheiro real.",
      },
      { property: "og:title", content: "Lumen Crash — Simulador de Crash Game" },
      {
        property: "og:description",
        content:
          "Protótipo de interface de crash game com multiplicador dinâmico, histórico de rodadas e créditos fictícios.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const game = useCrashGame();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-4 px-3 py-4 sm:px-5 sm:py-6">
      <BalanceBar balance={game.balance} onAddCredits={game.addCredits} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-4">
          <GameBoard
            phase={game.phase}
            multiplier={game.multiplier}
            crashPoint={game.crashPoint}
            countdown={game.countdown}
            curve={game.curve}
            lastWin={game.lastWin}
          />
          <div className="lg:hidden">
            <RoundHistory history={game.history} />
          </div>
          <BettingPanel
            phase={game.phase}
            multiplier={game.multiplier}
            betAmount={game.betAmount}
            balance={game.balance}
            bet={game.bet}
            pendingBet={game.pendingBet}
            setBetAmount={game.setBetAmount}
            placeBet={game.placeBet}
            cashOut={game.cashOut}
          />
          <div className="lg:hidden">
            <PlayersList players={game.players} />
          </div>
        </div>

        <aside className="hidden min-w-0 flex-col gap-4 lg:flex">
          <RoundHistory history={game.history} />
          <PlayersList players={game.players} />
        </aside>
      </div>

      <footer className="pb-2 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
        Lumen Crash é um protótipo de interface criado exclusivamente para estudo e demonstração.
        Todos os valores são créditos fictícios — não há pagamentos, depósitos ou saques reais.
      </footer>
    </main>
  );
}
