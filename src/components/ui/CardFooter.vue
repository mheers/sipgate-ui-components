<script setup lang="ts">
import { cn } from '../../lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('sg-card-footer flex items-center gap-2 px-5 pb-5', $props.class)">
    <slot />
  </div>
</template>
