import { describe, expect, it } from 'vitest';
import { formatPhoneNumber, parsePhoneNumber, telHref, toE164 } from './phone';

describe('parsePhoneNumber', () => {
  it('normalises punctuation and keeps E.164', () => {
    expect(parsePhoneNumber('+49 (30) 1234-5678')?.e164).toBe('+493012345678');
  });

  it('expands the international 00 prefix', () => {
    expect(parsePhoneNumber('0049 30 1234 5678')?.e164).toBe('+493012345678');
  });

  it('interprets national numbers with the default country', () => {
    expect(parsePhoneNumber('030 12345678')?.e164).toBe('+493012345678');
    expect(parsePhoneNumber('(030) 12345678')?.e164).toBe('+493012345678');
  });

  it('respects another default country', () => {
    expect(parsePhoneNumber('(415) 555-1234', 'US')?.e164).toBe('+14155551234');
  });

  it('rejects unusable input', () => {
    expect(parsePhoneNumber(null)).toBeNull();
    expect(parsePhoneNumber('')).toBeNull();
    expect(parsePhoneNumber('12')).toBeNull();
    expect(parsePhoneNumber('not a number')).toBeNull();
  });
});

describe('formatPhoneNumber', () => {
  it('formats German landlines', () => {
    expect(formatPhoneNumber('+49 (30) 1234-5678')).toBe('+49 30 1234 5678');
    expect(formatPhoneNumber('+49 211 123456')).toBe('+49 211 123 456');
    expect(formatPhoneNumber('+49 89 1234567')).toBe('+49 89 123 4567');
  });

  it('formats German mobiles', () => {
    expect(formatPhoneNumber('+49 151 23456789')).toBe('+49 151 23456789');
    expect(formatPhoneNumber('015123456789')).toBe('+49 151 23456789');
  });

  it('formats national numbers with the German trunk prefix', () => {
    expect(formatPhoneNumber('+49 30 12345678', { format: 'national' })).toBe('030 1234 5678');
  });

  it('formats US numbers', () => {
    expect(formatPhoneNumber('+1 415 555 1234', { country: 'US' })).toBe('+1 415 555 1234');
    expect(formatPhoneNumber('+14155551234', { format: 'national', country: 'US' })).toBe(
      '(415) 555-1234',
    );
  });

  it('formats UK and Swiss numbers', () => {
    expect(formatPhoneNumber('+44 7911 123456')).toBe('+44 7911 123456');
    expect(formatPhoneNumber('+44 20 7183 8750')).toBe('+44 20 7183 8750');
    expect(formatPhoneNumber('+41 79 123 45 67')).toBe('+41 79 123 45 67');
  });

  it('formats Austrian numbers', () => {
    expect(formatPhoneNumber('+43 664 1234567')).toBe('+43 664 1234567');
  });

  it('returns raw input unchanged when requested', () => {
    expect(formatPhoneNumber('  +49 30 123  ', { format: 'raw' })).toBe('+49 30 123');
  });

  it('falls back to the trimmed input for unparseable values', () => {
    expect(formatPhoneNumber('12')).toBe('12');
    expect(formatPhoneNumber('')).toBe('');
    expect(formatPhoneNumber(null)).toBe('');
  });
});

describe('helpers', () => {
  it('builds tel hrefs from national numbers', () => {
    expect(telHref('030 12345678')).toBe('tel:+493012345678');
  });

  it('returns E.164 for valid numbers and the input otherwise', () => {
    expect(toE164('030 12345678')).toBe('+493012345678');
    expect(toE164('nope')).toBe('nope');
  });
});
