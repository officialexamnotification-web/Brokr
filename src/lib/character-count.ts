export function countCharacters(value: string): number {
  try {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const Segmenter = (Intl as typeof Intl & {
        Segmenter: new (locales?: string | string[], options?: { granularity: string }) => { segment(input: string): Iterable<unknown> };
      }).Segmenter;
      return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value)).length;
    }
  } catch {
    // Fall through to Unicode code-point counting.
  }
  return Array.from(value).length;
}

export function truncateCharacters(value: string, limit: number): string {
  const safeLimit = Math.max(0, Math.floor(limit));
  try {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const Segmenter = (Intl as typeof Intl & {
        Segmenter: new (locales?: string | string[], options?: { granularity: string }) => { segment(input: string): Iterable<{ segment: string }> };
      }).Segmenter;
      return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value), (part) => part.segment).slice(0, safeLimit).join('');
    }
  } catch {
    // Fall through to code-point-safe truncation.
  }
  return Array.from(value).slice(0, safeLimit).join('');
}
