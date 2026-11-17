<script setup lang="ts">
import { computed } from 'vue';
import CopyButton from '../ui/CopyButton.vue';
import { cn } from '../../lib/cn';
import { formatPhoneNumber, telHref } from '../../lib/phone';
import type { PhoneNumberFormat } from '../../lib/types';

const props = withDefaults(
  defineProps<{
    value: string | number;
    format?: PhoneNumberFormat;
    country?: string;
    size?: 'sm' | 'md' | 'lg';
    tone?: 'default' | 'muted' | 'inverse';
    link?: boolean;
    copyable?: boolean;
    mono?: boolean;
    callLabel?: string;
    class?: string;
  }>(),
  {
    format: 'international',
    country: 'DE',
    size: 'md',
    tone: 'default',
    link: true,
    copyable: false,
    mono: true,
    callLabel: 'Call',
  },
);

const display = computed(() =>
  formatPhoneNumber(props.value, { format: props.format, country: props.country }),
);
const href = computed(() => telHref(props.value, props.country));
const linked = computed(() => props.link && Boolean(href.value));

const sizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
} as const;

const tones = {
  default: 'text-sg-foreground',
  muted: 'text-sg-muted-foreground',
  inverse: 'text-sg-inverse-foreground',
} as const;
</script>

<template>
  <span :class="cn('group/phone inline-flex min-w-0 items-center gap-1', $props.class)">
    <component
      :is="linked ? 'a' : 'span'"
      :href="linked ? href : undefined"
      :aria-label="linked ? `${callLabel} ${display}` : undefined"
      :class="
        cn(
          'truncate rounded-sg-sm transition-colors outline-none',
          mono && 'sg-numeric',
          sizes[size],
          tones[tone],
          linked &&
            'hover:underline hover:underline-offset-2 focus-visible:ring-2 focus-visible:ring-sg-ring',
        )
      "
      :title="display"
    >
      {{ display }}
    </component>
    <CopyButton
      v-if="copyable"
      :value="display"
      :label="`Copy number ${display}`"
      class="opacity-100 transition-opacity sm:opacity-0 sm:group-hover/phone:opacity-100 sm:focus-within:opacity-100"
    />
  </span>
</template>
