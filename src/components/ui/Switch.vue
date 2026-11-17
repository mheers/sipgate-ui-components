<script setup lang="ts">
import { computed, useId } from 'vue';
import { SwitchRoot, SwitchThumb, useForwardProps, type SwitchRootProps } from 'reka-ui';
import { cn } from '../../lib/cn';
import { reactiveOmit } from '../../lib/reactiveOmit';

type Props = Omit<SwitchRootProps, 'modelValue' | 'defaultValue'> & {
  label?: string;
  description?: string;
  class?: string;
};

const props = withDefaults(defineProps<Props>(), { disabled: false });
const model = defineModel<boolean>({ default: false });
const forwarded = useForwardProps(
  reactiveOmit(
    props as unknown as Record<string, unknown>,
    'class',
    'label',
    'description',
    'id',
    'modelValue',
    'defaultValue',
  ),
);
const id = useId();

const rootClasses = computed(() =>
  cn(
    'relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 outline-none',
    'focus-visible:ring-2 focus-visible:ring-sg-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sg-background',
    model.value ? 'bg-sg-primary' : 'bg-sg-border-strong',
    props.disabled && 'cursor-not-allowed opacity-50',
    props.class,
  ),
);
</script>

<template>
  <div
    :class="
      cn('flex items-start gap-3', label || description || $slots.default ? 'justify-between' : '')
    "
  >
    <div v-if="label || description || $slots.default" class="flex flex-col gap-0.5">
      <label :for="id" class="cursor-pointer text-sm font-medium text-sg-foreground">
        <slot>{{ label }}</slot>
      </label>
      <p v-if="description" class="text-xs leading-relaxed text-sg-muted-foreground">
        {{ description }}
      </p>
    </div>
    <SwitchRoot :id="id" v-model="model" v-bind="forwarded" :class="rootClasses">
      <SwitchThumb
        :class="
          cn(
            'block size-5 rounded-full bg-white shadow-sg-xs transition-transform duration-200 ease-out',
            model ? 'translate-x-4' : 'translate-x-0',
          )
        "
      />
    </SwitchRoot>
  </div>
</template>
