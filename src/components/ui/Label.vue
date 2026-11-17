<script setup lang="ts">
import { cn } from '../../lib/cn';

const props = withDefaults(
  defineProps<{
    for?: string;
    required?: boolean;
    class?: string;
  }>(),
  { required: false },
);
</script>

<template>
  <label
    :for="props.for"
    :class="
      cn(
        'inline-flex items-center gap-1 text-[0.8125rem] leading-none font-medium text-sg-foreground',
        props.class,
      )
    "
  >
    <slot />
    <span v-if="required" class="text-sg-danger" aria-hidden="true">*</span>
  </label>
</template>
