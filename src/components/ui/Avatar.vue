<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { cn } from '@/lib/cn';
import { avatarTone } from '@/lib/avatar';
import { getInitials } from '@/lib/format';

const props = withDefaults(
  defineProps<{
    name?: string;
    src?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'rounded';
    status?: 'online' | 'offline' | 'busy' | 'away';
    decorative?: boolean;
    class?: string;
  }>(),
  { name: '', size: 'md', shape: 'circle' },
);

const failed = ref(false);
watch(
  () => props.src,
  () => {
    failed.value = false;
  },
);

const showImage = computed(() => Boolean(props.src) && !failed.value);
const tone = computed(() => avatarTone(props.name || props.src || '?'));

const sizes = {
  xs: 'size-6 text-[0.625rem]',
  sm: 'size-8 text-[0.6875rem]',
  md: 'size-10 text-xs',
  lg: 'size-12 text-sm',
  xl: 'size-16 text-lg',
} as const;

const statusColors = {
  online: 'bg-sg-success',
  offline: 'bg-sg-border-strong',
  busy: 'bg-sg-danger',
  away: 'bg-sg-warning',
} as const;

const rootClasses = computed(() =>
  cn(
    'relative inline-flex shrink-0 items-center justify-center overflow-visible',
    sizes[props.size],
    props.shape === 'circle' ? 'rounded-full' : 'rounded-sg',
    props.class,
  ),
);
</script>

<template>
  <span
    :class="rootClasses"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : name || undefined"
    :aria-hidden="decorative || undefined"
  >
    <span
      :class="
        cn(
          'flex size-full items-center justify-center overflow-hidden font-semibold tracking-[0.02em]',
          props.shape === 'circle' ? 'rounded-full' : 'rounded-sg',
          !showImage && tone.classes,
        )
      "
    >
      <img
        v-if="showImage"
        :src="src"
        alt=""
        loading="lazy"
        decoding="async"
        referrerpolicy="no-referrer"
        class="size-full object-cover"
        @error="failed = true"
      />
      <template v-else>{{ getInitials(name || '?') }}</template>
    </span>
    <span
      v-if="status"
      :class="
        cn(
          'absolute right-0 bottom-0 size-2.5 rounded-full ring-2 ring-sg-surface',
          statusColors[status],
        )
      "
      :title="status"
    />
  </span>
</template>
