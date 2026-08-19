export const formatCredits = (value: number) =>
  `R$ ${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`;

export const formatMultiplier = (value: number) => `${value.toFixed(2)}x`;
