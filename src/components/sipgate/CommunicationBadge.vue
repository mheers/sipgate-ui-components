<script setup lang="ts">
import { computed } from 'vue';
import Badge from '../ui/Badge.vue';
import type { CommunicationDirection, CommunicationType } from '../../lib/types';
import { describeCommunication } from './communication';

const props = withDefaults(
  defineProps<{
    type: CommunicationType;
    direction?: CommunicationDirection;
    size?: 'sm' | 'md';
    showLabel?: boolean;
    class?: string;
  }>(),
  { direction: 'inbound', size: 'md', showLabel: true },
);

const descriptor = computed(() => describeCommunication(props.type, props.direction));
</script>

<template>
  <Badge :variant="descriptor.tone" :size="size" :class="props.class">
    <component :is="descriptor.icon" class="size-3.5" aria-hidden="true" />
    <span v-if="showLabel">{{ descriptor.label }}</span>
    <span v-else class="sr-only">{{ descriptor.label }}</span>
  </Badge>
</template>
