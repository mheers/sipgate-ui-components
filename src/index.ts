/**
 * @mheers/sipgate-ui-components
 *
 * Vue 3 components for sipgate applications. Import styles once:
 *
 * ```ts
 * import '@mheers/sipgate-ui-components/style.css';
 * ```
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------
export { default as Avatar } from './components/ui/Avatar.vue';
export { default as Badge } from './components/ui/Badge.vue';
export { default as Button, buttonVariants } from './components/ui/Button.vue';
export { default as Card } from './components/ui/Card.vue';
export { default as CardContent } from './components/ui/CardContent.vue';
export { default as CardDescription } from './components/ui/CardDescription.vue';
export { default as CardFooter } from './components/ui/CardFooter.vue';
export { default as CardHeader } from './components/ui/CardHeader.vue';
export { default as CardTitle } from './components/ui/CardTitle.vue';
export { default as CopyButton } from './components/ui/CopyButton.vue';
export { default as Dialog } from './components/ui/Dialog.vue';
export { default as DialogClose } from './components/ui/DialogClose.vue';
export { default as DialogContent } from './components/ui/DialogContent.vue';
export { default as DialogDescription } from './components/ui/DialogDescription.vue';
export { default as DialogFooter } from './components/ui/DialogFooter.vue';
export { default as DialogHeader } from './components/ui/DialogHeader.vue';
export { default as DialogTitle } from './components/ui/DialogTitle.vue';
export { default as DialogTrigger } from './components/ui/DialogTrigger.vue';
export { default as EmptyState } from './components/ui/EmptyState.vue';
export { default as Input } from './components/ui/Input.vue';
export { default as Label } from './components/ui/Label.vue';
export { default as PageHeader } from './components/ui/PageHeader.vue';
export { default as Separator } from './components/ui/Separator.vue';
export { default as Skeleton } from './components/ui/Skeleton.vue';
export { default as Spinner } from './components/ui/Spinner.vue';
export { default as Switch } from './components/ui/Switch.vue';
export { default as Tabs } from './components/ui/Tabs.vue';
export { default as TabsContent } from './components/ui/TabsContent.vue';
export { default as TabsList } from './components/ui/TabsList.vue';
export { default as TabsTrigger } from './components/ui/TabsTrigger.vue';
export { default as Textarea } from './components/ui/Textarea.vue';
export { default as Tooltip } from './components/ui/Tooltip.vue';
export { default as TooltipContent } from './components/ui/TooltipContent.vue';
export { default as TooltipProvider } from './components/ui/TooltipProvider.vue';
export { default as TooltipTrigger } from './components/ui/TooltipTrigger.vue';

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export { default as SignalMark } from './components/brand/SignalMark.vue';

// ---------------------------------------------------------------------------
// sipgate domain
// ---------------------------------------------------------------------------
export { default as AccountBalance } from './components/sipgate/AccountBalance.vue';
export { default as ActiveCallCard } from './components/sipgate/ActiveCallCard.vue';
export { default as CallHistoryItem } from './components/sipgate/CallHistoryItem.vue';
export { default as CallHistoryList } from './components/sipgate/CallHistoryList.vue';
export { default as CallTimer } from './components/sipgate/CallTimer.vue';
export { default as CommunicationBadge } from './components/sipgate/CommunicationBadge.vue';
export { default as CommunicationIcon } from './components/sipgate/CommunicationIcon.vue';
export { default as ConnectionStatus } from './components/sipgate/ConnectionStatus.vue';
export { default as ContactListItem } from './components/sipgate/ContactListItem.vue';
export { default as DeviceCard } from './components/sipgate/DeviceCard.vue';
export { default as DeviceStatusBadge } from './components/sipgate/DeviceStatusBadge.vue';
export { default as PhoneNumber } from './components/sipgate/PhoneNumber.vue';
export { default as SmsBubble } from './components/sipgate/SmsBubble.vue';
export { default as SmsComposer } from './components/sipgate/SmsComposer.vue';
export { default as SmsThread } from './components/sipgate/SmsThread.vue';
export { default as VoicemailPlayer } from './components/sipgate/VoicemailPlayer.vue';
export {
  communicationToneClasses,
  describeCommunication,
  type CommunicationDescriptor,
  type CommunicationTone,
} from './components/sipgate/communication';

// ---------------------------------------------------------------------------
// Composables
// ---------------------------------------------------------------------------
export { useCallDuration } from './composables/useCallDuration';
export { useClipboard } from './composables/useClipboard';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
export { avatarTone, type AvatarTone } from './lib/avatar';
export { cn } from './lib/cn';
export {
  formatCurrency,
  formatDateTime,
  formatDayHeading,
  formatDuration,
  formatDurationWords,
  formatRelativeTime,
  formatTime,
  getInitials,
  toDate,
  type DateInput,
} from './lib/format';
export {
  formatPhoneNumber,
  parsePhoneNumber,
  telHref,
  toE164,
  type FormatPhoneNumberOptions,
  type ParsedPhoneNumber,
} from './lib/phone';
export { analyzeSms, smsSegments } from './lib/sms';
export type {
  CallState,
  CommunicationDirection,
  CommunicationOutcome,
  CommunicationType,
  Contact,
  Device,
  DeviceKind,
  DeviceStatus,
  HistoryEntry,
  MessageStatus,
  PhoneNumberFormat,
  SmsAnalysis,
  SmsMessage,
} from './lib/types';
