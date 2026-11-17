import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDateTime,
  formatDateTimeLong,
  formatDayHeading,
  formatDuration,
  formatDurationWords,
  formatRelativeTime,
  formatTime,
  getInitials,
  toDate,
} from './format';

describe('formatDuration', () => {
  it('formats call-length clocks', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(7)).toBe('0:07');
    expect(formatDuration(125)).toBe('2:05');
    expect(formatDuration(3725)).toBe('1:02:05');
  });

  it('clamps invalid values', () => {
    expect(formatDuration(-10)).toBe('0:00');
    expect(formatDuration(Number.NaN)).toBe('0:00');
  });

  it('formats durations in words', () => {
    expect(formatDurationWords(45, 'en')).toContain('45');
    expect(formatDurationWords(125, 'en')).toMatch(/2\s*min/);
    expect(formatDurationWords(3725, 'en')).toMatch(/1\s*hr|1\s*h/);
  });
});

describe('dates', () => {
  const now = new Date('2026-11-17T12:00:00Z');

  it('formats relative times', () => {
    expect(formatRelativeTime(new Date('2026-11-17T11:55:00Z'), { now, locale: 'en' })).toMatch(
      /5 min/i,
    );
    expect(formatRelativeTime(new Date('2026-11-17T11:59:50Z'), { now, locale: 'en' })).toBe('now');
  });

  it('groups days into today and yesterday', () => {
    expect(formatDayHeading(new Date('2026-11-17T09:00:00Z'), { now, locale: 'en' })).toBe('Today');
    expect(formatDayHeading(new Date('2026-11-16T09:00:00Z'), { now, locale: 'en' })).toBe(
      'Yesterday',
    );
    expect(formatDayHeading(new Date('2026-11-10T09:00:00Z'), { now, locale: 'en' })).toMatch(/10/);
    expect(formatDayHeading(new Date('2026-11-17T09:00:00Z'), { now, locale: 'de-DE' })).toMatch(
      /heute/i,
    );
  });

  it('adds the year once a relative date is from another year', () => {
    expect(formatRelativeTime(new Date('2025-11-10T09:00:00Z'), { now, locale: 'en' })).toMatch(
      /2025/,
    );
    expect(formatRelativeTime(new Date('2026-11-10T09:00:00Z'), { now, locale: 'en' })).not.toMatch(
      /2026/,
    );
  });

  it('formats times and dates', () => {
    const local = new Date(2026, 10, 17, 14, 32);
    expect(formatTime(local, 'en-GB')).toBe('14:32');
    expect(formatDateTime(local, 'en-GB')).toMatch(/17/);
    expect(formatDateTimeLong(local, 'en-GB')).toMatch(/17 Nov 2026/);
  });

  it('returns empty strings for invalid dates', () => {
    expect(toDate('nope')).toBeNull();
    expect(formatTime('nope')).toBe('');
    expect(formatRelativeTime('nope')).toBe('');
  });
});

describe('getInitials', () => {
  it('uses first and last name', () => {
    expect(getInitials('Anna de Vries')).toBe('AV');
    expect(getInitials('Marcel Heers')).toBe('MH');
  });

  it('handles single words, emails and accents', () => {
    expect(getInitials('support')).toBe('SU');
    expect(getInitials('anna@example.com')).toBe('AN');
    expect(getInitials('Özlem Ünal')).toBe('ÖÜ');
  });

  it('has a fallback for empty names', () => {
    expect(getInitials('')).toBe('?');
  });
});

describe('formatCurrency', () => {
  it('formats euros for German and English locales', () => {
    expect(formatCurrency(12.5, 'EUR', 'de-DE')).toMatch(/12,50/);
    expect(formatCurrency(12.5, 'EUR', 'en-GB')).toMatch(/12\.50/);
  });
});
