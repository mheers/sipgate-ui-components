<script setup lang="ts">
import { cn } from '../../lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <p
    :class="
      cn('sg-card-description text-[0.8125rem] leading-relaxed text-current/70', $props.class)
    "
  >
    <slot />
  </p>
</template>
