<script setup lang="ts">
import { computed } from 'vue';
import { useCallDuration } from '../../composables/useCallDuration';
import { cn } from '../../lib/cn';
import { formatDuration, formatDurationWords, type DateInput } from '../../lib/format';

const props = withDefaults(
  defineProps<{
    startedAt?: DateInput;
    seconds?: number;
    live?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    tone?: 'default' | 'muted' | 'inverse';
    locale?: string;
    class?: string;
  }>(),
  { live: true, size: 'md', tone: 'default', locale: 'en-GB' },
);

const { seconds: elapsed } = useCallDuration(() =>
  props.live && props.seconds === undefined ? (props.startedAt ?? null) : null,
);

const totalSeconds = computed(() =>
  props.seconds !== undefined ? Math.max(0, Math.floor(props.seconds)) : elapsed.value,
);
const display = computed(() => formatDuration(totalSeconds.value));
const spoken = computed(() => formatDurationWords(totalSeconds.value, props.locale));

const sizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
  xl: 'text-3xl tracking-[-0.04em]',
} as const;

const tones = {
  default: 'text-sg-foreground',
  muted: 'text-sg-muted-foreground',
  inverse: 'text-sg-inverse-foreground',
} as const;
</script>

<template>
  <span
    :class="cn('inline-block sg-numeric tabular-nums', sizes[size], tones[tone], props.class)"
    role="timer"
    :aria-label="spoken"
  >
    {{ display }}
  </span>
</template>
