<script setup lang="ts">
import { computed } from 'vue';
import Badge from '../ui/Badge.vue';
import type { DeviceStatus } from '@/lib/types';

const props = withDefaults(
  defineProps<{
    status: DeviceStatus;
    size?: 'sm' | 'md';
    showLabel?: boolean;
    class?: string;
  }>(),
  { size: 'md', showLabel: true },
);

const meta = {
  online: { label: 'Online', variant: 'success' },
  offline: { label: 'Offline', variant: 'neutral' },
  busy: { label: 'Busy', variant: 'danger' },
  dnd: { label: 'Do not disturb', variant: 'warning' },
  ringing: { label: 'Ringing', variant: 'accent' },
} as const;

const current = computed(() => meta[props.status]);
</script>

<template>
  <Badge :variant="current.variant" :size="size" dot :class="props.class">
    {{ current.label }}
  </Badge>
</template>
