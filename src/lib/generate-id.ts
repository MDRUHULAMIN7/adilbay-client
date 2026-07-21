export function generateId(prefix = 'id'): string {
  const randomPart = Math.random().toString(36).substring(2, 9);
  const timePart = Date.now().toString(36).substring(4);
  return `${prefix}-${randomPart}-${timePart}`;
}
