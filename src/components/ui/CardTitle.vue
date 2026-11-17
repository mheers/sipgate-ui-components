<script setup lang="ts">
import { cn } from '../../lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <h3
    :class="
      cn(
        'font-sg-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-inherit',
        $props.class,
      )
    "
  >
    <slot />
  </h3>
</template>
