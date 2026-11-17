<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'reka-ui';
import { cn } from '@/lib/cn';

const props = defineProps<DialogTitleProps & { class?: string }>();
</script>

<template>
  <DialogTitle
    :class="
      cn(
        'font-sg-display text-lg font-semibold tracking-[-0.015em] text-sg-foreground',
        props.class,
      )
    "
  >
    <slot />
  </DialogTitle>
</template>
