<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { MessageSquare } from 'lucide-vue-next';
import EmptyState from '../ui/EmptyState.vue';
import Skeleton from '../ui/Skeleton.vue';
import SmsBubble from './SmsBubble.vue';
import { cn } from '@/lib/cn';
import { formatDayHeading, toDate } from '@/lib/format';
import type { SmsMessage } from '@/lib/types';

const props = withDefaults(
  defineProps<{
    messages: SmsMessage[];
    locale?: string;
    loading?: boolean;
    typing?: boolean;
    maxHeight?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    scrollLabel?: string;
    class?: string;
  }>(),
  {
    locale: 'en-GB',
    loading: false,
    typing: false,
    maxHeight: '26rem',
    emptyTitle: 'No messages yet',
    emptyDescription: 'Start the conversation — messages are delivered straight to the handset.',
    scrollLabel: 'Message history',
  },
);

const scroller = ref<HTMLElement | null>(null);
const nearBottom = ref(true);

const groups = computed(() => {
  const sorted = [...props.messages].sort((left, right) => {
    const a = toDate(left.sentAt)?.getTime() ?? 0;
    const b = toDate(right.sentAt)?.getTime() ?? 0;
    return a - b;
  });
  const map = new Map<string, SmsMessage[]>();
  for (const message of sorted) {
    const label = formatDayHeading(message.sentAt, { locale: props.locale });
    const bucket = map.get(label) ?? [];
    bucket.push(message);
    map.set(label, bucket);
  }
  return Array.from(map, ([label, messages]) => ({ label, messages }));
});

function scrollToBottom(behavior: ScrollBehavior = 'auto') {
  const element = scroller.value;
  if (!element) return;
  const top = element.scrollHeight;
  if (typeof element.scrollTo === 'function') {
    element.scrollTo({ top, behavior });
  } else {
    element.scrollTop = top;
  }
  nearBottom.value = true;
}

function onScroll() {
  const element = scroller.value;
  if (!element) return;
  nearBottom.value = element.scrollHeight - element.scrollTop - element.clientHeight < 80;
}

watch(
  () => [props.messages.length, props.typing],
  async () => {
    if (!nearBottom.value) return;
    await nextTick();
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    scrollToBottom(reduce ? 'auto' : 'smooth');
  },
);

onMounted(async () => {
  await nextTick();
  scrollToBottom();
});

defineExpose({ scrollToBottom });
</script>

<template>
  <div :class="cn('flex flex-col', props.class)">
    <div v-if="$slots.header" class="border-b border-sg-border">
      <slot name="header" />
    </div>

    <div
      ref="scroller"
      class="min-h-0 sg-scroll overflow-y-auto px-3 py-4 outline-none focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:ring-inset sm:px-4"
      :style="{ maxHeight }"
      tabindex="0"
      role="log"
      :aria-label="scrollLabel"
      @scroll.passive="onScroll"
    >
      <div v-if="loading" class="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        <span class="sr-only">Loading messages</span>
        <div class="flex justify-start">
          <Skeleton rounded="lg" class="h-16 w-2/3" />
        </div>
        <div class="flex justify-end">
          <Skeleton rounded="lg" class="h-10 w-1/2" />
        </div>
        <div class="flex justify-start">
          <Skeleton rounded="lg" class="h-20 w-3/5" />
        </div>
      </div>

      <EmptyState
        v-else-if="messages.length === 0 && !typing"
        compact
        :title="emptyTitle"
        :description="emptyDescription"
      >
        <template #icon>
          <MessageSquare class="size-4" aria-hidden="true" />
        </template>
      </EmptyState>

      <div v-else class="flex flex-col gap-3" aria-live="polite" aria-relevant="additions">
        <template v-for="group in groups" :key="group.label">
          <div class="flex items-center gap-3 py-1">
            <span class="h-px flex-1 bg-sg-border" aria-hidden="true" />
            <span
              class="font-sg-mono text-[0.625rem] font-medium tracking-[0.1em] text-sg-subtle-foreground uppercase"
            >
              {{ group.label }}
            </span>
            <span class="h-px flex-1 bg-sg-border" aria-hidden="true" />
          </div>
          <SmsBubble
            v-for="message in group.messages"
            :key="message.id"
            :message="message"
            :locale="locale"
          />
        </template>

        <div v-if="typing" class="flex justify-start" aria-label="Contact is typing">
          <div
            class="flex items-center gap-1 rounded-sg-lg rounded-bl-sm border border-sg-border bg-sg-surface px-3.5 py-3"
          >
            <span
              v-for="index in 3"
              :key="index"
              class="size-1.5 animate-sg-bounce rounded-full bg-sg-muted-foreground/70 motion-reduce:animate-none"
              :style="{ animationDelay: `${(index - 1) * 140}ms` }"
              aria-hidden="true"
            />
            <span class="sr-only">Typing…</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="$slots.composer" class="border-t border-sg-border">
      <slot name="composer" />
    </div>
  </div>
</template>
