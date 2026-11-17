/** The four communication channels sipgate records in its history. */
export type CommunicationType = 'call' | 'sms' | 'fax' | 'voicemail';

/**
 * `missed` is a call direction in sipgate's history, not a separate type.
 * A missed SMS or fax does not exist, so only use it for calls.
 */
export type CommunicationDirection = 'inbound' | 'outbound' | 'missed';

/** Live call lifecycle. */
export type CallState = 'ringing' | 'active' | 'held';

/** Delivery state of an SMS. */
export type MessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'failed';

/** Presence of a device or a user's endpoint. */
export type DeviceStatus = 'online' | 'offline' | 'busy' | 'dnd' | 'ringing';

/** The kinds of endpoints sipgate can attach to a phone line. */
export type DeviceKind = 'desk' | 'mobile' | 'external' | 'softphone' | 'register';

/** How a number should be rendered. */
export type PhoneNumberFormat = 'international' | 'national' | 'raw';

/** The outcome of a recorded communication. */
export type CommunicationOutcome =
  'answered' | 'missed' | 'rejected' | 'busy' | 'failed' | 'completed';

/**
 * One row of sipgate's `/history` response, shaped for display.
 * Keep the original API object next to it and map into this type.
 */
export interface HistoryEntry {
  id: string;
  type: CommunicationType;
  direction: CommunicationDirection;
  /** The remote party: sipgate's `source` for inbound, `target` for outbound. */
  number: string;
  name?: string;
  startedAt: string | number | Date;
  /** Talk time, voicemail length or fax duration in seconds. */
  durationSeconds?: number;
  outcome?: CommunicationOutcome;
  recording?: boolean;
  note?: string;
  unread?: boolean;
}

/** A contact, reduced to what a UI needs. */
export interface Contact {
  id: string;
  name: string;
  numbers?: string[];
  email?: string;
  company?: string;
  avatarUrl?: string;
  favorite?: boolean;
  tags?: string[];
}

/** A device / endpoint, reduced to what a UI needs. */
export interface Device {
  id: string;
  name: string;
  kind: DeviceKind;
  status: DeviceStatus;
  numbers?: string[];
  model?: string;
  alias?: string;
}

/** One message in a conversation. */
export interface SmsMessage {
  id: string;
  direction: 'inbound' | 'outbound';
  body: string;
  sentAt: string | number | Date;
  status?: MessageStatus;
  /** Sender id for inbound messages, or the sender id used for outbound ones. */
  from?: string;
  error?: string;
}

/** Result of {@link analyzeSms}. */
export interface SmsAnalysis {
  encoding: 'gsm7' | 'ucs2';
  /** Number of GSM-7 septets or UTF-16 code units. */
  length: number;
  /** Number of billable message parts. */
  segments: number;
  /** Characters left in the current segment. */
  remaining: number;
  /** Length of a single-part message (160 or 70). */
  singleLimit: number;
  /** Length of each part once the message is split (153 or 67). */
  partLimit: number;
  isMultipart: boolean;
}
