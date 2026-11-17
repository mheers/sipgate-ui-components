import { describe, expect, it } from 'vitest';
import { analyzeSms, smsSegments } from './sms';

describe('analyzeSms', () => {
  it('treats an empty message as one empty segment', () => {
    const result = analyzeSms('');
    expect(result.encoding).toBe('gsm7');
    expect(result.segments).toBe(1);
    expect(result.length).toBe(0);
    expect(result.remaining).toBe(160);
  });

  it('counts 160 GSM-7 characters as one segment', () => {
    const result = analyzeSms('a'.repeat(160));
    expect(result.encoding).toBe('gsm7');
    expect(result.segments).toBe(1);
    expect(result.remaining).toBe(0);
  });

  it('splits GSM-7 at 153 characters', () => {
    const result = analyzeSms('a'.repeat(161));
    expect(result.segments).toBe(2);
    expect(result.length).toBe(161);
    expect(result.remaining).toBe(145);
    expect(result.isMultipart).toBe(true);
  });

  it('counts extension characters twice', () => {
    const result = analyzeSms('€{');
    expect(result.encoding).toBe('gsm7');
    expect(result.length).toBe(4);
  });

  it('keeps German umlauts and newlines in GSM-7', () => {
    const result = analyzeSms('Grüße\naus Köln');
    expect(result.encoding).toBe('gsm7');
    expect(result.length).toBe(14);
  });

  it('falls back to UCS-2 for emoji and counts surrogate pairs', () => {
    const result = analyzeSms('😀');
    expect(result.encoding).toBe('ucs2');
    expect(result.length).toBe(2);
    expect(result.segments).toBe(1);
    expect(result.remaining).toBe(68);
  });

  it('uses 67 code units per part for long UCS-2 messages', () => {
    const result = analyzeSms('😀'.repeat(36));
    expect(result.encoding).toBe('ucs2');
    expect(result.length).toBe(72);
    expect(result.segments).toBe(2);
    expect(result.remaining).toBe(62);
  });

  it('detects typographic quotes as UCS-2', () => {
    expect(analyzeSms('“hello”').encoding).toBe('ucs2');
  });

  it('exposes a segment-count helper', () => {
    expect(smsSegments('hello')).toBe(1);
    expect(smsSegments('a'.repeat(400))).toBe(3);
  });
});
