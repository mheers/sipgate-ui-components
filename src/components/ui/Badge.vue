<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/cn';

const props = withDefaults(
  defineProps<{
    variant?:
      'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
    size?: 'sm' | 'md';
    dot?: boolean;
    class?: string;
  }>(),
  { variant: 'neutral', size: 'md' },
);

const variants = {
  neutral: 'bg-sg-surface-muted text-sg-muted-foreground',
  primary: 'bg-sg-primary-soft text-sg-primary-strong',
  accent: 'bg-sg-accent text-sg-accent-foreground',
  success: 'bg-sg-success-soft text-sg-success',
  warning: 'bg-sg-warning-soft text-sg-warning',
  danger: 'bg-sg-danger-soft text-sg-danger',
  info: 'bg-sg-info-soft text-sg-info',
  outline: 'border border-sg-border-strong text-sg-muted-foreground',
} as const;

const dots = {
  neutral: 'bg-sg-muted-foreground',
  primary: 'bg-sg-primary',
  accent: 'bg-sg-accent-foreground',
  success: 'bg-sg-success',
  warning: 'bg-sg-warning',
  danger: 'bg-sg-danger',
  info: 'bg-sg-info',
  outline: 'bg-sg-muted-foreground',
} as const;

const classes = computed(() =>
  cn(
    'inline-flex items-center gap-1.5 rounded-full font-medium tracking-[0.02em] whitespace-nowrap',
    props.size === 'sm' ? 'px-2 py-0.5 text-[0.6875rem]' : 'px-2.5 py-1 text-xs',
    variants[props.variant],
    props.class,
  ),
);
</script>

<template>
  <span :class="classes">
    <span
      v-if="dot"
      :class="cn('size-1.5 shrink-0 rounded-full', dots[variant])"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
