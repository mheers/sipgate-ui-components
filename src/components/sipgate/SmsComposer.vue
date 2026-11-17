<script setup lang="ts">
import { computed } from 'vue';
import { Phone, SendHorizontal } from 'lucide-vue-next';
import Badge from '../ui/Badge.vue';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import PhoneNumber from './PhoneNumber.vue';
import { analyzeSms } from '@/lib/sms';
import { cn } from '@/lib/cn';
import type { SmsAnalysis } from '@/lib/types';

const props = withDefaults(
  defineProps<{
    title?: string;
    showRecipient?: boolean;
    disabled?: boolean;
    sending?: boolean;
    placeholder?: string;
    maxSegments?: number;
    country?: string;
    sendLabel?: string;
    class?: string;
  }>(),
  {
    title: 'New message',
    showRecipient: true,
    disabled: false,
    sending: false,
    placeholder: 'Write a message…',
    maxSegments: 8,
    country: 'DE',
    sendLabel: 'Send',
  },
);

const emit = defineEmits<{
  send: [payload: { message: string; recipient: string; analysis: SmsAnalysis }];
}>();

const message = defineModel<string>({ default: '' });
const recipient = defineModel<string>('recipient', { default: '' });

const analysis = computed(() => analyzeSms(message.value));
const exceeds = computed(() => analysis.value.segments > props.maxSegments);
const segmentLabel = computed(
  () => `${analysis.value.segments} ${analysis.value.segments === 1 ? 'segment' : 'segments'}`,
);
const encodingLabel = computed(() => (analysis.value.encoding === 'gsm7' ? 'GSM-7' : 'UCS-2'));
const encodingHint = computed(() =>
  analysis.value.encoding === 'gsm7'
    ? 'All characters fit the GSM-7 alphabet: 160 per message, 153 per part when split.'
    : 'This message contains Unicode characters, which shrink a message to 70 characters (67 when split).',
);

const canSend = computed(
  () =>
    message.value.trim().length > 0 &&
    !props.disabled &&
    !props.sending &&
    !exceeds.value &&
    (!props.showRecipient || recipient.value.trim().length > 0),
);

const progress = computed(() => {
  const result = analysis.value;
  const limit = result.segments === 1 ? result.singleLimit : result.partLimit;
  const used =
    result.segments === 1
      ? result.length
      : result.length - (result.segments - 1) * result.partLimit;
  return Math.min(100, Math.round((used / limit) * 100));
});

function submit() {
  if (!canSend.value) return;
  emit('send', {
    message: message.value,
    recipient: recipient.value.trim(),
    analysis: analysis.value,
  });
}

function onKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    submit();
  }
}

defineExpose({ analysis, submit });
</script>

<template>
  <div
    :class="
      cn(
        'overflow-hidden rounded-sg-lg border border-sg-border bg-sg-surface text-sg-foreground shadow-sg-xs',
        props.class,
      )
    "
  >
    <div class="flex items-center justify-between gap-3 border-b border-sg-border px-4 py-3">
      <span class="font-sg-display text-sm font-semibold tracking-[-0.01em]">{{ title }}</span>
      <PhoneNumber
        v-if="recipient && !showRecipient"
        :value="recipient"
        :country="country"
        size="sm"
        tone="muted"
        copyable
      />
    </div>

    <div v-if="showRecipient" class="border-b border-sg-border px-4 py-2.5">
      <Input
        v-model="recipient"
        type="tel"
        :disabled="disabled"
        placeholder="Recipient number, e.g. +49 30 123456"
        aria-label="Recipient number"
      >
        <template #leading>
          <Phone class="size-4" aria-hidden="true" />
        </template>
      </Input>
    </div>

    <textarea
      v-model="message"
      rows="4"
      :disabled="disabled"
      :placeholder="placeholder"
      :aria-label="title"
      :class="
        cn(
          'block field-sizing-content max-h-64 min-h-28 w-full resize-none border-0 bg-transparent px-4 py-3 text-sm leading-relaxed outline-none',
          'placeholder:text-sg-subtle-foreground disabled:cursor-not-allowed disabled:opacity-60',
        )
      "
      @keydown="onKeydown"
    />

    <div class="border-t border-sg-border px-4 py-3">
      <div class="flex items-center justify-between gap-3">
        <div class="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <Badge
            :variant="analysis.encoding === 'gsm7' ? 'neutral' : 'warning'"
            size="sm"
            :title="encodingHint"
          >
            {{ encodingLabel }}
          </Badge>
          <span class="sg-numeric text-[0.6875rem] text-sg-muted-foreground">
            {{ analysis.length }} chars
          </span>
          <span class="text-[0.6875rem] text-sg-border-strong" aria-hidden="true">·</span>
          <span
            class="text-[0.6875rem]"
            :class="exceeds ? 'font-medium text-sg-danger' : 'text-sg-muted-foreground'"
          >
            {{ segmentLabel }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <kbd
            class="hidden rounded-sm border border-sg-border bg-sg-surface-muted px-1.5 py-0.5 font-sg-mono text-[0.625rem] text-sg-muted-foreground sm:inline-flex"
            aria-hidden="true"
          >
            ⌘↵
          </kbd>
          <Button size="sm" :disabled="!canSend" :loading="sending" @click="submit">
            <SendHorizontal v-if="!sending" aria-hidden="true" />
            {{ sending ? 'Sending' : sendLabel }}
          </Button>
        </div>
      </div>

      <div class="mt-2.5 h-1 overflow-hidden rounded-full bg-sg-border" aria-hidden="true">
        <div
          class="h-full rounded-full transition-[width] duration-200 ease-out"
          :class="
            exceeds ? 'bg-sg-danger' : analysis.isMultipart ? 'bg-sg-warning' : 'bg-sg-primary'
          "
          :style="{ width: `${progress}%` }"
        />
      </div>

      <p v-if="exceeds" class="mt-2 text-xs text-sg-danger">
        This message needs more than {{ maxSegments }} segments. Shorten it or send it as two
        messages.
      </p>
    </div>
  </div>
</template>
