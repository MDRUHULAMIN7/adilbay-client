/**
 * Branded Order ID Generator Utility
 * Produces order numbers in format: FX-YYYYMMDD-XXXXX
 * Example: FX-20260722-48291
 */
export function generateOrderId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomDigits = Math.floor(10000 + Math.random() * 90000);

  return `FX-${year}${month}${day}-${randomDigits}`;
}
