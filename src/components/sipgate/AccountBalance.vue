<script setup lang="ts">
import { computed } from 'vue';
import Badge from '../ui/Badge.vue';
import Skeleton from '../ui/Skeleton.vue';
import { cn } from '../../lib/cn';
import { formatCurrency } from '../../lib/format';

const props = withDefaults(
  defineProps<{
    amount: number;
    currency?: string;
    locale?: string;
    accountName?: string;
    lowThreshold?: number;
    loading?: boolean;
    class?: string;
  }>(),
  {
    currency: 'EUR',
    locale: 'de-DE',
    lowThreshold: 5,
    loading: false,
  },
);

const low = computed(() => props.amount < props.lowThreshold);
const formatted = computed(() => formatCurrency(props.amount, props.currency, props.locale));
</script>

<template>
  <div
    :class="
      cn(
        'relative overflow-hidden rounded-sg-xl bg-sg-surface-inverse p-5 text-sg-inverse-foreground shadow-sg-lg',
        props.class,
      )
    "
    :aria-busy="loading || undefined"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="size-2 rounded-full bg-sg-accent" aria-hidden="true" />
        <span
          class="text-[0.6875rem] font-medium tracking-[0.14em] text-sg-inverse-foreground/65 uppercase"
        >
          Available credit
        </span>
      </div>
      <div class="flex items-center gap-2">
        <Badge v-if="low && !loading" variant="warning" size="sm">Low balance</Badge>
        <slot name="actions" />
      </div>
    </div>

    <div class="mt-5">
      <Skeleton v-if="loading" rounded="md" class="h-9 w-40 bg-sg-inverse-foreground/15" />
      <span v-if="loading" class="sr-only" role="status">Loading balance</span>
      <p
        v-else
        class="font-sg-display text-[2rem] leading-none font-semibold tracking-[-0.035em] tabular-nums"
      >
        {{ formatted }}
      </p>
      <p v-if="accountName" class="mt-2 text-xs text-sg-inverse-foreground/65">
        {{ accountName }}
      </p>
    </div>

    <div
      v-if="$slots.meta"
      class="mt-4 flex items-center justify-between gap-3 border-t border-sg-inverse-foreground/12 pt-3 text-xs text-sg-inverse-foreground/65"
    >
      <slot name="meta" />
    </div>
  </div>
</template>
