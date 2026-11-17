<script setup lang="ts">
import { cn } from '@/lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('mt-6 flex flex-wrap items-center justify-end gap-2', $props.class)">
    <slot />
  </div>
</template>
