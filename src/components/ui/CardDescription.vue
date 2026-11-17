<script setup lang="ts">
import { cn } from '@/lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <p :class="cn('text-[0.8125rem] leading-relaxed text-sg-muted-foreground', $props.class)">
    <slot />
  </p>
</template>
