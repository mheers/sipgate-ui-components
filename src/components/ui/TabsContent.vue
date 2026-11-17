<script setup lang="ts">
import { computed } from 'vue';
import { TabsContent, useForwardProps, type TabsContentProps } from 'reka-ui';
import { cn } from '@/lib/cn';
import { reactiveOmit } from '@/lib/reactiveOmit';

const props = defineProps<TabsContentProps & { class?: string }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
const classes = computed(() =>
  cn('mt-4 outline-none focus-visible:ring-2 focus-visible:ring-sg-ring', props.class),
);
</script>

<template>
  <TabsContent v-bind="forwarded" :class="classes">
    <slot />
  </TabsContent>
</template>
