<script setup lang="ts">
import { computed } from 'vue';
import { TooltipContent, TooltipPortal, useForwardProps, type TooltipContentProps } from 'reka-ui';
import { cn } from '@/lib/cn';
import { reactiveOmit } from '@/lib/reactiveOmit';

const props = withDefaults(defineProps<TooltipContentProps & { class?: string }>(), {
  sideOffset: 6,
});
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
const classes = computed(() =>
  cn(
    'sg-root z-50 max-w-64 rounded-sg-sm bg-sg-surface-inverse px-2.5 py-1.5 text-xs leading-relaxed font-medium text-sg-inverse-foreground shadow-sg-md',
    'data-[state=delayed-open]:animate-sg-enter data-[state=instant-open]:animate-sg-enter',
    props.class,
  ),
);
</script>

<template>
  <TooltipPortal>
    <TooltipContent v-bind="forwarded" :class="classes">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
