<script lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'sg-button relative inline-flex items-center justify-center gap-2 rounded-sg whitespace-nowrap select-none',
    'leading-none font-medium outline-none',
    'transition-[background-color,color,box-shadow,border-color,transform] duration-150 ease-out',
    'focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sg-background',
    'disabled:pointer-events-none disabled:opacity-45',
    'active:translate-y-px motion-reduce:active:translate-y-0',
    '[&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-sg-primary text-sg-primary-foreground shadow-sg-xs hover:bg-sg-primary-hover',
        secondary: 'bg-sg-primary-soft text-sg-primary-strong hover:brightness-95',
        accent: 'bg-sg-accent text-sg-accent-foreground shadow-sg-xs hover:brightness-95',
        outline:
          'border border-sg-border-strong bg-sg-surface text-sg-foreground hover:border-sg-foreground/30 hover:bg-sg-surface-muted',
        ghost: 'text-sg-foreground hover:bg-sg-surface-muted',
        destructive: 'bg-sg-danger text-sg-danger-foreground shadow-sg-xs hover:brightness-95',
        link: 'text-sg-primary underline-offset-4 hover:underline',
        inverse:
          'bg-sg-inverse-foreground/10 text-sg-inverse-foreground hover:bg-sg-inverse-foreground/15 focus-visible:ring-sg-accent focus-visible:ring-offset-sg-surface-inverse',
        'inverse-ghost':
          'text-sg-inverse-foreground hover:bg-sg-inverse-foreground/10 focus-visible:ring-sg-accent focus-visible:ring-offset-sg-surface-inverse',
        'inverse-outline':
          'border border-sg-inverse-foreground/25 bg-transparent text-sg-inverse-foreground hover:bg-sg-inverse-foreground/10 focus-visible:ring-sg-accent focus-visible:ring-offset-sg-surface-inverse',
      },
      size: {
        sm: 'h-[var(--sg-control-height-sm)] gap-1.5 px-3 text-[0.8125rem] [&_svg]:size-4',
        md: 'h-[var(--sg-control-height)] px-4 text-sm [&_svg]:size-4',
        lg: 'h-[var(--sg-control-height-lg)] px-5 text-[0.9375rem] [&_svg]:size-[1.125rem]',
        icon: 'size-[var(--sg-control-height)] [&_svg]:size-4',
        'icon-sm': 'size-[var(--sg-control-height-sm)] [&_svg]:size-4',
        'icon-lg': 'size-[var(--sg-control-height-lg)] [&_svg]:size-5',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { LoaderCircle } from 'lucide-vue-next';
import { cn } from '../../lib/cn';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant'];
    size?: ButtonVariants['size'];
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    block?: boolean;
    disabled?: boolean;
    class?: string;
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
);

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    :class="cn(buttonVariants({ variant, size, block }), $props.class)"
    v-bind="$attrs"
  >
    <LoaderCircle v-if="loading" class="absolute animate-sg-spin" aria-hidden="true" />
    <span :class="cn('inline-flex items-center gap-2', loading && 'opacity-0')"><slot /></span>
  </button>
</template>
