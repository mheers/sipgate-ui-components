<script setup lang="ts">
import { computed } from 'vue';
import { LoaderCircle } from 'lucide-vue-next';
import { cn } from '@/lib/cn';

const props = withDefaults(
  defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg';
    label?: string;
    class?: string;
  }>(),
  { size: 'md', label: 'Loading' },
);

const sizes = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-7',
} as const;
</script>

<template>
  <span role="status" :class="cn('inline-flex items-center justify-center', $props.class)">
    <LoaderCircle :class="cn('animate-sg-spin text-sg-primary', sizes[size])" aria-hidden="true" />
    <span class="sr-only">{{ label }}</span>
  </span>
</template>
