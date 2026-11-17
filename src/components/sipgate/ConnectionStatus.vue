<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/cn';

const props = withDefaults(
  defineProps<{
    state: 'connected' | 'connecting' | 'disconnected';
    label?: string;
    showLabel?: boolean;
    size?: 'sm' | 'md';
    tone?: 'default' | 'inverse';
    class?: string;
  }>(),
  { showLabel: true, size: 'md', tone: 'default' },
);

const meta = {
  connected: { label: 'Connected', dot: 'bg-sg-success', text: 'text-sg-success' },
  connecting: { label: 'Connecting', dot: 'bg-sg-warning', text: 'text-sg-warning' },
  disconnected: { label: 'Disconnected', dot: 'bg-sg-danger', text: 'text-sg-danger' },
} as const;

const current = computed(() => meta[props.state]);
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center gap-2 whitespace-nowrap',
        size === 'sm' ? 'text-[0.6875rem]' : 'text-xs',
        tone === 'inverse' ? 'text-sg-inverse-foreground/70' : current.text,
        props.class,
      )
    "
    role="status"
    aria-live="polite"
  >
    <span class="relative flex size-2 shrink-0">
      <span
        v-if="state !== 'connected'"
        class="absolute inline-flex size-full rounded-full opacity-50"
        :class="[current.dot, state === 'connecting' && 'animate-sg-pulse']"
      />
      <span class="relative inline-flex size-2 rounded-full" :class="current.dot" />
    </span>
    <span v-if="showLabel" class="font-medium">{{ label || current.label }}</span>
    <span v-else class="sr-only">{{ label || current.label }}</span>
  </span>
</template>
