import type { PhoneNumberFormat } from './types';

export interface FormatPhoneNumberOptions {
  /** Defaults to `international`. */
  format?: PhoneNumberFormat;
  /**
   * Country used to interpret national numbers (a leading `0`). Two-letter
   * ISO code, defaults to `DE` — sipgate is a German carrier.
   */
  country?: string;
}

export interface ParsedPhoneNumber {
  /** `+493012345678` — digits only, always with a leading `+`. */
  e164: string;
  /** Numeric country calling code without `+`, e.g. `49`. */
  countryCode: string;
  /** The subscriber part without country code or trunk prefix. */
  national: string;
  /** The raw input, trimmed. */
  raw: string;
}

const COUNTRY_CODES: Record<string, string> = {
  DE: '49',
  AT: '43',
  CH: '41',
  GB: '44',
  UK: '44',
  US: '1',
  CA: '1',
  NL: '31',
  FR: '33',
  BE: '32',
  IT: '39',
  ES: '34',
  PL: '48',
  PT: '351',
  SE: '46',
  DK: '45',
  NO: '47',
  FI: '358',
  IE: '353',
  LU: '352',
  CZ: '420',
  TR: '90',
};

/** Two-digit country calling codes we can split without a reference table. */
const TWO_DIGIT_CODES = new Set([
  '20',
  '27',
  '30',
  '31',
  '32',
  '33',
  '34',
  '36',
  '39',
  '40',
  '41',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '60',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '81',
  '82',
  '84',
  '86',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '98',
]);

const ONE_DIGIT_CODES = new Set(['1', '7']);

/** Longest first so `030` wins over `03`. */
const DE_AREA_CODES = [
  '30',
  '40',
  '69',
  '89',
  '211',
  '221',
  '231',
  '234',
  '261',
  '271',
  '281',
  '291',
  '341',
  '351',
  '361',
  '371',
  '381',
  '391',
  '421',
  '431',
  '441',
  '451',
  '461',
  '471',
  '481',
  '491',
  '511',
  '521',
  '531',
  '541',
  '551',
  '561',
  '571',
  '581',
  '591',
  '621',
  '631',
  '641',
  '651',
  '661',
  '671',
  '681',
  '691',
  '711',
  '721',
  '731',
  '741',
  '751',
  '761',
  '771',
  '781',
  '791',
  '811',
  '821',
  '831',
  '841',
  '851',
  '861',
  '871',
  '881',
  '891',
  '911',
  '921',
  '931',
  '941',
  '951',
  '961',
  '971',
  '981',
  '991',
  '202',
  '203',
  '204',
  '205',
  '206',
  '207',
  '208',
  '209',
  '212',
  '213',
  '214',
  '215',
  '216',
  '217',
  '218',
  '219',
  '220',
  '222',
  '223',
  '224',
  '225',
  '226',
  '227',
  '228',
  '229',
  '230',
  '232',
  '233',
  '235',
  '236',
  '237',
  '238',
  '239',
  '240',
  '241',
  '242',
  '243',
  '244',
  '245',
  '246',
  '247',
  '248',
  '249',
  '250',
  '251',
  '252',
  '253',
  '254',
  '255',
  '256',
  '257',
  '258',
  '259',
  '260',
  '262',
  '263',
  '264',
  '265',
  '266',
  '267',
  '268',
  '269',
  '270',
  '272',
  '273',
  '274',
  '275',
  '276',
  '277',
  '278',
  '279',
  '280',
  '282',
  '283',
  '284',
  '285',
  '286',
  '287',
  '288',
  '289',
  '290',
  '292',
  '293',
  '294',
  '295',
  '296',
  '297',
  '298',
  '299',
];

function digitsOnly(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

function countryCodeFor(country: string): string {
  return COUNTRY_CODES[country.toUpperCase()] ?? COUNTRY_CODES.DE;
}

function splitCountryCode(e164: string): { countryCode: string; national: string } {
  const digits = e164.replace(/^\+/, '');
  if (!digits) return { countryCode: '', national: '' };

  if (ONE_DIGIT_CODES.has(digits.slice(0, 1))) {
    return { countryCode: digits.slice(0, 1), national: digits.slice(1) };
  }
  if (TWO_DIGIT_CODES.has(digits.slice(0, 2))) {
    // 358 (Finland), 351 (Portugal), 353 (Ireland) and 352 (Luxembourg) are
    // three-digit codes inside the 3xx range.
    const three = digits.slice(0, 3);
    if (['351', '352', '353', '358'].includes(three)) {
      return { countryCode: three, national: digits.slice(3) };
    }
    return { countryCode: digits.slice(0, 2), national: digits.slice(2) };
  }
  return { countryCode: digits.slice(0, 3), national: digits.slice(3) };
}

/**
 * Normalise a phone number to E.164. Accepts `+49…`, `0049…`, `030…`
 * (with `country: 'DE'`), and messy punctuation.
 *
 * Returns `null` when the input does not contain a usable number.
 */
export function parsePhoneNumber(
  value: string | number | null | undefined,
  country = 'DE',
): ParsedPhoneNumber | null {
  if (value === null || value === undefined) return null;
  const raw = String(value).trim();
  if (!raw) return null;

  let cleaned = digitsOnly(raw.replace(/^tel:/i, ''));
  if (!cleaned) return null;

  if (cleaned.startsWith('00')) cleaned = `+${cleaned.slice(2)}`;

  if (!cleaned.startsWith('+')) {
    if (cleaned.startsWith('0')) {
      cleaned = `+${countryCodeFor(country)}${cleaned.slice(1)}`;
    } else if (cleaned.startsWith(countryCodeFor(country))) {
      cleaned = `+${cleaned}`;
    } else {
      cleaned = `+${countryCodeFor(country)}${cleaned}`;
    }
  }

  const digits = cleaned.slice(1);
  if (digits.length < 6) return null;

  const { countryCode, national } = splitCountryCode(cleaned);
  if (!countryCode || !national) return null;

  return {
    e164: `+${digits}`,
    countryCode,
    national,
    raw,
  };
}

function chunk(value: string, sizes: number[]): string[] {
  const groups: string[] = [];
  let index = 0;
  for (const size of sizes) {
    if (index >= value.length) break;
    groups.push(value.slice(index, index + size));
    index += size;
  }
  if (index < value.length) groups.push(value.slice(index));
  return groups.filter(Boolean);
}

function chunkEvery(value: string, size: number): string[] {
  return value.match(new RegExp(`.{1,${size}}`, 'g')) ?? [];
}

/** Split a long subscriber number into two readable halves. */
function splitEvenly(value: string): string[] {
  if (value.length <= 4) return [value];
  if (value.length <= 10) {
    const middle = Math.floor(value.length / 2);
    return [value.slice(0, middle), value.slice(middle)];
  }
  return chunkEvery(value, 4);
}

function formatNationalGroups(countryCode: string, national: string): string {
  switch (countryCode) {
    case '49': {
      if (national.startsWith('1')) {
        return [national.slice(0, 3), national.slice(3)].join(' ').trim();
      }
      if (/^(800|900|700)/.test(national)) {
        return [national.slice(0, 3), national.slice(3)].join(' ').trim();
      }
      const area = DE_AREA_CODES.find((candidate) => national.startsWith(candidate));
      const areaCode = area ?? national.slice(0, 3);
      const subscriber = national.slice(areaCode.length);
      return [areaCode, ...splitEvenly(subscriber)].join(' ').trim();
    }
    case '43': {
      const area = national.startsWith('1') ? '1' : national.slice(0, 3);
      const subscriber = national.slice(area.length);
      return [area, subscriber].join(' ').trim();
    }
    case '41': {
      const area = national.slice(0, 2);
      const subscriber = national.slice(2);
      return [area, ...chunk(subscriber, [3, 2, 2])].join(' ').trim();
    }
    case '44': {
      if (national.startsWith('20')) {
        return ['20', ...chunk(national.slice(2), [4, 4])].join(' ').trim();
      }
      if (national.startsWith('7')) {
        return [national.slice(0, 4), ...chunk(national.slice(4), [6])].join(' ').trim();
      }
      const area = national.slice(0, 3);
      return [area, ...chunkEvery(national.slice(area.length), 4)].join(' ').trim();
    }
    case '1': {
      return chunk(national, [3, 3, 4]).join(' ');
    }
    case '31': {
      const area = national.startsWith('6') ? '6' : national.slice(0, 2);
      return [area, ...chunkEvery(national.slice(area.length), 4)].join(' ').trim();
    }
    case '33': {
      const area = '12345'.includes(national.slice(0, 1))
        ? national.slice(0, 1)
        : national.slice(0, 2);
      return [area, ...chunkEvery(national.slice(area.length), 2)].join(' ').trim();
    }
    default:
      return chunkEvery(national, 3).join(' ');
  }
}

/**
 * Format a phone number for display.
 *
 * ```ts
 * formatPhoneNumber('+49 30 12345678')            // +49 30 1234 5678
 * formatPhoneNumber('03012345678', { format: 'national' }) // 030 1234 5678
 * formatPhoneNumber('+14155551234', { country: 'US' })     // +1 415 555 1234
 * ```
 */
export function formatPhoneNumber(
  value: string | number | null | undefined,
  options: FormatPhoneNumberOptions = {},
): string {
  const { format = 'international', country = 'DE' } = options;
  if (value === null || value === undefined) return '';
  const raw = String(value).trim();
  if (!raw) return '';

  if (format === 'raw') return raw;

  const parsed = parsePhoneNumber(raw, country);
  if (!parsed) return raw;

  const groups = formatNationalGroups(parsed.countryCode, parsed.national);
  const international = `+${parsed.countryCode}${groups ? ` ${groups}` : ''}`;

  if (format === 'international') return international;

  // National form: keep the German convention of a leading zero, and use the
  // country's usual trunk prefix where we know it.
  const trunk = parsed.countryCode === '1' ? '' : '0';
  if (parsed.countryCode === '1' && parsed.national.length === 10) {
    const [area, exchange, line] = chunk(parsed.national, [3, 3, 4]);
    return `(${area}) ${exchange}-${line}`;
  }
  return `${trunk}${groups}`.trim();
}

/** `tel:` href with a normalised number, safe to drop into an anchor. */
export function telHref(value: string | number | null | undefined, country = 'DE'): string {
  const parsed = parsePhoneNumber(value, country);
  return parsed ? `tel:${parsed.e164}` : '';
}

/** E.164 form, or the trimmed input when it cannot be parsed. */
export function toE164(value: string | number | null | undefined, country = 'DE'): string {
  if (value === null || value === undefined) return '';
  return parsePhoneNumber(value, country)?.e164 ?? String(value).trim();
}
