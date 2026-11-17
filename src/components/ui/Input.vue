<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { cn } from '../../lib/cn';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    type?: string;
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    class?: string;
  }>(),
  { type: 'text', size: 'md' },
);

const model = defineModel<string>();
const attrs = useAttrs();

const inputAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

const sizes = {
  sm: 'h-8 text-[0.8125rem]',
  md: 'h-10 text-sm',
  lg: 'h-11 text-[0.9375rem]',
} as const;

const rootClasses = computed(() =>
  cn(
    'group flex items-center gap-2 rounded-sg border bg-sg-input px-3 shadow-sg-xs transition-[border-color,box-shadow] duration-150',
    'border-sg-border-strong focus-within:border-sg-primary focus-within:ring-2 focus-within:ring-sg-ring/25',
    props.invalid &&
      'border-sg-danger focus-within:border-sg-danger focus-within:ring-sg-danger/20',
    props.disabled && 'cursor-not-allowed bg-sg-surface-muted opacity-60',
    sizes[props.size],
    props.class,
  ),
);
</script>

<template>
  <div :class="rootClasses" :data-disabled="disabled || undefined">
    <span v-if="$slots.leading" class="flex shrink-0 text-sg-subtle-foreground">
      <slot name="leading" />
    </span>
    <input
      v-model="model"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :aria-invalid="invalid || undefined"
      v-bind="inputAttrs"
      :class="
        cn(
          'h-full w-full min-w-0 border-0 bg-transparent text-sg-foreground outline-none',
          'placeholder:text-sg-subtle-foreground disabled:cursor-not-allowed',
        )
      "
    />
    <span v-if="$slots.trailing" class="flex shrink-0 items-center text-sg-subtle-foreground">
      <slot name="trailing" />
    </span>
  </div>
</template>
