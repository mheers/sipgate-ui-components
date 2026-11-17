import type { Component } from 'vue';
import {
  MessageSquare,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Printer,
  Voicemail,
} from 'lucide-vue-next';
import type { CommunicationDirection, CommunicationType } from '../../lib/types';

export type CommunicationTone = 'primary' | 'success' | 'danger' | 'info' | 'warning' | 'neutral';

export interface CommunicationDescriptor {
  icon: Component;
  label: string;
  tone: CommunicationTone;
}

/** Icon, label and tone for a sipgate history entry. */
export function describeCommunication(
  type: CommunicationType,
  direction: CommunicationDirection = 'inbound',
): CommunicationDescriptor {
  if (type === 'call') {
    if (direction === 'missed') {
      return { icon: PhoneMissed, label: 'Missed call', tone: 'danger' };
    }
    if (direction === 'outbound') {
      return { icon: PhoneOutgoing, label: 'Outgoing call', tone: 'success' };
    }
    return { icon: PhoneIncoming, label: 'Incoming call', tone: 'primary' };
  }
  if (type === 'sms') {
    return { icon: MessageSquare, label: 'SMS', tone: 'info' };
  }
  if (type === 'fax') {
    return { icon: Printer, label: 'Fax', tone: 'neutral' };
  }
  return { icon: Voicemail, label: 'Voicemail', tone: 'warning' };
}

export const communicationToneClasses: Record<CommunicationTone, string> = {
  primary: 'bg-sg-primary-soft text-sg-primary-strong',
  success: 'bg-sg-success-soft text-sg-success',
  danger: 'bg-sg-danger-soft text-sg-danger',
  info: 'bg-sg-info-soft text-sg-info',
  warning: 'bg-sg-warning-soft text-sg-warning',
  neutral: 'bg-sg-surface-muted text-sg-muted-foreground',
};
