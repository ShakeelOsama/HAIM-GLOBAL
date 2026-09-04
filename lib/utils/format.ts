const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

/** Format integer cents as a USD string. e.g. 1099 → "$10.99" */
export function formatPrice(cents: number): string {
  return usd.format(cents / 100);
}

/** Percentage discount between original and sale price (both in cents). */
export function discountPercent(original: number, sale: number): number {
  return Math.round((1 - sale / original) * 100);
}

/** Convert a dollar string/number to cents. e.g. "10.99" → 1099 */
export function dollarsToCents(dollars: string | number): number {
  return Math.round(Number(dollars) * 100);
}
