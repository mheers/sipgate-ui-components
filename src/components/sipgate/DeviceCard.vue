<script setup lang="ts">
import { computed } from 'vue';
import { Globe2, Headset, Phone, Radio, Smartphone } from 'lucide-vue-next';
import Card from '../ui/Card.vue';
import DeviceStatusBadge from './DeviceStatusBadge.vue';
import PhoneNumber from './PhoneNumber.vue';
import { cn } from '../../lib/cn';
import type { Device } from '../../lib/types';

const props = withDefaults(
  defineProps<{
    device: Device;
    country?: string;
    selected?: boolean;
    class?: string;
  }>(),
  { country: 'DE', selected: false },
);

const icons = {
  desk: Phone,
  mobile: Smartphone,
  external: Globe2,
  softphone: Headset,
  register: Radio,
} as const;

const kindLabels = {
  desk: 'Desk phone',
  mobile: 'Mobile',
  external: 'External device',
  softphone: 'Softphone',
  register: 'SIP registration',
} as const;

const icon = computed(() => icons[props.device.kind]);
const kindLabel = computed(() => kindLabels[props.device.kind]);
const numbers = computed(() => props.device.numbers ?? []);
</script>

<template>
  <Card
    :interactive="false"
    :class="
      cn('overflow-hidden', selected && 'border-sg-primary ring-1 ring-sg-primary/30', props.class)
    "
  >
    <div class="flex items-start gap-3 p-4">
      <span
        class="flex size-10 shrink-0 items-center justify-center rounded-sg bg-sg-surface-muted text-sg-primary-strong"
      >
        <component :is="icon" class="size-5" aria-hidden="true" />
      </span>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="truncate font-sg-display text-sm font-semibold tracking-[-0.01em]">
              {{ device.name }}
            </p>
            <p class="mt-0.5 truncate text-xs text-sg-muted-foreground">
              {{ device.alias || device.model || kindLabel }}
            </p>
          </div>
          <DeviceStatusBadge :status="device.status" size="sm" />
        </div>

        <div v-if="numbers.length" class="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <PhoneNumber
            v-for="number in numbers.slice(0, 3)"
            :key="number"
            :value="number"
            :country="country"
            size="sm"
            tone="muted"
            :copyable="false"
          />
          <span v-if="numbers.length > 3" class="text-xs text-sg-subtle-foreground">
            +{{ numbers.length - 3 }} more
          </span>
        </div>
        <p v-else class="mt-2.5 text-xs text-sg-subtle-foreground">No numbers assigned</p>
      </div>
    </div>

    <div
      v-if="$slots.actions"
      class="flex items-center justify-end gap-2 border-t border-sg-border px-4 py-2.5"
    >
      <slot name="actions" />
    </div>
  </Card>
</template>
