import type { Contact, Device, HistoryEntry, SmsMessage } from '@/lib/types';

const now = Date.now();
const minutesAgo = (minutes: number) => new Date(now - minutes * 60_000);
const hoursAgo = (hours: number) => minutesAgo(hours * 60);
const daysAgo = (days: number) => hoursAgo(days * 24);

export const historyEntries: HistoryEntry[] = [
  {
    id: 'hist-1',
    type: 'call',
    direction: 'missed',
    number: '+4915123456789',
    name: 'Anna de Vries',
    startedAt: minutesAgo(12),
    unread: true,
    outcome: 'missed',
  },
  {
    id: 'hist-2',
    type: 'call',
    direction: 'inbound',
    number: '+493088776655',
    name: 'Ben Okafor',
    startedAt: minutesAgo(48),
    durationSeconds: 254,
    recording: true,
    outcome: 'answered',
  },
  {
    id: 'hist-3',
    type: 'call',
    direction: 'outbound',
    number: '+49891234567',
    name: 'Clara Neumann',
    startedAt: hoursAgo(3),
    durationSeconds: 65,
    outcome: 'answered',
  },
  {
    id: 'hist-4',
    type: 'sms',
    direction: 'inbound',
    number: '+4917612345678',
    name: 'Jonas Weber',
    startedAt: hoursAgo(5),
    unread: true,
    note: 'The signed documents are on their way.',
  },
  {
    id: 'hist-5',
    type: 'voicemail',
    direction: 'inbound',
    number: '+494033445566',
    name: 'Tobias Krüger',
    startedAt: daysAgo(1),
    durationSeconds: 31,
    unread: true,
  },
  {
    id: 'hist-6',
    type: 'fax',
    direction: 'inbound',
    number: '+4930998877',
    startedAt: daysAgo(1),
    durationSeconds: 12,
    note: '3 pages',
  },
  {
    id: 'hist-7',
    type: 'call',
    direction: 'outbound',
    number: '+49211445566',
    name: 'Studio Nord',
    startedAt: daysAgo(2),
    durationSeconds: 128,
    outcome: 'answered',
  },
  {
    id: 'hist-8',
    type: 'call',
    direction: 'missed',
    number: '+491729876543',
    startedAt: daysAgo(3),
    outcome: 'busy',
  },
];

export const contacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Anna de Vries',
    numbers: ['+4915123456789', '+493022334455'],
    email: 'anna@denim.studio',
    company: 'Denim Studio',
    favorite: true,
    tags: ['Client', 'Design'],
  },
  {
    id: 'contact-2',
    name: 'Ben Okafor',
    numbers: ['+493088776655'],
    email: 'ben@okafor.dev',
    company: 'Okafor Labs',
    favorite: true,
    tags: ['Partner'],
  },
  {
    id: 'contact-3',
    name: 'Clara Neumann',
    numbers: ['+49891234567', '+491609876543'],
    email: 'clara@neumann.legal',
    company: 'Neumann Legal',
    tags: ['Legal'],
  },
  {
    id: 'contact-4',
    name: 'Tobias Krüger',
    numbers: ['+494033445566'],
    company: 'Krüger & Sohn',
  },
  {
    id: 'contact-5',
    name: 'sipgate Support',
    numbers: ['+493012345678'],
    email: 'support@sipgate.de',
    company: 'sipgate GmbH',
    tags: ['Support'],
  },
];

export const devices: Device[] = [
  {
    id: 'device-1',
    name: 'Desk phone',
    kind: 'desk',
    status: 'online',
    model: 'Yealink T54W',
    numbers: ['+493012345678', '+493012345679'],
  },
  {
    id: 'device-2',
    name: "Marcel's iPhone",
    kind: 'mobile',
    status: 'online',
    numbers: ['+4915112345678'],
  },
  {
    id: 'device-3',
    name: 'Browser phone',
    kind: 'softphone',
    status: 'dnd',
    alias: 'sipgate app · Chrome',
    numbers: ['+493012345680'],
  },
  {
    id: 'device-4',
    name: 'Home office',
    kind: 'external',
    status: 'offline',
    alias: 'External number',
    numbers: ['+4940123456'],
  },
  {
    id: 'device-5',
    name: 'Conference room',
    kind: 'register',
    status: 'busy',
    model: 'Snom D385',
    numbers: ['+493012345681'],
  },
];

export const smsThread: SmsMessage[] = [
  {
    id: 'sms-1',
    direction: 'outbound',
    body: 'Hi Anna, the revised quote is ready. Shall I send it over?',
    sentAt: daysAgo(1),
    status: 'delivered',
  },
  {
    id: 'sms-2',
    direction: 'inbound',
    body: 'Yes please! And could you include the on-site installation?',
    sentAt: daysAgo(1),
  },
  {
    id: 'sms-3',
    direction: 'outbound',
    body: 'Done — installation is line item 4. Total comes to 2.480 €.',
    sentAt: daysAgo(1),
    status: 'delivered',
  },
  {
    id: 'sms-4',
    direction: 'inbound',
    body: 'Perfect. I will sign it today and send it back.',
    sentAt: hoursAgo(5),
  },
  {
    id: 'sms-5',
    direction: 'outbound',
    body: 'Great, thanks! 📎 Größere Anhänge schicke ich per Mail.',
    sentAt: hoursAgo(4.8),
    status: 'delivered',
  },
  {
    id: 'sms-6',
    direction: 'inbound',
    body: 'Noted. Talk soon!',
    sentAt: minutesAgo(18),
  },
];

export const activeCall = {
  name: 'Anna de Vries',
  number: '+4915123456789',
  direction: 'inbound' as const,
  state: 'active' as const,
  startedAt: new Date(now - 96_000),
  recording: true,
};

export const voicemail = {
  src: '/demo-voicemail.mp3',
  caller: 'Tobias Krüger',
  number: '+494033445566',
  receivedAt: daysAgo(1),
  durationSeconds: 10,
  listened: false,
  transcript:
    'Hi, this is Anna de Vries. I tried your mobile and could not reach you. Could you call me back before five? Thanks a lot. Bye.',
};
