<script setup lang="ts">
import { computed } from 'vue';
import { Check, Copy } from 'lucide-vue-next';
import Button from './Button.vue';
import { useClipboard } from '../../composables/useClipboard';
import { cn } from '../../lib/cn';

const props = withDefaults(
  defineProps<{
    value: string;
    label?: string;
    copiedLabel?: string;
    showLabel?: boolean;
    class?: string;
  }>(),
  { label: 'Copy', copiedLabel: 'Copied', showLabel: false },
);

const { copy, copied } = useClipboard();

const ariaLabel = computed(() => (copied.value ? props.copiedLabel : props.label));

function onCopy() {
  void copy(props.value);
}
</script>

<template>
  <span :class="cn('inline-flex items-center', $props.class)">
    <Button
      :variant="showLabel ? 'outline' : 'ghost'"
      :size="showLabel ? 'sm' : 'icon-sm'"
      :aria-label="ariaLabel"
      :title="ariaLabel"
      @click.stop="onCopy"
    >
      <Check v-if="copied" class="text-sg-success" aria-hidden="true" />
      <Copy v-else aria-hidden="true" />
      <span v-if="showLabel">{{ ariaLabel }}</span>
    </Button>
    <span class="sr-only" aria-live="polite">{{ copied ? copiedLabel : '' }}</span>
  </span>
</template>
