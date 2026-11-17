<script setup lang="ts">
import { TooltipTrigger, type TooltipTriggerProps } from 'reka-ui';

defineProps<TooltipTriggerProps>();
</script>

<template>
  <TooltipTrigger v-bind="$props">
    <slot />
  </TooltipTrigger>
</template>
