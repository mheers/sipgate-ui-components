<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '../../lib/cn';
import type { CommunicationDirection, CommunicationType } from '../../lib/types';
import { communicationToneClasses, describeCommunication } from './communication';

const props = withDefaults(
  defineProps<{
    type: CommunicationType;
    direction?: CommunicationDirection;
    size?: 'sm' | 'md' | 'lg';
    decorative?: boolean;
    class?: string;
  }>(),
  { direction: 'inbound', size: 'md' },
);

const descriptor = computed(() => describeCommunication(props.type, props.direction));

const sizes = {
  sm: 'size-7 rounded-sg-sm [&_svg]:size-3.5',
  md: 'size-9 rounded-sg [&_svg]:size-4',
  lg: 'size-11 rounded-sg-lg [&_svg]:size-5',
} as const;
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex shrink-0 items-center justify-center',
        sizes[size],
        communicationToneClasses[descriptor.tone],
        props.class,
      )
    "
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : descriptor.label"
    :aria-hidden="decorative || undefined"
  >
    <component :is="descriptor.icon" aria-hidden="true" />
  </span>
</template>
