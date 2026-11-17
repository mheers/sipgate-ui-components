<script setup lang="ts">
import { cn } from '@/lib/cn';

withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    description?: string;
    class?: string;
  }>(),
  {},
);
</script>

<template>
  <header :class="cn('flex flex-col gap-4 border-b border-sg-border pb-6', $props.class)">
    <div v-if="$slots.breadcrumb" class="text-xs text-sg-muted-foreground">
      <slot name="breadcrumb" />
    </div>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="min-w-0">
        <p
          v-if="eyebrow"
          class="mb-1.5 font-sg-mono text-[0.6875rem] font-medium tracking-[0.14em] text-sg-primary uppercase"
        >
          {{ eyebrow }}
        </p>
        <h1
          class="font-sg-display text-2xl font-semibold tracking-[-0.03em] text-balance text-sg-foreground sm:text-[1.75rem]"
        >
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="mt-1.5 max-w-2xl text-sm leading-relaxed text-sg-muted-foreground"
        >
          {{ description }}
        </p>
      </div>
      <div v-if="$slots.actions" class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <div
      v-if="$slots.meta"
      class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sg-muted-foreground"
    >
      <slot name="meta" />
    </div>
  </header>
</template>
