<script setup lang="ts">
import { computed } from 'vue';
import { Disc3 } from 'lucide-vue-next';
import CommunicationIcon from './CommunicationIcon.vue';
import PhoneNumber from './PhoneNumber.vue';
import { describeCommunication } from './communication';
import { cn } from '@/lib/cn';
import { formatDuration, formatRelativeTime, formatTime, toDate } from '@/lib/format';
import { formatPhoneNumber } from '@/lib/phone';
import type { HistoryEntry } from '@/lib/types';

const props = withDefaults(
  defineProps<{
    entry: HistoryEntry;
    locale?: string;
    country?: string;
    selected?: boolean;
    showTime?: boolean;
    timeFormat?: 'time' | 'relative';
    class?: string;
  }>(),
  {
    locale: 'en-GB',
    country: 'DE',
    selected: false,
    showTime: true,
    timeFormat: 'time',
  },
);

const emit = defineEmits<{ select: [entry: HistoryEntry] }>();

const descriptor = computed(() => describeCommunication(props.entry.type, props.entry.direction));
const display = computed(
  () =>
    props.entry.name ||
    formatPhoneNumber(props.entry.number, { country: props.country, format: 'international' }),
);
const timeLabel = computed(() =>
  props.timeFormat === 'relative'
    ? formatRelativeTime(props.entry.startedAt, { locale: props.locale })
    : formatTime(props.entry.startedAt, props.locale),
);
const fullDate = computed(() => {
  const date = toDate(props.entry.startedAt);
  if (!date) return '';
  return new Intl.DateTimeFormat(props.locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
});
const detail = computed(() => {
  const parts: string[] = [descriptor.value.label];
  if (props.entry.outcome && ['busy', 'failed', 'rejected'].includes(props.entry.outcome)) {
    parts.push(props.entry.outcome.charAt(0).toUpperCase() + props.entry.outcome.slice(1));
  }
  if (props.entry.durationSeconds !== undefined) {
    parts.push(formatDuration(props.entry.durationSeconds));
  }
  return parts.join(' · ');
});
</script>

<template>
  <div
    :class="
      cn(
        'group/item flex items-stretch gap-1 rounded-sg pe-1 transition-colors duration-150',
        selected
          ? 'bg-sg-primary-soft/70 hover:bg-sg-primary-soft'
          : 'hover:bg-sg-surface-muted/80',
        props.class,
      )
    "
  >
    <button
      type="button"
      :class="
        cn(
          'flex min-w-0 flex-1 items-center gap-3 rounded-sg px-2 py-2.5 text-left outline-none',
          'focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:ring-inset',
        )
      "
      @click="emit('select', entry)"
    >
      <CommunicationIcon :type="entry.type" :direction="entry.direction" size="md" decorative />

      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-1.5">
          <span class="truncate text-sm leading-tight font-medium text-sg-foreground">
            {{ display }}
          </span>
          <span
            v-if="entry.unread"
            class="size-1.5 shrink-0 rounded-full bg-sg-primary"
            aria-label="Unread"
          />
          <Disc3
            v-if="entry.recording"
            class="size-3.5 shrink-0 text-sg-muted-foreground"
            aria-label="Recorded"
          />
        </div>
        <div class="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-sg-muted-foreground">
          <template v-if="entry.name">
            <PhoneNumber
              :value="entry.number"
              :country="country"
              size="sm"
              tone="muted"
              :link="false"
              class="min-w-0 shrink-0"
            />
            <span class="text-sg-border-strong" aria-hidden="true">·</span>
            <span class="truncate">{{ detail }}</span>
          </template>
          <span v-else class="truncate">{{ detail }}</span>
          <template v-if="entry.note">
            <span class="text-sg-border-strong" aria-hidden="true">·</span>
            <span class="truncate">{{ entry.note }}</span>
          </template>
        </div>
      </div>

      <time
        v-if="showTime"
        :datetime="toDate(entry.startedAt)?.toISOString()"
        :title="fullDate"
        class="shrink-0 self-start pt-0.5 text-[0.6875rem] whitespace-nowrap text-sg-muted-foreground"
      >
        {{ timeLabel }}
      </time>
    </button>

    <div
      v-if="$slots.actions"
      class="flex shrink-0 items-center opacity-0 transition-opacity group-hover/item:opacity-100 focus-within:opacity-100"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
