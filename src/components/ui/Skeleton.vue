<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/cn';

const props = withDefaults(
  defineProps<{
    rounded?: 'sm' | 'md' | 'lg' | 'full';
    class?: string;
  }>(),
  { rounded: 'md' },
);

const radii = {
  sm: 'rounded-sm',
  md: 'rounded-sg-sm',
  lg: 'rounded-sg',
  full: 'rounded-full',
} as const;

const classes = computed(() =>
  cn(
    'block bg-[linear-gradient(90deg,var(--sg-surface-muted)_25%,var(--sg-border)_50%,var(--sg-surface-muted)_75%)] bg-[length:200%_100%] motion-safe:animate-sg-shimmer',
    radii[props.rounded],
    props.class,
  ),
);
</script>

<template>
  <span :class="classes" aria-hidden="true" />
</template>
