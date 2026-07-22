export type CurrencyCode = 'BDT' | 'USD' | 'EUR';

export interface FormatPriceOptions {
  currency?: CurrencyCode;
  locale?: string;
  showDecimals?: boolean;
}

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  BDT: 'Tk ',
  USD: '$',
  EUR: '€',
};

/**
 * Enterprise Price Formatter Utility
 * Formats numeric amounts into localized currency strings.
 * Default currency: BDT (Tk)
 */
export function formatPrice(
  amount: number,
  options: FormatPriceOptions = {}
): string {
  const { currency = 'BDT', showDecimals = false } = options;
  const safeAmount = isNaN(amount) ? 0 : amount;
  const symbol = CURRENCY_SYMBOLS[currency] || 'Tk ';

  const formattedNumber = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(safeAmount);

  return `${symbol}${formattedNumber}`;
}
