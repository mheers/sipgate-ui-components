<script setup lang="ts">
import { computed } from 'vue';
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardProps,
  type DialogContentProps,
} from 'reka-ui';
import { X } from 'lucide-vue-next';
import { cn } from '../../lib/cn';
import { reactiveOmit } from '../../lib/reactiveOmit';

const props = withDefaults(
  defineProps<DialogContentProps & { class?: string; showClose?: boolean }>(),
  { showClose: true },
);

const forwarded = useForwardProps(reactiveOmit(props, 'class', 'showClose'));

const classes = computed(() =>
  cn(
    'sg-root sg-dialog-content fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 sg-scroll overflow-y-auto',
    'rounded-[var(--sg-dialog-radius)] border border-sg-border bg-sg-surface p-6 font-sg-sans text-sg-foreground shadow-sg-lg outline-none',
    'data-[state=open]:animate-sg-enter',
    props.class,
  ),
);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] data-[state=open]:animate-sg-enter"
    />
    <DialogContent v-bind="forwarded" :class="classes">
      <slot />
      <DialogClose
        v-if="showClose"
        class="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-sg-sm text-sg-muted-foreground transition-colors outline-none hover:bg-sg-surface-muted hover:text-sg-foreground focus-visible:ring-2 focus-visible:ring-sg-ring"
        aria-label="Close"
      >
        <X class="size-4" aria-hidden="true" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
