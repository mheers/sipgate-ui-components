<script setup lang="ts">
import { cn } from '../../lib/cn';

defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('sg-card-header flex flex-col gap-1 px-5 pt-5', $props.class)">
    <slot />
  </div>
</template>
