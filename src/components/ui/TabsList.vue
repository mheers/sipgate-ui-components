<script setup lang="ts">
import { computed } from 'vue';
import { TabsList, useForwardProps, type TabsListProps } from 'reka-ui';
import { cn } from '@/lib/cn';
import { reactiveOmit } from '@/lib/reactiveOmit';

const props = defineProps<TabsListProps & { class?: string }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
const classes = computed(() =>
  cn(
    'inline-flex items-center gap-1 rounded-sg bg-sg-surface-muted p-1 text-sg-muted-foreground',
    props.class,
  ),
);
</script>

<template>
  <TabsList v-bind="forwarded" :class="classes">
    <slot />
  </TabsList>
</template>
