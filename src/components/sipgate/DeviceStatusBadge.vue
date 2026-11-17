<script setup lang="ts">
import { computed } from 'vue';
import Badge from '../ui/Badge.vue';
import { cn } from '../../lib/cn';
import type { DeviceStatus } from '../../lib/types';

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
  <Badge
    :variant="current.variant"
    :size="size"
    dot
    :class="cn(!showLabel && 'gap-0 px-1.5', props.class)"
  >
    <span v-if="showLabel">{{ current.label }}</span>
    <span v-else class="sr-only">{{ current.label }}</span>
  </Badge>
</template>
