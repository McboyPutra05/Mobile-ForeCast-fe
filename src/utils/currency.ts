/**
 * Currency, Price, and Number formatters
 */

export function formatPrice(price: number, symbol?: string): string {
  if (symbol === 'USDIDR') {
    return `Rp ${price.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  if (symbol === 'XAUUSD') {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (symbol === 'DXY') {
    return price.toFixed(2);
  }
  if (symbol === 'USOIL') {
    return `$${price.toFixed(2)}`;
  }
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

export function formatChange(changePoint: number, changePercent: number): string {
  const sign = changePoint >= 0 ? '+' : '';
  return `${sign}${changePoint.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
}

export function formatZScore(zScore: number): string {
  const sign = zScore >= 0 ? '+' : '';
  return `${sign}${zScore.toFixed(2)} σ`;
}

