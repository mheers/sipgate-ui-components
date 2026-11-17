import type { SmsAnalysis } from './types';

/**
 * GSM 03.38 basic character set. Characters here cost one septet; the
 * extension set below costs two.
 */
const GSM_BASIC = new Set(
  Array.from(
    '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?' +
      '¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà',
  ),
);

const GSM_EXTENSION = new Set(Array.from('^{}\\[~]|€'));

/**
 * Analyse a message the way an SMSC does: GSM-7 while every character is in
 * the GSM alphabet, UCS-2 as soon as one character (an emoji, a curly quote,
 * CJK, …) needs it. Reports billable segments, not just character count.
 */
export function analyzeSms(text: string): SmsAnalysis {
  const characters = Array.from(text);
  let gsmLength = 0;
  let isGsm = true;

  for (const character of characters) {
    if (GSM_BASIC.has(character)) {
      gsmLength += 1;
    } else if (GSM_EXTENSION.has(character)) {
      gsmLength += 2;
    } else {
      isGsm = false;
      break;
    }
  }

  if (isGsm) {
    const singleLimit = 160;
    const partLimit = 153;
    const segments = gsmLength <= singleLimit ? 1 : Math.ceil(gsmLength / partLimit);
    const capacity = segments === 1 ? singleLimit : partLimit * segments;
    return {
      encoding: 'gsm7',
      length: gsmLength,
      segments,
      remaining: Math.max(0, capacity - gsmLength),
      singleLimit,
      partLimit,
      isMultipart: segments > 1,
    };
  }

  // UCS-2 is measured in UTF-16 code units, so astral characters (emoji)
  // count as two.
  const length = text.length;
  const singleLimit = 70;
  const partLimit = 67;
  const segments = length <= singleLimit ? 1 : Math.ceil(length / partLimit);
  const capacity = segments === 1 ? singleLimit : partLimit * segments;

  return {
    encoding: 'ucs2',
    length,
    segments,
    remaining: Math.max(0, capacity - length),
    singleLimit,
    partLimit,
    isMultipart: segments > 1,
  };
}

/** Just the number of billable parts — handy for validation. */
export function smsSegments(text: string): number {
  return analyzeSms(text).segments;
}
