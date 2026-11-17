<script setup lang="ts">
import { computed } from 'vue';
import { TabsTrigger, useForwardProps, type TabsTriggerProps } from 'reka-ui';
import { cn } from '@/lib/cn';
import { reactiveOmit } from '@/lib/reactiveOmit';

const props = defineProps<TabsTriggerProps & { class?: string }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
const classes = computed(() =>
  cn(
    'inline-flex h-8 items-center justify-center gap-1.5 rounded-sg-sm px-3 text-[0.8125rem] font-medium whitespace-nowrap transition-[background-color,color,box-shadow] duration-150 outline-none',
    'hover:text-sg-foreground focus-visible:ring-2 focus-visible:ring-sg-ring',
    'data-[state=active]:bg-sg-surface data-[state=active]:text-sg-foreground data-[state=active]:shadow-sg-xs',
    'disabled:pointer-events-none disabled:opacity-45',
    props.class,
  ),
);
</script>

<template>
  <TabsTrigger v-bind="forwarded" :class="classes">
    <slot />
  </TabsTrigger>
</template>
