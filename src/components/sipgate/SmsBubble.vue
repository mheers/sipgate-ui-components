<script setup lang="ts">
import { computed } from 'vue';
import { Check, CheckCheck, CircleAlert, Clock3 } from 'lucide-vue-next';
import { cn } from '@/lib/cn';
import { formatTime, toDate } from '@/lib/format';
import type { SmsMessage } from '@/lib/types';

const props = withDefaults(
  defineProps<{
    message: SmsMessage;
    locale?: string;
    showStatus?: boolean;
    class?: string;
  }>(),
  { locale: 'en-GB', showStatus: true },
);

const outbound = computed(() => props.message.direction === 'outbound');
const status = computed(() => {
  switch (props.message.status) {
    case 'queued':
    case 'sending':
      return { icon: Clock3, label: 'Sending' };
    case 'delivered':
      return { icon: CheckCheck, label: 'Delivered' };
    case 'failed':
      return { icon: CircleAlert, label: 'Failed' };
    case 'sent':
    default:
      return { icon: Check, label: 'Sent' };
  }
});
const date = computed(() => toDate(props.message.sentAt));
</script>

<template>
  <div :class="cn('flex w-full', outbound ? 'justify-end' : 'justify-start', props.class)">
    <div class="max-w-[85%] sm:max-w-[75%]">
      <div
        :class="
          cn(
            'rounded-sg-lg px-3.5 py-2.5 text-sm leading-relaxed break-words whitespace-pre-wrap',
            outbound
              ? 'rounded-br-sm bg-sg-primary text-sg-primary-foreground'
              : 'rounded-bl-sm border border-sg-border bg-sg-surface text-sg-foreground',
            message.error && 'ring-1 ring-sg-danger/40',
          )
        "
      >
        <p>{{ message.body }}</p>
        <div
          :class="
            cn(
              'mt-1.5 flex items-center justify-end gap-1 text-[0.6875rem]',
              outbound ? 'text-sg-primary-foreground' : 'text-sg-muted-foreground',
            )
          "
        >
          <time v-if="date" :datetime="date.toISOString()">{{ formatTime(date, locale) }}</time>
          <template v-if="outbound && showStatus">
            <component
              :is="status.icon"
              class="size-3.5"
              :title="status.label"
              aria-hidden="true"
            />
            <span class="sr-only">{{ status.label }}</span>
          </template>
        </div>
      </div>
      <p v-if="message.error" class="mt-1 px-1 text-xs text-sg-danger">
        {{ message.error }}
      </p>
    </div>
  </div>
</template>
