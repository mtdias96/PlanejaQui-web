/**
 * Cálculos puros e derivações de métricas para o Dashboard.
 */

export function calculateMonthProgress(currentDay: number, totalDays: number): number {
  if (totalDays <= 0) return 0;
  const progress = (currentDay / totalDays) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

export function calculateRemainingDays(currentDay: number, totalDays: number): number {
  if (totalDays <= 0) return 0;
  return Math.max(totalDays - currentDay, 0);
}

export function calculateSplitRatio(
  freeCents: number,
  realBalanceCents: number
): { freeRatio: number; reservedRatio: number } {
  if (realBalanceCents <= 0) {
    return { freeRatio: 0, reservedRatio: 0 };
  }
  const reservedCents = Math.max(realBalanceCents - freeCents, 0);
  const freeRatio = Math.min(Math.max((freeCents / realBalanceCents) * 100, 0), 100);
  const reservedRatio = Math.min(Math.max((reservedCents / realBalanceCents) * 100, 0), 100);
  return { freeRatio, reservedRatio };
}

export function formatSignedPercent(percent: number): string {
  const sign = percent > 0 ? "+" : "";
  return `${sign}${percent}%`;
}
