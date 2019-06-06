export const BACKSPACE = '\x08';
export function isPrintable(c: string) {
  const code = c.charCodeAt(0);
  return code >= 32 && code <= 126;
}
