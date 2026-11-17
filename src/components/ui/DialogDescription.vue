<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'reka-ui';
import { cn } from '@/lib/cn';

const props = defineProps<DialogDescriptionProps & { class?: string }>();
</script>

<template>
  <DialogDescription :class="cn('text-sm leading-relaxed text-sg-muted-foreground', props.class)">
    <slot />
  </DialogDescription>
</template>
