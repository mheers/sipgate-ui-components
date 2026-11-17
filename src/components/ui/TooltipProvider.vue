<script setup lang="ts">
import { TooltipProvider, type TooltipProviderProps } from 'reka-ui';

withDefaults(defineProps<TooltipProviderProps>(), { delayDuration: 200 });
</script>

<template>
  <TooltipProvider v-bind="$props">
    <slot />
  </TooltipProvider>
</template>
