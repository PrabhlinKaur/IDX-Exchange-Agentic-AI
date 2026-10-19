export function formatCurrency(value: number | null): string {
  if (value == null) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export function formatPercentage(value: number | null): string {
  if (value == null) return "N/A";

  return `${Number(value).toFixed(2)}%`;
}

export function formatDays(value: number | string | null): string {
  if (value == null) return "N/A";

  return `${Number(value).toFixed(1)} days`;
}

export function formatPricePerSqFt(value: number | null): string {
  if (value == null) return "N/A";

  return `$${Number(value).toFixed(2)}/sq. ft.`;
}
