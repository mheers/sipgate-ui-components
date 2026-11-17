<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/cn';

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'muted' | 'inverse' | 'outline';
    interactive?: boolean;
    class?: string;
  }>(),
  { variant: 'default' },
);

const variants = {
  default: 'border-sg-border bg-sg-surface text-sg-foreground',
  muted: 'border-transparent bg-sg-surface-muted text-sg-foreground',
  inverse: 'border-transparent bg-sg-surface-inverse text-sg-inverse-foreground',
  outline: 'border-sg-border-strong bg-transparent text-sg-foreground',
} as const;

const classes = computed(() =>
  cn(
    'sg-card relative rounded-sg-lg border',
    variants[props.variant],
    props.variant !== 'inverse' && 'shadow-sg-xs',
    props.interactive &&
      'cursor-pointer transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-sg-border-strong hover:shadow-sg-sm',
    props.class,
  ),
);
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
