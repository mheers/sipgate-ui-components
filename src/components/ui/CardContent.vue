<script setup lang="ts">
import { cn } from '../../lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('sg-card-content px-5 py-4', $props.class)">
    <slot />
  </div>
</template>
