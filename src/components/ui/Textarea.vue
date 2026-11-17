<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { cn } from '@/lib/cn';

const props = withDefaults(
  defineProps<{
    rows?: number;
    autoResize?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    class?: string;
  }>(),
  { rows: 3, autoResize: false },
);

const model = defineModel<string>();
const textarea = ref<HTMLTextAreaElement | null>(null);

function resize() {
  if (!props.autoResize || !textarea.value) return;
  const element = textarea.value;
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
}

watch(model, () => nextTick(resize));
onMounted(resize);

const classes = computed(() =>
  cn(
    'block w-full rounded-sg border border-sg-border-strong bg-sg-input px-3 py-2.5 text-sm leading-relaxed text-sg-foreground shadow-sg-xs transition-[border-color,box-shadow] duration-150 outline-none',
    'placeholder:text-sg-subtle-foreground focus:border-sg-primary focus:ring-2 focus:ring-sg-ring/25',
    props.invalid && 'border-sg-danger focus:border-sg-danger focus:ring-sg-danger/20',
    props.disabled && 'cursor-not-allowed bg-sg-surface-muted opacity-60',
    props.autoResize ? 'resize-none overflow-hidden' : 'resize-y',
    props.class,
  ),
);
</script>

<template>
  <textarea
    ref="textarea"
    v-model="model"
    :rows="rows"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :aria-invalid="invalid || undefined"
    :class="classes"
    @input="resize"
  />
</template>
