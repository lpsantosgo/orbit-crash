export function BalanceBar({ balance, onAddCredits }: { balance: number; onAddCredits: () => void }) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between h-14">
      <div className="flex min-w-0 items-center gap-3">
        {/* Brand name and icon removed */}
      </div>

      <div className="flex items-center justify-between gap-2 sm:justify-end sm:gap-3">
        {/* Balance removed */}
      </div>
    </header>
  );
}
