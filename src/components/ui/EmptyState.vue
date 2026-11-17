<script setup lang="ts">
import { RadioTower } from 'lucide-vue-next';
import { cn } from '../../lib/cn';

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    compact?: boolean;
    class?: string;
  }>(),
  { title: 'Nothing here yet' },
);
</script>

<template>
  <div
    :class="
      cn(
        'relative overflow-hidden rounded-sg-lg border border-dashed border-sg-border-strong bg-sg-surface/60 sg-grid-paper',
        compact ? 'p-4' : 'p-6',
        $props.class,
      )
    "
  >
    <div :class="cn('flex gap-4', compact ? 'items-start' : 'items-start sm:gap-5')">
      <div
        :class="
          cn(
            'flex shrink-0 items-center justify-center rounded-sg border border-sg-border bg-sg-surface text-sg-primary shadow-sg-xs',
            compact ? 'size-9' : 'size-11',
          )
        "
      >
        <slot name="icon">
          <RadioTower :class="compact ? 'size-4' : 'size-5'" aria-hidden="true" />
        </slot>
      </div>
      <div class="min-w-0 flex-1">
        <h3
          :class="
            cn(
              'font-sg-display font-semibold tracking-[-0.01em] text-sg-foreground',
              compact ? 'text-sm' : 'text-base',
            )
          "
        >
          {{ title }}
        </h3>
        <p
          v-if="description"
          :class="cn('max-w-prose mt-1 text-sg-muted-foreground', compact ? 'text-xs' : 'text-sm')"
        >
          {{ description }}
        </p>
        <div v-if="$slots.default" :class="compact ? 'mt-2' : 'mt-4'">
          <slot />
        </div>
      </div>
      <div v-if="$slots.actions" class="shrink-0">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
