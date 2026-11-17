export type DateInput = string | number | Date | null | undefined;

/**
 * `Intl` formatters are relatively expensive to construct and the history,
 * thread and balance components format many rows. Keep one formatter per
 * locale/options combination instead of rebuilding it for every row.
 */
const relativeTimeFormats = new Map<string, Intl.RelativeTimeFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();
const currencyFormats = new Map<string, Intl.NumberFormat>();
const unitFormats = new Map<string, Intl.NumberFormat>();

function cached<T>(cache: Map<string, T>, key: string, create: () => T): T {
  const existing = cache.get(key);
  if (existing) return existing;
  const created = create();
  cache.set(key, created);
  return created;
}

function relativeTimeFormat(locale: string): Intl.RelativeTimeFormat {
  return cached(
    relativeTimeFormats,
    locale,
    () => new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }),
  );
}

function dateFormat(locale: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  return cached(
    dateFormats,
    `${locale}|${JSON.stringify(options)}`,
    () => new Intl.DateTimeFormat(locale, options),
  );
}

/** Convert anything date-ish into a Date, or `null` when invalid. */
export function toDate(value: DateInput): Date | null {
  if (value === null || value === undefined || value === '') return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Call-length clock: `0:07`, `12:34`, `1:02:03`. Negative and invalid values
 * are clamped to zero.
 */
export function formatDuration(totalSeconds: number): string {
  const safe = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}

/**
 * Human duration with localised units: `2 min 14 s`, `1 Std. 5 Min.`.
 * Uses the two largest units, at most.
 */
export function formatDurationWords(totalSeconds: number, locale = 'en'): string {
  const safe = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  const unit = (value: number, name: 'hour' | 'minute' | 'second') =>
    cached(
      unitFormats,
      `${locale}|${name}`,
      () =>
        new Intl.NumberFormat(locale, {
          style: 'unit',
          unit: name,
          unitDisplay: 'short',
          maximumFractionDigits: 0,
        }),
    ).format(value);

  if (hours > 0) {
    return [unit(hours, 'hour'), minutes > 0 ? unit(minutes, 'minute') : '']
      .filter(Boolean)
      .join(' ');
  }
  if (minutes > 0) {
    return [unit(minutes, 'minute'), seconds > 0 ? unit(seconds, 'second') : '']
      .filter(Boolean)
      .join(' ');
  }
  return unit(seconds, 'second');
}

/**
 * Relative time for lists: `now`, `5 min. ago`, `yesterday`, or `12 Nov`
 * once the entry is older than a week.
 */
export function formatRelativeTime(
  value: DateInput,
  options: { locale?: string; now?: DateInput } = {},
): string {
  const date = toDate(value);
  if (!date) return '';
  const { locale = 'en', now = new Date() } = options;
  const reference = toDate(now) ?? new Date();
  const diffSeconds = Math.round((date.getTime() - reference.getTime()) / 1000);
  const abs = Math.abs(diffSeconds);

  const relative = relativeTimeFormat(locale);

  if (abs < 45) return relative.format(0, 'second');
  if (abs < 3600) return relative.format(Math.round(diffSeconds / 60), 'minute');
  if (abs < 86_400) return relative.format(Math.round(diffSeconds / 3600), 'hour');
  if (abs < 7 * 86_400) return relative.format(Math.round(diffSeconds / 86_400), 'day');

  return dateFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: date.getFullYear() === reference.getFullYear() ? undefined : 'numeric',
  }).format(date);
}

/** Time of day, e.g. `14:32`. */
export function formatTime(value: DateInput, locale = 'en-GB'): string {
  const date = toDate(value);
  if (!date) return '';
  return dateFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Date and time, e.g. `17 Nov, 14:32`. */
export function formatDateTime(value: DateInput, locale = 'en-GB'): string {
  const date = toDate(value);
  if (!date) return '';
  return dateFormat(locale, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Full date and time for titles, e.g. `17 Nov 2026, 14:32`. */
export function formatDateTimeLong(value: DateInput, locale = 'en-GB'): string {
  const date = toDate(value);
  if (!date) return '';
  return dateFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

/** Day heading for grouped lists: `Today`, `Yesterday`, or `12 Nov 2025`. */
export function formatDayHeading(
  value: DateInput,
  options: { locale?: string; now?: DateInput } = {},
): string {
  const date = toDate(value);
  if (!date) return '';
  const { locale = 'en', now = new Date() } = options;
  const reference = toDate(now) ?? new Date();

  const startOf = (input: Date) =>
    new Date(input.getFullYear(), input.getMonth(), input.getDate()).getTime();
  const dayDiff = Math.round((startOf(reference) - startOf(date)) / 86_400_000);

  const relative = relativeTimeFormat(locale);
  const capitalise = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
  if (dayDiff === 0) return capitalise(relative.format(0, 'day'));
  if (dayDiff === 1) return capitalise(relative.format(-1, 'day'));

  return dateFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: date.getFullYear() === reference.getFullYear() ? undefined : 'numeric',
  }).format(date);
}

/** Currency from a decimal amount, e.g. `12.5` → `€12.50`. */
export function formatCurrency(amount: number, currency = 'EUR', locale = 'de-DE'): string {
  if (!Number.isFinite(amount)) return '';
  return cached(
    currencyFormats,
    `${locale}|${currency}`,
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }),
  ).format(amount);
}

/**
 * Initials for avatars: `Anna de Vries` → `AV`, `support` → `SU`,
 * `anna@example.com` → `AN`.
 */
export function getInitials(name: string): string {
  const source = name.includes('@') ? name.split('@')[0] : name;
  const words = source
    .split(/[\s._-]+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (words.length === 0) return '?';
  const letters = Array.from(words[0]);
  if (words.length === 1) {
    return letters.slice(0, 2).join('').toUpperCase();
  }
  const first = Array.from(words[0])[0] ?? '';
  const last = Array.from(words[words.length - 1])[0] ?? '';
  return `${first}${last}`.toUpperCase();
}
