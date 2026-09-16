function graphemes(value: string): string[] {
  try {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const Segmenter = (Intl as typeof Intl & { Segmenter: new (locales?: string | string[], options?: { granularity: string }) => { segment(input: string): Iterable<{ segment: string }> } }).Segmenter;
      return Array.from(new Segmenter(undefined, { granularity: 'grapheme' }).segment(value), (item) => item.segment);
    }
  } catch {
    // Fall back to code points in older browsers.
  }
  return Array.from(value);
}

/** Removes decorative glyphs while preserving real letters, numbers and simple separators. */
export function toPasteReadyName(value: string, maxChars: number | null): string {
  const clean = value
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N} _-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return 'PLAYER';
  if (maxChars === null) return clean;
  return graphemes(clean).slice(0, maxChars).join('') || 'PLAYER';
}
