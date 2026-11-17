<script setup lang="ts">
import { computed } from 'vue';
import { Phone } from 'lucide-vue-next';
import CallHistoryItem from './CallHistoryItem.vue';
import EmptyState from '../ui/EmptyState.vue';
import Skeleton from '../ui/Skeleton.vue';
import { cn } from '@/lib/cn';
import { formatDayHeading, toDate } from '@/lib/format';
import type { HistoryEntry } from '@/lib/types';

const props = withDefaults(
  defineProps<{
    entries: HistoryEntry[];
    loading?: boolean;
    grouped?: boolean;
    locale?: string;
    country?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    class?: string;
  }>(),
  {
    loading: false,
    grouped: true,
    locale: 'en-GB',
    country: 'DE',
    emptyTitle: 'No communications yet',
    emptyDescription: 'Calls, messages and faxes will appear here as soon as they happen.',
  },
);

const emit = defineEmits<{ select: [entry: HistoryEntry] }>();

function selectEntry(entry: HistoryEntry) {
  emit('select', entry);
}

const groups = computed(() => {
  const sorted = [...props.entries].sort((left, right) => {
    const a = toDate(left.startedAt)?.getTime() ?? 0;
    const b = toDate(right.startedAt)?.getTime() ?? 0;
    return b - a;
  });

  if (!props.grouped) {
    return [{ key: 'all', label: '', entries: sorted }];
  }

  const map = new Map<string, HistoryEntry[]>();
  for (const entry of sorted) {
    const label = formatDayHeading(entry.startedAt, { locale: props.locale });
    const bucket = map.get(label) ?? [];
    bucket.push(entry);
    map.set(label, bucket);
  }
  return Array.from(map, ([label, entries]) => ({ key: label, label, entries }));
});
</script>

<template>
  <div :class="cn('flex flex-col gap-5', props.class)">
    <div v-if="loading" class="flex flex-col gap-1" aria-busy="true" aria-live="polite">
      <span class="sr-only">Loading communications</span>
      <div v-for="index in 4" :key="index" class="flex items-center gap-3 px-2 py-2.5">
        <Skeleton rounded="lg" class="size-9 shrink-0" />
        <div class="flex-1 space-y-2">
          <Skeleton class="h-3 w-1/3" />
          <Skeleton class="h-2.5 w-1/2" />
        </div>
        <Skeleton class="h-2.5 w-10" />
      </div>
    </div>

    <EmptyState
      v-else-if="entries.length === 0"
      :title="emptyTitle"
      :description="emptyDescription"
    >
      <template #icon>
        <Phone class="size-5" aria-hidden="true" />
      </template>
      <template #actions>
        <slot name="empty" />
      </template>
    </EmptyState>

    <div v-else class="flex flex-col gap-5">
      <section
        v-for="group in groups"
        :key="group.key"
        :aria-label="group.label || undefined"
        class="flex flex-col gap-1"
      >
        <h3
          v-if="group.label"
          class="px-2 font-sg-mono text-[0.6875rem] font-medium tracking-[0.12em] text-sg-subtle-foreground uppercase"
        >
          {{ group.label }}
        </h3>
        <ul class="flex flex-col">
          <li v-for="entry in group.entries" :key="entry.id">
            <slot name="item" :entry="entry" :select="selectEntry">
              <CallHistoryItem
                :entry="entry"
                :locale="locale"
                :country="country"
                @select="selectEntry"
              />
            </slot>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
