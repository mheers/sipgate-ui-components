import { describe, expect, it } from 'vitest';
import { avatarTone } from './avatar';

describe('avatarTone', () => {
  it('is stable for the same seed', () => {
    expect(avatarTone('Marcel Heers').classes).toBe(avatarTone('Marcel Heers').classes);
  });

  it('returns a surface, a text colour and a matching dot', () => {
    const tone = avatarTone('Anna');
    expect(tone.classes).toContain('bg-');
    expect(tone.classes).toContain('text-');
    expect(tone.dot).toContain('bg-');
  });

  it('usually differs between names', () => {
    const names = ['Anna', 'Ben', 'Clara', 'David', 'Emil', 'Frida', 'Gustav'];
    const tones = new Set(names.map((name) => avatarTone(name).dot));
    expect(tones.size).toBeGreaterThan(1);
  });
});
