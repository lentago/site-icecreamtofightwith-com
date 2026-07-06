// Helpers for the broadsheet "blog" framing: date formatting, roman-numeral
// issue numbers, and lede excerpts pulled from recipe bodies.
//
// All date formatting uses UTC getters on purpose. Frontmatter dates are
// bare "YYYY-MM-DD" strings, which z.coerce.date() parses as UTC midnight;
// formatting with local getters would shift the printed day in any negative
// timezone. UTC in, UTC out, no off-by-one.

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "Wednesday, June 24, 2026" — the full dispatch dateline. */
export function formatLong(d: Date): string {
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** "Jun 24, 2026" — compact feed dateline. */
export function formatShort(d: Date): string {
  return `${MONTHS_ABBR[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** "24 JUNE 2026" — the all-caps folio stamp. */
export function formatFolio(d: Date): string {
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].toUpperCase()} ${d.getUTCFullYear()}`;
}

/** ISO "2026-06-24" for <time datetime>. */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const ROMAN: Array<[number, string]> = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** 18 → "XVIII". Issue numbers wear roman numerals, like any respectable paper. */
export function toRoman(n: number): string {
  let out = '';
  let rem = n;
  for (const [value, sym] of ROMAN) {
    while (rem >= value) {
      out += sym;
      rem -= value;
    }
  }
  return out || 'O';
}

/**
 * Pull a plain-text lede from a recipe's raw markdown body: first prose
 * paragraph, inline markdown stripped, truncated on a word boundary.
 * The caller runs this through redactHtml — this returns bare text.
 */
export function excerpt(body: string, max = 220): string {
  const blocks = body.replace(/\r/g, '').split(/\n\s*\n/);
  const prose = blocks.find(b => {
    const t = b.trim();
    return t && !/^[#>\-*|]/.test(t) && !/^!\[/.test(t);
  }) ?? '';

  const clean = prose
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')      // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // links → text
    .replace(/[*_`]+/g, '')                    // bold/italic/code marks
    .replace(/\s+/g, ' ')
    .trim();

  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '') + '…';
}
